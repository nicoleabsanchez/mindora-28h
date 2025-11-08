import { motion } from 'motion/react';

export function TerraceBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Sky gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-sky-500 via-sky-400 to-orange-300" />
      
      {/* Sun (sunset/sunrise) */}
      <motion.div
        className="absolute top-1/3 right-8"
        animate={{
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
        }}
      >
        <svg width="120" height="120" viewBox="0 0 120 120">
          <defs>
            <radialGradient id="sunsetGradient">
              <stop offset="0%" stopColor="#FFA500" />
              <stop offset="50%" stopColor="#FF6347" />
              <stop offset="100%" stopColor="#FF4500" stopOpacity="0.5" />
            </radialGradient>
          </defs>
          <circle cx="60" cy="60" r="40" fill="url(#sunsetGradient)" />
          <circle cx="60" cy="60" r="35" fill="#FFB347" opacity="0.6" />
        </svg>
      </motion.div>

      {/* City skyline in background */}
      <div className="absolute bottom-32 left-0 right-0">
        <svg width="100%" height="250" viewBox="0 0 1200 250" preserveAspectRatio="none">
          <defs>
            <linearGradient id="buildingGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#1F2937" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#111827" stopOpacity="0.9" />
            </linearGradient>
          </defs>
          
          {/* Background buildings (far) */}
          <g opacity="0.3">
            <rect x="50" y="120" width="80" height="130" fill="url(#buildingGradient)" />
            <rect x="150" y="80" width="100" height="170" fill="url(#buildingGradient)" />
            <rect x="270" y="100" width="70" height="150" fill="url(#buildingGradient)" />
            <rect x="360" y="60" width="90" height="190" fill="url(#buildingGradient)" />
            <rect x="470" y="110" width="85" height="140" fill="url(#buildingGradient)" />
          </g>
          
          {/* Middle buildings */}
          <g opacity="0.5">
            <rect x="600" y="90" width="95" height="160" fill="url(#buildingGradient)" />
            <rect x="710" y="50" width="110" height="200" fill="url(#buildingGradient)" />
            <rect x="840" y="100" width="80" height="150" fill="url(#buildingGradient)" />
            <rect x="940" y="70" width="100" height="180" fill="url(#buildingGradient)" />
            <rect x="1060" y="120" width="90" height="130" fill="url(#buildingGradient)" />
          </g>
          
          {/* Windows on buildings */}
          {[...Array(30)].map((_, i) => {
            const buildingX = (i % 10) * 120;
            const buildingY = 70 + (i % 3) * 40;
            return (
              <motion.g
                key={i}
                animate={{
                  opacity: [0.3, 0.8, 0.3],
                }}
                transition={{
                  duration: 2 + Math.random() * 3,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              >
                <rect
                  x={buildingX + 10}
                  y={buildingY + 20}
                  width="8"
                  height="10"
                  fill="#FFF8DC"
                  opacity="0.6"
                />
                <rect
                  x={buildingX + 25}
                  y={buildingY + 20}
                  width="8"
                  height="10"
                  fill="#FFF8DC"
                  opacity="0.6"
                />
              </motion.g>
            );
          })}
        </svg>
      </div>

      {/* Flying birds */}
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="absolute"
          initial={{ x: -50, y: 100 + i * 40 }}
          animate={{
            x: ['-5%', '105%'],
            y: [100 + i * 40, 80 + i * 40, 100 + i * 40],
          }}
          transition={{
            duration: 20 + i * 5,
            repeat: Infinity,
            delay: i * 3,
          }}
        >
          <Bird />
        </motion.div>
      ))}

      {/* Terrace floor */}
      <div className="absolute bottom-16 left-0 right-0 h-20 bg-gradient-to-b from-gray-400 to-gray-500">
        <svg width="100%" height="100%" viewBox="0 0 1200 80">
          <defs>
            <pattern id="tiles" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
              <rect x="0" y="0" width="40" height="80" fill="#9CA3AF" />
              <rect x="40" y="0" width="40" height="80" fill="#6B7280" />
              <line x1="40" y1="0" x2="40" y2="80" stroke="#4B5563" strokeWidth="2" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#tiles)" />
        </svg>
      </div>

      {/* Railing */}
      <div className="absolute bottom-0 left-0 right-0 h-20">
        <svg width="100%" height="100%" viewBox="0 0 1200 80">
          {/* Top rail */}
          <rect x="0" y="0" width="100%" height="12" fill="#374151" />
          <rect x="0" y="2" width="100%" height="4" fill="#4B5563" />
          
          {/* Bottom rail */}
          <rect x="0" y="68" width="100%" height="12" fill="#374151" />
          
          {/* Vertical bars */}
          {[...Array(30)].map((_, i) => (
            <rect
              key={i}
              x={i * 40 + 20}
              y="12"
              width="6"
              height="56"
              fill="#4B5563"
            />
          ))}
          
          {/* Shadow */}
          <rect x="0" y="0" width="100%" height="8" fill="black" opacity="0.1" />
        </svg>
      </div>

      {/* Potted plants on railing */}
      <div className="absolute bottom-20 left-16">
        <RailingPlanter color="#DC2626" />
      </div>
      <div className="absolute bottom-20 right-24">
        <RailingPlanter color="#7C3AED" />
      </div>
      <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2">
        <RailingPlanter color="#F59E0B" />
      </div>

      {/* String lights */}
      <svg className="absolute top-8 left-0 right-0" width="100%" height="60" viewBox="0 0 1200 60">
        <path
          d="M 0 30 Q 150 40, 300 30 T 600 30 T 900 30 T 1200 30"
          stroke="#4B5563"
          strokeWidth="2"
          fill="none"
        />
        {[...Array(12)].map((_, i) => (
          <motion.circle
            key={i}
            cx={i * 100 + 50}
            cy={30 + (i % 2) * 10}
            r="5"
            fill="#FCD34D"
            animate={{
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.2,
            }}
          />
        ))}
      </svg>

      {/* Side table with plant */}
      <div className="absolute bottom-32 right-16">
        <svg width="100" height="120" viewBox="0 0 100 120">
          {/* Table */}
          <rect x="20" y="80" width="60" height="8" fill="#6B7280" rx="2" />
          <rect x="25" y="88" width="4" height="32" fill="#4B5563" />
          <rect x="71" y="88" width="4" height="32" fill="#4B5563" />
          
          {/* Decorative pot */}
          <path d="M 35 50 L 40 80 L 60 80 L 65 50 Z" fill="#DC2626" />
          <ellipse cx="50" cy="50" rx="15" ry="5" fill="#B91C1C" />
          
          {/* Plant */}
          <motion.g
            animate={{
              rotate: [-3, 3, -3],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
            }}
          >
            <path d="M 50 50 Q 40 30 35 15" stroke="#16A34A" strokeWidth="3" fill="none" />
            <path d="M 50 50 Q 50 25 50 10" stroke="#16A34A" strokeWidth="3" fill="none" />
            <path d="M 50 50 Q 60 30 65 15" stroke="#16A34A" strokeWidth="3" fill="none" />
            <ellipse cx="35" cy="15" rx="6" ry="10" fill="#22C55E" />
            <ellipse cx="50" cy="10" rx="8" ry="12" fill="#22C55E" />
            <ellipse cx="65" cy="15" rx="6" ry="10" fill="#22C55E" />
          </motion.g>
        </svg>
      </div>
    </div>
  );
}

