import { motion } from 'motion/react';

interface PlantSVGProps {
  size?: number;
  stage: 'semilla' | 'brote' | 'joven' | 'desarrollada' | 'madura' | 'florecida';
}

// Cactus Plant
export function CactusSVG({ size = 60, stage }: PlantSVGProps) {
  const stageScale = {
    semilla: 0.3,
    brote: 0.5,
    joven: 0.65,
    desarrollada: 0.8,
    madura: 0.95,
    florecida: 1,
  }[stage];

  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      initial={{ scale: 0 }}
      animate={{ scale: stageScale }}
      transition={{ type: 'spring', stiffness: 200 }}
    >
      {/* Main body */}
      <ellipse cx="50" cy="65" rx="18" ry="28" fill="#2D5016" />
      <ellipse cx="50" cy="65" rx="15" ry="25" fill="#3A661E" />
      
      {/* Arms (only if developed enough) */}
      {stage !== 'semilla' && stage !== 'brote' && (
        <>
          <ellipse cx="30" cy="60" rx="8" ry="15" fill="#3A661E" />
          <ellipse cx="70" cy="60" rx="8" ry="15" fill="#3A661E" />
        </>
      )}
      
      {/* Spines */}
      {[...Array(12)].map((_, i) => (
        <line
          key={i}
          x1="50"
          y1="45"
          x2={50 + Math.cos((i * 30 * Math.PI) / 180) * 8}
          y2={45 + Math.sin((i * 30 * Math.PI) / 180) * 8}
          stroke="#FAFAFA"
          strokeWidth="1"
        />
      ))}
      
      {/* Flower on top (only when florecida) */}
      {stage === 'florecida' && (
        <motion.g
          animate={{ rotate: [0, 5, 0, -5, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          {[...Array(6)].map((_, i) => (
            <ellipse
              key={i}
              cx={50 + Math.cos((i * 60 * Math.PI) / 180) * 8}
              cy={35 + Math.sin((i * 60 * Math.PI) / 180) * 8}
              rx="5"
              ry="8"
              fill="#FF1744"
              transform={`rotate(${i * 60} 50 35)`}
            />
          ))}
          <circle cx="50" cy="35" r="4" fill="#FFD600" />
        </motion.g>
      )}
    </motion.svg>
  );
}

// Flower (Margarita/Daisy)
export function FlowerSVG({ size = 60, stage }: PlantSVGProps) {
  const stageScale = {
    semilla: 0.2,
    brote: 0.4,
    joven: 0.6,
    desarrollada: 0.8,
    madura: 0.9,
    florecida: 1,
  }[stage];

  const stemHeight = stage === 'semilla' ? 10 : stage === 'brote' ? 20 : 35;

  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      initial={{ scale: 0 }}
      animate={{ scale: stageScale }}
      transition={{ type: 'spring', stiffness: 200 }}
    >
      {/* Stem */}
      <motion.line
        x1="50"
        y1="90"
        x2="50"
        y2={90 - stemHeight}
        stroke="#2E7D32"
        strokeWidth="3"
        strokeLinecap="round"
        animate={{ pathLength: [0, 1] }}
        transition={{ duration: 2 }}
      />
      
      {/* Leaves */}
      {stage !== 'semilla' && (
        <>
          <motion.ellipse
            cx="40"
            cy="75"
            rx="6"
            ry="10"
            fill="#43A047"
            transform="rotate(-30 40 75)"
            animate={{ rotate: [-35, -25, -35] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
          <motion.ellipse
            cx="60"
            cy="70"
            rx="6"
            ry="10"
            fill="#43A047"
            transform="rotate(30 60 70)"
            animate={{ rotate: [25, 35, 25] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
        </>
      )}
      
      {/* Flower head */}
      {(stage === 'desarrollada' || stage === 'madura' || stage === 'florecida') && (
        <motion.g
          animate={{
            y: [0, -2, 0],
            rotate: [0, 3, 0, -3, 0],
          }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          {/* Petals */}
          {[...Array(8)].map((_, i) => (
            <motion.ellipse
              key={i}
              cx={50 + Math.cos((i * 45 * Math.PI) / 180) * 12}
              cy={55 - stemHeight + Math.sin((i * 45 * Math.PI) / 180) * 12}
              rx="6"
              ry="12"
              fill="white"
              stroke="#FFE082"
              strokeWidth="1"
              transform={`rotate(${i * 45} 50 ${55 - stemHeight})`}
              initial={{ scale: 0 }}
              animate={{ scale: stage === 'florecida' ? 1 : 0.8 }}
            />
          ))}
          {/* Center */}
          <circle cx="50" cy={55 - stemHeight} r="6" fill="#FFD600" />
          <circle cx="50" cy={55 - stemHeight} r="4" fill="#FFA000" opacity="0.5" />
        </motion.g>
      )}
    </motion.svg>
  );
}

// Rose Bush
export function RoseSVG({ size = 80, stage }: PlantSVGProps) {
  const stageScale = {
    semilla: 0.3,
    brote: 0.5,
    joven: 0.65,
    desarrollada: 0.82,
    madura: 0.93,
    florecida: 1,
  }[stage];

  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      initial={{ scale: 0 }}
      animate={{ scale: stageScale }}
      transition={{ type: 'spring', stiffness: 200 }}
    >
      {/* Main stems */}
      <motion.path
        d="M 60 100 Q 55 70 50 40"
        stroke="#2E7D32"
        strokeWidth="4"
        fill="none"
        animate={{ pathLength: [0, 1] }}
        transition={{ duration: 2 }}
      />
      <motion.path
        d="M 60 100 Q 60 70 60 35"
        stroke="#2E7D32"
        strokeWidth="4"
        fill="none"
        animate={{ pathLength: [0, 1] }}
        transition={{ duration: 2, delay: 0.2 }}
      />
      <motion.path
        d="M 60 100 Q 65 70 70 40"
        stroke="#2E7D32"
        strokeWidth="4"
        fill="none"
        animate={{ pathLength: [0, 1] }}
        transition={{ duration: 2, delay: 0.4 }}
      />
      
      {/* Thorns */}
      {stage !== 'semilla' && stage !== 'brote' &&
        [...Array(8)].map((_, i) => (
          <line
            key={i}
            x1="60"
            y1={100 - i * 10}
            x2={55 + (i % 2) * 10}
            y2={95 - i * 10}
            stroke="#1B5E20"
            strokeWidth="2"
          />
        ))}
      
      {/* Leaves */}
      {stage !== 'semilla' &&
        [45, 55, 65, 75].map((y, i) => (
          <motion.g
            key={i}
            animate={{ rotate: [-3, 3, -3] }}
            transition={{ duration: 3, repeat: Infinity, delay: i * 0.2 }}
          >
            <ellipse
              cx={40 + (i % 2) * 40}
              cy={y}
              rx="8"
              ry="12"
              fill="#43A047"
              transform={`rotate(${(i % 2) * 180 - 45} ${40 + (i % 2) * 40} ${y})`}
            />
          </motion.g>
        ))}
      
      {/* Roses */}
      {(stage === 'desarrollada' || stage === 'madura' || stage === 'florecida') && (
        <>
          <Rose x={50} y={35} size={stage === 'florecida' ? 1 : 0.8} />
          {stage !== 'desarrollada' && <Rose x={60} y={30} size={stage === 'florecida' ? 1 : 0.8} />}
          {stage === 'florecida' && <Rose x={70} y={35} size={1} />}
        </>
      )}
    </motion.svg>
  );
}

function Rose({ x, y, size }: { x: number; y: number; size: number }) {
  return (
    <motion.g
      animate={{
        scale: [size, size * 1.05, size],
      }}
      transition={{ duration: 3, repeat: Infinity }}
    >
      {/* Outer petals */}
      {[...Array(5)].map((_, i) => (
        <ellipse
          key={`outer-${i}`}
          cx={x + Math.cos((i * 72 * Math.PI) / 180) * 8}
          cy={y + Math.sin((i * 72 * Math.PI) / 180) * 8}
          rx="6"
          ry="10"
          fill="#E91E63"
          transform={`rotate(${i * 72} ${x} ${y})`}
        />
      ))}
      {/* Inner petals */}
      {[...Array(5)].map((_, i) => (
        <ellipse
          key={`inner-${i}`}
          cx={x + Math.cos((i * 72 * Math.PI) / 180 + 36) * 5}
          cy={y + Math.sin((i * 72 * Math.PI) / 180 + 36) * 5}
          rx="4"
          ry="7"
          fill="#F06292"
          transform={`rotate(${i * 72 + 36} ${x} ${y})`}
        />
      ))}
      {/* Center */}
      <circle cx={x} cy={y} r="4" fill="#C2185B" />
    </motion.g>
  );
}

// Cherry Tree
export function CherryTreeSVG({ size = 100, stage }: PlantSVGProps) {
  const stageScale = {
    semilla: 0.25,
    brote: 0.4,
    joven: 0.6,
    desarrollada: 0.75,
    madura: 0.9,
    florecida: 1,
  }[stage];

  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 150 150"
      initial={{ scale: 0 }}
      animate={{ scale: stageScale }}
      transition={{ type: 'spring', stiffness: 200 }}
    >
      {/* Trunk */}
      <motion.path
        d="M 75 140 L 75 100 Q 75 80 70 60 Q 75 70 75 50"
        stroke="#3E2723"
        strokeWidth="8"
        fill="none"
        strokeLinecap="round"
        animate={{ pathLength: [0, 1] }}
        transition={{ duration: 2 }}
      />
      <motion.path
        d="M 75 140 L 75 100 Q 75 80 80 60"
        stroke="#3E2723"
        strokeWidth="6"
        fill="none"
        strokeLinecap="round"
        animate={{ pathLength: [0, 1] }}
        transition={{ duration: 2, delay: 0.3 }}
      />
      
      {/* Branches */}
      {stage !== 'semilla' && stage !== 'brote' && (
        <>
          <motion.path
            d="M 70 60 Q 50 55 35 50"
            stroke="#5D4037"
            strokeWidth="4"
            fill="none"
            animate={{ pathLength: [0, 1] }}
            transition={{ duration: 1.5, delay: 0.5 }}
          />
          <motion.path
            d="M 80 60 Q 100 55 115 50"
            stroke="#5D4037"
            strokeWidth="4"
            fill="none"
            animate={{ pathLength: [0, 1] }}
            transition={{ duration: 1.5, delay: 0.6 }}
          />
          <motion.path
            d="M 75 50 Q 65 40 60 25"
            stroke="#5D4037"
            strokeWidth="3"
            fill="none"
            animate={{ pathLength: [0, 1] }}
            transition={{ duration: 1.5, delay: 0.7 }}
          />
          <motion.path
            d="M 75 50 Q 85 40 90 25"
            stroke="#5D4037"
            strokeWidth="3"
            fill="none"
            animate={{ pathLength: [0, 1] }}
            transition={{ duration: 1.5, delay: 0.8 }}
          />
        </>
      )}
      
      {/* Foliage clouds */}
      {(stage === 'joven' || stage === 'desarrollada' || stage === 'madura' || stage === 'florecida') && (
        <>
          <motion.ellipse
            cx="75"
            cy="35"
            rx="35"
            ry="30"
            fill={stage === 'florecida' ? '#FFB6C1' : '#4CAF50'}
            opacity="0.8"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1, delay: 1 }}
          />
          <motion.ellipse
            cx="50"
            cy="50"
            rx="28"
            ry="25"
            fill={stage === 'florecida' ? '#FFC0CB' : '#66BB6A'}
            opacity="0.8"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1, delay: 1.1 }}
          />
          <motion.ellipse
            cx="100"
            cy="50"
            rx="28"
            ry="25"
            fill={stage === 'florecida' ? '#FFB6C1' : '#66BB6A'}
            opacity="0.8"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
          />
        </>
      )}
      
      {/* Cherry blossoms (when florecida) */}
      {stage === 'florecida' &&
        [...Array(20)].map((_, i) => {
          const x = 45 + Math.random() * 60;
          const y = 25 + Math.random() * 40;
          return (
            <motion.g
              key={i}
              initial={{ scale: 0, opacity: 0 }}
              animate={{
                scale: 1,
                opacity: [0.6, 1, 0.6],
              }}
              transition={{
                duration: 2,
                delay: 1.5 + i * 0.1,
                repeat: Infinity,
              }}
            >
              {[...Array(5)].map((_, j) => (
                <ellipse
                  key={j}
                  cx={x + Math.cos((j * 72 * Math.PI) / 180) * 3}
                  cy={y + Math.sin((j * 72 * Math.PI) / 180) * 3}
                  rx="2"
                  ry="3"
                  fill="white"
                  transform={`rotate(${j * 72} ${x} ${y})`}
                />
              ))}
              <circle cx={x} cy={y} r="1.5" fill="#FFD700" />
            </motion.g>
          );
        })}
    </motion.svg>
  );
}

