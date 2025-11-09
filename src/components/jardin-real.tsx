import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Settings as SettingsIcon, Award, TrendingUp, Star, Zap, Home } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { ScenarioSelector, ScenarioType } from './scenario-selector';
import { 
  Plant, 
  PlantLevel, 
  AnimatedPlant, 
  PlantContainer, 
  PlantInfo,
  PLANT_CATALOG,
  getPlantLevel,
  getPlantStage
} from './plant-system';
import { GardenBackground } from './svg/GardenBackground';
import { CabinBackground } from './svg/CabinBackground';
import { TerraceBackground } from './svg/TerraceBackground';

interface Hobby {
  id: string;
  name: string;
  icon: string;
  consecutiveDays: number;
  totalPoints: number;
  plants: Plant[];
  lastPracticed: Date | null;
}

const initialHobbies: Hobby[] = [
  {
    id: '1',
    name: 'Dibujar',
    icon: '🎨',
    consecutiveDays: 5,
    totalPoints: 25,
    lastPracticed: new Date(),
    plants: [
      {
        id: 'p1',
        name: 'Margarita',
        type: 'Flor',
        level: 'principiante',
        stage: 'florecida',
        daysGrowing: 3,
        totalDays: 3,
        points: 5,
        icon: '🌼',
        size: 'small'
      }
    ]
  },
  {
    id: '2',
    name: 'Leer',
    icon: '📚',
    consecutiveDays: 12,
    totalPoints: 60,
    lastPracticed: new Date(),
    plants: [
      {
        id: 'p2',
        name: 'Rosa',
        type: 'Arbusto',
        level: 'intermedio',
        stage: 'desarrollada',
        daysGrowing: 8,
        totalDays: 14,
        points: 20,
        icon: '🌹',
        size: 'medium'
      }
    ]
  },
  {
    id: '3',
    name: 'Ejercicio',
    icon: '🏃',
    consecutiveDays: 35,
    totalPoints: 210,
    lastPracticed: new Date(),
    plants: [
      {
        id: 'p3',
        name: 'Cerezo',
        type: 'Árbol frutal',
        level: 'pro',
        stage: 'madura',
        daysGrowing: 28,
        totalDays: 30,
        points: 100,
        icon: '🌸',
        size: 'large'
      }
    ]
  }
];

