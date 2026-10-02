import React, { useState } from 'react';
import { Phone, Mail, MapPin, Send, CheckCircle2 } from 'lucide-react';
import { api } from '../../api';

interface HomeContactSectionProps {
  prefilledService?: string;
  prefilledNote?: string;
}

export const HomeContactSection: React.FC<HomeContactSectionProps> = ({
  prefilledService,
  prefilledNote,
}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [service, setService] = useState(prefilledService || 'Home Cleaning & Housekeeping');
  const [location, setLocation] = useState('');
  const [message, setMessage] = useState(prefilledNote || '');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [whatsappUrl, setWhatsappUrl] = useState('');
  const [whatsappOpened, setWhatsappOpened] = useState(false);

  // Sync if prefilled values change
  React.useEffect(() => {
    if (prefilledService) setService(prefilledService);
    if (prefilledNote) setMessage(prefilledNote);
  }, [prefilledService, prefilledNote]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setIsSubmitting(true);
    try {
      const formattedText =
        'Hello RRGBS,\n\n*HOME SERVICE ENQUIRY*\n\n' +
        'Name: ' + name + '\nMobile: ' + phone + '\nEmail: ' + (email || 'Not provided') +
        '\nService: ' + service + '\nLocation: ' + location +
        '\nRequirement: ' + (message || 'Please coordinate earliest.');

      // Build the WhatsApp link before the async API call. Opening a real URL directly
      // from the user's click avoids the about:blank/popup issue on Windows browsers.
      const clientWhatsappUrl =
        'https://wa.me/916363565865?text=' + encodeURIComponent(formattedText);
      setWhatsappUrl(clientWhatsappUrl);
      const whatsappWindow = window.open(clientWhatsappUrl, '_blank', 'noopener,noreferrer');
      setWhatsappOpened(Boolean(whatsappWindow));

      // Save the enquiry and send the email through the backend.
      const result = await api.homeEnquiry({ name, phone, email, service, location, message });
      setEmailSent(Boolean(result.emailSent));
      if (result.emailError) {
        setErrorMsg('The enquiry was saved, but the notification email could not be sent: ' + result.emailError);
      }
      setWhatsappUrl(result.whatsappUrl || clientWhatsappUrl);
      setIsSubmitted(true);
    } catch (error) {
      setErrorMsg(error instanceof Error ? error.message : 'Could not submit the enquiry.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setName('');
    setPhone('');
    setEmail('');
    setLocation('');
    setMessage('');
    setEmailSent(false);
    setWhatsappUrl('');
    setWhatsappOpened(false);
    setErrorMsg('');
    setIsSubmitted(false);
  };

  return (
    <section id="request-service" className="py-20 bg-[#f7f7f7] rrgbs-reveal">
      <div className="w-[92%] max-w-[1200px] mx-auto">
        {/* Section Head */}
        <div className="text-center max-w-[750px] mx-auto mb-14">
          <div className="text-[#d71920] uppercase text-xs sm:text-sm font-extrabold tracking-[1.5px] mb-2">
            Get in Touch
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight mb-3">
            Request a Home Service
          </h2>
          <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
            Fill in your requirement below and our service coordination desk will contact you.
          </p>
        </div>

        {/* Contact Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Contact Info (Left Column: 5 cols) */}
          <div className="lg:col-span-5 bg-white rounded-xl p-8 border border-[#e6e6e6] shadow-sm">
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              RRGBS Home Services
            </h3>

            <p className="text-sm text-gray-600 mb-7 leading-relaxed">
              RR Group of Business Solutions provides manpower, staffing and service-support
              solutions for individuals, businesses, and residential communities across Karnataka.
            </p>

            <div className="space-y-4">
              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-lg bg-red-50 text-[#d71920] flex items-center justify-center shrink-0 mt-0.5">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <strong className="block text-xs font-bold text-gray-800 uppercase tracking-wide">
                    Call Us
                  </strong>
                  <a
                    href="tel:+916363565865"
                    className="text-sm font-bold text-gray-900 hover:text-[#d71920] transition-colors"
                  >
                    +91 63635 65865
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-lg bg-red-50 text-[#d71920] flex items-center justify-center shrink-0 mt-0.5">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <strong className="block text-xs font-bold text-gray-800 uppercase tracking-wide">
                    Alternate Number
                  </strong>
                  <a
                    href="tel:+917795362779"
                    className="text-sm font-bold text-gray-900 hover:text-[#d71920] transition-colors"
                  >
                    +91 77953 62779
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-lg bg-red-50 text-[#d71920] flex items-center justify-center shrink-0 mt-0.5">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <strong className="block text-xs font-bold text-gray-800 uppercase tracking-wide">
                    Email
                  </strong>
                  <a
                    href="mailto:info@rrgroupofbusinesssolutions.in"
                    className="text-sm text-gray-700 hover:text-[#d71920] transition-colors break-all"
                  >
                    info@rrgroupofbusinesssolutions.in
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-lg bg-red-50 text-[#d71920] flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <strong className="block text-xs font-bold text-gray-800 uppercase tracking-wide">
                    Office
                  </strong>
                  <span className="text-xs sm:text-sm text-gray-600 leading-relaxed block">
                    No. 01/05, Bharani Complex,<br />
                    3rd Cross Road, Durgigudi,<br />
                    Shivamogga, Karnataka – 577201
                  </span>
                </div>
              </div>
            </div>

            {/* Instant WhatsApp Quick Button */}
            <div className="mt-8 pt-6 border-t border-gray-100">
              <a
                href="https://wa.me/916363565865?text=Hello%20RRGBS,%20I%20need%20a%20Home%20Service."
                target="_blank"
                rel="noreferrer"
                className="w-full bg-[#25d366] hover:bg-[#1faa4e] text-white py-3 rounded-lg font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-sm"
              >
                <span>Chat Directly on WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Contact Form (Right Column: 7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-xl p-8 border border-[#e6e6e6] shadow-sm">
            <h3 className="text-2xl font-bold text-gray-900 mb-5">
              Service Enquiry
            </h3>

            {isSubmitted ? (
              <div className="p-8 text-center bg-red-50/50 border border-red-100 rounded-xl space-y-4">
                <div className="w-14 h-14 bg-red-100 text-[#d71920] rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-xl font-bold text-gray-900">
                  Enquiry Dispatched!
                </h4>
                <p className="text-xs sm:text-sm text-gray-600 max-w-md mx-auto leading-relaxed">
                  Thank you, <b>{name}</b>. Your service request has been saved. {emailSent ? 'The RRGBS coordination team has been notified by email.' : 'The request is saved in the RRGBS system, but the notification email is not configured or could not be delivered.'} {whatsappOpened ? 'WhatsApp has been opened with the complete enquiry ready to send.' : 'Your browser blocked the WhatsApp window; use the button below to open it.'}
                </p>
                {errorMsg && <div className="text-xs text-red-700 bg-red-50 border border-red-200 rounded-lg p-3 max-w-md mx-auto">{errorMsg}</div>}
                {!whatsappOpened && whatsappUrl && (
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center bg-[#25D366] hover:bg-[#1da851] text-white px-6 py-2.5 rounded font-bold text-xs transition-all"
                  >
                    Open WhatsApp Enquiry
                  </a>
                )}
                <div className="pt-2 flex justify-center gap-3">
                  <button
                    onClick={handleReset}
                    className="bg-[#d71920] hover:bg-[#a90000] text-white px-6 py-2.5 rounded text-xs font-bold transition-all shadow-sm"
                  >
                    Submit Another Request
                  </button>
                </div>
              </div>
            ) : (
              <>
              {errorMsg && <div className="p-3 mb-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-lg">{errorMsg}</div>}
              <form id="serviceForm" onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      Your Name <span className="text-[#d71920]">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      required
                      placeholder="Your Name *"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-3.5 py-3 border border-gray-300 rounded text-xs sm:text-sm outline-none focus:border-[#d71920] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      Mobile Number <span className="text-[#d71920]">*</span>
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      required
                      placeholder="Mobile Number *"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-3.5 py-3 border border-gray-300 rounded text-xs sm:text-sm outline-none focus:border-[#d71920] transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      Email Address (Optional)
                    </label>
                    <input
                      type="email"
                      id="email"
                      placeholder="Email Address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3.5 py-3 border border-gray-300 rounded text-xs sm:text-sm outline-none focus:border-[#d71920] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      Select Service <span className="text-[#d71920]">*</span>
                    </label>
                    <select
                      id="service"
                      required
                      value={service}
                      onChange={(e) => setService(e.target.value)}
                      className="w-full px-3.5 py-3 border border-gray-300 rounded text-xs sm:text-sm outline-none focus:border-[#d71920] transition-colors cursor-pointer bg-white"
                    >
                      <option value="">Select Service *</option>
                      <option>Home Cleaning &amp; Housekeeping</option>
                      <option>Elderly Care &amp; Support</option>
                      <option>Home Nursing Support</option>
                      <option>Home Maintenance</option>
                      <option>Security &amp; Caretaker</option>
                      <option>Gardening</option>
                      <option>Driver Services</option>
                      <option>Other Home Service</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Service Location / Area <span className="text-[#d71920]">*</span>
                  </label>
                  <input
                    type="text"
                    id="location"
                    required
                    placeholder="e.g. Durgigudi, Shivamogga or Bangalore locality *"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full px-3.5 py-3 border border-gray-300 rounded text-xs sm:text-sm outline-none focus:border-[#d71920] transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Requirement Details
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    placeholder="Describe your requirement (e.g. 2 BHK deep clean on Saturday, 12h attendant for mother)..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-3.5 py-3 border border-gray-300 rounded text-xs sm:text-sm outline-none focus:border-[#d71920] transition-colors resize-vertical min-h-[110px]"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="bg-[#d71920] hover:bg-[#a90000] text-white px-8 py-3.5 rounded font-bold text-sm sm:text-base transition-all shadow-md active:scale-98 cursor-pointer flex items-center justify-center gap-2 w-full sm:w-auto"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Service Request</span>
                  </button>
                </div>
              </form>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
