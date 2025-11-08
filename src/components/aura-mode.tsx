import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Info, Volume2, VolumeX, Volume1, Check } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Slider } from './ui/slider';

type AuraColor = 'blue' | 'purple' | 'green' | 'yellow' | 'orange';

interface Aura {
  id: string;
  color: AuraColor;
  x: number;
  y: number;
  size: number;
  hobbies: string[];
  currentActivity: string;
  specificActivity: string;
  vx: number;
  vy: number;
  trustLevel?: {
    sessions: number;
    minutesTogether: number;
    interactions: number;
    unlocked: boolean;
  };
}

interface Soundscape {
  id: string;
  name: string;
  icon: string;
  premium: boolean;
  recommended: AuraColor[];
}

const auraConfig = {
  blue: { 
    color: 'bg-blue-400', 
    shadow: 'shadow-blue-400/50',
    label: 'Estudiando', 
    emoji: '💙',
    description: 'Concentrado en aprender'
  },
  purple: { 
    color: 'bg-purple-400', 
    shadow: 'shadow-purple-400/50',
    label: 'Meditando', 
    emoji: '💜',
    description: 'Buscando paz interior'
  },
  green: { 
    color: 'bg-green-400', 
    shadow: 'shadow-green-400/50',
    label: 'Descansando', 
    emoji: '💚',
    description: 'Tomando un respiro'
  },
  yellow: { 
    color: 'bg-yellow-400', 
    shadow: 'shadow-yellow-400/50',
    label: 'Creando', 
    emoji: '💛',
    description: 'En modo creativo'
  },
  orange: { 
    color: 'bg-orange-400', 
    shadow: 'shadow-orange-400/50',
    label: 'Procesando emociones', 
    emoji: '🧡',
    description: 'Reflexionando sobre lo que siento'
  }
};

const soundscapes: Soundscape[] = [
  { id: 'silence', name: 'Silencio', icon: '🔇', premium: false, recommended: [] },
  { id: 'rain', name: 'Lluvia', icon: '🌧️', premium: false, recommended: ['blue'] },
  { id: 'whitenoise', name: 'Ruido blanco', icon: '📻', premium: false, recommended: ['blue'] },
  { id: 'cafe', name: 'Café', icon: '☕', premium: false, recommended: ['yellow'] },
  { id: 'library', name: 'Biblioteca', icon: '📚', premium: false, recommended: ['blue'] },
  { id: 'forest', name: 'Bosque', icon: '🌲', premium: false, recommended: ['purple', 'green'] },
  { id: 'ocean', name: 'Olas del mar', icon: '🌊', premium: false, recommended: ['purple', 'green'] },
  { id: 'fire', name: 'Fogata', icon: '🔥', premium: true, recommended: ['green'] },
  { id: 'night', name: 'Noche', icon: '🌙', premium: true, recommended: ['purple', 'green'] },
  { id: 'lofi', name: 'Lofi suave', icon: '🎹', premium: true, recommended: ['yellow', 'blue'] }
];

const hobbyLabels: Record<string, string> = {
  'guitarra': 'Toca guitarra',
  'leer': 'Lee ciencia ficción',
  'correr': 'Corre',
  'fotografía': 'Hace fotografía',
  'cocinar': 'Cocina',
  'dibujar': 'Dibuja',
  'yoga': 'Practica yoga',
  'escribir': 'Escribe'
};

