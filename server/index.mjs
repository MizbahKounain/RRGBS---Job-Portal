import express from 'express';
import dotenv from 'dotenv';
import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import nodemailer from 'nodemailer';

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const STORAGE = path.join(__dirname, 'storage');
const UPLOADS = path.join(STORAGE, 'uploads');
const DB_FILE = path.join(STORAGE, 'db.json');
const PORT = Number(process.env.PORT || 5000);
const JWT_SECRET = process.env.JWT_SECRET || 'rrgbs-local-development-secret-change-me';
const isProduction = process.env.NODE_ENV === 'production';

fs.mkdirSync(UPLOADS, { recursive: true });
if (!fs.existsSync(DB_FILE)) {
  fs.writeFileSync(DB_FILE, JSON.stringify({
    users: [], jobs: [], applications: [], savedJobs: [], resumes: [],
    contactInquiries: [], homeEnquiries: [], storeOrders: [], bulkQuotes: []
  }, null, 2));
}

function readDb() {
  return JSON.parse(fs.readFileSync(DB_FILE, 'utf8'));
}
function writeDb(db) {
  const tmp = DB_FILE + '.tmp';
  fs.writeFileSync(tmp, JSON.stringify(db, null, 2), 'utf8');
  fs.renameSync(tmp, DB_FILE);
}
function id(prefix) {
  return `${prefix}_${Date.now()}_${crypto.randomBytes(4).toString('hex')}`;
}
function cleanEmail(v) { return String(v || '').trim().toLowerCase(); }
function hashPassword(password, salt = crypto.randomBytes(16).toString('hex')) {
  const hash = crypto.scryptSync(String(password), salt, 64).toString('hex');
  return `${salt}:${hash}`;
}
function verifyPassword(password, stored) {
  const [salt, hash] = String(stored || '').split(':');
  if (!salt || !hash) return false;
  const actual = crypto.scryptSync(String(password), salt, 64).toString('hex');
  return crypto.timingSafeEqual(Buffer.from(hash, 'hex'), Buffer.from(actual, 'hex'));
}
function base64url(input) {
  return Buffer.from(input).toString('base64url');
}
function signToken(payload) {
  const body = base64url(JSON.stringify(payload));
  const sig = crypto.createHmac('sha256', JWT_SECRET).update(body).digest('base64url');
  return `${body}.${sig}`;
}
function verifyToken(token) {
  if (!token || !token.includes('.')) return null;
  const [body, sig] = token.split('.');
  const expected = crypto.createHmac('sha256', JWT_SECRET).update(body).digest('base64url');
  if (sig.length !== expected.length || !crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(expected))) return null;
  try {
    const payload = JSON.parse(Buffer.from(body, 'base64url').toString('utf8'));
    if (!payload.exp || payload.exp < Date.now()) return null;
    return payload;
  } catch { return null; }
}
function auth(req, res, next) {
  const header = req.headers.authorization || '';
  const user = verifyToken(header.startsWith('Bearer ') ? header.slice(7) : '');
  if (!user) return res.status(401).json({ message: 'Please sign in to continue.' });
  req.user = user;
  next();
}
function publicUser(user) {
  return {
    id: user.id, name: user.name, email: user.email, phone: user.phone || '', role: user.role,
    companyName: user.companyName || '', gstNumber: user.gstNumber || '', registrationId: user.registrationId || ''
  };
}
function validateRequired(obj, fields) {
  return fields.find((f) => !String(obj?.[f] ?? '').trim());
}
function buildHomeEnquiryMessage(body) {
  return [
    'HOME SERVICE ENQUIRY',
    '',
    `Name: ${String(body.name || '').trim()}`,
    `Mobile: ${String(body.phone || '').trim()}`,
    `Email: ${String(body.email || 'Not provided').trim()}`,
    `Service: ${String(body.service || '').trim()}`,
    `Location: ${String(body.location || '').trim()}`,
    `Requirement: ${String(body.message || 'Please coordinate earliest.').trim()}`,
    '',
    `Received: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}`
  ].join('\n');
}

