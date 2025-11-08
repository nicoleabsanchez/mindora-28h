import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Waves, Lightbulb, Users, Send, Heart, Mic, MicOff, Home } from 'lucide-react';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Card } from './ui/card';

interface Message {
  id: string;
  text: string;
  emotion: string;
  timestamp: Date;
  waves: number;
  lights: number;
  yoTambien: number;
  expiresAt: Date;
}

const mockMessages: Message[] = [
  {
    id: '1',
    text: 'Hoy me siento perdido. No sé si estoy en el camino correcto con mis estudios y me da miedo decepcionar a mi familia.',
    emotion: 'Ansiedad',
    timestamp: new Date(Date.now() - 1000 * 60 * 15),
    expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 - 1000 * 60 * 15),
    waves: 8,
    lights: 5,
    yoTambien: 12
  },
  {
    id: '2',
    text: 'A veces siento que todos tienen todo resuelto menos yo. Es agotador pretender que estoy bien.',
    emotion: 'Cansancio',
    timestamp: new Date(Date.now() - 1000 * 60 * 45),
    expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 - 1000 * 60 * 45),
    waves: 15,
    lights: 8,
    yoTambien: 23
  },
  {
    id: '3',
    text: 'Me cuesta concentrarme. Mi mente salta de una cosa a otra y termino el día sin haber hecho nada.',
    emotion: 'Estrés',
    timestamp: new Date(Date.now() - 1000 * 60 * 90),
    expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 - 1000 * 60 * 90),
    waves: 6,
    lights: 3,
    yoTambien: 9
  }
];

const MAX_CHARACTERS = 500;

