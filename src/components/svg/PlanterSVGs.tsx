import { motion } from 'motion/react';

interface PotProps {
  size?: number;
  scenario: 'jardin' | 'cabana' | 'terraza';
}

// Garden ground/soil patch
export function GardenGroundPlot({ size = 80 }: { size?: number }) {
  return (
    <svg width={size} height={size * 0.6} viewBox="0 0 100 60">
      {/* Soil */}
      <ellipse cx="50" cy="40" rx="45" ry="18" fill="#6D4C41" />
      <ellipse cx="50" cy="38" rx="42" ry="16" fill="#8D6E63" />
      
      {/* Soil texture */}
      {[...Array(15)].map((_, i) => (
        <circle
          key={i}
          cx={20 + Math.random() * 60}
          cy={30 + Math.random() * 15}
          r={1 + Math.random() * 2}
          fill="#5D4037"
          opacity="0.4"
        />
      ))}
      
      {/* Small stones */}
      <ellipse cx="30" cy="42" rx="3" ry="2" fill="#9E9E9E" />
      <ellipse cx="65" cy="44" rx="2" ry="1.5" fill="#BDBDBD" />
      <ellipse cx="48" cy="45" rx="2.5" ry="2" fill="#9E9E9E" />
    </svg>
  );
}

// Decorative clay pot
export function ClayPot({ size = 80, scenario }: PotProps) {
  const colors = {
    jardin: { main: '#D84315', rim: '#BF360C', accent: '#FF5722' },
    cabana: { main: '#8D6E63', rim: '#6D4C41', accent: '#A1887F' },
    terraza: { main: '#5D4037', rim: '#4E342E', accent: '#795548' }
  };

  const color = colors[scenario];

  return (
    <motion.svg
      width={size}
      height={size * 0.8}
      viewBox="0 0 100 80"
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 200 }}
    >
      {/* Shadow */}
      <ellipse cx="50" cy="75" rx="35" ry="5" fill="black" opacity="0.2" />
      
      {/* Pot body */}
      <path
        d="M 30 30 L 25 60 Q 25 65 30 68 L 70 68 Q 75 65 75 60 L 70 30 Z"
        fill={color.main}
      />
      
      {/* Rim */}
      <ellipse cx="50" cy="30" rx="20" ry="6" fill={color.rim} />
      <ellipse cx="50" cy="30" rx="18" ry="5" fill={color.accent} />
      
      {/* Bottom */}
      <ellipse cx="50" cy="68" rx="22" ry="5" fill={color.rim} />
      
      {/* Decorative bands */}
      <path
        d="M 28 40 Q 50 38 72 40"
        stroke={color.accent}
        strokeWidth="1.5"
        fill="none"
      />
      <path
        d="M 27 50 Q 50 48 73 50"
        stroke={color.accent}
        strokeWidth="1.5"
        fill="none"
      />
      
      {/* Highlight */}
      <ellipse
        cx="40"
        cy="45"
        rx="6"
        ry="15"
        fill="white"
        opacity="0.15"
      />
    </motion.svg>
  );
}

// Modern ceramic pot
export function CeramicPot({ size = 80, scenario }: PotProps) {
  const colors = {
    jardin: { main: '#4DB6AC', rim: '#26A69A', accent: '#80CBC4' },
    cabana: { main: '#FFB74D', rim: '#FFA726', accent: '#FFCC80' },
    terraza: { main: '#7986CB', rim: '#5C6BC0', accent: '#9FA8DA' }
  };

  const color = colors[scenario];

  return (
    <motion.svg
      width={size}
      height={size * 0.75}
      viewBox="0 0 100 75"
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 200 }}
    >
      {/* Shadow */}
      <ellipse cx="50" cy="72" rx="32" ry="4" fill="black" opacity="0.2" />
      
      {/* Pot body - modern tapered shape */}
      <path
        d="M 35 25 L 30 55 Q 30 62 35 65 L 65 65 Q 70 62 70 55 L 65 25 Z"
        fill={color.main}
      />
      
      {/* Rim */}
      <rect x="33" y="20" width="34" height="8" rx="2" fill={color.rim} />
      
      {/* Top opening */}
      <ellipse cx="50" cy="22" rx="17" ry="4" fill={color.accent} />
      
      {/* Bottom base */}
      <rect x="35" y="65" width="30" height="4" rx="2" fill={color.rim} />
      <ellipse cx="50" cy="67" rx="15" ry="3" fill={color.rim} />
      
      {/* Modern geometric pattern */}
      <g opacity="0.3">
        <line x1="40" y1="35" x2="45" y2="50" stroke="white" strokeWidth="2" />
        <line x1="50" y1="32" x2="50" y2="55" stroke="white" strokeWidth="2" />
        <line x1="60" y1="35" x2="55" y2="50" stroke="white" strokeWidth="2" />
      </g>
      
      {/* Shine */}
      <ellipse
        cx="42"
        cy="40"
        rx="4"
        ry="12"
        fill="white"
        opacity="0.25"
      />
    </motion.svg>
  );
}