async function sendHomeEnquiryEmail(body) {
  const host = String(process.env.SMTP_HOST || '').trim();
  const user = String(process.env.SMTP_USER || '').trim();
  const pass = String(process.env.SMTP_PASS || '').trim();
  const to = String(process.env.SMTP_TO || 'info@rrgroupofbusinesssolutions.in').trim();
  if (!host || !user || !pass || user === 'your-sending-email@example.com' || pass === 'your-email-app-password') {
    return { sent: false, reason: 'SMTP is not configured. Set SMTP_HOST, SMTP_USER and SMTP_PASS in .env and restart the server.' };
  }

  const port = Number(process.env.SMTP_PORT || 465);
  const secure = String(process.env.SMTP_SECURE || (port === 465)).toLowerCase() === 'true';
  const transporter = nodemailer.createTransport({ host, port, secure, auth: { user, pass } });
  const text = buildHomeEnquiryMessage(body);
  await transporter.sendMail({
    from: process.env.SMTP_FROM || user,
    to,
    replyTo: String(body.email || '').trim() || undefined,
    subject: `New RRGBS Home Service Enquiry - ${String(body.service || 'Service Request').trim()}`,
    text
  });
  return { sent: true };
}

function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function buildContactInquiryEmail(body) {
  const received = new Date().toLocaleString('en-IN', {
    timeZone: 'Asia/Kolkata',
    dateStyle: 'medium',
    timeStyle: 'short'
  });
  const fields = [
    ['Name', body.name],
    ['Company / Organization', body.company || 'Not provided'],
    ['Phone / WhatsApp', body.phone],
    ['Email', body.email],
    ['Service Required', body.inquiryType || 'General Staffing Inquiry'],
    ['Requirement Details', body.message || 'Not provided'],
    ['Received', received]
  ];

  const text = [
    'RRGBS BUSINESS / RECRUITMENT ENQUIRY',
    '',
    ...fields.map(([label, value]) => `${label}: ${String(value || '').trim()}`),
    '',
    'RRGBS - Reliable People, Professional Services'
  ].join('\n');

  const rows = fields.map(([label, value]) => `
    <tr>
      <td style="padding:12px 14px;border:1px solid #e5e7eb;background:#f8fafc;font-weight:700;color:#374151;width:34%;vertical-align:top;">${escapeHtml(label)}</td>
      <td style="padding:12px 14px;border:1px solid #e5e7eb;color:#111827;vertical-align:top;white-space:pre-wrap;">${escapeHtml(String(value || 'Not provided').trim())}</td>
    </tr>`).join('');

  const html = `
  <div style="margin:0;background:#f5f6f8;padding:28px 16px;font-family:Arial,Helvetica,sans-serif;color:#111827;">
    <div style="max-width:700px;margin:0 auto;background:#ffffff;border:1px solid #e5e7eb;border-radius:14px;overflow:hidden;">
      <div style="background:#111111;padding:22px 26px;">
        <div style="font-size:24px;font-weight:800;color:#ffffff;">RR<span style="color:#d71920;">GBS</span></div>
        <div style="margin-top:5px;font-size:12px;letter-spacing:1px;color:#d1d5db;">BUSINESS / RECRUITMENT ENQUIRY</div>
      </div>
      <div style="padding:26px;">
        <h2 style="margin:0 0 8px;font-size:21px;color:#111827;">New Business Enquiry</h2>
        <p style="margin:0 0 20px;color:#6b7280;font-size:14px;">A new enquiry was submitted through the RRGBS website.</p>
        <table style="width:100%;border-collapse:collapse;font-size:14px;">${rows}</table>
        <div style="margin-top:22px;padding:14px 16px;background:#fff5f5;border-left:4px solid #d71920;color:#4b5563;font-size:13px;">
          Please contact the customer using the phone number or email address above.
        </div>
      </div>
      <div style="padding:16px 26px;background:#f8fafc;border-top:1px solid #e5e7eb;color:#6b7280;font-size:12px;">
        RRGBS - Reliable People, Professional Services<br/>RR Group of Business Solutions
      </div>
    </div>
  </div>`;

  return { text, html };
}

