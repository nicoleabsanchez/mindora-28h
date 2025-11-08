import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Lock, FileText, Camera, Check, Loader2 } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { BackButton } from './ui/breadcrumb-nav';

interface ChatVerificationFlowProps {
  onBack?: () => void;
}

type VerificationStep = 
  | 'initial'
  | 'document'
  | 'facial'
  | 'processing'
  | 'success'
  | 'chat';

interface AuraChat {
  id: string;
  color: string;
  emoji: string;
  label: string;
  activity: string;
  hobbies: string[];
  status: string;
}

const mockAuras: AuraChat[] = [
  {
    id: '1',
    color: 'bg-blue-400',
    emoji: '💙',
    label: 'Aura Azul',
    activity: 'Estudiando Física',
    hobbies: ['🎸', '🏃', '📖'],
    status: 'En línea hace 2 min'
  },
  {
    id: '2',
    color: 'bg-purple-400',
    emoji: '💜',
    label: 'Aura Morada',
    activity: 'Meditando',
    hobbies: ['🧘', '🌱', '📚'],
    status: 'En línea ahora'
  },
  {
    id: '3',
    color: 'bg-green-400',
    emoji: '💚',
    label: 'Aura Verde',
    activity: 'Descansando',
    hobbies: ['🎨', '🎮', '☕'],
    status: 'En línea hace 5 min'
  }
];

