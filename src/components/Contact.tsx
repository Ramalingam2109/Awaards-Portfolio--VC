import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check, Send, Github, Linkedin, ArrowUpRight } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export const Contact: React.FC = () => {
  const { profile } = portfolioData;
  const [copied, setCopied] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(profile.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setFormData({ name: '', email: '', message: '' });
    }, 4000);
  };

  return (
    <section id="contact" className="relative py-28 sm:py-36 px-6 sm:px-12 lg:px-20 bg-[#0e0e0e] text-[#f0f0f0] overflow-hidden">
      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Editorial Heading */}
        <div className="max-w-3xl mb-16">
          <span className="text-xs font-mono tracking-widest text-[#8a8a7c] uppercase">
            Contact
          </span>
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-extrabold font-display tracking-tight text-[#f0f0f0] mt-3">
            let's talk.
          </h2>
          <p className="text-base sm:text-lg text-[#8a8a7c] mt-4 leading-relaxed">
            Have a project in mind, an engineering role, or a creative partnership? Feel free to reach out.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Email & Links */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-8 rounded-2xl bg-[#141414] border border-white/5 space-y-4">
              <div className="text-xs font-mono text-[#8a8a7c] uppercase tracking-widest">
                Email Address
              </div>
              <div className="text-lg sm:text-xl font-bold font-mono text-[#f0f0f0] break-all">
                {profile.email}
              </div>
              
              <button
                onClick={handleCopyEmail}
                className={`w-full flex items-center justify-center gap-2 py-3 rounded-full font-semibold text-xs tracking-wider transition-all duration-300 ${
                  copied
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                    : 'bg-[#f0f0f0] text-[#111111] hover:bg-white'
                }`}
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'Copied!' : 'Copy Email'}</span>
              </button>
            </div>

            <div className="p-6 rounded-2xl bg-[#141414] border border-white/5 space-y-3">
              <div className="text-xs font-mono text-[#8a8a7c] uppercase tracking-widest mb-2">
                Connect
              </div>
              
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 rounded-xl hover:bg-white/5 text-[#f0f0f0] text-xs font-semibold transition-colors group"
              >
                <span className="flex items-center gap-2.5">
                  <Github className="w-4 h-4" />
                  <span>GitHub</span>
                </span>
                <ArrowUpRight className="w-4 h-4 opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
              </a>

              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 rounded-xl hover:bg-white/5 text-[#f0f0f0] text-xs font-semibold transition-colors group"
              >
                <span className="flex items-center gap-2.5">
                  <Linkedin className="w-4 h-4 text-[#38bdf8]" />
                  <span>LinkedIn</span>
                </span>
                <ArrowUpRight className="w-4 h-4 opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
              </a>
            </div>
          </div>

          {/* Right: Message Form */}
          <div className="lg:col-span-7">
            <div className="p-8 rounded-2xl bg-[#141414] border border-white/5">
              <h3 className="text-lg font-bold font-display text-[#f0f0f0] mb-6 tracking-tight">
                Send a message
              </h3>

              {formSubmitted ? (
                <div className="p-8 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center">
                    <Check className="w-6 h-6" />
                  </div>
                  <h4 className="text-lg font-bold text-white">Message Sent!</h4>
                  <p className="text-xs text-[#8a8a7c]">RAM will get back to you shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <div>
                    <label className="block text-[11px] font-mono text-[#8a8a7c] uppercase tracking-wider mb-2">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Jane Doe"
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-white/30 focus:outline-none text-[#f0f0f0] text-sm transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono text-[#8a8a7c] uppercase tracking-wider mb-2">
                      Your Email
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="jane@example.com"
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-white/30 focus:outline-none text-[#f0f0f0] text-sm transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono text-[#8a8a7c] uppercase tracking-wider mb-2">
                      Message
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell me about your project..."
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-white/30 focus:outline-none text-[#f0f0f0] text-sm transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-full bg-[#f0f0f0] hover:bg-white text-[#111111] font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md"
                  >
                    <span>Send Message</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