async function sendContactInquiryEmail(body) {
  const host = String(process.env.SMTP_HOST || '').trim();
  const user = String(process.env.SMTP_USER || '').trim();
  const pass = String(process.env.SMTP_PASS || '').trim();
  const to = String(process.env.SMTP_TO || 'info@rrgroupofbusinesssolutions.in').trim();
  if (!host || !user || !pass || user === 'your-sending-email@example.com' || pass === 'your-email-app-password') {
    return { sent: false, reason: 'SMTP is not configured. Set SMTP_HOST, SMTP_USER and SMTP_PASS in .env and restart the server.' };
  }

  const port = Number(process.env.SMTP_PORT || 465);
  const secure = String(process.env.SMTP_SECURE || (port === 465)).toLowerCase() === 'true';
  const transporter = nodemailer.createTransport({ host, port, secure, auth: { user, pass } });
  const email = buildContactInquiryEmail(body);
  await transporter.sendMail({
    from: process.env.SMTP_FROM || user,
    to,
    replyTo: String(body.email || '').trim() || undefined,
    subject: `New RRGBS Business Enquiry - ${String(body.inquiryType || 'General Inquiry').trim()}`,
    text: email.text,
    html: email.html
  });
  return { sent: true };
}

function saveUpload(fileName, dataUrl, prefix) {
  if (!dataUrl) return null;
  const match = String(dataUrl).match(/^data:([^;]+);base64,(.+)$/s);
  if (!match) return null;
  const [, mime, b64] = match;
  const buffer = Buffer.from(b64, 'base64');
  if (buffer.length > 5 * 1024 * 1024) throw new Error('File must be 5MB or smaller.');
  const ext = path.extname(String(fileName || '')).toLowerCase() || (mime.includes('pdf') ? '.pdf' : '.bin');
  const safeName = `${prefix}-${crypto.randomBytes(5).toString('hex')}${ext.replace(/[^a-z0-9.]/gi, '')}`;
  fs.writeFileSync(path.join(UPLOADS, safeName), buffer);
  return { storedName: safeName, originalName: String(fileName || 'upload'), mime, size: buffer.length };
}

const app = express();
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', req.headers.origin || '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  if (req.method === 'OPTIONS') return res.sendStatus(204);
  next();
});
app.use(express.json({ limit: '12mb' }));

app.get('/api/health', (_req, res) => res.json({ ok: true, service: 'RRGBS API' }));

app.post('/api/auth/register', (req, res) => {
  const { name, email, phone, password, role = 'candidate', companyName = '' } = req.body || {};
  if (validateRequired(req.body, ['email', 'password'])) return res.status(400).json({ message: 'Email and password are required.' });
  if (String(password).length < 6) return res.status(400).json({ message: 'Password must be at least 6 characters.' });
  if (!['candidate', 'employer'].includes(role)) return res.status(400).json({ message: 'Invalid account role.' });
  if (role === 'candidate' && !String(name || '').trim()) return res.status(400).json({ message: 'Full name is required.' });
  if (role === 'employer' && !String(companyName || name || '').trim()) return res.status(400).json({ message: 'Company name is required.' });

  const db = readDb();
  const normalized = cleanEmail(email);
  if (db.users.some(u => u.email === normalized)) return res.status(409).json({ message: 'An account with this email already exists.' });

  const user = {
    id: id('usr'),
    name: String(role === 'employer' ? (companyName || name) : name).trim(),
    email: normalized,
    phone: String(phone || '').trim(),
    role,
    companyName: String(companyName || '').trim(),
    passwordHash: hashPassword(password),
    createdAt: new Date().toISOString()
  };
  db.users.push(user);
  writeDb(db);
  const token = signToken({ sub: user.id, role: user.role, exp: Date.now() + 1000 * 60 * 60 * 24 * 7 });
  res.status(201).json({ token, user: publicUser(user) });
});

app.post('/api/auth/login', (req, res) => {
  const { email, password, role } = req.body || {};
  const db = readDb();
  const user = db.users.find(u => u.email === cleanEmail(email));
  if (!user || !verifyPassword(password, user.passwordHash)) return res.status(401).json({ message: 'Invalid email or password.' });
  if (role && user.role !== role) return res.status(403).json({ message: `This account is registered as ${user.role}.` });
  const token = signToken({ sub: user.id, role: user.role, exp: Date.now() + 1000 * 60 * 60 * 24 * 7 });
  res.json({ token, user: publicUser(user) });
});