export function ChatVerificationFlow({ onBack }: ChatVerificationFlowProps) {
  const [currentStep, setCurrentStep] = useState<VerificationStep>('initial');
  const [progress, setProgress] = useState(0);
  const [documentUploaded, setDocumentUploaded] = useState(false);

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      window.location.hash = '';
    }
  };

  const handleStartVerification = () => {
    setCurrentStep('document');
  };

  const handleDocumentUpload = () => {
    setDocumentUploaded(true);
    setTimeout(() => {
      setCurrentStep('facial');
    }, 500);
  };

  const handleFacialCapture = () => {
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
    }, 100);
  };

  const handleGoToChat = () => {
    setCurrentStep('chat');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-950 to-blue-950 p-6">
      <AnimatePresence mode="wait">
        {/* Initial Modal */}
        {currentStep === 'initial' && (
          <motion.div
            key="initial"
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
                  <div className="w-16 h-16 bg-[#6C5CE7]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Lock className="w-8 h-8 text-[#6C5CE7]" />
                  </div>
                  <h2 className="text-white text-xl mb-3">Verificación de Identidad</h2>
                  <p className="text-white/70 text-sm mb-6">
                    Para tu seguridad y la de otros, necesitamos verificar tu identidad antes de conectar.
                  </p>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex items-start gap-2 text-white/80 text-sm">
                    <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <span>Proceso rápido (2 min)</span>
                  </div>
                  <div className="flex items-start gap-2 text-white/80 text-sm">
                    <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <span>Datos encriptados</span>
                  </div>
                  <div className="flex items-start gap-2 text-white/80 text-sm">
                    <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <span>Solo se verifica una vez</span>
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  <button className="w-full p-4 bg-[#252B47] border-2 border-dashed border-[#6C5CE7] rounded-xl text-left transition-all hover:bg-[#2D3454]">
                    <div className="flex items-center gap-3">
                      <FileText className="w-6 h-6 text-[#6C5CE7]" />
                      <div>
                        <div className="text-white text-sm">📄 Documento (DNI/ID)</div>
                        <div className="text-white/50 text-xs">Ambos lados</div>
                      </div>
                    </div>
                  </button>

                  <button className="w-full p-4 bg-[#252B47] border-2 border-dashed border-[#6C5CE7] rounded-xl text-left transition-all hover:bg-[#2D3454]">
                    <div className="flex items-center gap-3">
                      <Camera className="w-6 h-6 text-[#6C5CE7]" />
                      <div>
                        <div className="text-white text-sm">📸 Reconocimiento facial</div>
                        <div className="text-white/50 text-xs">Captura en vivo</div>
                      </div>
                    </div>
                  </button>
                </div>

                <Button
                  onClick={handleStartVerification}
                  className="w-full h-12 bg-gradient-to-r from-[#6C5CE7] to-[#A29BFE] hover:from-[#5B4DD6] hover:to-[#9188ED]"
                >
                  Iniciar verificación
                </Button>
                <Button
                  onClick={handleBack}
                  variant="ghost"
                  className="w-full mt-3 text-white/60 hover:text-white hover:bg-white/5"
                >
                  Cancelar
                </Button>
              </Card>
            </motion.div>
          </motion.div>
        )}

        {/* Document Upload */}
        {currentStep === 'document' && (
          <motion.div
            key="document"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="min-h-screen"
          >
            <div className="max-w-md mx-auto">
              <button
                onClick={() => setCurrentStep('initial')}
                className="flex items-center gap-2 text-white/70 hover:text-white mb-6"
              >
                <ArrowLeft className="w-4 h-4" />
                Verificación (Paso 1 de 2)
              </button>

              <Card className="bg-[#1A1F3A] border-[#6C5CE7] p-6">
                <h2 className="text-white text-xl mb-4">📄 Sube tu documento</h2>
                
                <div className="mb-6">
                  <p className="text-white/70 text-sm mb-3">Acepta:</p>
                  <ul className="space-y-2 text-white/60 text-sm">
                    <li>• DNI (ambos lados)</li>
                    <li>• Pasaporte</li>
                    <li>• Cédula de identidad</li>
                  </ul>
                </div>

                <div className="mb-6">
                  <div className={`h-52 bg-[#252B47] border-2 border-dashed rounded-xl flex flex-col items-center justify-center transition-all ${
                    documentUploaded ? 'border-green-500 bg-green-500/10' : 'border-[#6C5CE7]'
                  }`}>
                    {documentUploaded ? (
                      <>
                        <Check className="w-16 h-16 text-green-400 mb-3" />
                        <p className="text-green-300 text-sm">Documento cargado</p>
                      </>
                    ) : (
                      <>
                        <Camera className="w-16 h-16 text-[#6C5CE7] mb-3" />
                        <p className="text-white/60 text-sm">Toca para capturar</p>
                        <p className="text-white/40 text-xs">o subir imagen</p>
                      </>
                    )}
                  </div>
                </div>

                <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-3 mb-6">
                  <p className="text-orange-300 text-xs">
                    ⚠️ Tu documento NO será visible para otros usuarios
                  </p>
                </div>

                <Button
                  onClick={handleDocumentUpload}
                  disabled={documentUploaded}
                  className="w-full h-12 bg-[#6C5CE7] hover:bg-[#5B4DD6] disabled:opacity-50"
                >
                  {documentUploaded ? 'Continuar' : 'Subir documento'}
                </Button>
                <Button
                  onClick={() => setCurrentStep('initial')}
                  variant="ghost"
                  className="w-full mt-3 text-white/60 hover:text-white hover:bg-white/5"
                >
                  Cancelar
                </Button>
              </Card>
            </div>
          </motion.div>
        )}

        {/* Facial Recognition */}
        {currentStep === 'facial' && (
          <motion.div
            key="facial"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="min-h-screen"
          >
            <div className="max-w-md mx-auto">
              <button
                onClick={() => setCurrentStep('document')}
                className="flex items-center gap-2 text-white/70 hover:text-white mb-6"
              >
                <ArrowLeft className="w-4 h-4" />
                Verificación (Paso 2 de 2)
              </button>

              <Card className="bg-[#1A1F3A] border-[#6C5CE7] p-6">
                <h2 className="text-white text-xl mb-4">📸 Reconocimiento facial</h2>
                
                <p className="text-white/70 text-sm mb-6">
                  Coloca tu rostro dentro del marco y mantén la cámara estable.
                </p>

                <div className="mb-6">
                  <div className="h-72 bg-[#252B47] rounded-xl flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-black/40" />
                    <div className="relative z-10">
                      <div className="w-44 h-56 border-4 border-green-500 rounded-full flex items-center justify-center">
                        <span className="text-6xl">😊</span>
                      </div>
                    </div>
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/70 text-sm">
                      Posiciona tu rostro
                    </div>
                  </div>
                </div>

                <div className="space-y-2 mb-6">
                  <div className="flex items-center gap-2 text-white/70 text-sm">
                    <Check className="w-4 h-4 text-green-400" />
                    <span>Buena iluminación</span>
                  </div>
                  <div className="flex items-center gap-2 text-white/70 text-sm">
                    <Check className="w-4 h-4 text-green-400" />
                    <span>Sin lentes/gorra</span>
                  </div>
                  <div className="flex items-center gap-2 text-white/70 text-sm">
                    <Check className="w-4 h-4 text-green-400" />
                    <span>Mirar a la cámara</span>
                  </div>
                </div>

                <Button
                  onClick={handleFacialCapture}
                  className="w-full h-12 bg-[#6C5CE7] hover:bg-[#5B4DD6]"
                >
                  Capturar
                </Button>
                <Button
                  onClick={() => setCurrentStep('document')}
                  variant="ghost"
                  className="w-full mt-3 text-white/60 hover:text-white hover:bg-white/5"
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
              <Loader2 className="w-16 h-16 text-[#6C5CE7] mx-auto mb-6 animate-spin" />
              <h2 className="text-white text-xl mb-4">Verificando tu identidad...</h2>
              
              <div className="mb-4">
                <div className="h-2 bg-[#252B47] rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-[#6C5CE7]"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
                <p className="text-white/60 text-sm mt-2">{progress}%</p>
              </div>

              <p className="text-white/70 text-sm mb-6">
                Esto puede tomar unos segundos.
              </p>

              <div className="bg-[#252B47] border border-[#6C5CE7]/30 rounded-lg p-4">
                <Lock className="w-6 h-6 text-[#6C5CE7] mx-auto mb-2" />
                <p className="text-white/70 text-xs">
                  🔒 Tus datos están seguros y encriptados
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
                transition={{ delay: 0.2, type: 'spring' }}
                className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6"
              >
                <Check className="w-10 h-10 text-green-400" />
              </motion.div>

              <h2 className="text-white text-2xl mb-4">¡Verificación completada!</h2>
              
              <p className="text-white/70 text-sm mb-6">
                Tu identidad ha sido confirmada exitosamente.
              </p>

              <div className="text-left mb-6 space-y-2">
                <p className="text-white text-sm mb-3">Ahora puedes:</p>
                <div className="flex items-start gap-2 text-white/70 text-sm">
                  <span>•</span>
                  <span>Conectar con otras auras</span>
                </div>
                <div className="flex items-start gap-2 text-white/70 text-sm">
                  <span>•</span>
                  <span>Enviar mensajes privados</span>
                </div>
                <div className="flex items-start gap-2 text-white/70 text-sm">
                  <span>•</span>
                  <span>Crear conversaciones</span>
                </div>
              </div>

              <div className="bg-[#252B47] border border-[#6C5CE7]/30 rounded-lg p-3 mb-6">
                <p className="text-white/70 text-xs">
                  Esta verificación es única y no tendrás que repetirla.
                </p>
              </div>

              <Button
                onClick={handleGoToChat}
                className="w-full h-12 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
              >
                Ir a Chat
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
            className="min-h-screen"
          >
            <div className="max-w-md mx-auto">
              <BackButton onClick={handleBack} label="Conversaciones" />


              <h2 className="text-white text-xl mb-4">Auras disponibles para chat:</h2>

              <div className="space-y-3 mb-6">
                {mockAuras.map((aura, index) => (
                  <motion.div
                    key={aura.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="bg-[#1A1F3A] border-[#2D3454] p-4 hover:border-[#6C5CE7] transition-colors cursor-pointer">
                      <div className="flex items-start gap-3">
                        <div className={`w-10 h-10 rounded-full ${aura.color} flex items-center justify-center text-xl flex-shrink-0`}>
                          {aura.emoji}
                        </div>
                        <div className="flex-1">
                          <h3 className="text-white mb-1">{aura.label}</h3>
                          <p className="text-white/60 text-sm mb-2">"{aura.activity}"</p>
                          <div className="flex items-center gap-2 mb-2">
                            {aura.hobbies.map((hobby, i) => (
                              <span key={i} className="text-lg">{hobby}</span>
                            ))}
                          </div>
                          <p className="text-white/40 text-xs">{aura.status}</p>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>

              <Button
                onClick={handleBack}
                variant="outline"
                className="w-full border-white/30 text-white hover:bg-white/10"
              >
                ← Volver a Auras
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}