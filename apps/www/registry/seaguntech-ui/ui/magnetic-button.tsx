'use client';

import { Button, type ButtonProps } from '@/components/ui/button';
import { motion } from 'framer-motion';
import React, { useRef, useState } from 'react';

export interface MagneticButtonProps extends ButtonProps {
  children: React.ReactNode;
  distance?: number;
}

export function MagneticButton({
  children,
  distance = 10,
  className,
  ...props
}: MagneticButtonProps) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const ref = useRef<HTMLDivElement>(null);

  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = e;
    if (!ref.current) return;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    const normalizedX = middleX / Math.max(width / 2, 1);
    const normalizedY = middleY / Math.max(height / 2, 1);

    setPosition({
      x: normalizedX * distance,
      y: normalizedY * distance,
    });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.div
      style={{ position: 'relative', display: 'inline-block' }}
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 150, damping: 15, mass: 0.1 }}
    >
      <Button className={className} {...props}>
        {children}
      </Button>
    </motion.div>
  );
}
