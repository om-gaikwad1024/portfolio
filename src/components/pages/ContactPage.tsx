import React, { useState } from 'react';

export const ContactPage = () => {
  const [hoveredContact, setHoveredContact] = useState<string | null>(null);
  const [activeMethod, setActiveMethod] = useState('all');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const contactMethods = {
    email: {
      title: 'Email',
      icon: '📧',
      color: 'blue',
      value: 'om.gaikwad1024@gmail.com',
      link: 'mailto:om.gaikwad1024@gmail.com',
      description: 'Drop me a line anytime',
      bgPattern: '📧📮✉️'
    },
    phone: {
      title: 'Phone',
      icon: '📞',
      color: 'green',
      value: '+91 6364416762',
      link: 'tel:+916364416762',
      description: 'Call for instant connect',
      bgPattern: '📞☎️📱'
    },
    github: {
      title: 'GitHub',
      icon: '💻',
      color: 'purple',
      value: 'github.com/om-gaikwad1024',
      link: 'https://github.com/om-gaikwad1024',
      description: 'Check out my code',
      bgPattern: '💻⚡🚀'
    },
    linkedin: {
      title: 'LinkedIn',
      icon: '💼',
      color: 'indigo',
      value: 'linkedin.com/in/om-gaikwad1024',
      link: 'https://linkedin.com/in/om-gaikwad1024',
      description: 'Let\'s connect professionally',
      bgPattern: '💼🤝🌟'
    }
  };

  const getColorClasses = (color: string) => {
    const colorMap: Record<string, { gradient: string; text: string; bg: string; border: string }> = {
      blue: {
        gradient: 'from-blue-500/20 to-cyan-500/20',
        text: 'text-blue-400',
        bg: 'bg-blue-500/10',
        border: 'border-blue-500/30'
      },
      green: {
        gradient: 'from-emerald-500/20 to-teal-500/20',
        text: 'text-emerald-400',
        bg: 'bg-emerald-500/10',
        border: 'border-emerald-500/30'
      },
      purple: {
        gradient: 'from-purple-500/20 to-pink-500/20',
        text: 'text-purple-400',
        bg: 'bg-purple-500/10',
        border: 'border-purple-500/30'
      },
      indigo: {
        gradient: 'from-indigo-500/20 to-blue-500/20',
        text: 'text-indigo-400',
        bg: 'bg-indigo-500/10',
        border: 'border-indigo-500/30'
      }
    };
    return colorMap[color];
  };

  const filteredMethods = activeMethod === 'all'
    ? Object.entries(contactMethods)
    : Object.entries(contactMethods).filter(([key]) => key === activeMethod);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="relative bg-slate-800/50 backdrop-blur-sm rounded-2xl shadow-xl border border-slate-700/50 p-8 mb-6 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-indigo-500/5"></div>
          <div className="relative text-center">
            <h1 className="text-4xl font-bold mb-3 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              🌟 Get In Touch
            </h1>
            <p className="text-lg text-slate-400">Let's connect and create something amazing together!</p>
            <div className="flex justify-center mt-4 space-x-2">
              <span className="text-2xl animate-bounce">✨</span>
              <span className="text-2xl animate-bounce" style={{ animationDelay: '0.1s' }}>🚀</span>
              <span className="text-2xl animate-bounce" style={{ animationDelay: '0.2s' }}>💫</span>
            </div>
          </div>
        </div>

        {/* Contact Method Filter */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl shadow-xl border border-slate-700/50 p-6 mb-6">
          <h2 className="text-xl font-semibold text-slate-100 mb-4 text-center">Choose Your Preferred Method</h2>
          <div className="flex flex-wrap justify-center gap-3">
            <button
              onClick={() => setActiveMethod('all')}
              className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 ${activeMethod === 'all'
                ? 'bg-gradient-to-r from-slate-600 to-slate-700 text-slate-100 shadow-lg border border-slate-600'
                : 'bg-slate-700/30 text-slate-300 hover:bg-slate-700/50 border border-slate-600/50'
                }`}
            >
              🌈 All Methods
            </button>
            {Object.entries(contactMethods).map(([key, method]) => {
              const colors = getColorClasses(method.color);
              return (
                <button
                  key={key}
                  onClick={() => setActiveMethod(key)}
                  className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 ${activeMethod === key
                    ? `bg-gradient-to-r ${colors.gradient} border ${colors.border} text-slate-100 shadow-lg`
                    : `bg-slate-700/30 text-slate-300 hover:bg-slate-700/50 border border-slate-600/50`
                    }`}
                >
                  {method.icon} {method.title}
                </button>
              );
            })}
          </div>
        </div>

        {/* Contact Methods */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="space-y-6">
            {filteredMethods.map(([methodKey, method], index) => {
              const colors = getColorClasses(method.color);
              return (
                <div
                  key={methodKey}
                  className={`relative bg-slate-800/50 backdrop-blur-sm rounded-2xl shadow-xl border p-6 transition-all duration-300 cursor-pointer transform hover:scale-105 ${hoveredContact === methodKey
                    ? `${colors.border} bg-gradient-to-br ${colors.gradient} shadow-lg scale-105`
                    : 'border-slate-700/50 hover:border-slate-600/50'
                    }`}
                  onMouseEnter={() => setHoveredContact(methodKey)}
                  onMouseLeave={() => setHoveredContact(null)}
                  onClick={() => window.open(method.link, '_blank')}
                  style={{

                    animation: 'fadeInLeft 0.6s ease-out forwards ${index * 200}ms'
                  }}
                >
                  {/* Background Pattern */}
                  <div className="absolute inset-0 opacity-5 text-6xl overflow-hidden">
                    <div className="absolute -top-4 -right-4 transform rotate-12">
                      {method.bgPattern.split('').map((emoji, i) => (
                        <span key={i} className="inline-block animate-pulse" style={{ animationDelay: `${i * 0.5}s` }}>
                          {emoji}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="relative flex items-center space-x-4">
                    <div className={`bg-gradient-to-br ${colors.gradient} border ${colors.border} p-4 rounded-xl transform transition-transform ${hoveredContact === methodKey ? 'scale-110 rotate-12' : ''
                      }`}>
                      <span className="text-3xl">{method.icon}</span>
                    </div>

                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-slate-100 mb-1">{method.title}</h3>
                      <p className={`text-sm mb-2 transition-colors ${hoveredContact === methodKey ? 'text-slate-300' : 'text-slate-400'
                        }`}>
                        {method.description}
                      </p>
                      <p className="font-mono text-sm font-medium text-slate-200 break-all">
                        {method.value}
                      </p>
                    </div>

                    <div className={`text-2xl text-slate-400 transform transition-transform ${hoveredContact === methodKey ? 'translate-x-2' : ''
                      }`}>
                      →
                    </div>
                  </div>

                  {/* Floating Badge */}
                  {hoveredContact === methodKey && (
                    <div className="absolute -top-2 -right-2 bg-amber-500 text-amber-900 text-xs font-bold px-2 py-1 rounded-full animate-bounce">
                      Click me! ✨
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Contact Form */}
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl shadow-xl border border-slate-700/50 p-7">
            <div className="flex items-center mb-6">
              <div className="bg-gradient-to-br from-pink-500/20 to-red-500/20 border border-pink-500/30 p-3 rounded-xl mr-4">
                <span className="text-3xl">✉️</span>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-slate-100">Send a Message</h2>
                <p className="text-slate-400">Quick way to reach out directly</p>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-xl text-slate-200 placeholder-slate-500 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
                  placeholder="What should I call you?"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Your Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-xl text-slate-200 placeholder-slate-500 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Your Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-xl text-slate-200 placeholder-slate-500 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all resize-none"
                  placeholder="Tell me about your project, ideas, or just say hello!"
                />
              </div>

              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold py-3 px-6 rounded-xl hover:from-blue-600 hover:to-purple-700 transform hover:scale-105 transition-all shadow-lg hover:shadow-blue-500/20 border border-blue-400/30 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Sending... ⏳' : 'Send Message 🚀'}
              </button>

              {submitStatus === 'success' && (
                <p className="text-green-400 text-sm mt-2">✅ Message sent successfully!</p>
              )}
              {submitStatus === 'error' && (
                <p className="text-red-400 text-sm mt-2">❌ Failed to send. Please try again.</p>
              )}
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl shadow-xl border border-slate-700/50 p-8 mb-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-slate-100 mb-2">🤝 Let's Connect</h2>
            <p className="text-slate-400 mb-8">Choose your preferred way to reach out</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {Object.entries(contactMethods).map(([key, method]) => {
                const colors = getColorClasses(method.color);
                return (
                  <div
                    key={key}
                    className="text-center cursor-pointer group"
                    onClick={() => window.open(method.link, '_blank')}
                  >
                    <div className={`bg-gradient-to-br ${colors.gradient} border ${colors.border} group-hover:scale-110 rounded-xl w-16 h-16 flex items-center justify-center mx-auto mb-3 transition-all shadow-sm group-hover:shadow-md`}>
                      <span className="text-2xl">{method.icon}</span>
                    </div>
                    <p className="font-semibold text-sm text-slate-200 group-hover:text-slate-100">{method.title}</p>
                    <p className="text-xs text-slate-500 mt-1">{method.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Fun Call to Action */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl shadow-xl border border-slate-700/50 p-8 text-center">
          <h2 className="text-2xl font-bold text-slate-100 mb-4">Ready to Start a Conversation? 💬</h2>
          <p className="text-slate-400 mb-6">
            Whether you have a project in mind, want to collaborate, or just want to say hi - I'd love to hear from you!
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => window.open('mailto:om.gaikwad1024@gmail.com', '_blank')}
              className="bg-gradient-to-r from-slate-600 to-slate-700 hover:from-slate-700 hover:to-slate-800 text-white font-semibold py-3 px-6 rounded-xl transform hover:scale-105 transition-all shadow-lg border border-slate-600"
            >
              Email Me 📧
            </button>
            <button
              onClick={() => window.open('https://linkedin.com/in/om-gaikwad1024', '_blank')}
              className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-3 px-6 rounded-xl transform hover:scale-105 transition-all shadow-lg border border-blue-400/30"
            >
              Connect on LinkedIn 💼
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  );
};