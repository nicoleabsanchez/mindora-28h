import { useState, useEffect } from 'react';
import { WelcomeScreen } from './components/welcome-screen';
import { DesahogoSection } from './components/desahogo-section';
import { AuraMode } from './components/aura-mode';
import { JardinReal } from './components/jardin-real';
import { ChatVerificationFlow } from './components/chat-verification-flow';
import { TrustUnlockSystem } from './components/trust-unlock-system';
import { MindfulChat } from './components/mindful-chat';
import { MiPerfil } from './components/mi-perfil';
import { Navigation } from './components/navigation';

export type Section = 'welcome' | 'desahogo' | 'aura' | 'jardin' | 'chat' | 'trust' | 'mindfulChat' | 'perfil';

export default function App() {
  const [currentSection, setCurrentSection] = useState<Section>('welcome');

  useEffect(() => {
    // Listen for hash changes to show chat verification
    const handleHashChange = () => {
      if (window.location.hash === '#chat') {
        setCurrentSection('chat');
      } else if (window.location.hash === '#trust') {
        setCurrentSection('trust');
      } else if (window.location.hash === '#mindfulChat') {
        setCurrentSection('mindfulChat');
      } else if (window.location.hash === '#perfil') {
        setCurrentSection('perfil');
      } else if (window.location.hash === '') {
        // When clearing hash, go back to jardin with navigation
        setCurrentSection('jardin');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    // Check initial hash on mount
    handleHashChange();
    
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  if (currentSection === 'welcome') {
    return <WelcomeScreen onEnter={() => setCurrentSection('desahogo')} />;
  }

  if (currentSection === 'chat') {
    return <ChatVerificationFlow onBack={() => setCurrentSection('aura')} />;
  }

  if (currentSection === 'trust') {
    return <TrustUnlockSystem />;
  }

  if (currentSection === 'mindfulChat') {
    return <MindfulChat onBack={() => setCurrentSection('aura')} />;
  }

  if (currentSection === 'perfil') {
    return <MiPerfil onBack={() => setCurrentSection('jardin')} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-green-50">
      <div className="max-w-6xl mx-auto">
        {currentSection === 'desahogo' && <DesahogoSection />}
        {currentSection === 'aura' && <AuraMode />}
        {currentSection === 'jardin' && <JardinReal />}
      </div>
      <Navigation currentSection={currentSection} onSectionChange={setCurrentSection} />
    </div>
  );
}