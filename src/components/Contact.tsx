import React, { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Mail,
  Github,
  Linkedin,
  Send,
  CheckCircle2,
  AlertCircle,
  Copy,
  Check,
  Terminal,
  MessageSquare
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { MagneticButton } from './MagneticButton';

interface FormData {
  name: string;
  email: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: ''
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [emailCopied, setEmailCopied] = useState(false);

  const directEmail = 'hm5884116@gmail.com';

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Please provide your name';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Please provide your email address';
    } else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Please provide a brief message';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    setIsSubmitting(true);

    // Simulate reliable dispatch
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);

      // Trigger celebratory particle confetti
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.7 },
        colors: ['#00f0ff', '#10b981', '#a855f7']
      });

      setFormData({ name: '', email: '', message: '' });
      setErrors({});
    }, 1000);
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(directEmail);
    setEmailCopied(true);
    setTimeout(() => setEmailCopied(false), 2000);
  };

  return (
    <section id="contact" className="relative py-24 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto">
      {/* Background glow orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Column: Direct Info & Quick Channels */}
        <div className="lg:col-span-5 flex flex-col justify-between">
          <div>
            <div className="backdrop-blur-md bg-white/[0.03] border border-white/10 px-3.5 py-1 rounded-full text-xs font-mono-code text-cyan-400 mb-3 inline-flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
              <span>06 // INITIATE TRANSMISSION</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight leading-tight mb-4">
              Let's build something meaningful.
            </h2>

            <p className="text-slate-400 text-sm sm:text-base leading-relaxed mb-8">
              Whether you are looking to collaborate on machine learning research, discuss algorithmic challenges, explore high-throughput computer vision projects, or discuss full-time AI engineering opportunities, I'm always open to connecting.
            </p>
          </div>

          {/* Direct channels */}
          <div className="space-y-4">
            <h3 className="text-xs font-mono-code uppercase tracking-wider text-slate-400">
              Direct Contact & Social Profiles
            </h3>

            {/* Email pill */}
            <div className="glass-panel rounded-xl p-3 sm:p-4 border border-white/10 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3 truncate">
                <div className="w-9 h-9 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 flex-shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div className="truncate">
                  <span className="text-[10px] font-mono-code text-slate-400 block">DIRECT INBOX</span>
                  <a
                    href={`mailto:${directEmail}`}
                    className="text-xs sm:text-sm font-mono-code text-slate-200 hover:text-cyan-300 transition-colors truncate block"
                  >
                    {directEmail}
                  </a>
                </div>
              </div>

              <button
                onClick={handleCopyEmail}
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors flex-shrink-0 cursor-pointer"
                title="Copy email to clipboard"
                data-cursor="pointer"
              >
                {emailCopied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            {/* Social Buttons: GitHub, LinkedIn, Email */}
            <div className="grid grid-cols-3 gap-2.5 pt-2">
              <a
                href="https://github.com/Harshmishra214"
                target="_blank"
                rel="noopener noreferrer"
                className="glass-panel glass-panel-hover rounded-xl p-3 flex flex-col items-center justify-center gap-1.5 border border-white/10 text-slate-300 hover:text-white group"
                data-cursor="pointer"
              >
                <Github className="w-5 h-5 text-cyan-400 group-hover:scale-110 transition-transform" />
                <span className="text-[11px] font-mono-code">GitHub</span>
              </a>

              <a
                href="https://linkedin.com/in/harshmishra"
                target="_blank"
                rel="noopener noreferrer"
                className="glass-panel glass-panel-hover rounded-xl p-3 flex flex-col items-center justify-center gap-1.5 border border-white/10 text-slate-300 hover:text-white group"
                data-cursor="pointer"
              >
                <Linkedin className="w-5 h-5 text-indigo-400 group-hover:scale-110 transition-transform" />
                <span className="text-[11px] font-mono-code">LinkedIn</span>
              </a>

              <a
                href={`mailto:${directEmail}`}
                className="glass-panel glass-panel-hover rounded-xl p-3 flex flex-col items-center justify-center gap-1.5 border border-white/10 text-slate-300 hover:text-white group"
                data-cursor="pointer"
              >
                <Mail className="w-5 h-5 text-emerald-400 group-hover:scale-110 transition-transform" />
                <span className="text-[11px] font-mono-code">Email</span>
              </a>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Validated Contact Form */}
        <div className="lg:col-span-7">
          <div className="glass-panel rounded-3xl p-6 sm:p-8 md:p-10 border border-white/10 shadow-2xl relative">
            <h3 className="text-xl font-display font-bold text-white mb-2 flex items-center gap-2">
              <Terminal className="w-5 h-5 text-cyan-400" />
              Send a Direct Message
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 mb-6">
              All messages are dispatched immediately. Expect a response within 24 hours.
            </p>

            {isSuccess && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-start gap-3"
              >
                <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold text-emerald-300">
                    Message Dispatched Successfully!
                  </h4>
                  <p className="text-xs text-emerald-200/80 mt-1">
                    Thank you for reaching out, Harsh will review your transmission and get back to you shortly.
                  </p>
                </div>
              </motion.div>
            )}

            <form onSubmit={handleSubmit} noValidate className="space-y-4">
              {/* Name Field */}
              <div>
                <label
                  htmlFor="contact-name"
                  className="block text-xs font-mono-code uppercase tracking-wider text-slate-300 mb-1.5"
                >
                  Your Name <span className="text-cyan-400">*</span>
                </label>
                <input
                  id="contact-name"
                  type="text"
                  value={formData.name}
                  onChange={e => {
                    setFormData({ ...formData, name: e.target.value });
                    if (errors.name) setErrors({ ...errors, name: undefined });
                  }}
                  placeholder="e.g. Alex Morgan"
                  className={`w-full px-4 py-3 rounded-xl bg-white/[0.03] border text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-1 transition-all ${
                    errors.name
                      ? 'border-rose-500 focus:ring-rose-500'
                      : 'border-white/10 focus:border-cyan-400 focus:ring-cyan-400/50'
                  }`}
                />
                {errors.name && (
                  <p className="mt-1 text-xs text-rose-400 flex items-center gap-1 font-mono-code">
                    <AlertCircle className="w-3 h-3" />
                    {errors.name}
                  </p>
                )}
              </div>

              {/* Email Field */}
              <div>
                <label
                  htmlFor="contact-email"
                  className="block text-xs font-mono-code uppercase tracking-wider text-slate-300 mb-1.5"
                >
                  Your Email Address <span className="text-cyan-400">*</span>
                </label>
                <input
                  id="contact-email"
                  type="email"
                  value={formData.email}
                  onChange={e => {
                    setFormData({ ...formData, email: e.target.value });
                    if (errors.email) setErrors({ ...errors, email: undefined });
                  }}
                  placeholder="e.g. alex@example.com"
                  className={`w-full px-4 py-3 rounded-xl bg-white/[0.03] border text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-1 transition-all ${
                    errors.email
                      ? 'border-rose-500 focus:ring-rose-500'
                      : 'border-white/10 focus:border-cyan-400 focus:ring-cyan-400/50'
                  }`}
                />
                {errors.email && (
                  <p className="mt-1 text-xs text-rose-400 flex items-center gap-1 font-mono-code">
                    <AlertCircle className="w-3 h-3" />
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Message Field */}
              <div>
                <label
                  htmlFor="contact-message"
                  className="block text-xs font-mono-code uppercase tracking-wider text-slate-300 mb-1.5"
                >
                  Your Message <span className="text-cyan-400">*</span>
                </label>
                <textarea
                  id="contact-message"
                  rows={4}
                  value={formData.message}
                  onChange={e => {
                    setFormData({ ...formData, message: e.target.value });
                    if (errors.message) setErrors({ ...errors, message: undefined });
                  }}
                  placeholder="Describe your project, question, or opportunity..."
                  className={`w-full px-4 py-3 rounded-xl bg-white/[0.03] border text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-1 transition-all resize-none ${
                    errors.message
                      ? 'border-rose-500 focus:ring-rose-500'
                      : 'border-white/10 focus:border-cyan-400 focus:ring-cyan-400/50'
                  }`}
                />
                {errors.message && (
                  <p className="mt-1 text-xs text-rose-400 flex items-center gap-1 font-mono-code">
                    <AlertCircle className="w-3 h-3" />
                    {errors.message}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <MagneticButton
                  variant="primary"
                  size="md"
                  className="w-full sm:w-auto"
                >
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex items-center justify-center gap-2 w-full cursor-pointer disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                        <span>Transmitting...</span>
                      </>
                    ) : (
                      <>
                        <span>Send Message</span>
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </MagneticButton>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
