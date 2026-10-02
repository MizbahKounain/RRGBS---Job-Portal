import React, { useEffect, useState } from 'react';
import { X, Phone, Mail, MapPin, Send, CheckCircle2 } from 'lucide-react';
import { RecruitmentService } from '../types';
import { RRGBSLogo } from './common/RRGBSLogo';
import { api } from '../api';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  service?: RecruitmentService | null;
}

export const ContactModal: React.FC<ContactModalProps> = ({
  isOpen,
  onClose,
  service,
}) => {
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [inquiryType, setInquiryType] = useState(service ? service.title : 'Contract Staffing');
  const [message, setMessage] = useState('');
  const [isSent, setIsSent] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setInquiryType(service?.title || 'Contract Staffing');
      setIsSent(false);
      setErrorMsg('');
    }
  }, [isOpen, service]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setIsSubmitting(true);
    try {
      await api.contact({ name, company, email, phone, inquiryType, message });
      setIsSent(true);
    } catch (error) {
      setErrorMsg(error instanceof Error ? error.message : 'Could not send your inquiry.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setName('');
    setCompany('');
    setEmail('');
    setPhone('');
    setMessage('');
    setIsSent(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-gray-200 relative my-6 overflow-hidden">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <RRGBSLogo size={36} />
            <div>
              <h2 className="font-extrabold text-lg text-gray-900 leading-tight">
                {service ? `Inquire: ${service.title}` : 'Contact RRGBS Recruitment Desk'}
              </h2>
              <div className="text-xs text-gray-500 font-medium">
                RR Group of Business Solutions • Shivamogga, India
              </div>
            </div>
          </div>

          <button
            onClick={handleReset}
            className="p-2 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {isSent ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-16 h-16 bg-red-50 text-[#d71920] rounded-full flex items-center justify-center mx-auto text-3xl font-bold">
              <CheckCircle2 className="w-10 h-10 text-[#d71920]" />
            </div>

            <h3 className="text-xl font-extrabold text-gray-900">
              Inquiry Sent Successfully!
            </h3>

            <p className="text-xs sm:text-sm text-gray-600 max-w-md mx-auto leading-relaxed">
              Thank you, <b>{name}</b>. Your enquiry regarding <b>{inquiryType}</b> has been sent to the RRGBS email desk. You can close this form and continue browsing the same page.
            </p>

            <div className="pt-4">
              <button
                onClick={handleReset}
                className="bg-[#d71920] hover:bg-[#b8141a] text-white px-8 py-2.5 rounded-lg text-xs font-bold transition-all shadow-md cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        ) : (
          <>
          {errorMsg && <div className="mx-6 mt-4 p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-lg">{errorMsg}</div>}
          <form onSubmit={handleSubmit} className="p-6 space-y-3.5">
            {/* Direct Contact Bar */}
            <div className="bg-neutral-900 text-white p-3.5 rounded-xl text-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#ff3b42]" />
                <span className="font-bold">+91 63635 65865</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <Mail className="w-4 h-4 text-[#ff3b42]" />
                <span>info@rrgroupofbusinesssolutions.in</span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Your Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-xs sm:text-sm outline-none focus:border-[#d71920] focus:bg-white transition-all"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Company / Organization
                </label>
                <input
                  type="text"
                  placeholder="Company Name"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-xs sm:text-sm outline-none focus:border-[#d71920] focus:bg-white transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Phone / WhatsApp <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+91 98765 43210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-xs sm:text-sm outline-none focus:border-[#d71920] focus:bg-white transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Official Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                required
                placeholder="name@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-xs sm:text-sm outline-none focus:border-[#d71920] focus:bg-white transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Service Required
              </label>
              <select
                value={inquiryType}
                onChange={(e) => setInquiryType(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-xs sm:text-sm outline-none focus:border-[#d71920] focus:bg-white transition-all cursor-pointer"
              >
                <option value="Permanent Hiring">Permanent Hiring</option>
                <option value="Contract Staffing">Contract Staffing</option>
                <option value="RPO Services">RPO Services</option>
                <option value="Payroll Outsourcing">Payroll Outsourcing</option>
                <option value="Bulk Hiring">Bulk Hiring</option>
                <option value="Executive Search">Executive Search</option>
                <option value="Managed Workforce">Managed Workforce</option>
                <option value="General Staffing Inquiry">General Staffing Inquiry</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Requirement Details
              </label>
              <textarea
                rows={2}
                placeholder="Number of positions, location, tech stack or candidate profile..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full px-3.5 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs outline-none focus:border-[#d71920] focus:bg-white transition-all resize-none"
              />
            </div>

            <div className="pt-2 flex items-center justify-end gap-2.5">
              <button
                type="button"
                onClick={handleReset}
                className="px-4 py-2.5 text-xs font-bold text-gray-600 hover:text-gray-900 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-[#d71920] hover:bg-[#b8141a] text-white px-6 py-2.5 rounded-lg text-xs font-bold transition-all shadow-md active:scale-98 cursor-pointer flex items-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{isSubmitting ? 'Sending…' : 'Submit Inquiry'}</span>
              </button>
            </div>
          </form>
          </>
        )}
      </div>
    </div>
  );
};
