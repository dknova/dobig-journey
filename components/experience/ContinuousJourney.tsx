"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, Line, Sparkles, Stars } from "@react-three/drei";
import { Suspense, useMemo, useRef } from "react";
import * as THREE from "three";
import { journeyProgress } from "@/lib/journey-progress";

const STAGES = [
  { z: 2, title: "THE GATEWAY" },
  { z: -15, title: "INFRASTRUCTURE" },
  { z: -34, title: "CLOUD" },
  { z: -53, title: "SOFTWARE" },
  { z: -72, title: "INTELLIGENCE" },
  { z: -91, title: "OPERATIONS" },
  { z: -111, title: "CONNECTED WORLD" },
];

function Portal({ position, scale = 1, color = "#6e8cff" }: { position: [number, number, number]; scale?: number; color?: string }) {
  const ring = useRef<THREE.Mesh>(null);
  const inner = useRef<THREE.Mesh>(null);
  useFrame((state, delta) => {
    if (ring.current) ring.current.rotation.z += delta * 0.12;
    if (inner.current) inner.current.rotation.z -= delta * 0.08;
  });
  return (
    <group position={position} scale={scale}>
      <mesh ref={ring}><torusGeometry args={[3.3, 0.08, 16, 128]} /><meshStandardMaterial color={color} emissive={color} emissiveIntensity={2.2} metalness={0.7} roughness={0.2} /></mesh>
      <mesh ref={inner} rotation={[0, 0, Math.PI / 4]}><torusGeometry args={[2.92, 0.018, 8, 96]} /><meshBasicMaterial color="#d8e1ff" transparent opacity={0.65} /></mesh>
      <mesh><circleGeometry args={[2.8, 80]} /><meshBasicMaterial color="#111b3a" transparent opacity={0.4} side={THREE.DoubleSide} /></mesh>
      <pointLight color={color} intensity={5} distance={13} />
    </group>
  );
}

function FloorRunway() {
  const lines = useMemo(() => Array.from({ length: 29 }, (_, i) => i), []);
  return (
    <group>
      <mesh position={[0, -3.8, -53]} rotation={[-Math.PI / 2, 0, 0]}><planeGeometry args={[22, 150]} /><meshStandardMaterial color="#0b1230" metalness={0.55} roughness={0.38} /></mesh>
      {lines.map((i) => <mesh key={i} position={[0, -3.76, 8 - i * 5.1]} rotation={[-Math.PI / 2, 0, 0]}><planeGeometry args={[18, 0.018]} /><meshBasicMaterial color={i % 3 === 0 ? "#596fff" : "#263b70"} transparent opacity={i % 3 === 0 ? 0.55 : 0.3} /></mesh>)}
      {[-1, 1].map((side) => <group key={side} position={[side * 8.8, -3.72, -53]}><mesh><boxGeometry args={[0.035, 0.035, 150]} /><meshBasicMaterial color="#6f8dff" transparent opacity={0.8} /></mesh><pointLight position={[0, 1, 0]} color="#3c66ff" intensity={1.2} distance={12} /></group>)}
    </group>
  );
}

function DataCenter({ z }: { z: number }) {
  return (
    <group position={[0, -1.1, z]}>
      <mesh position={[0, 0, -1]}><boxGeometry args={[13, 5.8, 7]} /><meshStandardMaterial color="#101b38" metalness={0.75} roughness={0.3} /></mesh>
      {Array.from({ length: 8 }, (_, i) => {
        const x = (i - 3.5) * 1.42;
        return <group key={i} position={[x, 0, 2.65]}>
          <mesh><boxGeometry args={[1.1, 4.5, 0.5]} /><meshStandardMaterial color="#263552" metalness={0.82} roughness={0.24} /></mesh>
          {Array.from({ length: 7 }, (_, j) => <group key={j} position={[0, 1.72 - j * 0.51, 0.27]}><mesh><boxGeometry args={[0.84, 0.31, 0.045]} /><meshStandardMaterial color="#0a1022" metalness={0.4} roughness={0.3} /></mesh><mesh position={[0.25, 0, 0.035]}><boxGeometry args={[0.055, 0.055, 0.025]} /><meshBasicMaterial color={j % 3 === 0 ? "#a8bcff" : "#53d8f5"} /></mesh><mesh position={[-0.23, 0, 0.035]}><boxGeometry args={[0.3, 0.025, 0.02]} /><meshBasicMaterial color="#4b67a3" /></mesh></group>)}
        </group>;
      })}
      <mesh position={[0, -2.95, 0]}><boxGeometry args={[15, 0.12, 9]} /><meshStandardMaterial color="#5a73c9" emissive="#2d4ba8" emissiveIntensity={0.7} metalness={0.7} /></mesh>
      <Portal position={[0, 0.3, -5.2]} scale={0.65} color="#65cfff" />
      <pointLight position={[0, 2.5, 3]} color="#507dff" intensity={7} distance={20} />
    </group>
  );
}