// Sunflower
export function SunflowerSVG({ size = 70, stage }: PlantSVGProps) {
  const stageScale = {
    semilla: 0.25,
    brote: 0.4,
    joven: 0.6,
    desarrollada: 0.8,
    madura: 0.9,
    florecida: 1,
  }[stage];

  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      initial={{ scale: 0 }}
      animate={{ scale: stageScale }}
      transition={{ type: 'spring', stiffness: 200 }}
    >
      {/* Stem */}
      <motion.line
        x1="50"
        y1="95"
        x2="50"
        y2="45"
        stroke="#2E7D32"
        strokeWidth="5"
        strokeLinecap="round"
        animate={{ pathLength: [0, 1] }}
        transition={{ duration: 2 }}
      />
      
      {/* Leaves */}
      {stage !== 'semilla' && stage !== 'brote' && (
        <>
          <motion.ellipse
            cx="35"
            cy="70"
            rx="10"
            ry="15"
            fill="#43A047"
            transform="rotate(-35 35 70)"
            animate={{ rotate: [-40, -30, -40] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
          <motion.ellipse
            cx="65"
            cy="65"
            rx="10"
            ry="15"
            fill="#43A047"
            transform="rotate(35 65 65)"
            animate={{ rotate: [30, 40, 30] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
        </>
      )}
      
      {/* Flower (when mature) */}
      {(stage === 'madura' || stage === 'florecida') && (
        <motion.g
          animate={{
            rotate: stage === 'florecida' ? [0, 360] : 0,
          }}
          transition={{
            duration: stage === 'florecida' ? 120 : 0,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          {/* Petals */}
          {[...Array(12)].map((_, i) => (
            <motion.ellipse
              key={i}
              cx={50 + Math.cos((i * 30 * Math.PI) / 180) * 18}
              cy={35 + Math.sin((i * 30 * Math.PI) / 180) * 18}
              rx="6"
              ry="12"
              fill="#FFD600"
              stroke="#FFA000"
              strokeWidth="1"
              transform={`rotate(${i * 30} 50 35)`}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: i * 0.05 }}
            />
          ))}
          {/* Center */}
          <circle cx="50" cy="35" r="12" fill="#8D6E63" />
          <circle cx="50" cy="35" r="10" fill="#6D4C41" />
          {/* Seeds pattern */}
          {[...Array(20)].map((_, i) => (
            <circle
              key={i}
              cx={50 + Math.cos((i * 18 * Math.PI) / 180) * (3 + (i % 3) * 2)}
              cy={35 + Math.sin((i * 18 * Math.PI) / 180) * (3 + (i % 3) * 2)}
              r="1"
              fill="#3E2723"
            />
          ))}
        </motion.g>
      )}
    </motion.svg>
  );
}
