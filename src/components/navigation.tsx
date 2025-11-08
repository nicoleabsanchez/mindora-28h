import { motion } from 'motion/react';
import { Heart, Sparkles, Sprout, User } from 'lucide-react';
import type { Section } from '../App';

interface NavigationProps {
  currentSection: Section;
  onSectionChange: (section: Section) => void;
}

export function Navigation({ currentSection, onSectionChange }: NavigationProps) {
  const navItems = [
    { id: 'desahogo' as Section, icon: Heart, label: 'Desahogo' },
    { id: 'aura' as Section, icon: Sparkles, label: 'Aura' },
    { id: 'jardin' as Section, icon: Sprout, label: 'Jardín' },
    { id: 'perfil' as Section, icon: User, label: 'Perfil' }
  ];

  return (
    <motion.nav
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      className="fixed bottom-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-t border-purple-200"
    >
      <div className="max-w-md mx-auto px-6 py-4">
        <div className="flex items-center justify-around">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentSection === item.id;

            return (
              <button
                key={item.id}
                onClick={() => onSectionChange(item.id)}
                className="relative flex flex-col items-center gap-1 transition-all"
              >
                <div
                  className={`p-3 rounded-2xl transition-all ${
                    isActive
                      ? 'bg-gradient-to-br from-purple-500 to-green-500'
                      : 'bg-transparent'
                  }`}
                >
                  <Icon
                    className={`w-6 h-6 transition-colors ${
                      isActive ? 'text-white' : 'text-purple-600'
                    }`}
                  />
                </div>
                <span
                  className={`text-xs transition-colors ${
                    isActive ? 'text-purple-900' : 'text-purple-600'
                  }`}
                >
                  {item.label}
                </span>
                {isActive && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute -bottom-4 left-1/2 w-1 h-1 bg-purple-500 rounded-full"
                    style={{ x: '-50%' }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </motion.nav>
  );
}