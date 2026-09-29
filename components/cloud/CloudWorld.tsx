"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import type { Mesh } from "three";
import {
  Cloud,
  Float,
  Line,
  MeshDistortMaterial,
  Sparkles,
} from "@react-three/drei";

type Point3D = [number, number, number];

function CloudCore() {
  const outerRef = useRef<Mesh>(null);
  const innerRef = useRef<Mesh>(null);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;

    if (outerRef.current) {
      outerRef.current.rotation.y = t * 0.12;
      outerRef.current.rotation.x = Math.sin(t * 0.25) * 0.08;
    }

    if (innerRef.current) {
      innerRef.current.rotation.y = -t * 0.18;
      const pulse = 1 + Math.sin(t * 1.4) * 0.025;
      innerRef.current.scale.setScalar(pulse);
    }
  });

  return (
    <group position={[1.9, 0.25, -1.1]}>
      <Float speed={0.35} rotationIntensity={0.04} floatIntensity={0.1}>
        <mesh ref={outerRef}>
          <icosahedronGeometry args={[1.38, 5]} />
          <MeshDistortMaterial
            color="#467cff"
            emissive="#193fcb"
            emissiveIntensity={0.75}
            roughness={0.22}
            metalness={0.55}
            distort={0.16}
            speed={1.1}
            transparent
            opacity={0.8}
          />
        </mesh>

        <mesh ref={innerRef}>
          <sphereGeometry args={[0.91, 48, 48]} />
          <meshStandardMaterial
            color="#172e70"
            emissive="#245bff"
            emissiveIntensity={1.5}
            metalness={0.6}
            roughness={0.2}
            transparent
            opacity={0.65}
          />
        </mesh>

        <mesh rotation={[0.85, 0.2, 0.35]}>
          <torusGeometry args={[1.72, 0.012, 8, 160]} />
          <meshBasicMaterial color="#80d8ff" transparent opacity={0.9} />
        </mesh>

        <mesh rotation={[1.25, -0.5, -0.35]}>
          <torusGeometry args={[2.02, 0.009, 8, 160]} />
          <meshBasicMaterial color="#9d8cff" transparent opacity={0.75} />
        </mesh>

        <mesh rotation={[0.25, 0.9, 0.6]}>
          <torusGeometry args={[1.48, 0.008, 8, 160]} />
          <meshBasicMaterial color="#4d9dff" transparent opacity={0.85} />
        </mesh>
      </Float>
    </group>
  );
}

type NodeVariant = "compute" | "gateway" | "ai" | "storage";

