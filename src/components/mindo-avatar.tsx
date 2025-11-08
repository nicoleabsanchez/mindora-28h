import { motion } from 'motion/react';

export type MindoEmotion = 'neutral' | 'happy' | 'calm';

interface MindoAvatarProps {
  emotion?: MindoEmotion;
  size?: 'small' | 'medium' | 'large';
  animate?: boolean;
}

export function MindoAvatar({ emotion = 'neutral', size = 'large', animate = true }: MindoAvatarProps) {
  const sizeMap = {
    small: 80,
    medium: 100,
    large: 120
  };

  const avatarSize = sizeMap[size];

  const getFaceExpression = () => {
    switch (emotion) {
      case 'happy':
        return '(^‿^)';
      case 'calm':
        return '(◡‿◡)';
      default:
        return '(◕‿◕)';
    }
  };

  return (
    <motion.div
      className="flex flex-col items-center justify-center"
      initial={animate ? { scale: 0, opacity: 0 } : undefined}
      animate={animate ? { 
        scale: [0, 1.2, 1],
        opacity: 1
      } : undefined}
      transition={animate ? {
        duration: 0.6,
        ease: [0.68, -0.55, 0.265, 1.55]
      } : undefined}
    >
      {/* Breathing animation wrapper */}
      <motion.div
        animate={animate ? {
          scale: [1, 1.05, 1]
        } : undefined}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
        style={{ width: avatarSize, height: avatarSize }}
        className="relative flex items-center justify-center"
      >
        {/* Leaf/Sprout */}
        <div 
          className="absolute -top-2 left-1/2 -translate-x-1/2 text-green-400"
          style={{ fontSize: avatarSize * 0.3 }}
        >
          🌱
        </div>

        {/* Body */}
        <svg
          width={avatarSize}
          height={avatarSize}
          viewBox="0 0 120 120"
          className="drop-shadow-2xl"
        >
          {/* Head circle */}
          <circle
            cx="60"
            cy="40"
            r="25"
            fill="#2ECC71"
            stroke="#6C5CE7"
            strokeWidth="2"
          />

          {/* Face */}
          <text
            x="60"
            y="45"
            textAnchor="middle"
            fill="white"
            fontSize="16"
            fontFamily="monospace"
          >
            {getFaceExpression()}
          </text>

          {/* Blush (only for happy) */}
          {emotion === 'happy' && (
            <>
              <circle cx="48" cy="42" r="3" fill="#FFB6C1" opacity="0.6" />
              <circle cx="72" cy="42" r="3" fill="#FFB6C1" opacity="0.6" />
            </>
          )}

          {/* Body stick */}
          <line
            x1="60"
            y1="65"
            x2="60"
            y2="90"
            stroke="#2ECC71"
            strokeWidth="4"
            strokeLinecap="round"
          />

          {/* Arms */}
          <line
            x1="60"
            y1="75"
            x2="45"
            y2="85"
            stroke="#2ECC71"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <line
            x1="60"
            y1="75"
            x2="75"
            y2="85"
            stroke="#2ECC71"
            strokeWidth="3"
            strokeLinecap="round"
          />

          {/* Legs */}
          <line
            x1="60"
            y1="90"
            x2="50"
            y2="105"
            stroke="#2ECC71"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <line
            x1="60"
            y1="90"
            x2="70"
            y2="105"
            stroke="#2ECC71"
            strokeWidth="3"
            strokeLinecap="round"
          />

          {/* Feet */}
          <circle cx="50" cy="107" r="3" fill="#6C5CE7" />
          <circle cx="70" cy="107" r="3" fill="#6C5CE7" />
        </svg>
      </motion.div>
    </motion.div>
  );
}