export function JardinReal() {
  const [scenario, setScenario] = useState<ScenarioType | null>(null);
  const [hobbies, setHobbies] = useState<Hobby[]>(initialHobbies);
  const [selectedPlant, setSelectedPlant] = useState<Plant | null>(null);
  const [showSettings, setShowSettings] = useState(false);
  const [showAchievements, setShowAchievements] = useState(false);

  // Función para agregar una sesión al hábito
  const addSession = (hobbyId: string) => {
    setHobbies(prevHobbies => 
      prevHobbies.map(hobby => {
        if (hobby.id !== hobbyId) return hobby;

        const newConsecutiveDays = hobby.consecutiveDays + 1;
        const newTotalPoints = hobby.totalPoints + 5; // 5 puntos por sesión
        const today = new Date();

        // Actualizar plantas existentes
        const updatedPlants = hobby.plants.map(plant => ({
          ...plant,
          daysGrowing: plant.daysGrowing + 1,
          totalDays: plant.totalDays + 1,
          points: plant.points + 5,
          stage: getPlantStage(plant.daysGrowing + 1, plant.totalDays + 1)
        }));

        return {
          ...hobby,
          consecutiveDays: newConsecutiveDays,
          totalPoints: newTotalPoints,
          lastPracticed: today,
          plants: updatedPlants
        };
      })
    );
  };

  // Calcular estadísticas totales
  const totalPoints = hobbies.reduce((sum, h) => sum + h.totalPoints, 0);
  const totalPlants = hobbies.reduce((sum, h) => sum + h.plants.length, 0);
  const proPlants = hobbies.reduce((sum, h) => sum + h.plants.filter(p => p.level === 'pro').length, 0);

  if (!scenario) {
    return (
      <ScenarioSelector 
        onSelect={setScenario}
        currentScenario={scenario || undefined}
      />
    );
  }

  const renderScenarioBackground = () => {
    switch (scenario) {
      case 'jardin':
        return <GardenBackground />;
      case 'cabana':
        return <CabinBackground />;
      case 'terraza':
        return <TerraceBackground />;
    }
  };

  return (
    <>
      <div className="min-h-screen relative overflow-hidden pb-24">
      {/* Background */}
      {renderScenarioBackground()}

      {/* Content */}
      <div className="relative z-10 p-6">
        {/* Header */}
        <div className="max-w-4xl mx-auto mb-6">
          <div className="flex items-center justify-between mb-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => window.location.hash = ''}
              className="text-white hover:text-white/80 drop-shadow-lg"
            >
              <Home className="w-4 h-4 mr-2" />
              Inicio
            </Button>
            <div className="flex-1" />
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowAchievements(true)}
                className="bg-white/20 hover:bg-white/30 text-white"
              >
                <Award className="w-5 h-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowSettings(true)}
                className="bg-white/20 hover:bg-white/30 text-white"
              >
                <SettingsIcon className="w-5 h-5" />
              </Button>
            </div>
          </div>
          <div>
            <h1 className="text-black text-3xl drop-shadow-lg">
              Mi {scenario === 'jardin' ? 'Jardín' : scenario === 'cabana' ? 'Cabaña' : 'Terraza'} Real 🌿
            </h1>
            <p className="text-black/90 text-sm drop-shadow">
              Cultiva tus hábitos fuera de pantallas
            </p>
          </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3">
            <Card className="bg-white/90 backdrop-blur-sm p-3 text-center">
              <div className="text-2xl mb-1">🌱</div>
              <p className="text-gray-600 text-xs">Total Plantas</p>
              <p className="text-gray-900 font-semibold text-lg">{totalPlants}</p>
            </Card>
            <Card className="bg-white/90 backdrop-blur-sm p-3 text-center">
              <div className="text-2xl mb-1">⭐</div>
              <p className="text-gray-600 text-xs">Puntos</p>
              <p className="text-gray-900 font-semibold text-lg">{totalPoints}</p>
            </Card>
            <Card className="bg-white/90 backdrop-blur-sm p-3 text-center">
              <div className="text-2xl mb-1">🌳</div>
              <p className="text-gray-600 text-xs">Árboles Pro</p>
              <p className="text-gray-900 font-semibold text-lg">{proPlants}</p>
            </Card>
          </div>
        </div>

        {/* Hobbies y Plantas */}
        <div className="max-w-4xl mx-auto space-y-6">
          {hobbies.map((hobby) => (
            <Card key={hobby.id} className="bg-white/95 backdrop-blur-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="text-4xl">{hobby.icon}</div>
                  <div>
                    <h3 className="text-gray-900 text-lg font-semibold">{hobby.name}</h3>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-xs text-gray-600">
                        🔥 {hobby.consecutiveDays} días
                      </span>
                      <span className="text-xs text-gray-600">
                        ⭐ {hobby.totalPoints} puntos
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {/* Nivel disponible */}
                  <div className="text-center">
                    {(() => {
                      const level = getPlantLevel(hobby.consecutiveDays, hobby.totalPoints);
                      const levelInfo = {
                        principiante: { icon: '🌱', label: 'Principiante', color: 'bg-green-100 text-green-700' },
                        intermedio: { icon: '🪴', label: 'Intermedio', color: 'bg-blue-100 text-blue-700' },
                        pro: { icon: '🌳', label: 'Pro', color: 'bg-purple-100 text-purple-700' }
                      };
                      const info = levelInfo[level];

                      return (
                        <div className={`${info.color} px-3 py-1 rounded-full text-xs font-semibold`}>
                          {info.icon} {info.label}
                        </div>
                      );
                    })()}
                  </div>

                  {/* Botón agregar sesión */}
                  <Button
                    onClick={() => addSession(hobby.id)}
                    className="bg-green-600 hover:bg-green-700 text-white"
                    size="sm"
                  >
                    <Zap className="w-4 h-4 mr-1" />
                    Sesión
                  </Button>
                </div>
              </div>

              {/* Progress bar */}
              <div className="mb-4">
                <div className="flex justify-between text-xs text-gray-600 mb-1">
                  <span>Progreso al siguiente nivel</span>
                  <span>
                    {(() => {
                      const currentLevel = getPlantLevel(hobby.consecutiveDays, hobby.totalPoints);
                      if (currentLevel === 'pro') return '¡Máximo nivel!';
                      if (currentLevel === 'intermedio') {
                        const needed = 30 - hobby.consecutiveDays;
                        return `${needed} días para Pro`;
                      }
                      const needed = 7 - hobby.consecutiveDays;
                      return `${needed} días para Intermedio`;
                    })()}
                  </span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-green-400 to-green-500"
                    initial={{ width: 0 }}
                    animate={{ 
                      width: `${(() => {
                        const level = getPlantLevel(hobby.consecutiveDays, hobby.totalPoints);
                        if (level === 'pro') return 100;
                        if (level === 'intermedio') return (hobby.consecutiveDays / 30) * 100;
                        return (hobby.consecutiveDays / 7) * 100;
                      })()}%` 
                    }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                  />
                </div>
              </div>

              {/* Plantas */}
              <div className="flex flex-wrap gap-6 justify-center">
                {hobby.plants.map((plant) => (
                  <PlantContainer
                    key={plant.id}
                    plant={plant}
                    scenario={scenario}
                    onClick={() => setSelectedPlant(plant)}
                  />
                ))}
                
                {/* Botón agregar planta */}
                <button
                  className="flex flex-col items-center gap-2 opacity-60 hover:opacity-100 transition-opacity"
                  onClick={() => {
                    // Lógica para agregar nueva planta
                    alert('¡Sigue practicando para desbloquear más plantas!');
                  }}
                >
                  <div className="w-16 h-16 border-2 border-dashed border-gray-400 rounded-full flex items-center justify-center">
                    <Plus className="w-6 h-6 text-gray-400" />
                  </div>
                  <p className="text-xs text-gray-500">Agregar</p>
                </button>
              </div>
            </Card>
          ))}

          {/* Botón agregar hobby */}
          <Card className="bg-white/80 backdrop-blur-sm p-6 border-2 border-dashed border-gray-300 hover:border-green-400 transition-colors cursor-pointer">
            <button 
              className="w-full flex flex-col items-center gap-2 text-gray-600 hover:text-green-600"
              onClick={() => {
                alert('Próximamente podrás agregar tus propios hábitos personalizados. Por ahora, los ejemplos demuestran cómo funcionaría. 🌱');
              }}
            >
              <Plus className="w-8 h-8" />
              <p className="font-semibold">Agregar Nuevo Hábito</p>
            </button>
          </Card>
        </div>
      </div>

      <AnimatePresence>
        {showSettings && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-6 z-50"
            onClick={() => setShowSettings(false)}
          >
            <Card 
              className="bg-white p-6 max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-gray-900 text-xl font-semibold mb-4">Configuración</h3>
              
              <div className="space-y-4">
                <div>
                  <p className="text-gray-700 text-sm mb-2">Escenario actual:</p>
                  <div className="bg-gray-100 rounded-lg p-3">
                    <p className="text-gray-900 font-semibold">
                      {scenario === 'jardin' ? '🌱 Jardín' : scenario === 'cabana' ? '🏡 Cabaña' : '🏙️ Terraza Urbana'}
                    </p>
                  </div>
                </div>

                <Button
                  onClick={() => {
                    setScenario(null);
                    setShowSettings(false);
                  }}
                  variant="outline"
                  className="w-full"
                >
                  Cambiar Escenario
                </Button>

                <Button
                  onClick={() => setShowSettings(false)}
                  className="w-full bg-gray-900 hover:bg-gray-800"
                >
                  Cerrar
                </Button>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Achievements Modal */}
      <AnimatePresence>
        {showAchievements && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-6 z-50"
            onClick={() => setShowAchievements(false)}
          >
            <Card 
              className="bg-white p-6 max-w-md w-full max-h-[80vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-2 mb-6">
                <Award className="w-6 h-6 text-yellow-500" />
                <h3 className="text-gray-900 text-xl font-semibold">Logros</h3>
              </div>

              <div className="space-y-3">
                {[
                  { 
                    icon: '🌱', 
                    title: 'Primera Semilla', 
                    desc: 'Planta tu primera semilla',
                    unlocked: totalPlants >= 1
                  },
                  { 
                    icon: '🌸', 
                    title: 'Jardinero Dedicado', 
                    desc: 'Mantén 7 días de racha',
                    unlocked: hobbies.some(h => h.consecutiveDays >= 7)
                  },
                  { 
                    icon: '🌳', 
                    title: 'Bosque Personal', 
                    desc: 'Cultiva 3 árboles grandes',
                    unlocked: proPlants >= 3
                  },
                  { 
                    icon: '🔥', 
                    title: 'Racha Verde 100', 
                    desc: '100 días consecutivos',
                    unlocked: false
                  },
                  { 
                    icon: '⭐', 
                    title: 'Maestro del Jardín', 
                    desc: 'Alcanza 1000 puntos',
                    unlocked: totalPoints >= 1000
                  }
                ].map((achievement, i) => (
                  <div
                    key={i}
                    className={`flex items-center gap-4 p-4 rounded-lg border-2 ${
                      achievement.unlocked
                        ? 'bg-yellow-50 border-yellow-300'
                        : 'bg-gray-50 border-gray-200 opacity-60'
                    }`}
                  >
                    <div className="text-3xl">{achievement.icon}</div>
                    <div className="flex-1">
                      <h4 className="text-gray-900 font-semibold">{achievement.title}</h4>
                      <p className="text-gray-600 text-sm">{achievement.desc}</p>
                    </div>
                    {achievement.unlocked && (
                      <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                    )}
                  </div>
                ))}
              </div>

              <Button
                onClick={() => setShowAchievements(false)}
                className="w-full mt-6 bg-gray-900 hover:bg-gray-800"
              >
                Cerrar
              </Button>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Plant Info Modal */}
      <AnimatePresence>
        {selectedPlant && (
          <PlantInfo
            plant={selectedPlant}
            onClose={() => setSelectedPlant(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
