"use client";

import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Suspense } from "react";

interface ElevationData {
  maxElevation: number;
  distance: number; // km
  color?: string;
}

/* ── 3D Ribbon Path ── */
function ElevationRibbon({
  maxElevation,
  distance,
  color = "#2ecc71",
}: ElevationData) {
  const meshRef = useRef<THREE.Mesh>(null);
  const progressRef = useRef(0);

  // Generate elevation profile points
  const { geometry, lineGeometry } = useMemo(() => {
    const segments = 100;
    const width = 8;
    const height = (maxElevation / 600) * 4; // normalized to scene units
    const length = (distance / 21.1) * 12; // normalized

    const shape = new THREE.Shape();
    const points: THREE.Vector3[] = [];

    // Generate elevation curve
    for (let i = 0; i <= segments; i++) {
      const t = i / segments;
      const x = t * length - length / 2;

      // Elevation curve: starts low, climbs to peak, descends
      let y = 0;
      if (t < 0.45) {
        // Climb phase
        y = Math.pow(t / 0.45, 1.5) * height;
      } else if (t < 0.55) {
        // Peak plateau
        y = height;
      } else {
        // Descent
        y = Math.pow((1 - t) / 0.45, 1.5) * height;
      }

      // Add some undulation
      y += Math.sin(t * Math.PI * 6) * height * 0.05;
      y += Math.sin(t * Math.PI * 12) * height * 0.02;

      points.push(new THREE.Vector3(x, y, 0));
    }

    // Create ribbon geometry from points
    const positions = new Float32Array((segments + 1) * 6); // 2 vertices per point
    const colors = new Float32Array((segments + 1) * 6);
    const indices: number[] = [];

    const col = new THREE.Color(color);
    const peakCol = new THREE.Color("#f59e0b");

    for (let i = 0; i <= segments; i++) {
      const p = points[i];
      const t = i / segments;

      // Top vertex
      positions[i * 6] = p.x;
      positions[i * 6 + 1] = p.y;
      positions[i * 6 + 2] = width / 2;

      // Bottom vertex
      positions[i * 6 + 3] = p.x;
      positions[i * 6 + 4] = p.y;
      positions[i * 6 + 5] = -width / 2;

      // Color gradient: green at base → amber at peak
      const elevRatio = p.y / height;
      const c = new THREE.Color().lerpColors(col, peakCol, elevRatio);

      colors[i * 6] = c.r;
      colors[i * 6 + 1] = c.g;
      colors[i * 6 + 2] = c.b;
      colors[i * 6 + 3] = c.r * 0.7;
      colors[i * 6 + 4] = c.g * 0.7;
      colors[i * 6 + 5] = c.b * 0.7;

      if (i < segments) {
        const base = i * 2;
        indices.push(base, base + 1, base + 2);
        indices.push(base + 1, base + 3, base + 2);
      }
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    geo.setIndex(indices);
    geo.computeVertexNormals();

    // Line geometry for the top edge
    const linePoints = points.map((p) => new THREE.Vector3(p.x, p.y + 0.05, 0));
    const lineGeo = new THREE.BufferGeometry().setFromPoints(linePoints);

    return { geometry: geo, lineGeometry: lineGeo };
  }, [maxElevation, distance, color]);

  // Scroll-triggered animation: "draw" the path
  useFrame(() => {
    if (progressRef.current < 1) {
      progressRef.current = Math.min(1, progressRef.current + 0.008);
    }

    if (meshRef.current) {
      const mat = meshRef.current.material as THREE.MeshStandardMaterial;
      mat.opacity = progressRef.current;
    }
  });

  return (
    <group rotation={[-0.3, 0, 0]} position={[0, -1, 0]}>
      <mesh ref={meshRef} geometry={geometry}>
        <meshStandardMaterial
          vertexColors
          roughness={0.6}
          metalness={0.1}
          transparent
          opacity={0.9}
          side={THREE.DoubleSide}
        />
      </mesh>
      <primitive object={new THREE.Line(lineGeometry, new THREE.LineBasicMaterial({ color: "#ffffff", transparent: true, opacity: 0.3 }))} />
    </group>
  );
}

/* ── SVG Fallback for mobile ── */
export function ElevationFallback({
  maxElevation,
  distance,
}: {
  maxElevation: number;
  distance: number;
}) {
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const path = pathRef.current;
    if (!path) return;

    const length = path.getTotalLength();
    path.style.strokeDasharray = `${length}`;
    path.style.strokeDashoffset = `${length}`;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          path.style.transition = "stroke-dashoffset 2s ease-out";
          path.style.strokeDashoffset = "0";
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(path);
    return () => observer.disconnect();
  }, []);

  // Generate SVG path
  const segments = 50;
  const width = 300;
  const height = 100;

  let d = `M 0 ${height}`;
  for (let i = 0; i <= segments; i++) {
    const t = i / segments;
    const x = t * width;
    let y;

    if (t < 0.45) {
      y = height - Math.pow(t / 0.45, 1.5) * height * 0.8;
    } else if (t < 0.55) {
      y = height * 0.2;
    } else {
      y = height - Math.pow((1 - t) / 0.45, 1.5) * height * 0.8;
    }
    y += Math.sin(t * Math.PI * 6) * 3;

    d += ` L ${x.toFixed(1)} ${y.toFixed(1)}`;
  }

  return (
    <svg viewBox={`0 0 ${width} ${height + 10}`} className="w-full h-32">
      <defs>
        <linearGradient id={`elev-grad-${distance}`} x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="#2ecc71" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.3" />
        </linearGradient>
      </defs>
      <path
        d={d + ` L ${width} ${height} L 0 ${height} Z`}
        fill={`url(#elev-grad-${distance})`}
      />
      <path
        ref={pathRef}
        d={d}
        fill="none"
        stroke="url(#elev-grad-${distance})"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

/* ── Main Component ── */
export default function ElevationProfile3D({
  maxElevation,
  distance,
}: ElevationData) {
  return (
    <div className="h-48 w-full rounded-xl overflow-hidden">
      <Canvas
        camera={{ position: [0, 3, 8], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ antialias: false, alpha: true }}
        style={{ background: "transparent" }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.4} color="#5a8a7a" />
          <directionalLight position={[5, 5, 5]} intensity={0.6} color="#6b8fa8" />
          <ElevationRibbon
            maxElevation={maxElevation}
            distance={distance}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