export function DesahogoSection() {
  const [myMessage, setMyMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    // Initialize Speech Recognition
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = 'es-ES';

      recognitionRef.current.onresult = (event: any) => {
        let interimTranscript = '';
        let finalTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcript + ' ';
          } else {
            interimTranscript += transcript;
          }
        }

        if (finalTranscript) {
          setMyMessage(prev => {
            const newText = (prev + finalTranscript).slice(0, MAX_CHARACTERS);
            return newText;
          });
        }
      };

      recognitionRef.current.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
        setIsRecording(false);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
        setIsRecording(false);
      };
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  const toggleRecording = () => {
    if (!recognitionRef.current) {
      alert('La grabación de voz no está disponible en este navegador. Prueba con Chrome o Edge.');
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
      setIsRecording(false);
    } else {
      recognitionRef.current.start();
      setIsListening(true);
      setIsRecording(true);
    }
  };

  const handleSend = () => {
    if (!myMessage.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      text: myMessage,
      emotion: 'Compartido',
      timestamp: new Date(),
      expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24), // 24 hours from now
      waves: 0,
      lights: 0,
      yoTambien: 0
    };

    setMessages([newMessage, ...messages]);
    setMyMessage('');
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleReaction = (messageId: string, type: 'waves' | 'lights' | 'yoTambien') => {
    setMessages(messages.map(msg => 
      msg.id === messageId 
        ? { ...msg, [type]: msg[type] + 1 }
        : msg
    ));
  };

  const getTimeRemaining = (expiresAt: Date) => {
    const hoursLeft = Math.floor((expiresAt.getTime() - Date.now()) / (1000 * 60 * 60));
    if (hoursLeft < 1) {
      const minutesLeft = Math.floor((expiresAt.getTime() - Date.now()) / (1000 * 60));
      return `${minutesLeft} min`;
    }
    return `${hoursLeft}h`;
  };

  const charactersLeft = MAX_CHARACTERS - myMessage.length;

  return (
    <div className="min-h-screen p-6 pt-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-3xl mx-auto mb-24"
      >
        <div className="text-center mb-8">
          <div className="flex items-center justify-between mb-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => window.location.hash = ''}
              className="text-purple-600 hover:text-purple-900"
            >
              <Home className="w-4 h-4 mr-2" />
              Inicio
            </Button>
            <div className="flex-1" />
          </div>
          <h1 className="text-4xl text-purple-900 mb-2">Desahogo</h1>
          <p className="text-purple-700">Cuando necesitas ser escuchado</p>
        </div>

        {/* Input Section */}
        <Card className="p-6 mb-8 bg-white/80 backdrop-blur-sm border-purple-200 shadow-lg">
          <div className="flex items-center gap-2 mb-4">
            <div className="flex-1">
              <p className="text-purple-900 mb-1">¿Qué te está pasando ahora?</p>
              <p className="text-xs text-purple-600">
                Sin nombres, sin fotos. Tu mensaje desaparecerá en 24h
              </p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-purple-300 to-blue-300 rounded-full flex items-center justify-center">
              <Heart className="w-6 h-6 text-white" />
            </div>
          </div>
          
          <div className="relative">
            <Textarea
              value={myMessage}
              onChange={(e) => {
                const text = e.target.value;
                if (text.length <= MAX_CHARACTERS) {
                  setMyMessage(text);
                }
              }}
              placeholder="Escribe lo que sientes..."
              className="min-h-40 mb-3 resize-none border-purple-200 focus:border-purple-400 pr-16"
              maxLength={MAX_CHARACTERS}
            />
            
            {/* Microphone button */}
            <Button
              type="button"
              size="icon"
              variant={isRecording ? "default" : "outline"}
              onClick={toggleRecording}
              className={`absolute bottom-6 right-3 rounded-full ${
                isRecording 
                  ? 'bg-red-500 hover:bg-red-600 animate-pulse' 
                  : 'border-purple-300 hover:bg-purple-50'
              }`}
            >
              {isRecording ? (
                <MicOff className="w-4 h-4 text-white" />
              ) : (
                <Mic className="w-4 h-4 text-purple-600" />
              )}
            </Button>
          </div>

          <div className="flex items-center justify-between mb-4">
            <div className="text-sm text-purple-600">
              {isRecording && (
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                  Escuchando...
                </span>
              )}
              {!isRecording && (
                <span className="text-xs">
                  💡 Toca el micrófono para hablar
                </span>
              )}
            </div>
            <span className={`text-sm ${charactersLeft < 50 ? 'text-orange-600' : 'text-purple-600'}`}>
              {charactersLeft} caracteres restantes
            </span>
          </div>

          <Button
            onClick={handleSend}
            disabled={!myMessage.trim()}
            className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 disabled:opacity-50"
          >
            <Send className="w-4 h-4 mr-2" />
            Compartir anónimamente
          </Button>
        </Card>

        <AnimatePresence>
          {showSuccess && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="bg-green-100 text-green-800 p-4 rounded-lg mb-6 text-center border border-green-300"
            >
              <Heart className="w-5 h-5 inline-block mr-2" />
              Tu mensaje ha sido compartido. Alguien te escucha. Desaparecerá en 24h.
            </motion.div>
          )}
        </AnimatePresence>

        {/* Messages Feed */}
        <div className="space-y-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-purple-900">Otros compartiendo ahora</h2>
            <span className="text-sm text-purple-600">Todo desaparece en 24h</span>
          </div>
          {messages.map((message, index) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="p-6 bg-white/70 backdrop-blur-sm border-purple-100 hover:border-purple-300 transition-colors">
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-300 to-blue-300 flex items-center justify-center flex-shrink-0">
                    <Heart className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">
                        {message.emotion}
                      </span>
                      <span className="text-sm text-purple-500">
                        hace {Math.round((Date.now() - message.timestamp.getTime()) / 60000)} min
                      </span>
                      <span className="text-xs text-purple-400">
                        • desaparece en {getTimeRemaining(message.expiresAt)}
                      </span>
                    </div>
                    <p className="text-purple-900 leading-relaxed">{message.text}</p>
                  </div>
                </div>

                <div className="flex gap-3 pt-3 border-t border-purple-100">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleReaction(message.id, 'waves')}
                    className="flex items-center gap-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                  >
                    <Waves className="w-4 h-4" />
                    <span>{message.waves}</span>
                    <span className="text-xs hidden sm:inline">Calma</span>
                  </Button>

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleReaction(message.id, 'lights')}
                    className="flex items-center gap-2 text-yellow-600 hover:text-yellow-700 hover:bg-yellow-50"
                  >
                    <Lightbulb className="w-4 h-4" />
                    <span>{message.lights}</span>
                    <span className="text-xs hidden sm:inline">Luz</span>
                  </Button>

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleReaction(message.id, 'yoTambien')}
                    className="flex items-center gap-2 text-purple-600 hover:text-purple-700 hover:bg-purple-50"
                  >
                    <Users className="w-4 h-4" />
                    <span>{message.yoTambien}</span>
                    <span className="text-xs hidden sm:inline">Yo también</span>
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Anonymous reminder */}
        <Card className="mt-8 p-6 bg-gradient-to-br from-purple-50 to-blue-50 border-purple-200">
          <div className="text-center">
            <h3 className="text-purple-900 mb-2">Espacio 100% anónimo</h3>
            <p className="text-sm text-purple-700 mb-4">
              No hay perfiles, no hay nombres, no hay fotos. Solo presencia humana real.
            </p>
            <div className="grid grid-cols-3 gap-4 text-xs text-purple-600">
              <div>
                <div className="text-2xl mb-1">🚫</div>
                <div>Sin registro</div>
              </div>
              <div>
                <div className="text-2xl mb-1">⏰</div>
                <div>24h y desaparece</div>
              </div>
              <div>
                <div className="text-2xl mb-1">🤝</div>
                <div>Solo apoyo</div>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}