const generateAuras = (count: number): Aura[] => {
  const colors: AuraColor[] = ['blue', 'purple', 'green', 'yellow', 'orange'];
  const activities = [
    { state: 'blue', activity: 'Estudiando', specific: 'Estudiando Física', hobbies: ['guitarra', 'correr', 'leer'] },
    { state: 'blue', activity: 'Estudiando', specific: 'Estudiando Matemáticas', hobbies: ['fotografía', 'leer', 'correr'] },
    { state: 'blue', activity: 'Estudiando', specific: 'Preparando examen de Química', hobbies: ['dibujar', 'cocinar', 'leer'] },
    { state: 'purple', activity: 'Meditando', specific: 'Sesión de meditación guiada', hobbies: ['yoga', 'leer', 'escribir'] },
    { state: 'yellow', activity: 'Creando', specific: 'Trabajando en proyecto de programación', hobbies: ['guitarra', 'fotografía', 'cocinar'] },
    { state: 'green', activity: 'Descansando', specific: 'Tomando un respiro', hobbies: ['leer', 'guitarra', 'yoga'] },
    { state: 'yellow', activity: 'Creando', specific: 'Diseñando ilustración', hobbies: ['dibujar', 'fotografía', 'escribir'] },
    { state: 'purple', activity: 'Meditando', specific: 'Respiración consciente', hobbies: ['yoga', 'correr', 'leer'] }
  ];

  return Array.from({ length: count }, (_, i) => {
    const activityData = activities[i % activities.length];
    return {
      id: `aura-${i}`,
      color: activityData.state as AuraColor,
      x: Math.random() * 70 + 15,
      y: Math.random() * 60 + 20,
      size: Math.random() * 20 + 40,
      hobbies: activityData.hobbies,
      currentActivity: activityData.activity,
      specificActivity: activityData.specific,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      // Add trust levels - vary to show different states
      trustLevel: i === 0 ? {
        sessions: 2,
        minutesTogether: 35,
        interactions: 2,
        unlocked: false
      } : i === 1 ? {
        sessions: 3,
        minutesTogether: 47,
        interactions: 4,
        unlocked: true
      } : i === 2 ? {
        sessions: 1,
        minutesTogether: 12,
        interactions: 1,
        unlocked: false
      } : undefined
    };
  });
};