app.get('/api/auth/me', auth, (req, res) => {
  const db = readDb();
  const user = db.users.find(u => u.id === req.user.sub);
  if (!user) return res.status(401).json({ message: 'Account no longer exists.' });
  res.json({ user: publicUser(user) });
});

app.get('/api/jobs', (req, res) => {
  const db = readDb();
  const q = String(req.query.q || '').toLowerCase().trim();
  const location = String(req.query.location || '').toLowerCase().trim();
  const category = String(req.query.category || '').toLowerCase().trim();
  const type = String(req.query.type || '').toLowerCase().trim();
  const jobs = db.jobs.filter(j =>
    (!q || [j.title, j.company, j.category, ...(j.skills || [])].join(' ').toLowerCase().includes(q)) &&
    (!location || j.location.toLowerCase().includes(location)) &&
    (!category || j.category.toLowerCase() === category) &&
    (!type || j.type.toLowerCase() === type)
  );
  res.json({ jobs, total: jobs.length });
});

app.get('/api/jobs/:id', (req, res) => {
  const job = readDb().jobs.find(j => j.id === req.params.id);
  if (!job) return res.status(404).json({ message: 'Job not found.' });
  res.json({ job });
});

app.post('/api/recruiter/profile', auth, (req, res) => {
  if (req.user.role !== 'employer') return res.status(403).json({ message: 'Only recruiter accounts can use this feature.' });
  const { companyName, gstNumber = '', phone, email, registrationId = '', password } = req.body || {};
  if (!String(companyName || '').trim() || !String(phone || '').trim() || !String(email || '').trim() || !String(password || '')) {
    return res.status(400).json({ message: 'Company name, phone, email and password are required.' });
  }
  const db = readDb();
  const user = db.users.find(u => u.id === req.user.sub);
  if (!user) return res.status(404).json({ message: 'Recruiter account not found.' });
  if (!verifyPassword(password, user.passwordHash)) return res.status(401).json({ message: 'Password is incorrect.' });
  user.companyName = String(companyName).trim();
  user.name = user.companyName;
  user.phone = String(phone).trim();
  user.email = cleanEmail(email);
  user.gstNumber = String(gstNumber || '').trim();
  user.registrationId = String(registrationId || '').trim();
  writeDb(db);
  res.json({ user: publicUser(user) });
});

app.get('/api/recruiter/jobs', auth, (req, res) => {
  if (req.user.role !== 'employer') return res.status(403).json({ message: 'Only recruiter accounts can access this portal.' });
  const db = readDb();
  const jobs = db.jobs
    .filter(j => j.createdBy === req.user.sub)
    .map(job => ({
      ...job,
      applicationCount: db.applications.filter(a => a.jobId === job.id).length,
      applications: db.applications.filter(a => a.jobId === job.id).map(a => ({
        id: a.id, applicantName: a.applicantName, email: a.email, phone: a.phone,
        resumeFileName: a.resumeFileName || a.resumeFile?.originalName || '',
        hasResume: Boolean(a.resumeFile?.storedName), appliedAt: a.appliedAt
      }))
    }));
  res.json({ jobs });
});

app.get('/api/recruiter/jobs/:jobId/applications/:applicationId/resume', auth, (req, res) => {
  if (req.user.role !== 'employer') return res.status(403).json({ message: 'Only recruiters can download resumes.' });
  const db = readDb();
  const job = db.jobs.find(j => j.id === req.params.jobId && j.createdBy === req.user.sub);
  if (!job) return res.status(404).json({ message: 'Job not found or not owned by this recruiter.' });
  const application = db.applications.find(a => a.id === req.params.applicationId && a.jobId === job.id);
  if (!application || !application.resumeFile?.storedName) return res.status(404).json({ message: 'Resume not available for this application.' });
  const filePath = path.join(UPLOADS, application.resumeFile.storedName);
  if (!fs.existsSync(filePath)) return res.status(404).json({ message: 'Resume file is missing.' });
  res.download(filePath, application.resumeFile.originalName || 'resume');
});