// Woven basket planter
export function BasketPlanter({ size = 80, scenario }: PotProps) {
  return (
    <motion.svg
      width={size}
      height={size * 0.7}
      viewBox="0 0 100 70"
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 200 }}
    >
      {/* Shadow */}
      <ellipse cx="50" cy="68" rx="35" ry="4" fill="black" opacity="0.2" />
      
      {/* Basket body */}
      <path
        d="M 25 30 L 20 55 Q 20 60 25 62 L 75 62 Q 80 60 80 55 L 75 30 Z"
        fill="#D7CCC8"
      />
      
      {/* Weave pattern - horizontal */}
      {[35, 42, 49, 56].map((y, i) => (
        <path
          key={`h-${i}`}
          d={`M 23 ${y} L 77 ${y}`}
          stroke="#8D6E63"
          strokeWidth="1.5"
          opacity="0.6"
        />
      ))}
      
      {/* Weave pattern - vertical */}
      {[30, 40, 50, 60, 70].map((x, i) => (
        <path
          key={`v-${i}`}
          d={`M ${x} 30 Q ${x + 2} 45 ${x} 60`}
          stroke="#6D4C41"
          strokeWidth="1.5"
          opacity="0.4"
          fill="none"
        />
      ))}
      
      {/* Rim */}
      <ellipse cx="50" cy="30" rx="25" ry="6" fill="#A1887F" />
      <ellipse cx="50" cy="30" rx="23" ry="5" fill="#BCAAA4" />
      
      {/* Bottom */}
      <ellipse cx="50" cy="62" rx="27" ry="5" fill="#8D6E63" />
    </motion.svg>
  );
}

// Window box planter (for cabin)
export function WindowBox({ size = 120 }: { size?: number }) {
  return (
    <motion.svg
      width={size}
      height={size * 0.4}
      viewBox="0 0 120 48"
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 200 }}
    >
      {/* Box body */}
      <rect x="5" y="15" width="110" height="30" rx="3" fill="#5D4037" />
      <rect x="8" y="17" width="104" height="26" rx="2" fill="#6D4C41" />
      
      {/* Wood planks */}
      {[20, 35, 50, 65, 80, 95].map((x, i) => (
        <line
          key={i}
          x1={x}
          y1="17"
          x2={x}
          y2="43"
          stroke="#4E342E"
          strokeWidth="2"
        />
      ))}
      
      {/* Decorative brackets */}
      <path d="M 5 20 L 0 25 L 5 30" stroke="#3E2723" strokeWidth="2" fill="none" />
      <path d="M 115 20 L 120 25 L 115 30" stroke="#3E2723" strokeWidth="2" fill="none" />
      
      {/* Soil */}
      <ellipse cx="60" cy="25" rx="48" ry="8" fill="#8D6E63" />
    </motion.svg>
  );
}

// Hanging planter (for terrace)
export function HangingPlanter({ size = 70 }: { size?: number }) {
  return (
    <motion.svg
      width={size}
      height={size * 1.3}
      viewBox="0 0 70 91"
      initial={{ y: -10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 150 }}
    >
      {/* Hanging rope/chain */}
      <motion.path
        d="M 35 0 L 35 20"
        stroke="#8D6E63"
        strokeWidth="2"
        animate={{ pathLength: [0, 1] }}
        transition={{ duration: 0.8 }}
      />
      <motion.path
        d="M 30 20 L 35 25 L 40 20"
        stroke="#8D6E63"
        strokeWidth="2"
        fill="none"
        animate={{ pathLength: [0, 1] }}
        transition={{ duration: 0.8, delay: 0.2 }}
      />
      <motion.line
        x1="35"
        y1="25"
        x2="35"
        y2="35"
        stroke="#8D6E63"
        strokeWidth="2"
        animate={{ pathLength: [0, 1] }}
        transition={{ duration: 0.8, delay: 0.4 }}
      />
      
      {/* Pot - spherical hanging basket */}
      <motion.ellipse
        cx="35"
        cy="60"
        rx="28"
        ry="30"
        fill="#8BC34A"
        opacity="0.3"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.6, type: 'spring' }}
      />
      <motion.path
        d="M 10 50 Q 10 75 35 85 Q 60 75 60 50 L 10 50"
        fill="#558B2F"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.6, type: 'spring' }}
      />
      
      {/* Woven texture */}
      {[52, 58, 64, 70, 76].map((y, i) => (
        <ellipse
          key={i}
          cx="35"
          cy={y}
          rx="25 - ${i * 3}"
          ry="2"
          fill="#33691E"
          opacity="0.4"
        />
      ))}
      
      {/* Rim */}
      <ellipse cx="35" cy="50" rx="25" ry="5" fill="#689F38" />
      <ellipse cx="35" cy="50" rx="23" ry="4" fill="#7CB342" />
      
      {/* Chains attachment points */}
      <circle cx="15" cy="52" r="2" fill="#8D6E63" />
      <circle cx="55" cy="52" r="2" fill="#8D6E63" />
    </motion.svg>
  );
}
