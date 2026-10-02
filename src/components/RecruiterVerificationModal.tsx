import React, { useEffect, useState } from 'react';
import { AlertCircle, Building2, CheckCircle2, Mail, Phone, X } from 'lucide-react';
import { api } from '../api';

interface RecruiterVerificationModalProps {
  isOpen: boolean;
  user: { name: string; email: string; phone?: string; companyName?: string } | null;
  onClose: () => void;
  onVerified: (user: any) => void;
}

export const RecruiterVerificationModal: React.FC<RecruiterVerificationModalProps> = ({ isOpen, user, onClose, onVerified }) => {
  const [companyName, setCompanyName] = useState('');
  const [gstNumber, setGstNumber] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [registrationId, setRegistrationId] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setCompanyName(user?.companyName || '');
      setPhone(user?.phone || '');
      setEmail(user?.email || '');
      setGstNumber('');
      setRegistrationId('');
      setPassword('');
      setErrorMsg('');
    }
  }, [isOpen, user]);

  if (!isOpen) return null;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setErrorMsg('');
    setSubmitting(true);
    try {
      const result = await api.recruiterProfile({ companyName, gstNumber, phone, email, registrationId, password });
      onVerified(result.user);
    } catch (error) {
      setErrorMsg(error instanceof Error ? error.message : 'Could not verify recruiter details.');
    } finally {
      setSubmitting(false);
    }
  };

  const field = (label: string, value: string, setValue: (v: string) => void, placeholder: string, required = false, type = 'text') => (
    <div>
      <label className="block text-xs font-bold text-gray-700 mb-1">{label}{required && <span className="text-red-500"> *</span>}</label>
      <input type={type} required={required} value={value} onChange={(e) => setValue(e.target.value)} placeholder={placeholder}
        className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm outline-none focus:border-[#d71920] focus:bg-white transition-all" />
    </div>
  );

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl border border-gray-200 overflow-hidden my-6">
        <div className="px-6 py-4 border-b flex items-center justify-between">
          <div className="flex items-center gap-3"><div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center"><Building2 className="w-5 h-5 text-[#d71920]" /></div>
            <div><h2 className="font-extrabold text-lg">Recruiter / Company Details</h2><p className="text-xs text-gray-500">Confirm these details before posting a job.</p></div></div>
          <button type="button" onClick={onClose} className="p-2 rounded-lg hover:bg-gray-100"><X className="w-5 h-5" /></button>
        </div>
        <form onSubmit={submit} className="p-6 space-y-4">
          <div className="p-3 bg-blue-50 border border-blue-100 rounded-lg text-xs text-blue-800">Your account password is required to confirm that you are the recruiter using this account.</div>
          {errorMsg && <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-lg flex gap-2"><AlertCircle className="w-4 h-4 shrink-0" />{errorMsg}</div>}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {field('Company Name', companyName, setCompanyName, 'e.g. ABC Technologies Pvt Ltd', true)}
            {field('GST Number', gstNumber, setGstNumber, 'Optional')}
            {field('Phone', phone, setPhone, '+91 98765 43210', true, 'tel')}
            {field('Company Email', email, setEmail, 'hr@company.com', true, 'email')}
            {field('Registration ID', registrationId, setRegistrationId, 'Optional')}
            {field('Account Password', password, setPassword, 'Enter your login password', true, 'password')}
          </div>
          <div className="flex justify-end gap-2 pt-2"><button type="button" onClick={onClose} className="px-5 py-2.5 rounded-lg border text-sm font-bold">Cancel</button><button disabled={submitting} type="submit" className="px-6 py-2.5 rounded-lg bg-[#d71920] text-white text-sm font-bold hover:bg-[#b8141a]">{submitting ? 'Verifying…' : 'Verify & Continue'}</button></div>
        </form>
      </div>
    </div>
  );
};
