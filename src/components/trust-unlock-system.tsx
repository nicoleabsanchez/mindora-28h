import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Lock, Camera, Check, Loader2, AlertCircle, MessageCircle, Clock, Users } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';

type TrustStep = 
  | 'unlockNotification'
  | 'profileUnlocked'
  | 'securityVerification'
  | 'selfieCapture'
  | 'processing'
  | 'success'
  | 'chat';

interface TrustProgress {
  sessions: number;
  minutesTogether: number;
  interactions: number;
  unlocked: boolean;
  lastSeen: string;
}

interface Message {
  id: string;
  text: string;
  sender: 'me' | 'them';
  timestamp: string;
}

export function TrustUnlockSystem() {
  const [currentStep, setCurrentStep] = useState<TrustStep>('unlockNotification');
  const [progress, setProgress] = useState(0);
  const [faceDetected, setFaceDetected] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', text: 'Hola! 👋', sender: 'them', timestamp: '10:23 AM' }
  ]);
  const [newMessage, setNewMessage] = useState('');

  // Mock trust data
  const trustData: TrustProgress = {
    sessions: 3,
    minutesTogether: 47,
    interactions: 4,
    unlocked: true,
    lastSeen: 'Hace 10 min'
  };

  const handleStartVerification = () => {
    setCurrentStep('selfieCapture');
  };

  const handleCaptureSelfie = () => {
    setCurrentStep('processing');
    setProgress(0);
    
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setCurrentStep('success'), 500);
          return 100;
        }
        return prev + 5;
      });
    }, 80);
  };

  const handleGoToChat = () => {
    window.location.hash = 'mindfulChat';
  };

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

  const getTrustProgressColor = (current: number, required: number) => {
    const percentage = (current / required) * 100;
    if (percentage < 50) return '#E67E22'; // orange
    if (percentage < 100) return '#F1C40F'; // yellow
    return '#2ECC71'; // green
  };

  const getSessionDots = (sessions: number) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3].map((n) => (
          <div
            key={n}
            className={`w-3 h-3 rounded-full ${
              n <= sessions ? 'bg-[#6C5CE7]' : 'bg-[#3D4463]'
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-950 to-blue-950 p-6">
      <AnimatePresence mode="wait">
        {/* Unlock Notification */}
        {currentStep === 'unlockNotification' && (
          <motion.div
            key="notification"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.8, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              className="w-full max-w-sm"
            >
              <Card className="bg-[#1A1F3A] border-2 border-[#6C5CE7] p-8 text-center shadow-2xl shadow-purple-500/40">
                <motion.div
                  animate={{
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut'
                  }}
                  className="text-6xl mb-6"
                >
                  ✨
                </motion.div>

                <h2 className="text-white text-2xl mb-4">¡Conexión desbloqueada!</h2>
                
                <p className="text-white/70 text-sm mb-2">
                  Has compartido tiempo suficiente con
                </p>
                <div className="flex items-center justify-center gap-2 mb-6">
                  <div className="w-10 h-10 rounded-full bg-blue-400 flex items-center justify-center text-xl">
                    💙
                  </div>
                  <span className="text-white">Aura Azul</span>
                </div>

                <p className="text-white/70 text-sm mb-8">
                  Ahora puedes iniciar una conversación privada.
                </p>

                <Button
                  onClick={() => setCurrentStep('profileUnlocked')}
                  className="w-full h-12 bg-gradient-to-r from-[#6C5CE7] to-[#A29BFE] hover:from-[#5B4DD6] hover:to-[#9188ED]"
                >
                  Ver perfil
                </Button>
              </Card>
            </motion.div>
          </motion.div>
        )}

        {/* Profile with Chat Unlocked */}
        {currentStep === 'profileUnlocked' && (
          <motion.div
            key="profileUnlocked"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="min-h-screen"
          >
            <div className="max-w-md mx-auto">
              <button
                onClick={() => window.history.back()}
                className="flex items-center gap-2 text-white/70 hover:text-white mb-6"
              >
                <ArrowLeft className="w-4 h-4" />
                Volver
              </button>

              <Card className="bg-[#1A1F3A]/95 backdrop-blur-xl border-white/20 p-6 shadow-2xl">
                <div className="text-center mb-6">
                  <div className="w-20 h-20 rounded-full bg-blue-400 mx-auto mb-4 shadow-2xl flex items-center justify-center text-3xl">
                    💙
                  </div>
                  <h3 className="text-white mb-1">Aura Azul</h3>
                </div>

                <div className="mb-6">
                  <h4 className="text-white/70 text-sm mb-2">Actividad actual:</h4>
                  <div className="bg-white/10 rounded-lg p-3 border border-white/10">
                    <p className="text-white">📚 Estudiando Física</p>
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="text-white/70 text-sm mb-3">Intereses compartidos:</h4>
                  <div className="space-y-2">
                    <div className="bg-white/5 rounded-lg p-2 border border-white/10 text-white/90 text-sm">
                      🎸 Toca guitarra
                    </div>
                    <div className="bg-white/5 rounded-lg p-2 border border-white/10 text-white/90 text-sm">
                      🏃 Corre
                    </div>
                    <div className="bg-white/5 rounded-lg p-2 border border-white/10 text-white/90 text-sm">
                      📖 Lee ciencia ficción
                    </div>
                  </div>
                </div>

                {/* Trust Progress - Completed */}
                <div className="mb-6">
                  <div className="bg-[#252B47] border border-green-500/50 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-4">
                      <Check className="w-5 h-5 text-green-400" />
                      <h4 className="text-white">Conexión establecida</h4>
                    </div>
                    
                    <div className="space-y-3 text-sm">
                      <div className="flex items-center justify-between text-white/80">
                        <div className="flex items-center gap-2">
                          {getSessionDots(trustData.sessions)}
                          <span>{trustData.sessions} sesiones juntos</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2 text-white/80">
                        <Clock className="w-4 h-4" />
                        <span>{trustData.minutesTogether} minutos compartidos</span>
                      </div>
                      
                      <div className="flex items-center gap-2 text-white/80">
                        <Users className="w-4 h-4" />
                        <span>{trustData.interactions} interacciones</span>
                      </div>

                      <div className="pt-2 border-t border-white/10">
                        <p className="text-white/60 text-xs">
                          Última vez: {trustData.lastSeen}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Iniciar Chat Button */}
                <Button
                  onClick={() => setCurrentStep('securityVerification')}
                  className="w-full h-14 bg-gradient-to-r from-[#6C5CE7] to-[#A29BFE] hover:from-[#5B4DD6] hover:to-[#9188ED] rounded-full shadow-lg text-base mb-3"
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Iniciar chat
                </Button>

                <div className="grid grid-cols-2 gap-3">
                  <Button
                    className="bg-white/10 hover:bg-white/20 text-white border border-white/20"
                  >
                    🤝 Yo también
                  </Button>
                  <Button
                    className="bg-white/10 hover:bg-white/20 text-white border border-white/20"
                  >
                    🌊 Enviar calma
                  </Button>
                </div>

                <Button
                  onClick={() => window.history.back()}
                  variant="ghost"
                  className="w-full mt-4 text-white/60 hover:text-white hover:bg-white/5"
                  size="sm"
                >
                  Cerrar
                </Button>
              </Card>
            </div>
          </motion.div>
        )}

        {/* Security Verification Modal */}
        {currentStep === 'securityVerification' && (
          <motion.div
            key="security"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="w-full max-w-md"
            >
              <Card className="bg-[#1A1F3A] border-[#6C5CE7] p-6">
                <div className="text-center mb-6">
                  <div className="w-14 h-14 bg-[#6C5CE7]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Lock className="w-7 h-7 text-[#6C5CE7]" />
                  </div>
                  <h2 className="text-white text-xl mb-3">Verificación de Seguridad</h2>
                  <p className="text-white/70 text-sm">
                    Para proteger tu identidad y la de 💙 Aura Azul, necesitamos verificar que eres tú.
                  </p>
                </div>

                <div className="mb-6">
                  <h4 className="text-white text-sm mb-3">¿Por qué?</h4>
                  <div className="space-y-2">
                    <div className="flex items-start gap-2 text-white/70 text-sm">
                      <Check className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                      <span>Previene suplantación</span>
                    </div>
                    <div className="flex items-start gap-2 text-white/70 text-sm">
                      <Check className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                      <span>Protege a ambos usuarios</span>
                    </div>
                    <div className="flex items-start gap-2 text-white/70 text-sm">
                      <Check className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                      <span>Solo se hace una vez</span>
                    </div>
                  </div>
                </div>

                <div className="bg-[#252B47] border-2 border-dashed border-[#6C5CE7] rounded-xl p-8 mb-6 text-center">
                  <Camera className="w-16 h-16 text-[#6C5CE7] mx-auto mb-3" />
                  <p className="text-white/80 text-sm">
                    Toma una selfie para confirmar tu identidad
                  </p>
                </div>

                <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-3 mb-6">
                  <div className="flex items-start gap-2">
                    <span className="text-yellow-300 text-sm">🔒</span>
                    <p className="text-yellow-300 text-xs">
                      Tu foto NO será compartida con otros usuarios
                    </p>
                  </div>
                </div>

                <Button
                  onClick={handleStartVerification}
                  className="w-full h-12 bg-[#6C5CE7] hover:bg-[#5B4DD6]"
                >
                  Tomar selfie
                </Button>
                <Button
                  onClick={() => setCurrentStep('profileUnlocked')}
                  variant="ghost"
                  className="w-full mt-3 text-white/60 hover:text-white hover:bg-white/5"
                >
                  Cancelar
                </Button>
              </Card>
            </motion.div>
          </motion.div>
        )}

        {/* Selfie Capture */}
        {currentStep === 'selfieCapture' && (
          <motion.div
            key="selfie"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="min-h-screen"
          >
            <div className="max-w-md mx-auto">
              <button
                onClick={() => setCurrentStep('securityVerification')}
                className="flex items-center gap-2 text-white/70 hover:text-white mb-6"
              >
                <ArrowLeft className="w-4 h-4" />
                Verificación de Seguridad
              </button>

              <Card className="bg-[#1A1F3A] border-[#6C5CE7] p-6">
                <h2 className="text-white text-xl mb-4">📸 Toma tu selfie</h2>
                
                <p className="text-white/70 text-sm mb-4">Asegúrate de que:</p>
                <div className="space-y-2 mb-6">
                  <div className="flex items-center gap-2 text-white/70 text-sm">
                    <Check className="w-4 h-4 text-green-400" />
                    <span>Tu rostro esté bien visible</span>
                  </div>
                  <div className="flex items-center gap-2 text-white/70 text-sm">
                    <Check className="w-4 h-4 text-green-400" />
                    <span>Haya buena iluminación</span>
                  </div>
                  <div className="flex items-center gap-2 text-white/70 text-sm">
                    <Check className="w-4 h-4 text-green-400" />
                    <span>Estés solo en la foto</span>
                  </div>
                </div>

                {/* Camera Preview */}
                <div 
                  className="relative h-96 bg-[#252B47] rounded-xl overflow-hidden mb-6 cursor-pointer"
                  onMouseEnter={() => setFaceDetected(true)}
                  onMouseLeave={() => setFaceDetected(false)}
                  onClick={() => setFaceDetected(true)}
                >
                  <div className="absolute inset-0 bg-black/40" />
                  
                  {/* Face Guide Oval */}
                  <div className="absolute inset-0 flex items-center justify-center z-10">
                    <motion.div
                      animate={{
                        borderColor: faceDetected ? '#2ECC71' : '#E67E22'
                      }}
                      className="w-48 h-64 rounded-full border-4 border-dashed flex items-center justify-center"
                      style={{ borderSpacing: '10px' }}
                    >
                      <span className="text-6xl">😊</span>
                    </motion.div>
                  </div>

                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20">
                    <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
                      <p className="text-white/90 text-sm">
                        {faceDetected ? '¡Perfecto! Listo para capturar' : 'Toca aquí para alinear'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Capture Button */}
                <div className="flex justify-center mb-6">
                  <button
                    onClick={handleCaptureSelfie}
                    className="w-20 h-20 rounded-full bg-white shadow-2xl flex items-center justify-center hover:scale-105 transition-transform active:scale-95"
                  >
                    <div className="w-16 h-16 rounded-full bg-[#6C5CE7] flex items-center justify-center">
                      <Camera className="w-8 h-8 text-white" />
                    </div>
                  </button>
                </div>

                <p className="text-white/60 text-xs text-center mb-4">
                  {faceDetected 
                    ? '✅ Rostro detectado - Presiona el botón para capturar' 
                    : '💡 Toca el área de la cámara para activar la detección'}
                </p>

                <Button
                  onClick={() => setCurrentStep('securityVerification')}
                  variant="ghost"
                  className="w-full text-white/60 hover:text-white hover:bg-white/5"
                >
                  Cancelar
                </Button>
              </Card>
            </div>
          </motion.div>
        )}

        {/* Processing */}
        {currentStep === 'processing' && (
          <motion.div
            key="processing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen flex items-center justify-center"
          >
            <Card className="bg-[#1A1F3A] border-[#6C5CE7] p-8 max-w-md w-full text-center">
              <Loader2 className="w-20 h-20 text-[#6C5CE7] mx-auto mb-6 animate-spin" />
              <h2 className="text-white text-xl mb-4">Verificando tu identidad...</h2>
              
              <div className="mb-6">
                <div className="h-2 bg-[#252B47] rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-[#6C5CE7] to-[#A29BFE]"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
                <p className="text-white/60 text-sm mt-2">{progress}%</p>
              </div>

              <p className="text-white/70 text-sm mb-2">
                Comparando con tu perfil registrado
              </p>

              <div className="bg-[#252B47] border border-[#6C5CE7]/30 rounded-lg p-4 mt-6">
                <Lock className="w-6 h-6 text-[#6C5CE7] mx-auto mb-2" />
                <p className="text-white/70 text-xs">
                  🔐 Proceso seguro y encriptado
                </p>
              </div>
            </Card>
          </motion.div>
        )}

        {/* Success */}
        {currentStep === 'success' && (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="min-h-screen flex items-center justify-center"
          >
            <Card className="bg-[#1A1F3A] border-green-500 p-8 max-w-md w-full text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring', bounce: 0.5 }}
                className="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6"
              >
                <Check className="w-12 h-12 text-green-400" />
              </motion.div>

              <h2 className="text-white text-2xl mb-4">¡Identidad verificada!</h2>
              
              <p className="text-white/70 text-sm mb-6">
                Ahora puedes chatear de forma segura con 💙 Aura Azul
              </p>

              <div className="text-left mb-6 bg-[#252B47] rounded-lg p-4">
                <p className="text-white text-sm mb-3">Recuerda:</p>
                <ul className="space-y-2 text-white/70 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-[#6C5CE7]">•</span>
                    <span>Sé respetuoso y amable</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#6C5CE7]">•</span>
                    <span>No compartas información personal sensible</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#6C5CE7]">•</span>
                    <span>Puedes reportar cualquier comportamiento inapropiado</span>
                  </li>
                </ul>
              </div>

              <Button
                onClick={handleGoToChat}
                className="w-full h-14 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-base"
              >
                Ir al chat
              </Button>
            </Card>
          </motion.div>
        )}

        {/* Chat Interface */}
        {currentStep === 'chat' && (
          <motion.div
            key="chat"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="min-h-screen flex flex-col"
          >
            {/* Header */}
            <div className="bg-[#1A1F3A] border-b border-[#2D3454] p-4">
              <div className="max-w-md mx-auto">
                <div className="flex items-center gap-3 mb-3">
                  <button
                    onClick={() => window.history.back()}
                    className="text-white/70 hover:text-white"
                  >
                    <ArrowLeft className="w-5 h-5" />
                  </button>
                  <div className="w-8 h-8 rounded-full bg-blue-400 flex items-center justify-center text-lg">
                    💙
                  </div>
                  <h3 className="text-white">Aura Azul</h3>
                </div>

                {/* Verification Badge */}
                <div className="bg-[#252B47] border border-green-500/50 rounded-lg p-3">
                  <div className="flex items-center gap-2 text-green-400 text-sm">
                    <Check className="w-4 h-4" />
                    <span>🤝 Conexión verificada - Ambos han confirmado su identidad</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 bg-gradient-to-br from-indigo-950 via-purple-950 to-blue-950">
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

            {/* Input */}
            <div className="bg-[#1A1F3A] border-t border-[#2D3454] p-4">
              <div className="max-w-md mx-auto flex items-center gap-3">
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
      </AnimatePresence>
    </div>
  );
}