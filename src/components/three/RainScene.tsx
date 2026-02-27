"use client";

import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useReducedMotion } from "@/hooks/useReducedMotion";

function RainDrops({ count = 3000 }: { count?: number }) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const { positions, velocities } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const velocities = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 100;      // x: spread across viewport
      positions[i * 3 + 1] = Math.random() * 80 - 40;       // y: full height
      positions[i * 3 + 2] = (Math.random() - 0.5) * 60;    // z: depth
      velocities[i] = 0.3 + Math.random() * 0.6;
    }

    return { positions, velocities };
  }, [count]);

  useEffect(() => {
    if (!meshRef.current) return;
    for (let i = 0; i < count; i++) {
      dummy.position.set(positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2]);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
  }, [count, positions, dummy]);

  useFrame(() => {
    if (!meshRef.current) return;

    for (let i = 0; i < count; i++) {
      let y = positions[i * 3 + 1];
      y -= velocities[i];

      if (y < -45) {
        y = 45 + Math.random() * 10;
        positions[i * 3] = (Math.random() - 0.5) * 100;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 60;
      }

      positions[i * 3] -= 0.02; // gentle wind drift
      positions[i * 3 + 1] = y;

      dummy.position.set(positions[i * 3], y, positions[i * 3 + 2]);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }

    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <capsuleGeometry args={[0.03, 0.6, 2, 4]} />
      <meshBasicMaterial
        color="#adf684"
        transparent
        opacity={0.12}
        depthWrite={false}
      />
    </instancedMesh>
  );
}

export default function RainScene() {
  const reducedMotion = useReducedMotion();

  if (reducedMotion) return null;

  return (
    <div
      className="fixed inset-0 z-30 pointer-events-none"
      style={{ opacity: 0, animation: "fade-in 1.5s ease 0.6s forwards" }}
    >
      <Canvas
        camera={{ position: [0, 0, 30], fov: 60 }}
        gl={{ alpha: true, antialias: false, powerPreference: "low-power" }}
        style={{ background: "transparent", pointerEvents: "none" }}
        dpr={[1, 1.5]}
      >
        <RainDrops count={2500} />
      </Canvas>
    </div>
  );
}
