import { motion } from 'motion/react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Check } from 'lucide-react';

export type ScenarioType = 'jardin' | 'cabana' | 'terraza';

interface Scenario {
  id: ScenarioType;
  icon: string;
  name: string;
  description: string;
  idealFor: string;
  gradient: string;
}

const scenarios: Scenario[] = [
  {
    id: 'jardin',
    icon: '🌱',
    name: 'Jardín',
    description: 'Cultiva tu espacio verde al aire libre',
    idealFor: 'Amantes de la naturaleza y jardinería tradicional',
    gradient: 'from-green-400 to-emerald-500'
  },
  {
    id: 'cabana',
    icon: '🏡',
    name: 'Cabaña',
    description: 'Crea tu refugio verde interior',
    idealFor: 'Quienes prefieren espacios íntimos y hogareños',
    gradient: 'from-amber-400 to-orange-500'
  },
  {
    id: 'terraza',
    icon: '🏙️',
    name: 'Terraza Urbana',
    description: 'Transforma tu espacio urbano en un oasis',
    idealFor: 'Personas en apartamentos o espacios pequeños',
    gradient: 'from-blue-400 to-indigo-500'
  }
];

interface ScenarioSelectorProps {
  onSelect: (scenario: ScenarioType) => void;
  currentScenario?: ScenarioType;
}

export function ScenarioSelector({ onSelect, currentScenario }: ScenarioSelectorProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 p-6 pb-24">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-gray-900 text-3xl mb-3">
            Elige tu Espacio 🌿
          </h1>
          <p className="text-gray-600 text-sm">
            Selecciona el escenario donde quieres cultivar tus hábitos
          </p>
        </motion.div>

        <div className="space-y-4">
          {scenarios.map((scenario, index) => (
            <motion.div
              key={scenario.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card
                className={`relative overflow-hidden cursor-pointer transition-all hover:scale-[1.02] ${
                  currentScenario === scenario.id
                    ? 'ring-2 ring-green-500 shadow-lg'
                    : 'hover:shadow-md'
                }`}
                onClick={() => onSelect(scenario.id)}
              >
                {/* Gradient Background */}
                <div className={`absolute inset-0 bg-gradient-to-r ${scenario.gradient} opacity-10`} />

                <div className="relative p-6">
                  <div className="flex items-start gap-4">
                    {/* Icon */}
                    <div className={`text-6xl bg-gradient-to-r ${scenario.gradient} bg-clip-text`}>
                      {scenario.icon}
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-gray-900 text-xl font-semibold">
                          {scenario.name}
                        </h3>
                        {currentScenario === scenario.id && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="bg-green-500 rounded-full p-1"
                          >
                            <Check className="w-4 h-4 text-white" />
                          </motion.div>
                        )}
                      </div>

                      <p className="text-gray-700 text-sm mb-3">
                        {scenario.description}
                      </p>

                      <div className="bg-white/60 rounded-lg p-3">
                        <p className="text-gray-600 text-xs">
                          <span className="font-semibold">Ideal para:</span>{' '}
                          {scenario.idealFor}
                        </p>
                      </div>
                    </div>
                  </div>

                  {currentScenario === scenario.id && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-4 pt-4 border-t border-gray-200"
                    >
                      <Button
                        className={`w-full bg-gradient-to-r ${scenario.gradient} hover:opacity-90`}
                      >
                        ✓ Escenario Seleccionado
                      </Button>
                    </motion.div>
                  )}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {currentScenario && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8"
          >
            <Card className="bg-gradient-to-r from-purple-500 to-blue-500 p-6 text-center text-white">
              <p className="text-sm mb-4">
                ✨ ¡Perfecto! Ahora comienza a cultivar tus hábitos
              </p>
              <p className="text-xs opacity-90">
                Puedes cambiar tu escenario en cualquier momento desde configuración
              </p>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  );
}