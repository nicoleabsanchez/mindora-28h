import { motion } from 'motion/react';

export function GardenBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Sky gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-sky-400 via-sky-300 to-sky-200" />
      
      {/* Sun */}
      <motion.div
        className="absolute top-8 right-16"
        animate={{
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <svg width="100" height="100" viewBox="0 0 100 100">
          {/* Sun rays */}
          <g opacity="0.6">
            {[...Array(8)].map((_, i) => (
              <motion.line
                key={i}
                x1="50"
                y1="50"
                x2="50"
                y2="15"
                stroke="#FDB813"
                strokeWidth="3"
                strokeLinecap="round"
                transform={`rotate(${i * 45} 50 50)`}
                initial={{ opacity: 0.4 }}
                animate={{ opacity: [0.4, 0.8, 0.4] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.1,
                }}
              />
            ))}
          </g>
          {/* Sun circle */}
          <circle cx="50" cy="50" r="25" fill="#FFD700" />
          <circle cx="50" cy="50" r="20" fill="#FDB813" opacity="0.8" />
        </svg>
      </motion.div>

      {/* Clouds */}
      <motion.div
        className="absolute top-20 left-12"
        animate={{ x: [0, 20, 0] }}
        transition={{ duration: 8, repeat: Infinity }}
      >
        <svg width="120" height="60" viewBox="0 0 120 60">
          <ellipse cx="30" cy="40" rx="25" ry="20" fill="white" opacity="0.8" />
          <ellipse cx="55" cy="35" rx="30" ry="25" fill="white" opacity="0.8" />
          <ellipse cx="85" cy="40" rx="25" ry="20" fill="white" opacity="0.8" />
        </svg>
      </motion.div>

      <motion.div
        className="absolute top-32 right-24"
        animate={{ x: [0, -15, 0] }}
        transition={{ duration: 10, repeat: Infinity }}
      >
        <svg width="140" height="70" viewBox="0 0 140 70">
          <ellipse cx="35" cy="45" rx="30" ry="25" fill="white" opacity="0.7" />
          <ellipse cx="65" cy="40" rx="35" ry="30" fill="white" opacity="0.7" />
          <ellipse cx="100" cy="45" rx="30" ry="25" fill="white" opacity="0.7" />
        </svg>
      </motion.div>

      {/* Hills in background */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg width="100%" height="200" viewBox="0 0 1200 200" preserveAspectRatio="none">
          <path
            d="M0,100 Q300,40 600,80 T1200,100 L1200,200 L0,200 Z"
            fill="#86EFAC"
            opacity="0.4"
          />
          <path
            d="M0,130 Q300,70 600,110 T1200,130 L1200,200 L0,200 Z"
            fill="#4ADE80"
            opacity="0.5"
          />
        </svg>
      </div>

      {/* Ground/Grass */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-green-600 via-green-500 to-transparent" />
      
      {/* Grass blades */}
      <div className="absolute bottom-0 left-0 right-0 h-40">
        <svg width="100%" height="160" viewBox="0 0 1200 160" preserveAspectRatio="none">
          <defs>
            <linearGradient id="grassGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#22C55E" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#16A34A" stopOpacity="0.9" />
            </linearGradient>
          </defs>
          {[...Array(80)].map((_, i) => {
            const x = (i / 80) * 1200;
            const height = 15 + Math.random() * 25;
            const curve = 5 + Math.random() * 10;
            return (
              <motion.path
                key={i}
                d={`M${x},160 Q${x + curve},${160 - height / 2} ${x},${160 - height}`}
                stroke="url(#grassGradient)"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.6 }}
                transition={{ duration: 0.5, delay: i * 0.01 }}
              />
            );
          })}
        </svg>
      </div>

      {/* Flowers scattered */}
      <div className="absolute bottom-8 left-16">
        <FlowerCluster color="#FF69B4" />
      </div>
      <div className="absolute bottom-12 right-32">
        <FlowerCluster color="#FFD700" />
      </div>
      <div className="absolute bottom-20 left-1/3">
        <FlowerCluster color="#9370DB" />
      </div>

      {/* Butterflies */}
      <motion.div
        className="absolute top-40 left-1/4"
        animate={{
          x: [0, 100, 0],
          y: [0, -50, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <Butterfly color="#FFB6C1" />
      </motion.div>
    </div>
  );
}

function FlowerCluster({ color }: { color: string }) {
  return (
    <svg width="60" height="50" viewBox="0 0 60 50">
      {[0, 1, 2].map((i) => (
        <g key={i} transform={`translate(${i * 20}, ${Math.random() * 10})`}>
          {/* Stem */}
          <line x1="10" y1="50" x2="10" y2="20" stroke="#16A34A" strokeWidth="2" />
          {/* Flower */}
          <motion.g
            animate={{
              rotate: [0, 5, 0, -5, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.5,
            }}
          >
            {[...Array(5)].map((_, j) => (
              <ellipse
                key={j}
                cx={10 + Math.cos((j * 72 * Math.PI) / 180) * 5}
                cy={20 + Math.sin((j * 72 * Math.PI) / 180) * 5}
                rx="4"
                ry="6"
                fill={color}
                transform={`rotate(${j * 72} 10 20)`}
              />
            ))}
            <circle cx="10" cy="20" r="3" fill="#FFA500" />
          </motion.g>
        </g>
      ))}
    </svg>
  );
}

function Butterfly({ color }: { color: string }) {
  return (
    <motion.svg
      width="40"
      height="40"
      viewBox="0 0 40 40"
      animate={{
        rotate: [-5, 5, -5],
      }}
      transition={{
        duration: 0.5,
        repeat: Infinity,
      }}
    >
      {/* Body */}
      <ellipse cx="20" cy="20" rx="2" ry="8" fill="#1F2937" />
      
      {/* Left wings */}
      <motion.ellipse
        cx="12"
        cy="18"
        rx="8"
        ry="10"
        fill={color}
        animate={{ scaleX: [1, 0.8, 1] }}
        transition={{ duration: 0.3, repeat: Infinity }}
      />
      <ellipse cx="12" cy="18" rx="5" ry="7" fill="white" opacity="0.3" />
      
      {/* Right wings */}
      <motion.ellipse
        cx="28"
        cy="18"
        rx="8"
        ry="10"
        fill={color}
        animate={{ scaleX: [1, 0.8, 1] }}
        transition={{ duration: 0.3, repeat: Infinity }}
      />
      <ellipse cx="28" cy="18" rx="5" ry="7" fill="white" opacity="0.3" />
      
      {/* Antennae */}
      <path
        d="M 20 12 Q 18 8 16 6"
        stroke="#1F2937"
        strokeWidth="1"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M 20 12 Q 22 8 24 6"
        stroke="#1F2937"
        strokeWidth="1"
        fill="none"
        strokeLinecap="round"
      />
    </motion.svg>
  );
}