function CloudWorld({ z }: { z: number }) {
  const puffs = useMemo(() => Array.from({ length: 36 }, (_, i) => ({ x: Math.sin(i * 8.17) * 7.5, y: Math.cos(i * 3.4) * 2.2 + 1.5, z: -((i * 1.37) % 14), s: 0.55 + ((i * 17) % 10) / 10 })), []);
  return <group position={[0, 0, z]}>
    <Portal position={[0, 0.1, -3]} scale={1.15} color="#a78bfa" />
    {puffs.map((p, i) => <mesh key={i} position={[p.x, p.y, p.z]} scale={p.s}><sphereGeometry args={[1, 16, 12]} /><meshStandardMaterial color={i % 3 === 0 ? "#a8b8ff" : "#e1e7ff"} transparent opacity={0.23} roughness={1} metalness={0.05} /></mesh>)}
    {[-1, 1].map((s) => <group key={s} position={[s * 5.6, -1.6, -2]}><mesh rotation={[0, 0, s * -0.12]}><boxGeometry args={[3.3, 0.18, 8]} /><meshStandardMaterial color="#202e5c" metalness={0.7} roughness={0.24} emissive="#2c438b" emissiveIntensity={0.4} /></mesh>{Array.from({ length: 5 }, (_, i) => <mesh key={i} position={[0, 0.15, -i * 1.5]}><boxGeometry args={[2.7, 0.025, 0.025]} /><meshBasicMaterial color="#9c9cff" transparent opacity={0.7} /></mesh>)}</group>)}
    <pointLight position={[0, 3, 0]} color="#9d8cff" intensity={9} distance={25} />
  </group>;
}

function SoftwareWorld({ z }: { z: number }) {
  const cubes = useMemo(() => Array.from({ length: 23 }, (_, i) => ({ x: Math.sin(i * 12.4) * 6, y: Math.cos(i * 4.1) * 3.4, z: -((i * 2.2) % 14), s: 0.35 + (i % 4) * 0.17 })), []);
  return <group position={[0, 0, z]}>
    <Portal position={[0, 0, -4]} scale={0.94} color="#628cff" />
    {cubes.map((c, i) => <Float key={i} speed={0.55 + (i % 4) * 0.15} rotationIntensity={0.35} floatIntensity={0.3}><mesh position={[c.x, c.y, c.z]} rotation={[i * 0.17, i * 0.3, i * 0.11]}><boxGeometry args={[c.s, c.s, c.s]} /><meshStandardMaterial color={i % 3 === 0 ? "#a78bfa" : "#8bbdff"} emissive={i % 3 === 0 ? "#6749d4" : "#2759c6"} emissiveIntensity={0.85} metalness={0.65} roughness={0.2} wireframe={i % 5 === 0} /></mesh></Float>)}
    {Array.from({ length: 8 }, (_, i) => <Line key={i} points={[[-5, -2 + i * 0.55, -1], [0, Math.sin(i) * 1.8, -5], [5, -2 + i * 0.55, -9]]} color="#6688ff" transparent opacity={0.36} lineWidth={1} />)}
    <pointLight position={[0, 2, 0]} color="#6b8dff" intensity={8} distance={22} />
  </group>;
}

