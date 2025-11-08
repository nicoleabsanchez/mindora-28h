import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Sparkles, Heart, Zap, Shield, Moon, Sun, Send, Settings, Check, Clock, AlertCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { MindoAvatar } from './mindo-avatar';
import { BackButton } from './ui/breadcrumb-nav';

interface MindfulChatProps {
  onBack?: () => void;
}

interface Message {
  id: string;
  text: string;
  sender: 'me' | 'them';
  timestamp: string;
}

type ChatView = 'chat' | 'settings' | 'timeUp' | 'extension' | 'finalTimeUp' | 'cooldown';

const TIME_LIMITS = [
  { value: 5, label: '5 minutos' },
  { value: 10, label: '10 minutos' },
  { value: 15, label: '15 minutos', recommended: true },
  { value: 20, label: '20 minutos' },
  { value: 30, label: '30 minutos' },
  { value: 0, label: 'Sin límite' }
];

// Development mode configuration
const DEV_MODE_MULTIPLIER = 60; // 1 minute = 1 second

export function MindfulChat({ onBack }: MindfulChatProps) {
  const [currentView, setCurrentView] = useState<ChatView>('chat');
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', text: 'Hola! 👋', sender: 'them', timestamp: '10:23 AM' },
    { id: '2', text: 'Hola! Me alegra conectar', sender: 'me', timestamp: '10:24 AM' }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [timeLimit, setTimeLimit] = useState(15); // minutes
  const [selectedTimeLimit, setSelectedTimeLimit] = useState(15);
  const [elapsedTime, setElapsedTime] = useState(0); // seconds
  const [showWarning, setShowWarning] = useState(false);
  const [hasExtended, setHasExtended] = useState(false);
  const [cooldownRemaining, setCooldownRemaining] = useState(7020); // 1h 57min in seconds
  const [devMode, setDevMode] = useState(false);

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      window.location.hash = '';
    }
  };

  // Timer effect with dev mode support
  useEffect(() => {
    if (currentView !== 'chat' || timeLimit === 0) return;

    const interval = setInterval(() => {
      setElapsedTime(prev => {
        const increment = devMode ? DEV_MODE_MULTIPLIER : 1;
        const newTime = prev + increment;
        const remaining = (timeLimit * 60) - newTime;

        // Show warning at 2 minutes (or 2 seconds in dev mode)
        const warningThreshold = devMode ? 4 : 120;
        if (remaining <= warningThreshold && remaining > (warningThreshold - increment) && !showWarning) {
          setShowWarning(true);
          setTimeout(() => setShowWarning(false), 5000);
        }

        // Time's up
        if (remaining <= 0) {
          if (hasExtended) {
            setCurrentView('finalTimeUp');
          } else {
            setCurrentView('timeUp');
          }
          return newTime;
        }

        return newTime;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [currentView, timeLimit, showWarning, hasExtended, devMode]);

  // Cooldown timer
  useEffect(() => {
    if (currentView !== 'cooldown') return;

    const interval = setInterval(() => {
      setCooldownRemaining(prev => Math.max(0, prev - 1));
    }, 1000);

    return () => clearInterval(interval);
  }, [currentView]);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    
    const msg: Message = {
      id: Date.now().toString(),
      text: newMessage,
      sender: 'me',
      timestamp: new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })
    };
    
    setMessages([...messages, msg]);
    setNewMessage('');
  };

  const handleSaveTimeLimit = () => {
    setTimeLimit(selectedTimeLimit);
    setElapsedTime(0);
    setCurrentView('chat');
  };

  const handleExtendTime = () => {
    setTimeLimit(prev => prev + 5);
    setHasExtended(true);
    setCurrentView('extension');
    setTimeout(() => setCurrentView('chat'), 3000);
  };

  const handleGoToGarden = () => {
    // Navigate to garden
    window.location.hash = 'jardin';
  };

  const elapsedMinutes = Math.floor(elapsedTime / 60);
  const totalMinutes = timeLimit;
  const remainingSeconds = (timeLimit * 60) - elapsedTime;
  const remainingMinutes = Math.floor(remainingSeconds / 60);

  const getTimerColor = () => {
    if (remainingMinutes >= 11) return '#2ECC71';
    if (remainingMinutes >= 6) return '#F1C40F';
    if (remainingMinutes >= 1) return '#E67E22';
    return '#E74C3C';
  };

  const formatCooldownTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    return `${hours}h ${mins}min`;
  };

  const pendingTasks = [
    { icon: '📚', task: 'Estudiar Física', duration: '2h' },
    { icon: '🏃', task: 'Salir a correr', duration: '30min' },
    { icon: '🎨', task: 'Dibujar', duration: '30min' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-950 to-blue-950">
      <AnimatePresence mode="wait">
        {/* MAIN CHAT VIEW */}
        {currentView === 'chat' && (
          <motion.div
            key="chat"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen flex flex-col"
          >
            {/* Header with Timer */}
            <div className="bg-[#1A1F3A] border-b border-[#2D3454]">
              <div className="max-w-md mx-auto p-4">
                <div className="flex items-center gap-3 mb-2">
                  <BackButton onClick={handleBack} label="" />
                  <div className="w-8 h-8 rounded-full bg-blue-400 flex items-center justify-center text-lg">
                    💙
                  </div>
                  <h3 className="text-white flex-1">Aura Azul</h3>
                  <button
                    onClick={() => setCurrentView('settings')}
                    className="text-white/70 hover:text-white"
                  >
                    <Settings className="w-5 h-5" />
                  </button>
                </div>

                {/* Timer Bar */}
                {timeLimit > 0 && (
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-xs text-white/60">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {elapsedMinutes}/{totalMinutes} min
                      </span>
                    </div>
                    <div className="h-1 bg-[#252B47] rounded-full overflow-hidden">
                      <motion.div
                        className="h-full"
                        style={{
                          width: `${(elapsedTime / (timeLimit * 60)) * 100}%`,
                          backgroundColor: getTimerColor()
                        }}
                        animate={remainingMinutes < 1 ? {
                          opacity: [1, 0.6, 1]
                        } : undefined}
                        transition={{
                          duration: 0.8,
                          repeat: Infinity,
                          ease: 'easeInOut'
                        }}
                      />
                    </div>
                  </div>
                )}

                {/* Verification Badge */}
                <div className="bg-[#252B47] border border-green-500/50 rounded-lg p-2.5 mt-3">
                  <div className="flex items-center gap-2 text-green-400 text-xs">
                    <Check className="w-3.5 h-3.5" />
                    <span>🤝 Conexión verificada</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Warning Banner */}
            <AnimatePresence>
              {showWarning && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="bg-[#F1C40F]/15 border-b border-[#F1C40F]"
                >
                  <div className="max-w-md mx-auto p-3">
                    <div className="flex items-center gap-2 text-[#F1C40F]">
                      <AlertCircle className="w-4 h-4" />
                      <div className="text-sm">
                        <p className="font-medium">⏰ Quedan 2 minutos</p>
                        <p className="text-xs text-[#F1C40F]/80">Comienza a despedirte</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4">
              <div className="max-w-md mx-auto space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[75%] rounded-2xl p-3 ${
                        message.sender === 'me'
                          ? 'bg-gradient-to-r from-[#6C5CE7] to-[#A29BFE] rounded-tr-sm'
                          : 'bg-[#252B47] rounded-tl-sm'
                      }`}
                    >
                      <p className="text-white text-sm mb-1">{message.text}</p>
                      <p className={`text-xs ${
                        message.sender === 'me' ? 'text-white/80' : 'text-white/50'
                      }`}>
                        {message.timestamp}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Input - REDUCED SIZE */}
            <div className="bg-[#1A1F3A] border-t border-[#2D3454] p-3">
              <div className="max-w-md mx-auto flex items-center gap-2">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Escribe un mensaje..."
                  className="flex-1 bg-[#252B47] border border-[#3D4463] rounded-full px-4 py-2.5 text-sm text-white placeholder-white/50 focus:outline-none focus:border-[#6C5CE7] h-11"
                />
                <button className="text-xl">😊</button>
                <Button
                  onClick={handleSendMessage}
                  disabled={!newMessage.trim()}
                  size="icon"
                  className="rounded-full bg-[#6C5CE7] hover:bg-[#5B4DD6] disabled:opacity-50 h-11 w-11"
                >
                  <svg width="18" height="18" viewBox="0 0 20 20" fill="none" className="text-white">
                    <path d="M2 10L18 2L10 18L8 11L2 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </Button>
              </div>
            </div>
          </motion.div>
        )}

        {/* SETTINGS MODAL */}
        {currentView === 'settings' && (
          <motion.div
            key="settings"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen flex items-center justify-center p-6"
          >
            <Card className="bg-[#1A1F3A] border-[#6C5CE7] p-5 max-w-sm w-full">
              <h2 className="text-white text-xl mb-4">Configuración de Chat</h2>
              
              <div className="mb-4">
                <div className="flex items-center gap-2 mb-3">
                  <Clock className="w-5 h-5 text-[#6C5CE7]" />
                  <h3 className="text-white">⏱️ Tiempo de conversación</h3>
                </div>
                <p className="text-white/70 text-sm mb-4">
                  Establece un límite saludable para esta sesión:
                </p>
              </div>

              <div className="space-y-2 mb-6">
                {TIME_LIMITS.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setSelectedTimeLimit(option.value)}
                    className={`w-full flex items-center justify-between p-3 rounded-lg border transition-all ${
                      selectedTimeLimit === option.value
                        ? 'bg-[#6C5CE7]/20 border-[#6C5CE7]'
                        : 'bg-white/5 border-white/10 hover:bg-white/10'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        selectedTimeLimit === option.value
                          ? 'border-[#6C5CE7] bg-[#6C5CE7]'
                          : 'border-[#3D4463]'
                      }`}>
                        {selectedTimeLimit === option.value && (
                          <div className="w-2 h-2 rounded-full bg-white" />
                        )}
                      </div>
                      <span className="text-white text-sm">{option.label}</span>
                    </div>
                    {option.recommended && (
                      <span className="bg-[#6C5CE7]/20 text-[#6C5CE7] text-xs px-2 py-1 rounded">
                        recomendado
                      </span>
                    )}
                  </button>
                ))}
              </div>

              <div className="bg-white/5 border border-white/10 rounded-lg p-3 mb-6">
                <p className="text-white/70 text-xs text-center">
                  ✨ Te avisaremos cuando sea momento de descansar
                </p>
              </div>

              {/* Developer Mode Toggle */}
              <div className="bg-[#E67E22]/10 border border-dashed border-[#E67E22] rounded-lg p-3 mb-6">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">🔧</span>
                    <h4 className="text-white text-sm font-semibold">MODO DESARROLLO</h4>
                  </div>
                  <button
                    onClick={() => setDevMode(!devMode)}
                    className={`w-12 h-6 rounded-full transition-colors ${
                      devMode ? 'bg-[#E67E22]' : 'bg-white/20'
                    } relative`}
                  >
                    <div className={`w-5 h-5 rounded-full bg-white absolute top-0.5 transition-transform ${
                      devMode ? 'translate-x-6' : 'translate-x-0.5'
                    }`} />
                  </button>
                </div>
                <p className="text-[#E67E22] text-xs">
                  {devMode ? '✅' : '☐'} Acelerar animaciones<br />
                  <span className="text-white/60">(5 min = {Math.floor(5 * 60 / DEV_MODE_MULTIPLIER)} segundos)</span>
                </p>
                <p className="text-[#E67E22] text-xs mt-2">
                  ⚠️ Solo para testing - no usar en producción
                </p>
              </div>

              <div className="flex gap-3">
                <Button
                  onClick={handleSaveTimeLimit}
                  className="flex-1 bg-[#6C5CE7] hover:bg-[#5B4DD6] h-11"
                >
                  Guardar
                </Button>
                <Button
                  onClick={() => setCurrentView('chat')}
                  variant="outline"
                  className="flex-1 border-white/20 text-white hover:bg-white/10 h-11"
                >
                  Cancelar
                </Button>
              </div>
            </Card>
          </motion.div>
        )}

        {/* TIME'S UP - AVATAR TAKEOVER */}
        {currentView === 'timeUp' && (
          <motion.div
            key="timeUp"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen flex items-center justify-center p-6 relative"
          >
            {/* Blurred chat background */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#0A0E27] to-[#1A1F3A] opacity-98" />
            
            <div className="relative z-10 max-w-md w-full text-center">
              <MindoAvatar emotion="neutral" size="large" />

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-8 space-y-6"
              >
                <h2 className="text-white text-2xl">¡Tiempo cumplido!</h2>
                
                <p className="text-white/80 text-sm">
                  Has chateado <span className="text-[#6C5CE7] font-semibold">{timeLimit} minutos</span>
                </p>

                <div className="bg-[#252B47]/50 border border-[#3D4463] rounded-lg p-4">
                  <h3 className="text-[#F1C40F] text-sm font-semibold mb-3">Es momento de:</h3>
                  <div className="space-y-2 text-white text-sm text-left">
                    <div className="flex items-start gap-2">
                      <span>✨</span>
                      <span>Procesar lo conversado</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span>🌍</span>
                      <span>Volver a tu vida real</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span>🌸</span>
                      <span>Cuidar otras áreas</span>
                    </div>
                  </div>
                </div>

                <div className="bg-[#252B47]/50 border border-[#3D4463] rounded-xl p-3.5">
                  <h4 className="text-white text-sm font-semibold mb-3">Tareas pendientes hoy:</h4>
                  <div className="space-y-2">
                    {pendingTasks.map((task, i) => (
                      <div key={i} className="flex items-center justify-between text-white/90 text-sm">
                        <div className="flex items-center gap-2">
                          <span className="text-lg">{task.icon}</span>
                          <span>{task.task}</span>
                        </div>
                        <span className="text-white/60 text-xs">{task.duration}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-3 pt-2">
                  <Button
                    onClick={handleGoToGarden}
                    className="w-full h-12 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
                  >
                    Ir a Mi Jardín
                  </Button>
                  <Button
                    onClick={handleExtendTime}
                    variant="outline"
                    className="w-full h-10 bg-transparent border border-[#6C5CE7] text-[#6C5CE7] hover:bg-[#6C5CE7]/10"
                  >
                    Extender 5 min más
                  </Button>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}

        {/* EXTENSION GRANTED */}
        {currentView === 'extension' && (
          <motion.div
            key="extension"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="min-h-screen flex items-center justify-center p-6"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-[#0A0E27] to-[#1A1F3A] opacity-98" />
            
            <div className="relative z-10 max-w-md w-full text-center">
              <MindoAvatar emotion="neutral" size="medium" />

              <div className="mt-8 space-y-6">
                <h2 className="text-white text-2xl">⏰ +5 minutos</h2>
                
                <p className="text-white/80 text-sm">
                  Usa este tiempo para<br />despedirte bien 💙
                </p>

                <p className="text-white/70 text-sm">
                  Después de esto, te<br />recomendaremos descansar.
                </p>

                <div className="bg-[#E67E22]/15 border border-[#E67E22] rounded-lg p-3">
                  <div className="flex items-start gap-2 text-[#E67E22] text-sm">
                    <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <div className="text-left">
                      <p className="font-semibold">⚠️ Última extensión</p>
                      <p className="text-xs mt-1">No podrás extender más</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* FINAL TIME UP (After Extension) */}
        {currentView === 'finalTimeUp' && (
          <motion.div
            key="finalTimeUp"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen flex items-center justify-center p-6"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-[#0A0E27] to-[#1A1F3A] opacity-98" />
            
            <div className="relative z-10 max-w-md w-full text-center">
              <MindoAvatar emotion="happy" size="large" />

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-8 space-y-6"
              >
                <h2 className="text-white text-2xl">¡Excelente conversación!</h2>
                
                <p className="text-white/80 text-sm">
                  Has chateado <span className="text-[#6C5CE7] font-semibold">20 minutos</span><br />
                  <span className="text-white/60 text-xs">(15 min + 5 min extra)</span>
                </p>

                <p className="text-white/70 text-sm">
                  💙 Aura Azul seguirá aquí<br />cuando regreses.
                </p>

                <div className="bg-[#252B47]/50 border border-[#3D4463] rounded-lg p-4">
                  <h3 className="text-[#F1C40F] text-sm font-semibold mb-3">Ahora es momento de:</h3>
                  <div className="space-y-2 text-white text-sm text-left">
                    <div className="flex items-start gap-2">
                      <span>🌍</span>
                      <span>Vivir tu vida real</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span>🌸</span>
                      <span>Cuidar tu jardín</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span>✨</span>
                      <span>Procesar esta conexión</span>
                    </div>
                  </div>
                </div>

                <div className="bg-[#252B47]/50 border border-[#3D4463] rounded-xl p-3.5">
                  <h4 className="text-white text-sm font-semibold mb-3">Tareas pendientes:</h4>
                  <div className="space-y-2">
                    {pendingTasks.map((task, i) => (
                      <div key={i} className="flex items-center justify-between text-white/90 text-sm">
                        <div className="flex items-center gap-2">
                          <span className="text-lg">{task.icon}</span>
                          <span>{task.task}</span>
                        </div>
                        <span className="text-white/60 text-xs">({task.duration})</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-3 pt-2">
                  <Button
                    onClick={handleGoToGarden}
                    className="w-full h-12 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
                  >
                    Ir a Mi Jardín
                  </Button>
                  <Button
                    onClick={handleBack}
                    variant="outline"
                    className="w-full h-10 bg-transparent border border-white/20 text-white hover:bg-white/10"
                  >
                    Volver a Auras
                  </Button>
                </div>

                <div className="bg-[#252B47] border border-[#6C5CE7] rounded-lg p-2.5 mt-4">
                  <div className="flex items-center justify-center gap-2 text-[#6C5CE7] text-xs">
                    <Clock className="w-4 h-4" />
                    <span>⏱️ Próximo chat disponible en 2 horas</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}

        {/* COOLDOWN SCREEN */}
        {currentView === 'cooldown' && (
          <motion.div
            key="cooldown"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen flex items-center justify-center p-6"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-[#0A0E27] to-[#1A1F3A] opacity-98" />
            
            <Card className="relative z-10 bg-[#1A1F3A]/95 backdrop-blur-xl border-white/20 p-6 max-w-md w-full text-center">
              <div className="absolute top-4 left-4">
                <BackButton onClick={handleBack} label="" />
              </div>

              <div className="mt-2">
                <div className="w-8 h-8 rounded-full bg-blue-400 mx-auto mb-4 flex items-center justify-center text-lg">
                  💙
                </div>
                <h3 className="text-white mb-6">Aura Azul</h3>
              </div>

              <MindoAvatar emotion="calm" size="small" animate={false} />

              <div className="mt-6 space-y-6">
                <h2 className="text-white text-xl">Tiempo de descanso</h2>
                
                <p className="text-white/70 text-sm">
                  Ya chateaste 20 minutos con<br />💙 Aura Azul hoy.
                </p>

                <div>
                  <p className="text-white/60 text-sm mb-3">
                    Podrás volver a chatear en:
                  </p>
                  <div className="text-[#6C5CE7] text-3xl font-bold">
                    ⏱️ {formatCooldownTime(cooldownRemaining)}
                  </div>
                </div>

                <div className="bg-[#252B47]/50 border border-[#3D4463] rounded-lg p-4 text-left">
                  <h4 className="text-white text-sm font-semibold mb-3">Mientras tanto:</h4>
                  <div className="space-y-2 text-white/80 text-sm">
                    <div className="flex items-start gap-2">
                      <span>•</span>
                      <span>Explora otras auras</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span>•</span>
                      <span>Trabaja en tu jardín</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span>•</span>
                      <span>Haz un hobby real</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <Button
                    onClick={() => window.location.hash = 'aura'}
                    className="w-full h-11 bg-[#6C5CE7] hover:bg-[#5B4DD6]"
                  >
                    Ver otras auras
                  </Button>
                  <Button
                    onClick={handleGoToGarden}
                    variant="outline"
                    className="w-full h-10 border-white/20 text-white hover:bg-white/10"
                  >
                    Ir a Mi Jardín
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}