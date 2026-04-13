import React, { useState } from 'react';

const CONTACT_LINKS = [
  { label: 'EMAIL', value: 'om.gaikwad1024@gmail.com', href: 'mailto:om.gaikwad1024@gmail.com', icon: '@' },
  { label: 'PHONE', value: '+91 6364416762', href: 'tel:+916364416762', icon: '↗' },
  { label: 'GITHUB', value: 'github.com/om-gaikwad1024', href: 'https://github.com/om-gaikwad1024', icon: '↗' },
  { label: 'LINKEDIN', value: 'linkedin.com/in/om-gaikwad1024', href: 'https://linkedin.com/in/om-gaikwad1024', icon: '↗' },
];

export const ContactPage = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.message) return;
    setIsSubmitting(true);
    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: '6491ec9d-f301-4376-afe7-ae85369fe9cd',
          ...form,
        }),
      });
      if (response.ok) {
        setSent(true);
        setForm({ name: '', email: '', message: '' });
      } else {
        setSubmitStatus('error');
      }
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Fragment+Mono:ital@0;1&family=Lexend:wght@200;300;400;500&display=swap');
        @keyframes fadeUp{from{opacity:0;transform:translateY(16px);}to{opacity:1;transform:translateY(0);}}
        @keyframes blink{0%,100%{opacity:1;}50%{opacity:0;}}
        .ct-fadein{animation:fadeUp 0.5s ease both;}
        .ct-fadein-1{animation:fadeUp 0.5s 0.1s ease both;}
        .ct-fadein-2{animation:fadeUp 0.5s 0.2s ease both;}
        .cursor-blink{animation:blink 1s step-end infinite;}
        .ct-input { background:transparent; outline:none; width:100%; }
        .ct-input::placeholder { color:rgba(240,206,50,0.2); }
      `}</style>

      <div className="min-h-screen bg-[#0d0d0d] flex flex-col" style={{ fontFamily: "'Lexend',sans-serif" }}>

        {/* TOPBAR */}
        <div className="flex items-stretch h-[52px] border-b-[3px] border-[#f0ce32]/20 flex-shrink-0">
          <div className="px-6 border-r-[3px] border-[#f0ce32]/20 flex items-center bg-[#f0ce32]">
            <span className="text-black text-xl tracking-[0.12em]" style={{ fontFamily: "'Bebas Neue',sans-serif" }}>OMM</span>
          </div>
          <div className="flex-1 flex items-center px-4 md:px-6">

          </div>
          <div className="px-6 border-l-[3px] border-[#f0ce32]/20 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#f0ce32] animate-pulse" />
            <span className="text-[10px] text-[#f0ce32]/50 tracking-[0.1em]" style={{ fontFamily: "'Fragment Mono',monospace" }}>OPEN TO WORK</span>
          </div>
        </div>

        {/* MAIN */}
        <div className="flex-1 flex flex-col md:grid md:grid-cols-[1fr_1fr]">

          {/* LEFT — YELLOW IDENTITY PANEL */}
          <div className="ct-fadein bg-[#f0ce32] border-b-[3px] md:border-b-0 md:border-r-[3px] border-black flex flex-col justify-between p-8 md:p-14 relative overflow-hidden">
            <div className="relative z-10">
              <div className="text-[9px] tracking-[0.25em] text-black/50 mb-4" style={{ fontFamily: "'Fragment Mono',monospace" }}>// GET IN TOUCH</div>
              <div className="text-[64px] md:text-[80px] leading-[0.88] text-black tracking-[0.02em] mb-8" style={{ fontFamily: "'Bebas Neue',sans-serif" }}>LET'S<br />BUILD<br />TOGETHER</div>
              <p className="text-[13px] font-light text-black/65 leading-[1.8] max-w-xs mb-10">
                Open to full time roles, freelance projects, and interesting collaborations. Response within 24 hours.
              </p>
              <div className="flex flex-col gap-0">
                {CONTACT_LINKS.map((link, i) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex items-center justify-between py-3 border-b border-black/20 hover:border-black transition-colors"
                  >
                    <div>
                      <div className="text-[9px] tracking-[0.2em] text-black/50 mb-0.5" style={{ fontFamily: "'Fragment Mono',monospace" }}>{link.label}</div>
                      <div className="text-[12px] md:text-[13px] text-black font-light tracking-[0.02em] group-hover:font-medium transition-all">{link.value}</div>
                    </div>
                    <span className="text-[18px] text-black/30 group-hover:text-black group-hover:translate-x-1 transition-all">{link.icon}</span>
                  </a>
                ))}
              </div>
            </div>
            <div className="absolute bottom-[-20px] right-[-20px] text-[200px] leading-none text-black/[0.05] pointer-events-none select-none" style={{ fontFamily: "'Bebas Neue',sans-serif" }}>CT</div>
          </div>

          {/* RIGHT — TERMINAL FORM */}
          <div className="ct-fadein-1 p-8 md:p-14 flex flex-col justify-center">
            {!sent ? (
              <>
                <div className="text-[9px] tracking-[0.25em] text-[#f0ce32]/40 mb-6" style={{ fontFamily: "'Fragment Mono',monospace" }}>// SEND A MESSAGE</div>
                <div className="text-[28px] md:text-[36px] text-white tracking-[0.04em] mb-8" style={{ fontFamily: "'Bebas Neue',sans-serif" }}>NEW MESSAGE<span className="cursor-blink text-[#f0ce32]">_</span></div>

                <div className="flex flex-col gap-0">
                  {[
                    { key: 'name', label: 'YOUR NAME', placeholder: 'e.g. Jane Doe', type: 'text' },
                    { key: 'email', label: 'YOUR EMAIL', placeholder: 'e.g. jane@example.com', type: 'email' },
                  ].map(field => (
                    <div
                      key={field.key}
                      className={`border-[3px] border-b-0 p-4 md:p-5 transition-colors ${focused === field.key ? 'border-[#f0ce32] bg-[#f0ce32]/5' : 'border-[#f0ce32]/20'}`}
                    >
                      <div className="text-[9px] tracking-[0.2em] text-[#f0ce32]/50 mb-2" style={{ fontFamily: "'Fragment Mono',monospace" }}>{field.label}</div>
                      <input
                        className="ct-input text-[14px] text-[#f0ce32] font-light tracking-[0.04em]"
                        style={{ fontFamily: "'Lexend',sans-serif" }}
                        type={field.type}
                        placeholder={field.placeholder}
                        value={(form as any)[field.key]}
                        onChange={e => setForm({ ...form, [field.key]: e.target.value })}
                        onFocus={() => setFocused(field.key)}
                        onBlur={() => setFocused(null)}
                      />
                    </div>
                  ))}
                  <div className={`border-[3px] border-b-0 p-4 md:p-5 transition-colors ${focused === 'message' ? 'border-[#f0ce32] bg-[#f0ce32]/5' : 'border-[#f0ce32]/20'}`}>
                    <div className="text-[9px] tracking-[0.2em] text-[#f0ce32]/50 mb-2" style={{ fontFamily: "'Fragment Mono',monospace" }}>MESSAGE</div>
                    <textarea
                      className="ct-input text-[14px] text-[#f0ce32] font-light tracking-[0.04em] resize-none"
                      style={{ fontFamily: "'Lexend',sans-serif" }}
                      rows={4}
                      placeholder="What's on your mind?"
                      value={form.message}
                      onChange={e => setForm({ ...form, message: e.target.value })}
                      onFocus={() => setFocused('message')}
                      onBlur={() => setFocused(null)}
                    />
                  </div>
                  <button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="border-[3px] border-[#f0ce32] bg-[#f0ce32] text-black p-4 md:p-5 text-[16px] tracking-[0.2em] hover:bg-transparent hover:text-[#f0ce32] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{ fontFamily: "'Bebas Neue',sans-serif" }}
                  >
                    {isSubmitting ? 'TRANSMITTING...' : 'TRANSMIT MESSAGE ↗'}
                  </button>

                  {submitStatus === 'error' && (
                    <div className="border-[3px] border-[#f87171]/40 p-3 text-[10px] text-[#f87171]/70 tracking-[0.15em]" style={{ fontFamily: "'Fragment Mono',monospace" }}>
    // ERROR: TRANSMISSION FAILED · TRY AGAIN
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="flex flex-col items-start gap-4">
                <div className="text-[9px] tracking-[0.2em] text-[#f0ce32]/40" style={{ fontFamily: "'Fragment Mono',monospace" }}>// STATUS: 200 OK</div>
                <div className="text-[52px] md:text-[72px] leading-none text-[#f0ce32] tracking-[0.03em]" style={{ fontFamily: "'Bebas Neue',sans-serif" }}>MESSAGE<br />SENT ✓</div>
                <p className="text-[13px] font-light text-white/50 leading-[1.8]">Got it. I'll get back to you within 24 hours.</p>
                <button
                  onClick={() => { setSent(false); setForm({ name: '', email: '', message: '' }); }}
                  className="mt-4 border-[3px] border-[#f0ce32]/40 text-[#f0ce32]/60 px-6 py-3 text-[13px] tracking-[0.15em] hover:border-[#f0ce32] hover:text-[#f0ce32] transition-all"
                  style={{ fontFamily: "'Bebas Neue',sans-serif" }}
                >
                  SEND ANOTHER
                </button>
              </div>
            )}
          </div>
        </div>

       
      </div>
    </>
  );
};

export default ContactPage;