function IntelligenceWorld({ z }: { z: number }) {
  const orb = useRef<THREE.Group>(null);
  useFrame((state, delta) => { if (orb.current) { orb.current.rotation.y += delta * 0.16; orb.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.25) * 0.12; } });
  const links = useMemo(() => Array.from({ length: 42 }, (_, i) => {
    const a = (i / 42) * Math.PI * 2; const b = ((i * 13) % 42 / 42) * Math.PI * 2;
    return [[Math.cos(a) * 2.7, Math.sin(a * 2.7) * 2.7, Math.sin(a) * 2.7] as [number, number, number], [Math.cos(b) * 2.7, Math.sin(b * 2.7) * 2.7, Math.sin(b) * 2.7] as [number, number, number]];
  }), []);
  return <group position={[0, 0, z]}>
    <Portal position={[0, 0, -5]} scale={0.82} color="#a78bfa" />
    <group ref={orb} position={[0, 0.5, -2]}>
      <mesh><icosahedronGeometry args={[2.1, 2]} /><meshStandardMaterial color="#253f8c" emissive="#4537b8" emissiveIntensity={0.8} metalness={0.72} roughness={0.24} wireframe /></mesh>
      <mesh><icosahedronGeometry args={[1.65, 3]} /><meshStandardMaterial color="#8d9fff" emissive="#526dff" emissiveIntensity={1.3} metalness={0.4} roughness={0.2} transparent opacity={0.7} wireframe /></mesh>
      {links.map((pair, i) => <Line key={i} points={pair} color={i % 3 ? "#6a8fff" : "#d0b4ff"} transparent opacity={0.65} lineWidth={1} />)}
      <mesh><sphereGeometry args={[0.45, 24, 24]} /><meshBasicMaterial color="#f3f5ff" /></mesh>
    </group>
    <Sparkles count={100} scale={[14, 9, 13]} size={2.5} speed={0.22} color="#9b9cff" />
    <pointLight position={[0, 0.5, -2]} color="#8471ff" intensity={14} distance={23} />
  </group>;
}

function OperationsWorld({ z }: { z: number }) {
  return <group position={[0, 0, z]}>
    <Portal position={[0, 0, -4]} scale={0.86} color="#66cfff" />
    <mesh position={[0, 1.8, -5]}><boxGeometry args={[13, 5, 0.3]} /><meshStandardMaterial color="#111b39" metalness={0.8} roughness={0.25} /></mesh>
    {Array.from({ length: 8 }, (_, i) => <group key={i} position={[-5.55 + i * 1.58, 1.9, -4.78]}>
      <mesh><planeGeometry args={[1.35, 1.55]} /><meshBasicMaterial color={i % 3 === 0 ? "#152d60" : "#101f43"} /></mesh>
      {Array.from({ length: 5 }, (_, j) => <mesh key={j} position={[0, 0.52 - j * 0.23, 0.02]}><planeGeometry args={[0.9, 0.035 + (j % 2) * 0.02]} /><meshBasicMaterial color={j % 3 === 0 ? "#a78bfa" : "#55c9ed"} transparent opacity={0.55 + (i % 3) * 0.12} /></mesh>)}
    </group>)}
    <mesh position={[0, -1.1, -2.5]} rotation={[-0.1, 0, 0]}><boxGeometry args={[5.5, 0.18, 2]} /><meshStandardMaterial color="#34466f" metalness={0.8} roughness={0.25} /></mesh>
    {[-1.7, 0, 1.7].map((x, i) => <mesh key={i} position={[x, -0.45, -2.6]}><boxGeometry args={[1.15, 0.85, 0.08]} /><meshStandardMaterial color="#0c1732" emissive={i === 1 ? "#2b5fff" : "#1b3975"} emissiveIntensity={0.9} /></mesh>)}
    <pointLight position={[0, 3, -3]} color="#5caaff" intensity={8} distance={20} />
  </group>;
}