export function AuraMode() {
  const [myAura, setMyAura] = useState<AuraColor | null>(null);
  const [auras, setAuras] = useState<Aura[]>(generateAuras(7));
  const [isInSpace, setIsInSpace] = useState(false);
  const [selectedAura, setSelectedAura] = useState<Aura | null>(null);
  const [hoveredAura, setHoveredAura] = useState<string | null>(null);
  const [showInfo, setShowInfo] = useState(false);
  const [currentSound, setCurrentSound] = useState('rain');
  const [volume, setVolume] = useState([70]);
  const [showSoundSelector, setShowSoundSelector] = useState(false);
  const [sentReaction, setSentReaction] = useState<{ type: string; auraId: string } | null>(null);

  useEffect(() => {
    if (!isInSpace) return;

    const interval = setInterval(() => {
      setAuras(prevAuras => prevAuras.map(aura => {
        let newX = aura.x + aura.vx;
        let newY = aura.y + aura.vy;
        let newVx = aura.vx;
        let newVy = aura.vy;

        if (newX <= 10 || newX >= 90) {
          newVx = -aura.vx;
          newX = newX <= 10 ? 10 : 90;
        }
        if (newY <= 15 || newY >= 85) {
          newVy = -aura.vy;
          newY = newY <= 15 ? 15 : 85;
        }

        return {
          ...aura,
          x: newX,
          y: newY,
          vx: newVx,
          vy: newVy
        };
      }));
    }, 50);

    return () => clearInterval(interval);
  }, [isInSpace]);

  const handleAuraClick = (aura: Aura) => {
    setSelectedAura(aura);
  };

  const handleSendReaction = (type: 'yoTambien' | 'calma', auraId: string) => {
    setSentReaction({ type, auraId });
    setTimeout(() => {
      setSentReaction(null);
      setSelectedAura(null);
    }, 2000);
  };

  const handleEnter = () => {
    if (myAura) {
      setIsInSpace(true);
      // Set recommended soundscape based on activity
      const recommended = soundscapes.find(s => s.recommended.includes(myAura));
      if (recommended) {
        setCurrentSound(recommended.id);
      }
    }
  };

  const handleExit = () => {
    setIsInSpace(false);
    setMyAura(null);
    setSelectedAura(null);
  };

  const getVolumeIcon = () => {
    if (volume[0] === 0) return <VolumeX className="w-4 h-4" />;
    if (volume[0] < 50) return <Volume1 className="w-4 h-4" />;
    return <Volume2 className="w-4 h-4" />;
  };

  const getSimilarAuras = () => {
    if (!myAura) return [];
    return auras.filter(aura => aura.color === myAura);
  };

  const getTrustProgressColor = (current: number, required: number) => {
    const percentage = (current / required) * 100;
    if (percentage < 50) return '#E67E22'; // orange
    if (percentage < 100) return '#F1C40F'; // yellow
    return '#2ECC71'; // green
  };

  const getSessionDots = (sessions: number, required: number = 3) => {
    return (
      <div className="flex items-center gap-1">
        {[...Array(required)].map((_, i) => (
          <div
            key={i}
            className={`w-3 h-3 rounded-full ${
              i < sessions ? 'bg-[#6C5CE7]' : 'bg-[#3D4463]'
            }`}
          />
        ))}
      </div>
    );
  };

  // Selection Screen
  if (!isInSpace) {
    return (
      <div className="min-h-screen p-6 flex items-center justify-center bg-gradient-to-br from-indigo-100 via-purple-100 to-blue-100">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-2xl w-full"
        >
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring' }}
              className="inline-block mb-6"
            >
              <div className="w-20 h-20 bg-gradient-to-br from-purple-400 to-blue-400 rounded-full flex items-center justify-center mx-auto shadow-2xl">
                <span className="text-4xl">✨</span>
              </div>
            </motion.div>
            <h1 className="text-4xl text-purple-900 mb-2">Modo Aura</h1>
            <p className="text-purple-700 mb-2">Compañía sin palabras</p>
            <p className="text-sm text-purple-600">
              Siéntete acompañado mientras estudias, meditas o descansas
            </p>
          </div>

          <Card className="p-8 bg-white/80 backdrop-blur-sm border-purple-200 shadow-xl">
            <h2 className="text-purple-900 mb-6 text-center">¿Cómo te sientes ahora?</h2>
            <div className="grid grid-cols-1 gap-4 mb-8">
              {(Object.keys(auraConfig) as AuraColor[]).map((color, index) => (
                <motion.button
                  key={color}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => setMyAura(color)}
                  className={`p-5 rounded-2xl border-2 transition-all text-left ${
                    myAura === color
                      ? 'border-purple-500 bg-purple-50 shadow-lg scale-105'
                      : 'border-purple-200 hover:border-purple-300 hover:shadow-md'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-16 h-16 rounded-full ${auraConfig[color].color} ${auraConfig[color].shadow} shadow-lg flex items-center justify-center text-2xl`}>
                      {auraConfig[color].emoji}
                    </div>
                    <div className="flex-1">
                      <div className="text-lg text-purple-900 mb-1">
                        {auraConfig[color].label}
                      </div>
                      <div className="text-sm text-purple-600">
                        {auraConfig[color].description}
                      </div>
                    </div>
                    {myAura === color && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center"
                      >
                        <span className="text-white text-xs">✓</span>
                      </motion.div>
                    )}
                  </div>
                </motion.button>
              ))}
            </div>

            <AnimatePresence>
              {myAura && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                >
                  <Button
                    onClick={handleEnter}
                    className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 shadow-lg"
                    size="lg"
                  >
                    Entrar en silencio
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </Card>

          <div className="mt-6 text-center text-sm text-purple-600">
            <p>🔒 Sin nombres • Sin fotos • Solo presencia</p>
          </div>
        </motion.div>
      </div>
    );
  }

  const similarAuras = getSimilarAuras();

  // Aura Space
  return (
    <div className="min-h-screen relative bg-gradient-to-br from-indigo-950 via-purple-950 to-blue-950 overflow-hidden">
      {/* Ambient background effects */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500 rounded-full blur-3xl" />
      </div>

      {/* Top bar */}
      <motion.div
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="absolute top-6 left-6 right-6 z-10 flex items-center justify-between"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-white/10 backdrop-blur-md text-white px-6 py-3 rounded-full border border-white/20 shadow-xl"
        >
          <div className="flex items-center gap-3">
            <div className="flex -space-x-2">
              {[...Array(Math.min(5, auras.length + 1))].map((_, i) => (
                <div
                  key={i}
                  className={`w-6 h-6 rounded-full border-2 border-white/30 ${
                    i === 0 && myAura ? auraConfig[myAura].color : auraConfig[(['blue', 'purple', 'green', 'yellow', 'orange'] as AuraColor[])[i % 5]].color
                  }`}
                />
              ))}
            </div>
            <span className="text-sm">
              ✨ <strong>{auras.length + 1}</strong> auras presentes
            </span>
          </div>
        </motion.div>

        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setShowInfo(!showInfo)}
            className="bg-white/10 backdrop-blur-md text-white hover:bg-white/20 border border-white/20 rounded-full"
          >
            <Info className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleExit}
            className="bg-white/10 backdrop-blur-md text-white hover:bg-white/20 border border-white/20 rounded-full px-4"
          >
            <X className="w-4 h-4 mr-2" />
            Salir
          </Button>
        </div>
      </motion.div>

      {/* Info panel */}
      <AnimatePresence>
        {showInfo && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-20 right-6 z-20"
          >
            <Card className="bg-white/10 backdrop-blur-md border-white/20 p-4 max-w-xs">
              <h3 className="text-white mb-3 flex items-center gap-2">
                <Info className="w-4 h-4" />
                Cómo funciona
              </h3>
              <ul className="text-white/80 text-sm space-y-2">
                <li>• Cada círculo es una persona real</li>
                <li>• Toca las auras para ver sus actividades</li>
                <li>• Envía "Yo también" para conectar</li>
                <li>• Elige tu ambiente sonoro abajo</li>
                <li>• Sal cuando quieras</li>
              </ul>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Aura Canvas */}
      <div className="absolute inset-0 pb-32">
        {/* My Aura - Center */}
        {myAura && (
          <motion.div
            className="absolute z-20"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.5, type: 'spring' }}
            style={{
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)'
            }}
          >
            <div className="relative">
              <motion.div
                animate={{
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
              >
                <div className={`w-24 h-24 rounded-full ${auraConfig[myAura].color} blur-2xl opacity-60 absolute inset-0`} />
                <div className={`w-24 h-24 rounded-full ${auraConfig[myAura].color} shadow-2xl ${auraConfig[myAura].shadow}`} />
              </motion.div>
              <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 text-white/90 text-sm whitespace-nowrap bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full border border-white/20">
                Tú
              </div>
            </div>
          </motion.div>
        )}

        {/* Other Auras */}
        {auras.map((aura, index) => {
          const isSimilar = myAura && aura.color === myAura;
          
          return (
            <motion.div
              key={aura.id}
              className="absolute cursor-pointer"
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: 1,
                scale: hoveredAura === aura.id ? 1.15 : 1,
                x: `${aura.x}vw`,
                y: `${aura.y}vh`
              }}
              transition={{
                opacity: { delay: index * 0.1 },
                scale: { duration: 0.2 },
                x: { duration: 0.05, ease: 'linear' },
                y: { duration: 0.05, ease: 'linear' }
              }}
              onClick={(e) => {
                e.stopPropagation();
                handleAuraClick(aura);
              }}
              onMouseEnter={() => setHoveredAura(aura.id)}
              onMouseLeave={() => setHoveredAura(null)}
            >
              {/* Activity label for similar auras */}
              {isSimilar && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 whitespace-nowrap"
                >
                  <div className="bg-white/15 backdrop-blur-md text-white px-2 py-1 rounded-lg text-xs border border-white/20">
                    {aura.specificActivity}
                  </div>
                </motion.div>
              )}

              <div className="relative">
                <motion.div
                  animate={{
                    scale: [1, 1.03, 1],
                  }}
                  transition={{
                    duration: 3 + index * 0.5,
                    repeat: Infinity,
                    ease: 'easeInOut'
                  }}
                >
                  <div
                    className={`rounded-full ${auraConfig[aura.color].color} blur-xl opacity-50 absolute inset-0`}
                    style={{ width: aura.size, height: aura.size }}
                  />
                  <div
                    className={`rounded-full ${auraConfig[aura.color].color} opacity-90 shadow-xl ${isSimilar ? 'ring-2 ring-white/40' : ''}`}
                    style={{ width: aura.size, height: aura.size }}
                  />
                </motion.div>
              </div>

              {/* Hover info */}
              {hoveredAura === aura.id && !selectedAura && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute top-full left-1/2 -translate-x-1/2 mt-2 pointer-events-none z-30"
                >
                  <div className="bg-white/15 backdrop-blur-md text-white px-3 py-2 rounded-lg text-xs whitespace-nowrap border border-white/20">
                    Toca para ver más
                  </div>
                </motion.div>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Selected Aura Detail Overlay */}
      <AnimatePresence>
        {selectedAura && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-30 flex items-center justify-center p-6"
            onClick={() => setSelectedAura(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md"
            >
              <Card className="bg-[#1A1F3A]/95 backdrop-blur-xl border-white/20 p-6 shadow-2xl">
                <div className="text-center mb-6">
                  <div className={`w-20 h-20 rounded-full ${auraConfig[selectedAura.color].color} mx-auto mb-4 shadow-2xl ${auraConfig[selectedAura.color].shadow}`}>
                    <div className="w-full h-full flex items-center justify-center text-3xl">
                      {auraConfig[selectedAura.color].emoji}
                    </div>
                  </div>
                  <h3 className="text-white mb-1">
                    Aura {auraConfig[selectedAura.color].label}
                  </h3>
                </div>

                <div className="mb-6">
                  <h4 className="text-white/70 text-sm mb-2">Actividad actual:</h4>
                  <div className="bg-white/10 rounded-lg p-3 border border-white/10">
                    <p className="text-white">📚 {selectedAura.specificActivity}</p>
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="text-white/70 text-sm mb-3">Intereses compartidos:</h4>
                  <div className="space-y-2">
                    {selectedAura.hobbies.map((hobby, i) => (
                      <div
                        key={i}
                        className="bg-white/5 rounded-lg p-2 border border-white/10 text-white/90 text-sm"
                      >
                        {hobbyLabels[hobby]}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Trust Progress */}
                {selectedAura.trustLevel && (
                  <div className="mb-6">
                    <div className={`bg-[#252B47] border rounded-xl p-4 ${
                      selectedAura.trustLevel.unlocked 
                        ? 'border-green-500/50' 
                        : 'border-[#6C5CE7]/50'
                    }`}>
                      <div className="flex items-center gap-2 mb-4">
                        {selectedAura.trustLevel.unlocked ? (
                          <>
                            <Check className="w-5 h-5 text-green-400" />
                            <h4 className="text-white">✅ Conexión establecida</h4>
                          </>
                        ) : (
                          <h4 className="text-white">🤝 Conexión en progreso</h4>
                        )}
                      </div>
                      
                      <div className="space-y-3 text-sm">
                        {/* Sessions */}
                        <div className="flex items-center justify-between text-white/80">
                          <div className="flex items-center gap-2">
                            {getSessionDots(selectedAura.trustLevel.sessions)}
                            <span>{selectedAura.trustLevel.sessions} de 3 sesiones</span>
                          </div>
                        </div>
                        
                        {/* Time Progress */}
                        <div>
                          <div className="flex items-center justify-between text-white/80 mb-2">
                            <span>{selectedAura.trustLevel.minutesTogether}/45 min</span>
                            <span>{Math.round((selectedAura.trustLevel.minutesTogether / 45) * 100)}%</span>
                          </div>
                          <div className="h-1.5 bg-[#3D4463] rounded-full overflow-hidden">
                            <div 
                              className="h-full transition-all duration-300"
                              style={{
                                width: `${Math.min((selectedAura.trustLevel.minutesTogether / 45) * 100, 100)}%`,
                                background: `linear-gradient(90deg, ${getTrustProgressColor(selectedAura.trustLevel.minutesTogether, 45)}, ${getTrustProgressColor(selectedAura.trustLevel.minutesTogether, 45)})`
                              }}
                            />
                          </div>
                        </div>
                        
                        {/* Interactions */}
                        <div className="flex items-center gap-2 text-white/80">
                          <div className="flex gap-1">
                            {[...Array(Math.min(selectedAura.trustLevel.interactions, 3))].map((_, i) => (
                              <div key={i} className="w-3 h-3 rounded-full bg-[#6C5CE7]" />
                            ))}
                            {selectedAura.trustLevel.interactions < 2 && [...Array(2 - selectedAura.trustLevel.interactions)].map((_, i) => (
                              <div key={`empty-${i}`} className="w-3 h-3 rounded-full bg-[#3D4463]" />
                            ))}
                          </div>
                          <span>{selectedAura.trustLevel.interactions} interacciones</span>
                        </div>

                        {!selectedAura.trustLevel.unlocked && (
                          <div className="pt-2 border-t border-white/10">
                            <p className="text-white/60 text-xs text-center">
                              Sigue compartiendo para desbloquear chat
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* Iniciar Chat Button (only if unlocked) */}
                {selectedAura.trustLevel?.unlocked && (
                  <Button
                    onClick={() => window.location.href = '#trust'}
                    className="w-full h-14 bg-gradient-to-r from-[#6C5CE7] to-[#A29BFE] hover:from-[#5B4DD6] hover:to-[#9188ED] rounded-full shadow-lg text-base mb-3"
                  >
                    💬 Iniciar chat
                  </Button>
                )}

                <AnimatePresence mode="wait">
                  {sentReaction && sentReaction.auraId === selectedAura.id ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="bg-green-500/20 border border-green-500/30 rounded-lg p-4 text-center"
                    >
                      <Check className="w-6 h-6 text-green-400 mx-auto mb-2" />
                      <p className="text-green-300 text-sm">
                        {sentReaction.type === 'yoTambien' 
                          ? 'Conexión enviada' 
                          : 'Calma enviada'}
                      </p>
                    </motion.div>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="grid grid-cols-2 gap-3"
                    >
                      <Button
                        onClick={() => handleSendReaction('yoTambien', selectedAura.id)}
                        className="bg-white/10 hover:bg-white/20 text-white border border-white/20"
                      >
                        🤝 Yo también
                      </Button>
                      <Button
                        onClick={() => handleSendReaction('calma', selectedAura.id)}
                        className="bg-white/10 hover:bg-white/20 text-white border border-white/20"
                      >
                        🌊 Enviar calma
                      </Button>
                    </motion.div>
                  )}
                </AnimatePresence>

                <Button
                  onClick={() => setSelectedAura(null)}
                  variant="ghost"
                  className="w-full mt-4 text-white/60 hover:text-white hover:bg-white/5"
                  size="sm"
                >
                  Cerrar
                </Button>
              </Card>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Soundscape Selector - Bottom Panel */}
      <motion.div
        initial={{ y: 200 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.8 }}
        className="absolute bottom-0 left-0 right-0 z-20 p-4"
      >
        {/* Sound Control Button - FIXED VERSION */}
        <div className="max-w-md mx-auto mb-4">
          <button
            onClick={() => setShowSoundSelector(!showSoundSelector)}
            className="w-full h-14 bg-[#1E2640] border border-[#6C5CE7] rounded-2xl px-4 flex items-center justify-between shadow-lg shadow-purple-500/20 hover:scale-[0.98] transition-transform"
          >
            <div className="flex items-center gap-3 text-white">
              <span className="text-xl">🎧</span>
              <span className="font-medium">{soundscapes.find(s => s.id === currentSound)?.name || 'Lluvia'}</span>
            </div>
            <div className="flex items-center gap-2 text-white/80">
              {getVolumeIcon()}
              <motion.div
                animate={{ rotate: showSoundSelector ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </motion.div>
            </div>
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 max-w-md mx-auto">
          <Button
            onClick={() => window.location.href = '#chat'}
            className="flex-1 h-12 bg-gradient-to-r from-[#6C5CE7] to-[#A29BFE] hover:from-[#5B4DD6] hover:to-[#9188ED] rounded-full shadow-lg"
          >
            💬 Conectar
          </Button>
          <Button
            onClick={handleExit}
            variant="outline"
            className="px-6 h-12 border-white/30 text-white hover:bg-white/10 rounded-full"
          >
            Salir
          </Button>
        </div>
      </motion.div>

      {/* Sound Selector Modal */}
      <AnimatePresence>
        {showSoundSelector && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-30 flex items-center justify-center p-6 bg-black/60"
            onClick={() => setShowSoundSelector(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md"
            >
              <Card className="bg-[#1A1F3A] border-[#6C5CE7] p-6">
                <h3 className="text-white text-lg mb-4">🎧 Selecciona ambiente</h3>
                
                <div className="space-y-2 mb-6 max-h-[400px] overflow-y-auto">
                  {soundscapes.map((sound) => {
                    const isActive = currentSound === sound.id;
                    const isRecommended = myAura && sound.recommended.includes(myAura);
                    
                    return (
                      <button
                        key={sound.id}
                        onClick={() => {
                          setCurrentSound(sound.id);
                        }}
                        disabled={sound.premium}
                        className={`w-full p-3 rounded-xl border transition-all text-left flex items-center gap-3 ${
                          isActive
                            ? 'bg-white/20 border-white/40'
                            : sound.premium
                            ? 'bg-white/5 border-white/10 opacity-50 cursor-not-allowed'
                            : 'bg-white/5 border-white/10 hover:bg-white/10'
                        }`}
                      >
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                          isActive ? 'border-[#6C5CE7] bg-[#6C5CE7]' : 'border-white/30'
                        }`}>
                          {isActive && <div className="w-2 h-2 bg-white rounded-full" />}
                        </div>
                        <span className="text-2xl">{sound.icon}</span>
                        <div className="flex-1">
                          <div className="text-white flex items-center gap-2">
                            {sound.name}
                            {sound.premium && <span className="text-xs">👑</span>}
                            {isRecommended && !sound.premium && (
                              <span className="text-xs bg-green-500/20 text-green-300 px-2 py-0.5 rounded">
                                Recomendado
                              </span>
                            )}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>

                <div className="mb-6">
                  <h4 className="text-white/70 text-sm mb-3">Volumen:</h4>
                  <div className="flex items-center gap-3">
                    <div className="text-white/80">
                      {getVolumeIcon()}
                    </div>
                    <Slider
                      value={volume}
                      onValueChange={setVolume}
                      max={100}
                      step={1}
                      className="flex-1"
                    />
                    <span className="text-white/60 text-sm w-12 text-right">
                      {volume[0]}%
                    </span>
                  </div>
                </div>

                <Button
                  onClick={() => setShowSoundSelector(false)}
                  className="w-full h-12 bg-[#6C5CE7] hover:bg-[#5B4DD6] rounded-xl"
                >
                  Aplicar
                </Button>
              </Card>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}