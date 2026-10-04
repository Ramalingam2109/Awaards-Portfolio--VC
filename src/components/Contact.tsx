import React, { useState } from 'react';
import { Mail, Copy, Check, Send, Github, Linkedin, ArrowUpRight, MessageSquare } from 'lucide-react';
import confetti from 'canvas-confetti';
import { ProfileData } from '../types';
import { soundFX } from '../utils/audio';

interface Props {
  profile: ProfileData;
}

export const Contact: React.FC<Props> = ({ profile }) => {
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
        colors: ['#d9f99d', '#38bdf8', '#c084fc']
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
    <section id="contact" className="py-24 sm:py-32 px-4 sm:px-6 relative border-t border-white/5 overflow-hidden">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-lime-400/[0.08] rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-lime-400" />
            <span className="text-xs font-mono font-semibold tracking-widest text-lime-400 uppercase">
              05 / Get In Touch
            </span>
          </div>
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-black font-display tracking-tight text-white leading-[1.05]">
            Let's build something <span className="text-lime-300">extraordinary</span> together.
          </h2>
          <p className="text-white/60 text-base sm:text-lg mt-4 max-w-xl mx-auto">
            Have a project in mind, an exciting role, or just want to connect? My inbox is always open.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 sm:p-8 rounded-3xl bg-[#121216] border border-white/10 shadow-2xl space-y-4">
              <div className="text-xs font-mono text-lime-400 uppercase tracking-widest">
                Direct Channel
              </div>
              <div className="text-lg sm:text-xl font-bold font-mono text-white break-all">
                {profile.email}
              </div>
              
              <button
                onClick={handleCopyEmail}
                onMouseEnter={() => soundFX.playHover()}
                className={'w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold text-xs transition-all ' + (
                  copied
                    ? 'bg-emerald-400 text-black shadow-lg shadow-emerald-400/20'
                    : 'bg-white text-black hover:bg-lime-400 shadow-lg'
                )}
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'Email Copied to Clipboard!' : 'Copy Email Address'}</span>
              </button>
            </div>

            <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/10 space-y-3">
              <div className="text-xs font-mono text-white/40 uppercase tracking-widest mb-2">
                Connect Online
              </div>
              
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => soundFX.playHover()}
                onClick={() => soundFX.playClick()}
                className="flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 text-white text-xs font-semibold transition-all group"
              >
                <span className="flex items-center gap-2">
                  <Github className="w-4 h-4 text-white" />
                  <span>GitHub</span>
                </span>
                <ArrowUpRight className="w-4 h-4 text-white/40 group-hover:text-lime-400 group-hover:translate-x-0.5 transition-all" />
              </a>

              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => soundFX.playHover()}
                onClick={() => soundFX.playClick()}
                className="flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 text-white text-xs font-semibold transition-all group"
              >
                <span className="flex items-center gap-2">
                  <Linkedin className="w-4 h-4 text-cyan-400" />
                  <span>LinkedIn</span>
                </span>
                <ArrowUpRight className="w-4 h-4 text-white/40 group-hover:text-lime-400 group-hover:translate-x-0.5 transition-all" />
              </a>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-3xl bg-[#121216] border border-white/10 shadow-2xl">
              <h3 className="text-xl font-bold font-display text-white mb-6 flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-lime-400" />
                Send a Direct Message
              </h3>

              {formSubmitted ? (
                <div className="p-8 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center">
                    <Check className="w-6 h-6" />
                  </div>
                  <h4 className="text-lg font-bold text-white">Message Received!</h4>
                  <p className="text-xs text-white/60">
                    Thank you! I will get back to you shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-mono text-white/50 mb-1.5">
                      YOUR NAME
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Alex Smith"
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-lime-400 focus:outline-none text-white text-sm transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-white/50 mb-1.5">
                      YOUR EMAIL
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="alex@company.com"
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-lime-400 focus:outline-none text-white text-sm transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-white/50 mb-1.5">
                      MESSAGE
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell me about your project, timeline, or idea..."
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-lime-400 focus:outline-none text-white text-sm transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    onMouseEnter={() => soundFX.playHover()}
                    className="w-full py-3.5 rounded-xl bg-lime-400 hover:bg-lime-300 text-black font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-lime-400/20"
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