function ServerMonolith({
  position,
  accent,
  scale = 1,
  variant = "compute",
}: {
  position: Point3D;
  accent: string;
  scale?: number;
  variant?: NodeVariant;
}) {
  return (
    <Float speed={0.35 + scale * 0.12} rotationIntensity={0.035} floatIntensity={0.18}>
      <group position={position} scale={scale}>
        {variant === "compute" && (
          <>
            <mesh>
              <boxGeometry args={[1.35, 0.48, 0.78]} />
              <meshStandardMaterial color="#15284d" metalness={0.8} roughness={0.24} />
            </mesh>
            <mesh position={[0, 0.255, 0]}>
              <boxGeometry args={[1.22, 0.045, 0.7]} />
              <meshStandardMaterial color="#344d79" metalness={0.75} roughness={0.22} />
            </mesh>
            <mesh position={[0, 0, 0.397]}>
              <boxGeometry args={[0.88, 0.27, 0.018]} />
              <meshStandardMaterial color="#09152e" />
            </mesh>
            {[-0.3, -0.1, 0.1, 0.3].map((x, i) => (
              <mesh key={i} position={[x, 0, 0.412]}>
                <boxGeometry args={[0.035, 0.17, 0.012]} />
                <meshBasicMaterial color={accent} />
              </mesh>
            ))}
          </>
        )}

        {variant === "gateway" && (
          <>
            <mesh rotation={[Math.PI / 2, 0, 0]}>
              <torusGeometry args={[0.52, 0.085, 16, 64]} />
              <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={1.2} metalness={0.65} roughness={0.2} />
            </mesh>
            <mesh>
              <sphereGeometry args={[0.36, 32, 32]} />
              <meshStandardMaterial color="#183b78" emissive={accent} emissiveIntensity={0.5} transparent opacity={0.8} metalness={0.65} roughness={0.2} />
            </mesh>
            <mesh position={[0, 0, -0.12]}>
              <torusGeometry args={[0.68, 0.012, 8, 64]} />
              <meshBasicMaterial color="#a9caff" />
            </mesh>
          </>
        )}

        {variant === "ai" && (
          <>
            <mesh rotation={[0.35, 0.4, 0.2]}>
              <octahedronGeometry args={[0.68, 1]} />
              <meshStandardMaterial color="#263e85" emissive={accent} emissiveIntensity={0.8} metalness={0.75} roughness={0.2} wireframe />
            </mesh>
            <mesh>
              <icosahedronGeometry args={[0.38, 1]} />
              <meshStandardMaterial color="#5e75ff" emissive={accent} emissiveIntensity={1.4} metalness={0.6} roughness={0.18} />
            </mesh>
            {[0, 1, 2].map((i) => (
              <mesh key={i} position={[0, 0.82 + i * 0.12, 0]}>
                <sphereGeometry args={[0.035, 12, 12]} />
                <meshBasicMaterial color={accent} />
              </mesh>
            ))}
          </>
        )}

        {variant === "storage" && (
          <>
            <mesh>
              <cylinderGeometry args={[0.42, 0.48, 0.9, 8]} />
              <meshStandardMaterial color="#23365e" metalness={0.8} roughness={0.25} />
            </mesh>
            <mesh position={[0, 0.46, 0]}>
              <cylinderGeometry args={[0.42, 0.42, 0.07, 32]} />
              <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={0.8} metalness={0.55} roughness={0.2} />
            </mesh>
            {[-0.22, 0, 0.22].map((x, i) => (
              <mesh key={i} position={[x, 0, 0.43]}>
                <boxGeometry args={[0.035, 0.38, 0.018]} />
                <meshBasicMaterial color={accent} />
              </mesh>
            ))}
          </>
        )}

        <mesh position={[0, -0.58, 0]}>
          <boxGeometry args={variant === "gateway" ? [1.05, 0.055, 0.65] : [0.95, 0.055, 0.55]} />
          <meshStandardMaterial color="#243d70" metalness={0.8} roughness={0.22} />
        </mesh>

        <mesh position={[0, variant === "ai" ? 0.9 : 0.63, 0]}>
          <sphereGeometry args={[0.045, 16, 16]} />
          <meshBasicMaterial color={accent} />
        </mesh>
      </group>
    </Float>
  );
}

function ConnectionRoute({
  points,
  color,
}: {
  points: Point3D[];
  color: string;
}) {
  const packetRef = useRef<Mesh>(null);

  useFrame(({ clock }) => {
    if (!packetRef.current || points.length < 2) return;

    const progress = (clock.elapsedTime * 0.22) % 1;
    const scaledProgress = progress * (points.length - 1);
    const segment = Math.min(
      Math.floor(scaledProgress),
      points.length - 2
    );
    const localProgress = scaledProgress - segment;

    const start = points[segment];
    const end = points[segment + 1];

    packetRef.current.position.set(
      start[0] + (end[0] - start[0]) * localProgress,
      start[1] + (end[1] - start[1]) * localProgress,
      start[2] + (end[2] - start[2]) * localProgress
    );
  });

  return (
    <>
      <Line
        points={points}
        color={color}
        lineWidth={1}
        transparent
        opacity={0.65}
      />

      <mesh ref={packetRef}>
        <sphereGeometry args={[0.045, 12, 12]} />
        <meshBasicMaterial
          color={color}
          toneMapped={false}
        />
      </mesh>
    </>
  );
}

function DataPulse({
  start,
  end,
  color = "#8adfff",
  speed = 0.24,
  offset = 0,
}: {
  start: Point3D;
  end: Point3D;
  color?: string;
  speed?: number;
  offset?: number;
}) {
  const pulseRef = useRef<Mesh>(null);

  useFrame(({ clock }) => {
    if (!pulseRef.current) return;

    const t = (clock.elapsedTime * speed + offset) % 1;

    pulseRef.current.position.set(
      start[0] + (end[0] - start[0]) * t,
      start[1] + (end[1] - start[1]) * t,
      start[2] + (end[2] - start[2]) * t
    );
  });

  return (
    <mesh ref={pulseRef}>
      <sphereGeometry args={[0.055, 16, 16]} />
      <meshBasicMaterial color={color} toneMapped={false} />
    </mesh>
  );
}

