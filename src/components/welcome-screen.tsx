import { motion } from 'motion/react';
import { Sprout, Heart, Sparkles } from 'lucide-react';
import { Button } from './ui/button';

interface WelcomeScreenProps {
  onEnter: () => void;
}

export function WelcomeScreen({ onEnter }: WelcomeScreenProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-blue-100 to-green-100 flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center max-w-2xl"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          className="inline-block mb-8"
        >
          <div className="w-24 h-24 bg-gradient-to-br from-purple-400 to-green-400 rounded-full flex items-center justify-center mx-auto">
            <Sprout className="w-12 h-12 text-white" />
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-6xl mb-4 text-purple-900"
        >
          Mindora
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-2xl text-purple-700 mb-12"
        >
          Siente, conecta, florece
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="space-y-6 mb-12"
        >
          <div className="flex items-start gap-4 text-left bg-white/50 backdrop-blur-sm p-6 rounded-2xl">
            <div className="w-10 h-10 bg-blue-200 rounded-full flex items-center justify-center flex-shrink-0">
              <Heart className="w-5 h-5 text-blue-700" />
            </div>
            <div>
              <h3 className="text-purple-900 mb-1">Conexión Genuina</h3>
              <p className="text-purple-700">Expresa lo que sientes y conecta con otros de forma auténtica, sin perfiles ni toxicidad</p>
            </div>
          </div>

          <div className="flex items-start gap-4 text-left bg-white/50 backdrop-blur-sm p-6 rounded-2xl">
            <div className="w-10 h-10 bg-purple-200 rounded-full flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-5 h-5 text-purple-700" />
            </div>
            <div>
              <h3 className="text-purple-900 mb-1">Auras y Conexión Relajante</h3>
              <p className="text-purple-700">Compañía sin palabras. Siente la presencia de otros sin presión social</p>
            </div>
          </div>

          <div className="flex items-start gap-4 text-left bg-white/50 backdrop-blur-sm p-6 rounded-2xl">
            <div className="w-10 h-10 bg-green-200 rounded-full flex items-center justify-center flex-shrink-0">
              <Sprout className="w-5 h-5 text-green-700" />
            </div>
            <div>
              <h3 className="text-purple-900 mb-1">Pasiones Offline</h3>
              <p className="text-purple-700">Redescubre quién eres fuera de las pantallas y cultiva tus hobbies</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Button
            onClick={onEnter}
            size="lg"
            className="bg-gradient-to-r from-purple-500 to-green-500 hover:from-purple-600 hover:to-green-600 text-white px-8 py-6 text-lg rounded-full"
          >
            Explorar Mindora
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
}
