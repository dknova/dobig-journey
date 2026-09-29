"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Grid, Line, Sparkles, Stars } from "@react-three/drei";
import { useRef } from "react";
import type { Group } from "three";

type Point = [number, number, number];

const cities: Point[] = [
  [-1.15, 0.65, 0.85],
  [0.75, 1.05, 0.72],
  [1.15, -0.35, 0.8],
  [-0.45, -1.05, 0.85],
  [-1.25, -0.25, 0.5],
  [0.15, 0.15, 1.4],
];

function Globe() {
  const globe = useRef<Group>(null);
  const network = useRef<Group>(null);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    if (globe.current) globe.current.rotation.y = t * 0.09;
    if (network.current) network.current.rotation.y = -t * 0.09;
  });

  return (
    <group position={[0, 2.15, 0]}>
      <group ref={globe}>
        <mesh>
          <sphereGeometry args={[1.65, 64, 64]} />
          <meshPhysicalMaterial
            color="#102d68"
            metalness={0.65}
            roughness={0.25}
            transparent
            opacity={0.78}
            emissive="#123b9d"
            emissiveIntensity={0.6}
          />
        </mesh>

        <mesh>
          <sphereGeometry args={[1.68, 32, 32]} />
          <meshBasicMaterial
            color="#4baaff"
            wireframe
            transparent
            opacity={0.17}
          />
        </mesh>

        <mesh>
          <sphereGeometry args={[1.7, 48, 48]} />
          <meshBasicMaterial
            color="#50baff"
            wireframe
            transparent
            opacity={0.08}
          />
        </mesh>

        <group ref={network}>
          {cities.map((point, i) => (
            <Float key={i} speed={0.5} floatIntensity={0.08}>
              <mesh position={point}>
                <sphereGeometry args={[0.075, 20, 20]} />
                <meshStandardMaterial
                  color="#d7f7ff"
                  emissive="#56caff"
                  emissiveIntensity={2.5}
                />
              </mesh>
            </Float>
          ))}

          {cities.map((point, i) => (
            <Line
              key={`route-${i}`}
              points={[point, cities[(i + 1) % cities.length]]}
              color={i % 2 === 0 ? "#72eaff" : "#a58bff"}
              lineWidth={1.2}
              transparent
              opacity={0.9}
            />
          ))}

          <Line
            points={[cities[0], cities[2], cities[5], cities[3]]}
            color="#75aaff"
            lineWidth={0.8}
            transparent
            opacity={0.6}
          />
        </group>

        <mesh rotation={[0.8, 0.2, 0.4]}>
          <torusGeometry args={[1.95, 0.018, 8, 128]} />
          <meshBasicMaterial color="#65dcff" />
        </mesh>

        <mesh rotation={[1.2, -0.5, 0.2]}>
          <torusGeometry args={[2.15, 0.012, 8, 128]} />
          <meshBasicMaterial
            color="#a38aff"
            transparent
            opacity={0.85}
          />
        </mesh>
      </group>

      <pointLight
        position={[0, 0, 1]}
        color="#3d9bff"
        intensity={24}
        distance={7}
      />
    </group>
  );
}

function CityTower({
  position,
  height,
}: {
  position: Point;
  height: number;
}) {
  return (
    <group position={position}>
      <mesh position={[0, height / 2, 0]}>
        <boxGeometry args={[0.45, height, 0.45]} />
        <meshStandardMaterial
          color="#101d43"
          metalness={0.8}
          roughness={0.25}
          emissive="#102f83"
          emissiveIntensity={0.5}
        />
      </mesh>

      {Array.from({ length: 5 }, (_, i) => (
        <mesh
          key={i}
          position={[0, 0.25 + i * height * 0.15, 0.232]}
        >
          <boxGeometry args={[0.22, 0.025, 0.012]} />
          <meshBasicMaterial
            color={i % 2 === 0 ? "#6de5ff" : "#a58aff"}
          />
        </mesh>
      ))}

      <mesh position={[0, height, 0]}>
        <boxGeometry args={[0.5, 0.045, 0.5]} />
        <meshBasicMaterial color="#458cff" />
      </mesh>
    </group>
  );
}

function ConnectedEnvironment() {
  return (
    <>
      <color attach="background" args={["#05091e"]} />
      <fog attach="fog" args={["#05091e", 13, 30]} />

      <ambientLight intensity={0.7} />
      <hemisphereLight args={["#9bcfff", "#080b25", 1.1]} />

      <directionalLight
        position={[4, 8, 5]}
        color="#b7d8ff"
        intensity={2}
      />

      <pointLight
        position={[-4, 3, -2]}
        color="#387dff"
        intensity={15}
        distance={12}
      />

      <pointLight
        position={[4, 3, -2]}
        color="#895bff"
        intensity={12}
        distance={12}
      />

      <Stars
        radius={45}
        depth={35}
        count={650}
        factor={2}
        fade
        speed={0.2}
      />

      <Sparkles
        count={130}
        scale={[13, 8, 12]}
        size={2}
        speed={0.25}
        color="#8edfff"
      />

      <Globe />

      <CityTower position={[-3.5, 0, -1.2]} height={2.5} />
      <CityTower position={[3.5, 0, -1.2]} height={2.8} />
      <CityTower position={[-4.7, 0, -3]} height={1.6} />
      <CityTower position={[4.7, 0, -3]} height={1.8} />
      <CityTower position={[-2.5, 0, -4.2]} height={1.2} />
      <CityTower position={[2.5, 0, -4.2]} height={1.4} />

      <Grid
        position={[0, -0.02, 0]}
        infiniteGrid
        cellSize={0.5}
        sectionSize={3}
        cellColor="#17346b"
        sectionColor="#3858b5"
        fadeDistance={25}
        fadeStrength={1.2}
      />
    </>
  );
}

export default function ConnectedWorld() {
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 3.1, 12], fov: 46 }}
        gl={{ antialias: true, powerPreference: "high-performance" }}
      >
        <ConnectedEnvironment />
      </Canvas>
    </div>
  );
}
