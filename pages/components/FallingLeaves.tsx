// src/components/FallingLeaves.tsx
import React, { useEffect, useState } from 'react';

const FallingLeaves: React.FC = () => {
  const [leaves, setLeaves] = useState<{ id: number; style: React.CSSProperties }[]>([]);

  const createLeaf = () => {
    const id = Date.now(); // Use timestamp as a unique identifier
    const style: React.CSSProperties = {
      left: Math.random() * 100 + 'vw',
      animationDuration: Math.random() * 3 + 2 + 's', // Random duration between 2s and 5s
      animationDelay: '0s', // Start immediately for continuous falling
      opacity: Math.random() * 0.5 + 0.5, // Random opacity for variation
      position: 'absolute',
      top: '-10%', // Start above the viewport
    };
    setLeaves(prevLeaves => [...prevLeaves, { id, style }]);
  };

  useEffect(() => {
    const interval = setInterval(createLeaf, 1000); // Create a leaf every second

    return () => clearInterval(interval); // Clean up on unmount
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {leaves.map(leaf => (
        <div
          key={leaf.id}
          className="leaf"
          style={leaf.style}
        >
          🍁{/* Autumn leaves emoji */}
        </div>
      ))}
    </div>
  );
};

export default FallingLeaves;
