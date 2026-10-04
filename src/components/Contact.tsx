import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check, Send, Github, Linkedin, ArrowUpRight, MessageSquare } from 'lucide-react';
import confetti from 'canvas-confetti';
import { portfolioData } from '../data/portfolioData';
import { soundFX } from '../utils/audio';

export const Contact: React.FC = () => {
  const { profile } = portfolioData;
  const [copied, setCopied] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(profile.email);
    setCopied(true);
    soundFX.playSuccess();
    
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.8 },
        colors: ['#c8e972', '#f3efe6', '#f59e0b']
      });
    } catch (e) {
      // Ignore
    }

    setTimeout(() => setCopied(false), 3000);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    soundFX.playSuccess();
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setFormData({ name: '', email: '', message: '' });
    }, 4000);
  };

  return (
    <section id="contact" className="py-28 sm:py-36 px-4 sm:px-8 relative bg-[#0c0c0e] text-[#f3efe6] border-t border-white/10 overflow-hidden">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#c8e972]/[0.06] rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Editorial Heading */}
        <div className="text-center max-w-4xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-[#c8e972]" />
            <span className="text-xs font-mono font-bold tracking-[0.25em] text-[#c8e972] uppercase">
              05 / Get In Touch
            </span>
          </div>
          <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black font-display tracking-tight text-white leading-[1.02]">
            LET'S BUILD SOMETHING <br />
            <span className="font-editorial italic font-normal lowercase text-transparent bg-clip-text bg-gradient-to-r from-[#f3efe6] via-[#c8e972] to-[#f3efe6]">
              extraordinary
            </span>{' '}
            TOGETHER.
          </h2>
          <p className="opacity-60 text-base sm:text-lg mt-5 max-w-xl mx-auto font-normal">
            Have a project in mind, an engineering role, or a creative inquiry? Feel free to reach out.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Email & Online */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-8 rounded-3xl bg-[#141418] border border-white/10 shadow-2xl space-y-4">
              <div className="text-xs font-mono text-[#c8e972] uppercase tracking-widest">
                Direct Email
              </div>
              <div className="text-lg sm:text-xl font-bold font-mono text-white break-all">
                {profile.email}
              </div>
              
              <button
                onClick={handleCopyEmail}
                onMouseEnter={() => soundFX.playHover()}
                className={'w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl font-bold text-xs transition-all ' + (
                  copied
                    ? 'bg-emerald-400 text-black shadow-lg shadow-emerald-400/20'
                    : 'bg-[#f3efe6] text-black hover:bg-[#c8e972] shadow-lg'
                )}
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'Email Copied!' : 'Copy Email Address'}</span>
              </button>
            </div>

            <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/10 space-y-3">
              <div className="text-xs font-mono opacity-40 uppercase tracking-widest mb-2">
                Online Profiles
              </div>
              
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => soundFX.playHover()}
                onClick={() => soundFX.playClick()}
                className="flex items-center justify-between p-3.5 rounded-2xl bg-white/5 hover:bg-white/10 text-white text-xs font-semibold transition-all group"
              >
                <span className="flex items-center gap-2.5">
                  <Github className="w-4 h-4 text-white" />
                  <span>GitHub</span>
                </span>
                <ArrowUpRight className="w-4 h-4 opacity-40 group-hover:opacity-100 group-hover:text-[#c8e972] group-hover:translate-x-0.5 transition-all" />
              </a>

              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => soundFX.playHover()}
                onClick={() => soundFX.playClick()}
                className="flex items-center justify-between p-3.5 rounded-2xl bg-white/5 hover:bg-white/10 text-white text-xs font-semibold transition-all group"
              >
                <span className="flex items-center gap-2.5">
                  <Linkedin className="w-4 h-4 text-[#38bdf8]" />
                  <span>LinkedIn</span>
                </span>
                <ArrowUpRight className="w-4 h-4 opacity-40 group-hover:opacity-100 group-hover:text-[#c8e972] group-hover:translate-x-0.5 transition-all" />
              </a>
            </div>
          </div>

          {/* Right: Message Form */}
          <div className="lg:col-span-7">
            <div className="p-8 rounded-3xl bg-[#141418] border border-white/10 shadow-2xl">
              <h3 className="text-xl font-bold font-display text-white mb-6 flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-[#c8e972]" />
                Send a Message
              </h3>

              {formSubmitted ? (
                <div className="p-8 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center">
                    <Check className="w-6 h-6" />
                  </div>
                  <h4 className="text-lg font-bold text-white">Message Received!</h4>
                  <p className="text-xs opacity-60">
                    Thank you RAM will reply within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-mono opacity-50 mb-1.5">
                      NAME
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Your name"
                      className="w-full px-4 py-3 rounded-2xl bg-white/5 border border-white/10 focus:border-[#c8e972] focus:outline-none text-white text-sm transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono opacity-50 mb-1.5">
                      EMAIL
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="your@email.com"
                      className="w-full px-4 py-3 rounded-2xl bg-white/5 border border-white/10 focus:border-[#c8e972] focus:outline-none text-white text-sm transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono opacity-50 mb-1.5">
                      MESSAGE
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="What are we building?"
                      className="w-full px-4 py-3 rounded-2xl bg-white/5 border border-white/10 focus:border-[#c8e972] focus:outline-none text-white text-sm transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    onMouseEnter={() => soundFX.playHover()}
                    className="w-full py-4 rounded-2xl bg-[#c8e972] hover:bg-[#b8d962] text-black font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-lg hover:scale-[1.01]"
                  >
                    <span>Send Message</span>
                    <Send className="w-4 h-4" />
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