function CloudEnvironment() {
  return (
    <>
      <color attach="background" args={["#09132f"]} />
      <fog attach="fog" args={["#09132f", 12, 32]} />

      <hemisphereLight args={["#d8e9ff", "#10142d", 1.7]} />

      <ambientLight intensity={0.5} />

      <directionalLight
        position={[-5, 8, 6]}
        intensity={2.2}
        color="#c4e1ff"
      />

      <pointLight
        position={[2, 1, 2]}
        intensity={45}
        distance={12}
        color="#397bff"
      />

      <pointLight
        position={[4, -2, -3]}
        intensity={28}
        distance={10}
        color="#9c70ff"
      />

      {/* Deep atmospheric cloud layers */}
      <Cloud
        position={[-4, 1.5, -7]}
        seed={14}
        segments={30}
        bounds={[6, 2.5, 2]}
        volume={4}
        opacity={0.27}
        color="#426db9"
        speed={0.018}
        fade={12}
        growth={2}
      />

      <Cloud
        position={[4, 2.3, -8]}
        seed={29}
        segments={32}
        bounds={[6, 2.5, 2]}
        volume={4}
        opacity={0.32}
        color="#8277d5"
        speed={0.022}
        fade={12}
        growth={2}
      />

      <Cloud
        position={[0, -1.8, -6]}
        seed={41}
        segments={26}
        bounds={[8, 1.8, 2]}
        volume={3}
        opacity={0.2}
        color="#365eac"
        speed={0.015}
        fade={10}
        growth={2}
      />

      {/* Central cloud infrastructure */}
      <CloudCore />

      {/* Distributed compute environments */}
      <ServerMonolith
        position={[-2.9, -0.1, 0]}
        accent="#75e3ff"
        scale={0.78}
        variant="compute"
      />

      <ServerMonolith
        position={[0.1, 1.75, -1.8]}
        accent="#9ab9ff"
        scale={0.7}
        variant="gateway"
      />

      <ServerMonolith
        position={[4.45, 1.25, -1.6]}
        accent="#b9a0ff"
        scale={0.82}
        variant="ai"
      />

      <ServerMonolith
        position={[1.6, -2.15, -0.5]}
        accent="#75cfff"
        scale={0.65}
        variant="storage"
      />

      {/* Network routes connecting cloud regions */}
      <ConnectionRoute
        points={[
          [-2.9, 0.2, 0],
          [-1.1, 0.65, -0.3],
          [0.55, 0.9, -0.9],
        ]}
        color="#65cfff"
      />

      <ConnectionRoute
        points={[
          [0.1, 1.75, -1.8],
          [0.8, 1.3, -1.5],
          [1.5, 1, -1.3],
        ]}
        color="#a4c7ff"
      />

      <ConnectionRoute
        points={[
          [3.1, 0.7, -1.2],
          [3.8, 0.9, -1.5],
          [4.45, 1.25, -1.6],
        ]}
        color="#b39aff"
      />

      <ConnectionRoute
        points={[
          [1.6, -2.15, -0.5],
          [1.5, -1.2, -0.8],
          [1.7, -0.6, -1],
        ]}
        color="#7bcfff"
      />


      {/* Animated data packets */}
      <DataPulse start={[-2.9, 0.2, 0]} end={[0.55, 0.9, -0.9]}
        color="#75e3ff" speed={0.32} offset={0.05} />
      <DataPulse start={[0.1, 1.75, -1.8]} end={[1.5, 1, -1.3]}
        color="#a4c7ff" speed={0.38} offset={0.48} />
      <DataPulse start={[3.1, 0.7, -1.2]} end={[4.45, 1.25, -1.6]}
        color="#b9a0ff" speed={0.34} offset={0.22} />
      <DataPulse start={[1.6, -2.15, -0.5]} end={[1.7, -0.6, -1]}
        color="#75cfff" speed={0.42} offset={0.68} />

      {/* Atmospheric data particles */}
      <Sparkles
        count={180}
        scale={[17, 10, 12]}
        size={1.4}
        speed={0.16}
        opacity={0.48}
        color="#b7d7ff"
      />
    </>
  );
}

export default function CloudWorld() {
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
      <Canvas
        camera={{ position: [0, 1, 12], fov: 42, near: 0.1, far: 100 }}
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
      >
        <CloudEnvironment />
      </Canvas>
    </div>
  );
}
