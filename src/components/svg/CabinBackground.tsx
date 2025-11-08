import { motion } from 'motion/react';

export function CabinBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Wall gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-900 via-amber-800 to-amber-900" />
      
      {/* Wood texture */}
      <svg width="100%" height="100%" className="absolute inset-0 opacity-20">
        <defs>
          <pattern id="woodTexture" x="0" y="0" width="200" height="100%" patternUnits="userSpaceOnUse">
            <rect x="0" y="0" width="100" height="100%" fill="#3E2723" />
            <rect x="100" y="0" width="100" height="100%" fill="#4E342E" />
            <line x1="100" y1="0" x2="100" y2="100%" stroke="#2C1810" strokeWidth="2" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#woodTexture)" />
      </svg>

      {/* Window */}
      <div className="absolute top-12 right-16">
        <svg width="240" height="200" viewBox="0 0 240 200">
          {/* Window frame */}
          <rect x="0" y="0" width="240" height="200" fill="#2C1810" rx="8" />
          <rect x="8" y="8" width="224" height="184" fill="#87CEEB" rx="4" />
          
          {/* Window panes */}
          <line x1="120" y1="8" x2="120" y2="192" stroke="#2C1810" strokeWidth="6" />
          <line x1="8" y1="100" x2="232" y2="100" stroke="#2C1810" strokeWidth="6" />
          
          {/* Sky view through window */}
          <defs>
            <linearGradient id="skyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#87CEEB" />
              <stop offset="100%" stopColor="#B0E0E6" />
            </linearGradient>
          </defs>
          <rect x="8" y="8" width="224" height="184" fill="url(#skyGradient)" rx="4" />
          
          {/* Tree visible through window */}
          <g opacity="0.6">
            <rect x="140" y="130" width="15" height="60" fill="#654321" />
            <circle cx="147" cy="125" r="35" fill="#228B22" />
            <circle cx="135" cy="115" r="25" fill="#2E8B57" />
            <circle cx="160" cy="120" r="28" fill="#3CB371" />
          </g>

          {/* Sun in window */}
          <motion.circle
            cx="70"
            cy="60"
            r="20"
            fill="#FFD700"
            animate={{
              opacity: [0.6, 1, 0.6],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
            }}
          />
          
          {/* Light rays */}
          {[...Array(8)].map((_, i) => (
            <motion.line
              key={i}
              x1="70"
              y1="60"
              x2={70 + Math.cos((i * 45 * Math.PI) / 180) * 15}
              y2={60 + Math.sin((i * 45 * Math.PI) / 180) * 15}
              stroke="#FFD700"
              strokeWidth="2"
              opacity="0.4"
              strokeLinecap="round"
            />
          ))}

          {/* Clouds in window */}
          <motion.g
            animate={{ x: [0, 20, 0] }}
            transition={{ duration: 15, repeat: Infinity }}
            opacity="0.5"
          >
            <ellipse cx="180" cy="50" rx="20" ry="12" fill="white" />
            <ellipse cx="195" cy="48" rx="15" ry="10" fill="white" />
          </motion.g>

          {/* Window sill */}
          <rect x="0" y="190" width="240" height="10" fill="#4E342E" />
          
          {/* Light reflection */}
          <rect x="15" y="15" width="50" height="70" fill="white" opacity="0.15" rx="4" />
        </svg>
      </div>

      {/* Shelf on the left */}
      <div className="absolute top-32 left-12">
        <svg width="180" height="120" viewBox="0 0 180 120">
          {/* Shelf wood */}
          <rect x="0" y="0" width="180" height="15" fill="#5D4037" rx="2" />
          <rect x="0" y="2" width="180" height="4" fill="#6D4C41" opacity="0.5" />
          
          {/* Books */}
          <rect x="10" y="-60" width="15" height="60" fill="#B71C1C" />
          <rect x="27" y="-55" width="18" height="55" fill="#1976D2" />
          <rect x="47" y="-65" width="14" height="65" fill="#388E3C" />
          <rect x="63" y="-50" width="20" height="50" fill="#F57C00" />
          
          {/* Small plant pot */}
          <g transform="translate(100, -40)">
            <path d="M 10 0 L 15 20 L 5 20 Z" fill="#795548" />
            <ellipse cx="10" cy="0" rx="8" ry="3" fill="#8D6E63" />
            <motion.g
              animate={{ rotate: [-2, 2, -2] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <path d="M 10 0 Q 8 -10 6 -15" stroke="#2E7D32" strokeWidth="2" fill="none" />
              <path d="M 10 0 Q 12 -12 14 -15" stroke="#2E7D32" strokeWidth="2" fill="none" />
              <circle cx="6" cy="-15" r="4" fill="#4CAF50" />
              <circle cx="14" cy="-15" r="4" fill="#4CAF50" />
              <circle cx="10" cy="-18" r="4" fill="#66BB6A" />
            </motion.g>
          </g>

          {/* Candle */}
          <g transform="translate(140, -30)">
            <rect x="0" y="0" width="12" height="30" fill="#FFF3E0" rx="1" />
            <ellipse cx="6" cy="0" rx="6" ry="2" fill="#FFECB3" />
            {/* Flame */}
            <motion.g
              animate={{
                y: [-2, 0, -2],
                scaleY: [1, 1.1, 1],
              }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ellipse cx="6" cy="-8" rx="4" ry="8" fill="#FFA726" opacity="0.8" />
              <ellipse cx="6" cy="-8" rx="2" ry="5" fill="#FFD54F" />
              <ellipse cx="6" cy="-10" rx="1" ry="3" fill="#FFF9C4" />
            </motion.g>
          </g>
        </svg>
      </div>

      {/* Rug on the floor */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <svg width="400" height="200" viewBox="0 0 400 200">
          {/* Rug base */}
          <ellipse cx="200" cy="150" rx="180" ry="40" fill="#8B4513" opacity="0.6" />
          <ellipse cx="200" cy="150" rx="170" ry="35" fill="#A0522D" />
          
          {/* Rug pattern */}
          <g opacity="0.5">
            {[...Array(5)].map((_, i) => (
              <rect
                key={i}
                x={50 + i * 70}
                y="130"
                width="50"
                height="40"
                fill={i % 2 === 0 ? "#D2691E" : "#CD853F"}
                rx="5"
              />
            ))}
          </g>
          
          {/* Fringe */}
          {[...Array(15)].map((_, i) => (
            <line
              key={i}
              x1={30 + i * 25}
              y1="185"
              x2={30 + i * 25}
              y2="195"
              stroke="#654321"
              strokeWidth="3"
            />
          ))}
        </svg>
      </div>

      {/* Fireplace (optional, on right side) */}
      <div className="absolute bottom-0 left-8">
        <svg width="160" height="180" viewBox="0 0 160 180">
          {/* Fireplace structure */}
          <path d="M 10 180 L 10 40 L 80 10 L 150 40 L 150 180 Z" fill="#424242" />
          <rect x="30" y="100" width="100" height="80" fill="#212121" rx="5" />
          
          {/* Fire */}
          <motion.g
            animate={{
              y: [0, -5, 0],
              opacity: [0.8, 1, 0.8],
            }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <ellipse cx="80" cy="150" rx="35" ry="25" fill="#FF6F00" opacity="0.7" />
            <ellipse cx="80" cy="145" rx="25" ry="20" fill="#FF9800" opacity="0.8" />
            <ellipse cx="80" cy="140" rx="15" ry="15" fill="#FFC107" />
            <ellipse cx="80" cy="135" rx="8" ry="10" fill="#FFEB3B" />
          </motion.g>
          
          {/* Smoke */}
          <motion.g
            animate={{
              y: [0, -20],
              opacity: [0.6, 0],
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <ellipse cx="80" cy="120" rx="10" ry="8" fill="#757575" opacity="0.4" />
            <ellipse cx="85" cy="110" rx="12" ry="10" fill="#757575" opacity="0.3" />
            <ellipse cx="75" cy="100" rx="10" ry="8" fill="#757575" opacity="0.2" />
          </motion.g>
        </svg>
      </div>

      {/* Floor with shadow */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-amber-950 via-amber-900 to-transparent opacity-80" />
    </div>
  );
}