app.post('/api/jobs', auth, (req, res) => {
  if (req.user.role !== 'employer') return res.status(403).json({ message: 'Only employer accounts can post jobs.' });
  const body = req.body || {};
  const db = readDb();
  const recruiter = db.users.find(u => u.id === req.user.sub);
  if (!recruiter || !String(recruiter.companyName || '').trim() || !String(recruiter.phone || '').trim() || !String(recruiter.email || '').trim()) {
    return res.status(400).json({ message: 'Please complete recruiter/company details before posting a job.' });
  }
  if (validateRequired(body, ['title', 'company', 'location', 'category', 'type', 'experience', 'description'])) {
    return res.status(400).json({ message: 'Please complete all required job fields.' });
  }
  const job = {
    id: id('job'),
    title: String(body.title).trim(),
    company: String(body.company).trim(),
    companyLogoText: String(body.company).trim().slice(0, 4).toUpperCase(),
    location: String(body.location).trim(),
    category: String(body.category).trim(),
    type: body.type,
    experience: String(body.experience).trim(),
    salary: String(body.salary || 'Best in Industry').trim(),
    description: String(body.description).trim(),
    skills: Array.isArray(body.skills) ? body.skills : [],
    responsibilities: body.responsibilities || [],
    requirements: body.requirements || [],
    benefits: body.benefits || [],
    postedDate: 'Just now',
    isFeatured: true,
    createdBy: req.user.sub,
    createdAt: new Date().toISOString()
  };
  db.jobs.unshift(job);
  writeDb(db);
  res.status(201).json({ job });
});

app.get('/api/saved-jobs', auth, (req, res) => {
  const db = readDb();
  const ids = db.savedJobs.filter(x => x.userId === req.user.sub).map(x => x.jobId);
  res.json({ jobIds: ids });
});

app.put('/api/saved-jobs/:jobId', auth, (req, res) => {
  const db = readDb();
  const idx = db.savedJobs.findIndex(x => x.userId === req.user.sub && x.jobId === req.params.jobId);
  if (idx === -1) db.savedJobs.push({ userId: req.user.sub, jobId: req.params.jobId, createdAt: new Date().toISOString() });
  writeDb(db);
  res.json({ saved: true });
});

app.delete('/api/saved-jobs/:jobId', auth, (req, res) => {
  const db = readDb();
  db.savedJobs = db.savedJobs.filter(x => !(x.userId === req.user.sub && x.jobId === req.params.jobId));
  writeDb(db);
  res.json({ saved: false });
});

app.post('/api/applications', async (req, res) => {
  const body = req.body || {};
  if (validateRequired(body, ['jobId', 'jobTitle', 'applicantName', 'email', 'phone'])) {
    return res.status(400).json({ message: 'Please complete the required application fields.' });
  }
  try {
    const db = readDb();
    const application = {
      id: id('app'),
      ...body,
      resumeFile: saveUpload(body.resumeFileName, body.resumeData, 'resume'),
      resumeData: undefined,
      appliedAt: new Date().toISOString()
    };
    delete application.resumeData;
    db.applications.unshift(application);
    writeDb(db);
    res.status(201).json({ application });
  } catch (err) {
    res.status(400).json({ message: err.message || 'Could not save application.' });
  }
});

app.post('/api/resumes', async (req, res) => {
  const body = req.body || {};
  if (validateRequired(body, ['name', 'email', 'phone'])) return res.status(400).json({ message: 'Name, email and phone are required.' });
  try {
    const db = readDb();
    const resume = {
      id: id('resume'),
      name: String(body.name).trim(),
      email: String(body.email).trim(),
      phone: String(body.phone).trim(),
      targetCategory: String(body.targetCategory || ''),
      preferredCity: String(body.preferredCity || ''),
      file: saveUpload(body.resumeFileName, body.resumeData, 'candidate'),
      createdAt: new Date().toISOString()
    };
    db.resumes.unshift(resume);
    writeDb(db);
    res.status(201).json({ resume: { ...resume } });
  } catch (err) {
    res.status(400).json({ message: err.message || 'Could not save resume.' });
  }
});

