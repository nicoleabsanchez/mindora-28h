import { motion } from 'motion/react';

export type PlantLevel = 'principiante' | 'intermedio' | 'pro';
export type PlantStage = 'semilla' | 'brote' | 'joven' | 'desarrollada' | 'madura' | 'florecida';

export interface Plant {
  id: string;
  name: string;
  type: string;
  level: PlantLevel;
  stage: PlantStage;
  daysGrowing: number;
  totalDays: number;
  points: number;
  icon: string;
  size: 'small' | 'medium' | 'large';
  position?: { x: number; y: number };
}

// Catálogo de plantas por nivel
export const PLANT_CATALOG = {
  principiante: [
    { name: 'Cactus', type: 'Suculenta', icon: '🌵', points: 5, days: 3 },
    { name: 'Albahaca', type: 'Hierba', icon: '🌿', points: 5, days: 3 },
    { name: 'Margarita', type: 'Flor', icon: '🌼', points: 5, days: 3 },
    { name: 'Suculenta', type: 'Planta decorativa', icon: '🪴', points: 5, days: 3 },
  ],
  intermedio: [
    { name: 'Tomate', type: 'Vegetal', icon: '🍅', points: 20, days: 14 },
    { name: 'Rosa', type: 'Arbusto', icon: '🌹', points: 20, days: 14 },
    { name: 'Helecho', type: 'Planta decorativa', icon: '🌿', points: 20, days: 14 },
    { name: 'Lavanda', type: 'Planta aromática', icon: '💜', points: 20, days: 14 },
    { name: 'Girasol', type: 'Flor grande', icon: '🌻', points: 20, days: 14 },
  ],
  pro: [
    { name: 'Cerezo', type: 'Árbol frutal', icon: '🌸', points: 100, days: 30 },
    { name: 'Manzano', type: 'Árbol frutal', icon: '🍎', points: 100, days: 30 },
    { name: 'Roble', type: 'Árbol ornamental', icon: '🌳', points: 100, days: 30 },
    { name: 'Pino', type: 'Árbol perenne', icon: '🌲', points: 100, days: 30 },
    { name: 'Limonero', type: 'Árbol frutal', icon: '🍋', points: 100, days: 30 },
  ]
};

// Obtener nivel de planta basado en días o puntos
export function getPlantLevel(days: number, points: number): PlantLevel {
  if (days >= 30 || points >= 200) return 'pro';
  if (days >= 7 || points >= 50) return 'intermedio';
  return 'principiante';
}

// Obtener etapa de crecimiento
export function getPlantStage(daysGrowing: number, totalDays: number): PlantStage {
  const progress = daysGrowing / totalDays;
  
  if (progress >= 1) return 'florecida';
  if (progress >= 0.8) return 'madura';
  if (progress >= 0.5) return 'desarrollada';
  if (progress >= 0.3) return 'joven';
  if (progress >= 0.1) return 'brote';
  return 'semilla';
}

// Obtener tamaño visual según etapa
export function getPlantSize(stage: PlantStage, level: PlantLevel): number {
  const baseSizes = {
    principiante: 40,
    intermedio: 60,
    pro: 100
  };

  const stageMultipliers: Record<PlantStage, number> = {
    semilla: 0.3,
    brote: 0.5,
    joven: 0.7,
    desarrollada: 0.85,
    madura: 0.95,
    florecida: 1
  };

  return baseSizes[level] * stageMultipliers[stage];
}

// Componente de planta animada
interface AnimatedPlantProps {
  plant: Plant;
  onClick?: () => void;
}

