import React, { useState } from 'react';
interface SkillsPageProps {
  openContactWindow?: () => void;
}
export const SkillsPage = ({ openContactWindow }: SkillsPageProps) => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  const skillCategories = {
    programming: {
      title: 'Programming Languages',
      icon: '💻',
      color: 'blue',
      skills: [
        { name: 'JavaScript', level: 95, description: 'Modern ES6+ development' },
        { name: 'TypeScript', level: 90, description: 'Type-safe applications' },
        { name: 'Python', level: 85, description: 'Backend & data science' },
        { name: 'C++', level: 80, description: 'system-level and performance' },
        { name: 'Golang', level: 80, description: 'efficient server-side applications.' },
        { name: 'SQL', level: 80, description: 'Database management' },
        { name: 'HTML/CSS', level: 95, description: 'Semantic & responsive' }
      ]
    },
    frontend: {
      title: 'Frontend Development',
      icon: '🎨',
      color: 'purple',
      skills: [
        { name: 'React', level: 95, description: 'Component-based architecture' },
        { name: 'SharePoint Framework', level: 85, description: 'Enterprise solutions' },
        { name: 'Bootstrap', level: 90, description: 'Responsive frameworks' },
        { name: 'Tailwind CSS', level: 88, description: 'Utility-first styling' },
        { name: 'Fluent Design', level: 82, description: 'Microsoft design system' }
      ]
    },
    backend: {
      title: 'Backend Development',
      icon: '⚙️',
      color: 'green',
      skills: [
        { name: 'Flask', level: 85, description: 'Lightweight Python web framework' },
        { name: 'Django', level: 80, description: 'Full-featured Python framework' },
        { name: 'Spring Boot', level: 82, description: 'Enterprise Java applications' },
        { name: 'REST APIs', level: 90, description: 'RESTful service design' },
        { name: 'JWT Auth', level: 85, description: 'Secure authentication' }
      ]
    },
    database: {
      title: 'Databases & Tools',
      icon: '🛠️',
      color: 'orange',
      skills: [
        { name: 'MongoDB', level: 85, description: 'NoSQL database' },
        { name: 'SQLite', level: 80, description: 'Lightweight SQL database' },
        { name: 'Firebase', level: 82, description: 'Real-time database' },
        { name: 'Git/GitHub', level: 95, description: 'Version control' },
        { name: 'VS Code', level: 90, description: 'Development environment' }
      ]
    },
    ml: {
      title: 'Data Science & ML',
      icon: '🤖',
      color: 'red',
      skills: [
        { name: 'Reinforcement Learning', level: 78, description: 'PPO algorithms' },
        { name: 'Pandas', level: 85, description: 'Data manipulation' },
        { name: 'NumPy', level: 82, description: 'Numerical computing' },
        { name: 'Matplotlib', level: 80, description: 'Data visualization' },
        { name: 'Jupyter', level: 85, description: 'Interactive notebooks' }
      ]
    },
    design: {
      title: 'Design & Development',
      icon: '🎯',
      color: 'indigo',
      skills: [
        { name: 'Figma', level: 85, description: 'UI/UX design' },
        { name: 'Canva', level: 80, description: 'Graphic design' },
        { name: 'Unix Shell', level: 88, description: 'Command line expertise' },
        { name: 'WebSocket', level: 82, description: 'Real-time communication' },
        { name: 'ViZDoom', level: 75, description: 'Game-based AI research' }
      ]
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
      purple: { 
        gradient: 'from-purple-500/20 to-pink-500/20',
        text: 'text-purple-400',
        bg: 'bg-purple-500/10',
        border: 'border-purple-500/30'
      },
      green: { 
        gradient: 'from-emerald-500/20 to-teal-500/20',
        text: 'text-emerald-400',
        bg: 'bg-emerald-500/10',
        border: 'border-emerald-500/30'
      },
      orange: { 
        gradient: 'from-orange-500/20 to-amber-500/20',
        text: 'text-orange-400',
        bg: 'bg-orange-500/10',
        border: 'border-orange-500/30'
      },
      red: { 
        gradient: 'from-red-500/20 to-pink-500/20',
        text: 'text-red-400',
        bg: 'bg-red-500/10',
        border: 'border-red-500/30'
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

  const filteredCategories = activeCategory === 'all' 
    ? Object.entries(skillCategories)
    : Object.entries(skillCategories).filter(([key]) => key === activeCategory);

  return (
    <div className="min-h-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl shadow-xl border border-slate-700/50 p-8 mb-6">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-3 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Technical Skills
            </h1>
            <p className="text-lg text-slate-400">A comprehensive showcase of my technical expertise and proficiencies</p>
          </div>
        </div>

        {/* Category Filter */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl shadow-xl border border-slate-700/50 p-6 mb-6">
          <h2 className="text-xl font-semibold text-slate-100 mb-4 text-center">Filter by Category</h2>
          <div className="flex flex-wrap justify-center gap-3">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                activeCategory === 'all' 
                  ? 'bg-gradient-to-r from-slate-600 to-slate-700 text-slate-100 shadow-lg border border-slate-600' 
                  : 'bg-slate-700/30 text-slate-300 hover:bg-slate-700/50 border border-slate-600/50'
              }`}
            >
              🌟 All Skills
            </button>
            {Object.entries(skillCategories).map(([key, category]) => {
              const colors = getColorClasses(category.color);
              return (
                <button
                  key={key}
                  onClick={() => setActiveCategory(key)}
                  className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                    activeCategory === key 
                      ? `bg-gradient-to-r ${colors.gradient} border ${colors.border} text-slate-100 shadow-lg` 
                      : `bg-slate-700/30 text-slate-300 hover:bg-slate-700/50 border border-slate-600/50`
                  }`}
                >
                  {category.icon} {category.title}
                </button>
              );
            })}
          </div>
        </div>

        {/* Skills Categories */}
        <div className="space-y-8">
          {filteredCategories.map(([categoryKey, category]) => {
            const colors = getColorClasses(category.color);
            return (
              <div key={categoryKey} className="bg-slate-800/50 backdrop-blur-sm rounded-2xl shadow-xl border border-slate-700/50 p-8 animate-fadeIn">
                <div className="flex items-center mb-6">
                  <div className={`bg-gradient-to-br ${colors.gradient} border ${colors.border} p-3 rounded-xl mr-4`}>
                    <span className="text-2xl">{category.icon}</span>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-slate-100">{category.title}</h2>
                    <p className="text-slate-400">Hover over skills to see details</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {category.skills.map((skill, index) => (
                    <div
                      key={skill.name}
                      className={`relative p-6 rounded-xl border transition-all duration-300 cursor-pointer transform hover:scale-105 ${
                        hoveredSkill === `${categoryKey}-${skill.name}`
                          ? `${colors.border} bg-gradient-to-br ${colors.gradient} shadow-lg shadow-${category.color}-500/10 scale-105`
                          : 'border-slate-700/50 bg-slate-700/30 hover:border-slate-600/50'
                      }`}
                      onMouseEnter={() => setHoveredSkill(`${categoryKey}-${skill.name}`)}
                      onMouseLeave={() => setHoveredSkill(null)}
                      style={{
                        
                        animation: activeCategory !== 'all' ? 'fadeInUp 0.5s ease-out forwards ${index * 100}ms' : 'none'
                      }}
                    >
                      {/* Skill Name */}
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-bold text-slate-100 text-lg">{skill.name}</h3>
                        
                      </div>

                      {/* Description */}
                      <p className={`text-sm mb-4 transition-colors ${
                        hoveredSkill === `${categoryKey}-${skill.name}`
                          ? 'text-slate-300'
                          : 'text-slate-400'
                      }`}>
                        {skill.description}
                      </p>

                      {/* Progress Bar */}
                      <div className="w-full bg-slate-700/50 rounded-full h-2 overflow-hidden">
                        <div 
                          className={`h-full rounded-full transition-all duration-1000 ease-out bg-gradient-to-r ${colors.gradient.replace('/20', '')}`}
                          style={{ 
                            width: hoveredSkill === `${categoryKey}-${skill.name}` ? `${skill.level}%` : '0%',
                            transition: 'width 1s ease-out'
                          }}
                        />
                      </div>

                      {/* Floating Badge */}
                      {hoveredSkill === `${categoryKey}-${skill.name}` && (
                        <div className="absolute -top-2 -right-2 bg-amber-500 text-amber-900 text-xs font-bold px-2 py-1 rounded-full animate-bounce">
                          ✨
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        

        {/* Call to Action */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl shadow-xl border border-slate-700/50 p-8 mt-6 text-center">
          <h2 className="text-2xl font-bold text-slate-100 mb-4">Ready to Build Something Amazing?</h2>
          <p className="text-slate-400 mb-6">
            These skills combine to create powerful, scalable solutions. Let's discuss how I can contribute to your next project!
          </p>
          <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold py-3 px-8 rounded-xl hover:from-blue-600 hover:to-purple-700 shadow-lg hover:shadow-blue-500/20 transition-all border border-blue-400/30"
           onClick={openContactWindow}>
            Let's Connect! 🤝
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out forwards;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};