function ConnectedWorld({ z }: { z: number }) {
  const globe = useRef<THREE.Group>(null);
  useFrame((_, delta) => { if (globe.current) globe.current.rotation.y += delta * 0.09; });
  return <group position={[0, 0, z]}>
    <Portal position={[0, 0, -6]} scale={1.3} color="#8ba5ff" />
    <group ref={globe} position={[0, 0.4, -2]}>
      <mesh><sphereGeometry args={[3.4, 48, 48]} /><meshStandardMaterial color="#132c60" emissive="#122a71" emissiveIntensity={0.65} metalness={0.55} roughness={0.35} wireframe /></mesh>
      {Array.from({ length: 8 }, (_, i) => <mesh key={i} rotation={[0, i * Math.PI / 4, 0]}><torusGeometry args={[3.55, 0.018, 8, 96]} /><meshBasicMaterial color={i % 2 ? "#a78bfa" : "#69d4ff"} transparent opacity={0.75} /></mesh>)}
      {Array.from({ length: 14 }, (_, i) => { const a = i * 2.399; const y = 1 - (i / 13) * 2; const r = Math.sqrt(1 - y * y) * 3.43; return <mesh key={i} position={[Math.cos(a) * r, y * 3.43, Math.sin(a) * r]}><sphereGeometry args={[0.085, 12, 12]} /><meshBasicMaterial color="#e4edff" /></mesh>; })}
    </group>
    <Sparkles count={150} scale={[20, 12, 18]} size={2.4} speed={0.3} color="#a8c5ff" />
    <pointLight position={[0, 1, -2]} color="#607dff" intensity={18} distance={28} />
  </group>;
}

function Astronaut() {
  const root = useRef<THREE.Group>(null);
  const leftArm = useRef<THREE.Group>(null);
  const rightArm = useRef<THREE.Group>(null);
  const leftLeg = useRef<THREE.Group>(null);
  const rightLeg = useRef<THREE.Group>(null);
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (root.current) { root.current.position.y = -1.45 + Math.sin(t * 2.1) * 0.08; root.current.rotation.y = Math.sin(t * 0.35) * 0.12; }
    if (leftArm.current) leftArm.current.rotation.z = 0.25 + Math.sin(t * 2) * 0.07;
    if (rightArm.current) rightArm.current.rotation.z = -0.25 - Math.sin(t * 2) * 0.07;
    if (leftLeg.current) leftLeg.current.rotation.x = Math.sin(t * 2) * 0.06;
    if (rightLeg.current) rightLeg.current.rotation.x = -Math.sin(t * 2) * 0.06;
  });
  return <group ref={root}>
    <mesh position={[0, 0.45, 0]}><capsuleGeometry args={[0.48, 0.75, 8, 16]} /><meshStandardMaterial color="#e8efff" metalness={0.35} roughness={0.32} /></mesh>
    <mesh position={[0, 1.42, 0]}><sphereGeometry args={[0.49, 28, 24]} /><meshStandardMaterial color="#eaf0ff" metalness={0.22} roughness={0.26} /></mesh>
    <mesh position={[0, 1.42, 0.405]} scale={[0.36, 0.27, 0.1]}><sphereGeometry args={[1, 24, 20]} /><meshStandardMaterial color="#17376d" emissive="#3766b5" emissiveIntensity={0.6} metalness={0.7} roughness={0.14} /></mesh>
    <mesh position={[0, 0.42, -0.48]}><boxGeometry args={[0.55, 0.72, 0.34]} /><meshStandardMaterial color="#a6b8e8" metalness={0.6} roughness={0.3} /></mesh>
    <mesh position={[0, 0.43, 0.49]}><boxGeometry args={[0.3, 0.36, 0.08]} /><meshStandardMaterial color="#6a8eff" emissive="#4368ff" emissiveIntensity={1.2} /></mesh>
    <group ref={leftArm} position={[-0.56, 0.72, 0]}><mesh position={[0, -0.32, 0]} rotation={[0, 0, 0.16]}><capsuleGeometry args={[0.16, 0.48, 6, 10]} /><meshStandardMaterial color="#dfe8ff" /></mesh><mesh position={[-0.02, -0.65, 0.02]}><sphereGeometry args={[0.17, 12, 12]} /><meshStandardMaterial color="#91a9dc" /></mesh></group>
    <group ref={rightArm} position={[0.56, 0.72, 0]}><mesh position={[0, -0.32, 0]} rotation={[0, 0, -0.16]}><capsuleGeometry args={[0.16, 0.48, 6, 10]} /><meshStandardMaterial color="#dfe8ff" /></mesh><mesh position={[0.02, -0.65, 0.02]}><sphereGeometry args={[0.17, 12, 12]} /><meshStandardMaterial color="#91a9dc" /></mesh></group>
    <group ref={leftLeg} position={[-0.25, -0.05, 0]}><mesh position={[0, -0.32, 0]}><capsuleGeometry args={[0.19, 0.5, 6, 10]} /><meshStandardMaterial color="#dfe8ff" /></mesh><mesh position={[0, -0.67, 0.11]}><boxGeometry args={[0.38, 0.2, 0.48]} /><meshStandardMaterial color="#8fa5d5" metalness={0.4} roughness={0.3} /></mesh></group>
    <group ref={rightLeg} position={[0.25, -0.05, 0]}><mesh position={[0, -0.32, 0]}><capsuleGeometry args={[0.19, 0.5, 6, 10]} /><meshStandardMaterial color="#dfe8ff" /></mesh><mesh position={[0, -0.67, 0.11]}><boxGeometry args={[0.38, 0.2, 0.48]} /><meshStandardMaterial color="#8fa5d5" metalness={0.4} roughness={0.3} /></mesh></group>
    <pointLight position={[0, 0.5, 0.8]} color="#6e9bff" intensity={1.4} distance={3.5} />
  </group>;
}

