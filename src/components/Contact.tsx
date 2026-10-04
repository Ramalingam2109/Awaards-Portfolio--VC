import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Github, Linkedin, ArrowUpRight, Send, Check } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export const Contact: React.FC = () => {
  const { profile } = portfolioData;
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

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
            Interested in working together or discussing engineering opportunities? Feel free to reach out directly.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Direct Links & Status */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-6">
            <div className="p-8 rounded-3xl bg-[#141414] border border-white/5 space-y-4 shadow-lg">
              <div className="text-xs font-mono text-[#8a8a7c] uppercase tracking-widest mb-3">
                Direct Channels
              </div>

              {/* Email as a clean hyperlink attached to the icon */}
              <a
                href={`mailto:${profile.email}`}
                className="flex items-center justify-between p-4 rounded-2xl hover:bg-white/5 text-[#f0f0f0] text-sm font-semibold transition-all duration-300 group border border-white/5 hover:border-white/10"
              >
                <span className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-[#8a8a7c] group-hover:text-white transition-colors" />
                  <span>Email</span>
                </span>
                <ArrowUpRight className="w-4 h-4 opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </a>

              {/* GitHub Link */}
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-4 rounded-2xl hover:bg-white/5 text-[#f0f0f0] text-sm font-semibold transition-all duration-300 group border border-white/5 hover:border-white/10"
              >
                <span className="flex items-center gap-3">
                  <Github className="w-4 h-4 text-[#8a8a7c] group-hover:text-white transition-colors" />
                  <span>GitHub</span>
                </span>
                <ArrowUpRight className="w-4 h-4 opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </a>

              {/* LinkedIn Link */}
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-4 rounded-2xl hover:bg-white/5 text-[#f0f0f0] text-sm font-semibold transition-all duration-300 group border border-white/5 hover:border-white/10"
              >
                <span className="flex items-center gap-3">
                  <Linkedin className="w-4 h-4 text-[#38bdf8]" />
                  <span>LinkedIn</span>
                </span>
                <ArrowUpRight className="w-4 h-4 opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </a>
            </div>

            {/* Status Card */}
            <div className="p-7 rounded-3xl bg-[#141414] border border-white/5 text-xs text-[#8a8a7c] leading-relaxed shadow-lg">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span className="text-[#f0f0f0] font-semibold text-sm">Status: Available</span>
              </div>
              <p className="text-xs text-[#8a8a7c]">
                Open to software engineering positions, full-stack projects, and technical collaborations.
              </p>
            </div>
          </div>

          {/* Right Column: Message Form */}
          <div className="lg:col-span-7 flex flex-col">
            <div className="p-8 rounded-3xl bg-[#141414] border border-white/5 shadow-lg flex-1 flex flex-col justify-between">
              <h3 className="text-lg font-bold font-display text-[#f0f0f0] mb-6 tracking-tight">
                Send a message
              </h3>

              {formSubmitted ? (
                <div className="p-8 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-center space-y-3 my-auto">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center">
                    <Check className="w-6 h-6" />
                  </div>
                  <h4 className="text-lg font-bold text-white">Message Sent!</h4>
                  <p className="text-xs text-[#8a8a7c]">Thank you for reaching out. RAM will respond promptly.</p>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-4 flex-1 flex flex-col justify-between">
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
                      className="w-full px-4 py-3 rounded-2xl bg-white/5 border border-white/10 focus:border-white/30 focus:outline-none text-[#f0f0f0] text-sm transition-colors"
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
                      className="w-full px-4 py-3 rounded-2xl bg-white/5 border border-white/10 focus:border-white/30 focus:outline-none text-[#f0f0f0] text-sm transition-colors"
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
                      placeholder="Hi RAM, let's connect regarding an opportunity..."
                      className="w-full px-4 py-3 rounded-2xl bg-white/5 border border-white/10 focus:border-white/30 focus:outline-none text-[#f0f0f0] text-sm transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-full bg-[#f0f0f0] hover:bg-white text-[#111111] font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md mt-2"
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
