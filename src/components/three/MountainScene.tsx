"use client";

import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Clouds, Cloud } from "@react-three/drei";
import * as THREE from "three";
import { Suspense } from "react";

/* ── Procedural Mountain Terrain ── */
function MountainTerrain() {
  const meshRef = useRef<THREE.Mesh>(null);

  const geometry = useMemo(() => {
    const geo = new THREE.PlaneGeometry(800, 600, 128, 96);
    const pos = geo.attributes.position;

    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);

      // Multi-octave noise-like terrain
      let height = 0;

      // Main mountain ridge
      const ridge = Math.exp(-((y + 50) ** 2) / 8000) * 120;
      height += ridge;

      // Gentle hills using sine waves
      height += Math.sin(x * 0.008 + 1.2) * Math.cos(y * 0.006) * 40;
      height += Math.sin(x * 0.02 + 3.5) * Math.cos(y * 0.015 + 1.0) * 15;
      height += Math.sin(x * 0.05) * Math.sin(y * 0.04) * 8;

      // Central peak (Nandi Hills ~600m)
      const distFromCenter = Math.sqrt(x * x + (y + 30) * (y + 30));
      height += Math.max(0, 80 - distFromCenter * 0.3) * 1.5;

      // Slight randomness from deterministic function
      height += Math.sin(x * 0.1 + y * 0.13) * 5;
      height += Math.cos(x * 0.07 - y * 0.09) * 3;

      pos.setZ(i, height);
    }

    geo.computeVertexNormals();
    return geo;
  }, []);

  return (
    <mesh ref={meshRef} geometry={geometry} rotation={[-Math.PI / 2, 0, 0]} position={[0, -40, -100]}>
      <meshStandardMaterial
        color="#0e2a18"
        roughness={0.9}
        metalness={0.05}
        flatShading
      />
    </mesh>
  );
}

/* ── Rain Particle System ── */
function RainParticles({ count = 4000 }: { count?: number }) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const { positions, velocities } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const velocities = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 600;       // x
      positions[i * 3 + 1] = Math.random() * 300;            // y
      positions[i * 3 + 2] = (Math.random() - 0.5) * 400;   // z
      velocities[i] = 0.8 + Math.random() * 1.8;             // fall speed (slower)
    }

    return { positions, velocities };
  }, [count]);

  // Set initial transforms
  useEffect(() => {
    if (!meshRef.current) return;
    for (let i = 0; i < count; i++) {
      dummy.position.set(positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2]);
      dummy.scale.set(1, 1, 1);
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

      if (y < -50) {
        y = 250 + Math.random() * 50;
        positions[i * 3] = (Math.random() - 0.5) * 600;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 400;
      }

      positions[i * 3] -= 0.05; // gentle wind drift
      positions[i * 3 + 1] = y;

      dummy.position.set(positions[i * 3], y, positions[i * 3 + 2]);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }

    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <capsuleGeometry args={[0.15, 1.2, 2, 6]} />
      <meshBasicMaterial
        color="#8cb8d0"
        transparent
        opacity={0.18}
        depthWrite={false}
      />
    </instancedMesh>
  );
}

/* ── Cloud Layers ── */
function CloudLayers() {
  return (
    <Clouds limit={200} frustumCulled={false}>
      <Cloud
        position={[-100, 80, -80]}
        speed={0.2}
        opacity={0.25}
        bounds={[200, 30, 30]}
        segments={20}
        color="#4a7a6a"
      />
      <Cloud
        position={[80, 100, -120]}
        speed={0.15}
        opacity={0.2}
        bounds={[250, 40, 40]}
        segments={25}
        color="#3a6a5a"
      />
      <Cloud
        position={[0, 60, -40]}
        speed={0.3}
        opacity={0.3}
        bounds={[180, 25, 25]}
        segments={20}
        color="#5a8a7a"
      />
      <Cloud
        position={[-150, 120, -150]}
        speed={0.1}
        opacity={0.15}
        bounds={[300, 50, 50]}
        segments={30}
        color="#2a5a4a"
      />
    </Clouds>
  );
}

/* ── Camera Rig (scroll-driven) ── */
function CameraRig() {
  const { camera } = useThree();
  const scrollRef = useRef(0);

  useFrame(() => {
    if (typeof window === "undefined") return;

    // Smooth scroll interpolation
    const scrollY = window.scrollY;
    const maxScroll = window.innerHeight;
    const progress = Math.min(scrollY / maxScroll, 1);

    scrollRef.current += (progress - scrollRef.current) * 0.05;
    const t = scrollRef.current;

    // Camera descends and moves forward as user scrolls
    camera.position.y = 120 - t * 80;
    camera.position.z = 250 - t * 100;
    camera.position.x = t * 30;

    camera.lookAt(0, 40 - t * 30, -100);
  });

  return null;
}

/* ── Main Scene Component ── */
export default function MountainScene() {
  return (
    <div className="absolute inset-0">
      <Canvas
        camera={{ position: [0, 120, 250], fov: 55, near: 1, far: 1500 }}
        dpr={[1, 1.5]}
        gl={{
          antialias: false,
          alpha: true,
          powerPreference: "high-performance",
        }}
        style={{ background: "transparent" }}
      >
        <Suspense fallback={null}>
          {/* Atmosphere */}
          <fog attach="fog" args={["#0a1a0f", 80, 600]} />
          <color attach="background" args={["#060d09"]} />

          {/* Lighting — moody moonlit monsoon */}
          <ambientLight intensity={0.2} color="#3a5a4a" />
          <directionalLight
            position={[100, 200, 50]}
            intensity={0.4}
            color="#6b8fa8"
          />
          <directionalLight
            position={[-50, 80, 100]}
            intensity={0.15}
            color="#4a6a5a"
          />

          {/* Scene elements */}
          <MountainTerrain />
          <CloudLayers />
          <RainParticles />
          <CameraRig />
        </Suspense>
      </Canvas>
    </div>
  );
}