export function AnimatedPlant({ plant, onClick }: AnimatedPlantProps) {
  const size = getPlantSize(plant.stage, plant.level);
  const progress = (plant.daysGrowing / plant.totalDays) * 100;

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className="relative cursor-pointer"
      style={{
        width: `${size}px`,
        height: `${size}px`,
      }}
    >
      {/* Planta */}
      <motion.div
        className="text-center select-none"
        animate={{
          y: [0, -5, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
        style={{ fontSize: `${size * 0.8}px` }}
      >
        {plant.icon}
      </motion.div>

      {/* Progress ring */}
      <motion.div
        className="absolute inset-0 rounded-full border-4"
        style={{
          borderColor: progress >= 100 ? '#22c55e' : '#e5e7eb',
          borderTopColor: '#22c55e',
          transform: 'rotate(-90deg)',
        }}
        animate={{
          rotate: [-90, -90 + (progress / 100) * 360],
        }}
        transition={{ duration: 1, ease: 'easeOut' }}
      />

      {/* Brillo de completado */}
      {plant.stage === 'florecida' && (
        <motion.div
          className="absolute inset-0 bg-yellow-400 rounded-full blur-xl opacity-30"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        />
      )}
    </motion.div>
  );
}

// Componente de maceta/contenedor
interface PlantContainerProps {
  plant: Plant;
  scenario: 'jardin' | 'cabana' | 'terraza';
  onClick?: () => void;
}

export function PlantContainer({ plant, scenario, onClick }: PlantContainerProps) {
  const containerStyles = {
    jardin: 'bg-gradient-to-b from-amber-800 to-amber-900',
    cabana: 'bg-gradient-to-b from-red-700 to-red-900',
    terraza: 'bg-gradient-to-b from-gray-600 to-gray-800'
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <AnimatedPlant plant={plant} onClick={onClick} />
      
      {/* Maceta */}
      <div className={`w-16 h-12 rounded-b-lg ${containerStyles[scenario]} shadow-lg relative`}>
        <div className="absolute inset-x-0 top-0 h-2 bg-gradient-to-b from-white/20 to-transparent" />
      </div>

      {/* Nombre */}
      <p className="text-xs text-gray-700 font-medium text-center">
        {plant.name}
      </p>
    </div>
  );
}

// Componente de información de planta
interface PlantInfoProps {
  plant: Plant;
  onClose: () => void;
}

export function PlantInfo({ plant, onClose }: PlantInfoProps) {
  const progress = (plant.daysGrowing / plant.totalDays) * 100;

  const levelInfo = {
    principiante: { color: 'green', label: 'Principiante 🌱', bg: 'bg-green-100', text: 'text-green-700' },
    intermedio: { color: 'blue', label: 'Intermedio 🪴', bg: 'bg-blue-100', text: 'text-blue-700' },
    pro: { color: 'purple', label: 'Pro 🌳', bg: 'bg-purple-100', text: 'text-purple-700' }
  };

  const info = levelInfo[plant.level];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center p-6 z-50"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: 50 }}
        animate={{ y: 0 }}
        className="bg-white rounded-2xl p-6 max-w-sm w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="text-center mb-4">
          <div className="text-6xl mb-2">{plant.icon}</div>
          <h3 className="text-gray-900 text-xl font-semibold">{plant.name}</h3>
          <p className="text-gray-600 text-sm">{plant.type}</p>
        </div>

        <div className={`${info.bg} ${info.text} rounded-lg p-3 mb-4 text-center`}>
          <p className="font-semibold">{info.label}</p>
        </div>

        <div className="space-y-3">
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-600">Progreso</span>
              <span className="text-gray-900 font-semibold">{Math.round(progress)}%</span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-green-400 to-green-500"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 1, ease: 'easeOut' }}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="bg-gray-50 rounded-lg p-3">
              <p className="text-gray-600 text-xs mb-1">Días creciendo</p>
              <p className="text-gray-900 font-semibold">
                {plant.daysGrowing}/{plant.totalDays}
              </p>
            </div>
            <div className="bg-gray-50 rounded-lg p-3">
              <p className="text-gray-600 text-xs mb-1">Etapa actual</p>
              <p className="text-gray-900 font-semibold capitalize">
                {plant.stage}
              </p>
            </div>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
            <p className="text-yellow-800 text-xs text-center">
              ✨ Puntos ganados: <span className="font-semibold">{plant.points}</span>
            </p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full mt-4 bg-gradient-to-r from-green-500 to-green-600 text-white py-3 rounded-lg hover:opacity-90 transition-opacity"
        >
          Cerrar
        </button>
      </motion.div>
    </motion.div>
  );
}