function JourneyCamera() {
  const { camera } = useThree();
  const target = useMemo(() => new THREE.Vector3(), []);
  useFrame((_, delta) => {
    const p = THREE.MathUtils.clamp(journeyProgress.value, 0, 1);
    const z = 5 - p * 113;
    const sway = Math.sin(p * Math.PI * 6) * 0.22;
    camera.position.x = THREE.MathUtils.damp(camera.position.x, sway, 2.5, delta);
    camera.position.y = THREE.MathUtils.damp(camera.position.y, 0.25 + Math.sin(p * Math.PI * 7) * 0.08, 2.5, delta);
    camera.position.z = THREE.MathUtils.damp(camera.position.z, z + 8.3, 3.2, delta);
    target.set(sway * 0.25, -0.3, z - 4.5);
    camera.lookAt(target);
  });
  return null;
}

function JourneyWorld() {
  const astronautPath = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    const p = THREE.MathUtils.clamp(journeyProgress.value, 0, 1);
    const z = 3 - p * 113;
    if (astronautPath.current) {
      astronautPath.current.position.z = THREE.MathUtils.damp(astronautPath.current.position.z, z, 4.2, delta);
      astronautPath.current.position.x = THREE.MathUtils.damp(astronautPath.current.position.x, Math.sin(p * Math.PI * 6) * 0.4, 2.8, delta);
    }
  });
  return <>
    <color attach="background" args={["#070b1c"]} />
    <fog attach="fog" args={["#070b1c", 22, 145]} />
    <ambientLight intensity={0.8} />
    <hemisphereLight args={["#c4d8ff", "#11172e", 1.25]} />
    <directionalLight position={[5, 8, 6]} intensity={2.3} color="#dbe7ff" />
    <Stars radius={125} depth={90} count={3500} factor={4} saturation={0.35} fade speed={0.45} />
    <Sparkles count={150} scale={[18, 9, 145]} position={[0, 0, -54]} size={1.7} speed={0.18} color="#7799ff" />
    <FloorRunway />
    <Portal position={[0, 0, -1]} scale={1.2} color="#7196ff" />
    <DataCenter z={-15} />
    <CloudWorld z={-34} />
    <SoftwareWorld z={-53} />
    <IntelligenceWorld z={-72} />
    <OperationsWorld z={-91} />
    <ConnectedWorld z={-111} />
    <group ref={astronautPath} position={[0, 0, 3]}><Astronaut /></group>
    <JourneyCamera />
  </>;
}

export default function ContinuousJourney() {
  return <div className="journey-world-canvas" aria-label="Interactive 3D journey through DOBIG infrastructure, cloud, software, AI, operations, and connected world">
    <Canvas dpr={[1, 1.65]} camera={{ position: [0, 0.25, 13], fov: 47 }} gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}>
      <Suspense fallback={null}><JourneyWorld /></Suspense>
    </Canvas>
  </div>;
}