function Bird() {
  return (
    <motion.svg
      width="40"
      height="30"
      viewBox="0 0 40 30"
      animate={{
        rotate: [-5, 5, -5],
      }}
      transition={{
        duration: 1,
        repeat: Infinity,
      }}
    >
      <motion.path
        d="M 5 15 Q 15 10 20 15"
        stroke="#1F2937"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        animate={{
          d: [
            "M 5 15 Q 15 10 20 15",
            "M 5 15 Q 15 5 20 15",
            "M 5 15 Q 15 10 20 15",
          ],
        }}
        transition={{ duration: 0.5, repeat: Infinity }}
      />
      <motion.path
        d="M 20 15 Q 25 10 35 15"
        stroke="#1F2937"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        animate={{
          d: [
            "M 20 15 Q 25 10 35 15",
            "M 20 15 Q 25 5 35 15",
            "M 20 15 Q 25 10 35 15",
          ],
        }}
        transition={{ duration: 0.5, repeat: Infinity }}
      />
    </motion.svg>
  );
}

function RailingPlanter({ color }: { color: string }) {
  return (
    <svg width="80" height="60" viewBox="0 0 80 60">
      {/* Planter box */}
      <rect x="10" y="30" width="60" height="30" fill={color} rx="4" />
      <rect x="10" y="30" width="60" height="8" fill="black" opacity="0.2" />
      
      {/* Soil */}
      <ellipse cx="40" cy="38" rx="25" ry="8" fill="#8B4513" />
      
      {/* Flowers */}
      <motion.g
        animate={{
          y: [0, -3, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        {[25, 40, 55].map((x, i) => (
          <g key={i}>
            <line x1={x} y1="38" x2={x} y2="15" stroke="#16A34A" strokeWidth="2" />
            {[...Array(5)].map((_, j) => (
              <ellipse
                key={j}
                cx={x + Math.cos((j * 72 * Math.PI) / 180) * 4}
                cy={15 + Math.sin((j * 72 * Math.PI) / 180) * 4}
                rx="3"
                ry="5"
                fill={["#FF6B9D", "#FFD93D", "#6BCB77"][i]}
                transform={`rotate(${j * 72} ${x} 15)`}
              />
            ))}
            <circle cx={x} cy="15" r="2" fill="#FFA500" />
          </g>
        ))}
      </motion.g>
    </svg>
  );
}