app.post('/api/contact', async (req, res) => {
  const body = req.body || {};
  if (validateRequired(body, ['name', 'phone', 'email'])) return res.status(400).json({ message: 'Name, phone and email are required.' });

  const db = readDb();
  const inquiry = {
    id: id('inq'),
    name: String(body.name || '').trim(),
    company: String(body.company || '').trim(),
    email: String(body.email || '').trim(),
    phone: String(body.phone || '').trim(),
    inquiryType: String(body.inquiryType || 'General Staffing Inquiry').trim(),
    message: String(body.message || '').trim(),
    createdAt: new Date().toISOString()
  };
  db.contactInquiries.unshift(inquiry);
  writeDb(db);

  try {
    const result = await sendContactInquiryEmail(inquiry);
    if (!result.sent) {
      return res.status(503).json({
        message: result.reason || 'Enquiry was saved, but the notification email could not be sent.',
        inquiry,
        emailSent: false
      });
    }
    res.status(201).json({ inquiry, emailSent: true });
  } catch (err) {
    const message = err?.message || 'Email delivery failed.';
    console.error('Business enquiry email failed:', message);
    return res.status(502).json({
      message: `Enquiry was saved, but the notification email failed: ${message}`,
      inquiry,
      emailSent: false
    });
  }
});

app.post('/api/home-enquiries', async (req, res) => {
  const body = req.body || {};
  if (validateRequired(body, ['name', 'phone', 'service', 'location'])) {
    return res.status(400).json({ message: 'Name, phone, service and location are required.' });
  }

  const enquiry = {
    id: id('home'),
    name: String(body.name).trim(),
    phone: String(body.phone).trim(),
    email: String(body.email || '').trim(),
    service: String(body.service).trim(),
    location: String(body.location).trim(),
    message: String(body.message || '').trim(),
    createdAt: new Date().toISOString()
  };

  const db = readDb();
  db.homeEnquiries.unshift(enquiry);
  writeDb(db);

  let emailSent = false;
  let emailError = '';
  try {
    const result = await sendHomeEnquiryEmail(enquiry);
    emailSent = result.sent;
    if (!result.sent) emailError = result.reason || '';
  } catch (err) {
    emailError = err?.message || 'Email delivery failed.';
    console.error('Home enquiry email failed:', emailError);
  }

  const whatsappText = buildHomeEnquiryMessage(enquiry);
  const whatsappUrl = `https://wa.me/916363565865?text=${encodeURIComponent(whatsappText)}`;
  res.status(201).json({ enquiry, emailSent, emailError: emailError || undefined, whatsappUrl });
});

app.post('/api/store/orders', (req, res) => {
  const body = req.body || {};
  if (validateRequired(body, ['customerName', 'customerPhone']) || !Array.isArray(body.items) || body.items.length === 0) {
    return res.status(400).json({ message: 'Customer details and at least one cart item are required.' });
  }
  const db = readDb();
  const order = { id: id('order'), ...body, status: 'new', createdAt: new Date().toISOString() };
  db.storeOrders.unshift(order);
  writeDb(db);
  res.status(201).json({ order });
});

app.post('/api/store/bulk-quotes', (req, res) => {
  const body = req.body || {};
  if (validateRequired(body, ['name', 'phone', 'category', 'message'])) return res.status(400).json({ message: 'Please complete the bulk quote form.' });
  const db = readDb();
  const quote = { id: id('bulk'), ...body, status: 'new', createdAt: new Date().toISOString() };
  db.bulkQuotes.unshift(quote);
  writeDb(db);
  res.status(201).json({ quote });
});

app.use('/uploads', express.static(UPLOADS));

if (isProduction) {
  const dist = path.join(ROOT, 'dist');
  app.use(express.static(dist));
  app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api/')) return next();
    res.sendFile(path.join(dist, 'index.html'));
  });
}

app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ message: 'Internal server error.' });
});

app.listen(PORT, () => {
  console.log(`RRGBS API running on http://localhost:${PORT}`);
  if (isProduction) console.log('Serving frontend from dist/');
});
