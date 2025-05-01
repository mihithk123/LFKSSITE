import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

// Floating geometric shapes
const GeometricShapes = () => {
  const group = useRef<THREE.Group>(null);
  
  // Create multiple shapes with different properties
  const shapes = useMemo(() => {
    return Array.from({ length: 15 }, (_, i) => ({
      position: [
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 5
      ],
      rotation: [
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      ],
      scale: Math.random() * 0.4 + 0.1,
      speed: Math.random() * 0.02 + 0.01,
      type: Math.floor(Math.random() * 3), // 0: box, 1: tetrahedron, 2: octahedron
      color: [
        '#8b5cf6', '#6366F1', '#a855f7', '#3b82f6', '#2dd4bf'
      ][Math.floor(Math.random() * 5)]
    }));
  }, []);

  useFrame((state) => {
    if (!group.current) return;
    
    // Rotate the entire group slowly
    group.current.rotation.y = state.clock.getElapsedTime() * 0.1;
    
    // Update each shape individually
    group.current.children.forEach((mesh, i) => {
      const shape = shapes[i];
      mesh.rotation.x += shape.speed;
      mesh.rotation.z += shape.speed * 0.5;
      
      // Add subtle movement
      mesh.position.y = mesh.position.y + Math.sin(state.clock.getElapsedTime() * shape.speed * 2) * 0.005;
    });
  });

  return (
    <group ref={group}>
      {shapes.map((shape, i) => (
        <mesh 
          key={i} 
          position={shape.position as [number, number, number]} 
          rotation={shape.rotation as [number, number, number]}
          scale={shape.scale}
        >
          {shape.type === 0 && <boxGeometry args={[1, 1, 1]} />}
          {shape.type === 1 && <tetrahedronGeometry args={[1, 0]} />}
          {shape.type === 2 && <octahedronGeometry args={[1, 0]} />}
          <meshStandardMaterial 
            color={shape.color} 
            wireframe={true}
            transparent={true}
            opacity={0.7}
          />
        </mesh>
      ))}
    </group>
  );
};

// Wave effect grid
const WaveGrid = () => {
  const mesh = useRef<THREE.Mesh>(null);
  const gridSize = 15;
  const separation = 0.3;
  
  // Create grid vertices
  const positions = useMemo(() => {
    const positions = [];
    for (let i = 0; i < gridSize; i++) {
      for (let j = 0; j < gridSize; j++) {
        const x = (i - gridSize / 2) * separation;
        const y = 0;
        const z = (j - gridSize / 2) * separation;
        positions.push(x, y, z);
      }
    }
    return new Float32Array(positions);
  }, [gridSize, separation]);
  
  useFrame((state) => {
    if (!mesh.current) return;
    
    // Update vertex positions to create wave effect
    const positions = mesh.current.geometry.attributes.position.array;
    const time = state.clock.getElapsedTime();
    
    for (let i = 0; i < gridSize; i++) {
      for (let j = 0; j < gridSize; j++) {
        const idx = (i * gridSize + j) * 3;
        const x = positions[idx];
        const z = positions[idx + 2];
        const dist = Math.sqrt(x * x + z * z);
        
        // Calculate wave height based on distance and time
        positions[idx + 1] = Math.sin(dist * 1.5 - time * 0.5) * 0.2;
      }
    }
    
    mesh.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial 
        size={0.05} 
        color="#6366F1" 
        sizeAttenuation={true}
        transparent={true}
        opacity={0.6}
      />
    </points>
  );
};

// Main component
const WebGLBackground = () => {
  return (
    <div className="absolute inset-0 bg-gradient-to-b from-indigo-50 to-white">
      <Canvas
        camera={{ position: [0, 2, 8], fov: 45 }}
        dpr={[1, 2]} // Performance optimization
      >
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={0.6} />
        <spotLight position={[-10, 10, 5]} intensity={0.5} angle={0.3} penumbra={1} />
        
        {/* Wave grid effect */}
        <WaveGrid />
        
        {/* Floating geometric elements */}
        <GeometricShapes />
        
        <OrbitControls 
          enableZoom={false} 
          enablePan={false} 
          enableRotate={true}
          rotateSpeed={0.3}
          autoRotate={true}
          autoRotateSpeed={0.3}
        />
      </Canvas>
    </div>
  );
};

export default WebGLBackground;