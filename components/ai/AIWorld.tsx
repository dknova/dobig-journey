"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import {
  Float,
  Grid,
  Line,
  Sparkles,
  Stars,
} from "@react-three/drei";
import { useRef } from "react";
import type { Group, Mesh } from "three";
import { journeyProgress } from "@/lib/journey-progress";

type Vec3 = [number, number, number];

const nodes: Vec3[] = [
  [-2.1, 1.0, 0.1],
  [-1.5, 2.5, -0.6],
  [-0.4, 3.0, 0.2],
  [1.0, 2.8, -0.5],
  [2.1, 1.8, 0.1],
  [1.8, 0.5, -0.4],
  [0.5, 0.1, 0.4],
  [-1.1, 0.3, -0.3],
  [-0.5, 1.6, 0.7],
  [0.8, 1.8, 0.4],
];

const edges: [number, number][] = [
  [0, 1], [1, 2], [2, 3], [3, 4], [4, 5],
  [5, 6], [6, 7], [7, 0], [1, 8], [8, 9],
  [9, 4], [2, 8], [3, 9], [8, 6], [0, 8],
];

function NeuralNetwork() {
  const root = useRef<Group>(null);

  useFrame(({ clock }) => {
    if (root.current) {
      root.current.rotation.y = Math.sin(clock.elapsedTime * 0.2) * 0.12;
      root.current.rotation.x = Math.sin(clock.elapsedTime * 0.16) * 0.035;
    }
  });

  return (
    <group ref={root} position={[0, 1.55, -0.3]}>
      {edges.map(([a, b], i) => (
        <Line
          key={i}
          points={[nodes[a], nodes[b]]}
          color={i % 3 === 0 ? "#9d8aff" : "#58caff"}
          lineWidth={i % 3 === 0 ? 1.2 : 0.7}
          transparent
          opacity={0.65}
        />
      ))}

      {nodes.map((position, i) => (
        <Float
          key={i}
          speed={0.4 + (i % 3) * 0.15}
          floatIntensity={0.12}
          rotationIntensity={0.05}
        >
          <group position={position}>
            <mesh>
              <icosahedronGeometry args={[i % 3 === 0 ? 0.095 : 0.06, 1]} />
              <meshStandardMaterial
                color={i % 3 === 0 ? "#c3a8ff" : "#76dfff"}
                emissive={i % 3 === 0 ? "#714bff" : "#087fff"}
                emissiveIntensity={2.2}
                metalness={0.5}
                roughness={0.2}
              />
            </mesh>
            <mesh scale={2.2}>
              <sphereGeometry args={[0.06, 16, 16]} />
              <meshBasicMaterial
                color="#54aaff"
                transparent
                opacity={0.12}
              />
            </mesh>
          </group>
        </Float>
      ))}
    </group>
  );
}

function AICore() {
  const core = useRef<Group>(null);
  const ring = useRef<Group>(null);
  const shell = useRef<Mesh>(null);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;

    if (core.current) {
      const scroll = Math.max(
        0,
        Math.min(1, (journeyProgress.value - 0.92) / 0.08)
      );

      core.current.rotation.y = t * 0.22 + scroll * Math.PI * 0.65;
      core.current.rotation.x =
        Math.sin(t * 0.35) * 0.08 + scroll * 0.12;
    }

    if (ring.current) {
      const scroll = Math.max(
        0,
        Math.min(1, (journeyProgress.value - 0.92) / 0.08)
      );

      ring.current.rotation.y = t * 0.12 + scroll * Math.PI;
      ring.current.rotation.z =
        Math.sin(t * 0.22) * 0.08 + scroll * 0.1;
    }

    if (shell.current) {
      const pulse = 1 + Math.sin(t * 1.2) * 0.025;
      shell.current.scale.setScalar(pulse);
    }
  });

  return (
    <group position={[0, 1.65, 0.5]} scale={1.12}>
      <Float speed={0.65} floatIntensity={0.15} rotationIntensity={0.08}>
        <group ref={core}>
          {/* Outer crystalline shell */}
          <mesh ref={shell}>
            <icosahedronGeometry args={[0.92, 2]} />
            <meshPhysicalMaterial
              color="#427aff"
              emissive="#174fff"
              emissiveIntensity={1.8}
              metalness={0.7}
              roughness={0.17}
              transparent
              opacity={0.36}
              wireframe
            />
          </mesh>

          {/* Inner three-dimensional energy crystal */}
          <mesh>
            <octahedronGeometry args={[0.65, 2]} />
            <meshPhysicalMaterial
              color="#8bdcff"
              emissive="#347bff"
              emissiveIntensity={2.6}
              metalness={0.4}
              roughness={0.14}
              transparent
              opacity={0.86}
            />
          </mesh>

          <mesh>
            <sphereGeometry args={[0.37, 40, 40]} />
            <meshBasicMaterial color="#eafaff" />
          </mesh>

          <mesh>
            <sphereGeometry args={[0.53, 32, 32]} />
            <meshBasicMaterial
              color="#53a9ff"
              transparent
              opacity={0.14}
            />
          </mesh>
        </group>

        <group ref={ring}>
          <mesh rotation={[0.85, 0.3, 0.2]}>
            <torusGeometry args={[1.18, 0.018, 10, 128]} />
            <meshBasicMaterial color="#7ce6ff" />
          </mesh>

          <mesh rotation={[1.15, -0.6, 0.5]}>
            <torusGeometry args={[1.5, 0.012, 10, 144]} />
            <meshBasicMaterial
              color="#a18aff"
              transparent
              opacity={0.9}
            />
          </mesh>

          <mesh rotation={[0.25, 0.7, -0.5]}>
            <torusGeometry args={[1.72, 0.009, 8, 144]} />
            <meshBasicMaterial color="#4087ff" />
          </mesh>
        </group>
      </Float>

      {/* Three-dimensional AI energy platform */}
      <group position={[0, -1.28, 0]}>
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[1.75, 1.95, 0.16, 96]} />
          <meshStandardMaterial
            color="#101d43"
            metalness={0.9}
            roughness={0.22}
          />
        </mesh>

        <mesh position={[0, 0.095, 0]}>
          <cylinderGeometry args={[1.62, 1.62, 0.035, 96]} />
          <meshStandardMaterial
            color="#142d67"
            metalness={0.8}
            roughness={0.2}
            emissive="#123dba"
            emissiveIntensity={0.45}
          />
        </mesh>

        <mesh position={[0, 0.12, 0]}>
          <torusGeometry args={[1.48, 0.025, 8, 128]} />
          <meshBasicMaterial color="#65dfff" />
        </mesh>

        <mesh position={[0, 0.13, 0]}>
          <torusGeometry args={[1.18, 0.012, 8, 128]} />
          <meshBasicMaterial
            color="#a18aff"
            transparent
            opacity={0.9}
          />
        </mesh>

        <mesh position={[0, -0.12, 0]}>
          <cylinderGeometry args={[1.25, 1.55, 0.12, 96]} />
          <meshStandardMaterial
            color="#080f29"
            metalness={0.85}
            roughness={0.28}
          />
        </mesh>
      </group>

      <pointLight
        position={[0, -0.8, 0.5]}
        color="#388cff"
        intensity={18}
        distance={5}
      />

      <pointLight
        position={[0, 0, 0.3]}
        color="#438cff"
        intensity={38}
        distance={8}
      />
    </group>
  );
}

function DataTower({
  position,
  height,
}: {
  position: Vec3;
  height: number;
}) {
  const lights = useRef<Group>(null);

  useFrame(({ clock }) => {
    if (lights.current) {
      lights.current.children.forEach((child, i) => {
        const material = (child as Mesh).material;
        if ("opacity" in material) {
          material.opacity =
            0.65 + Math.sin(clock.elapsedTime * 1.3 + i) * 0.25;
        }
      });
    }
  });

  return (
    <group position={position}>
      {/* Main monolithic structure */}
      <mesh position={[0, height / 2, 0]}>
        <boxGeometry args={[0.72, height, 0.72]} />
        <meshStandardMaterial
          color="#101e50"
          emissive="#102c82"
          emissiveIntensity={0.65}
          metalness={0.72}
          roughness={0.3}
        />
      </mesh>

      {/* Dark inset facade */}
      <mesh position={[0, height / 2, 0.37]}>
        <boxGeometry args={[0.49, height * 0.9, 0.025]} />
        <meshStandardMaterial
          color="#07122f"
          metalness={0.5}
          roughness={0.25}
        />
      </mesh>

      {/* Side illuminated edge */}
      <mesh position={[0.31, height / 2, 0.39]}>
        <boxGeometry args={[0.025, height * 0.88, 0.02]} />
        <meshBasicMaterial color="#368dff" />
      </mesh>

      <group ref={lights}>
        {Array.from({ length: 6 }, (_, i) => (
          <mesh
            key={i}
            position={[
              0,
              height * (0.17 + i * 0.125),
              0.395,
            ]}
          >
            <boxGeometry args={[0.26, 0.025, 0.012]} />
            <meshBasicMaterial
              color={i % 2 === 0 ? "#80e6ff" : "#a38aff"}
              transparent
              opacity={0.8}
            />
          </mesh>
        ))}
      </group>

      <mesh position={[0, height + 0.025, 0]}>
        <boxGeometry args={[0.82, 0.06, 0.82]} />
        <meshStandardMaterial
          color="#1b3f93"
          emissive="#2a69ff"
          emissiveIntensity={0.9}
          metalness={0.65}
        />
      </mesh>

      {/* Physical base platform */}
      <mesh position={[0, 0.08, 0]}>
        <boxGeometry args={[1.0, 0.16, 1.0]} />
        <meshStandardMaterial
          color="#101b42"
          metalness={0.8}
          roughness={0.22}
        />
      </mesh>
    </group>
  );
}

function WorldArchitecture() {
  return (
    <group>
      <DataTower position={[-3.5, 0, -1.1]} height={3.1} />
      <DataTower position={[3.5, 0, -1.1]} height={3.1} />

      <DataTower position={[-5.0, 0, -2.8]} height={1.9} />
      <DataTower position={[5.0, 0, -2.8]} height={1.9} />

      <DataTower position={[-2.5, 0, -4.3]} height={1.35} />
      <DataTower position={[2.5, 0, -4.3]} height={1.35} />

      {/* Huge portal behind the intelligence core */}
      <mesh position={[0, 1.55, -3.4]}>
        <torusGeometry args={[2.7, 0.035, 12, 180]} />
        <meshBasicMaterial
          color="#4f73ff"
          transparent
          opacity={0.8}
        />
      </mesh>

      <mesh position={[0, 1.55, -3.8]}>
        <torusGeometry args={[3.15, 0.014, 8, 180]} />
        <meshBasicMaterial
          color="#a18aff"
          transparent
          opacity={0.5}
        />
      </mesh>

      {/* Floating holographic interface panels */}
      <mesh position={[-2.35, 2.0, -0.7]} rotation={[0, 0.22, 0]}>
        <boxGeometry args={[0.9, 1.35, 0.045]} />
        <meshPhysicalMaterial
          color="#326dff"
          emissive="#1e4cff"
          emissiveIntensity={0.7}
          transparent
          opacity={0.24}
          metalness={0.6}
          roughness={0.15}
        />
      </mesh>

      <mesh position={[2.35, 2.0, -0.7]} rotation={[0, -0.22, 0]}>
        <boxGeometry args={[0.9, 1.35, 0.045]} />
        <meshPhysicalMaterial
          color="#875dff"
          emissive="#6038ff"
          emissiveIntensity={0.7}
          transparent
          opacity={0.24}
          metalness={0.6}
          roughness={0.15}
        />
      </mesh>
    </group>
  );
}

function DataStreams() {
  const particles = useRef<(Mesh | null)[]>([]);

  const paths: Vec3[][] = [
    [
      [-3.5, 2.65, -0.65],
      [-2.5, 2.85, 0.0],
      [-1.4, 2.45, 0.65],
      [0, 1.9, 0.8],
    ],
    [
      [3.5, 2.65, -0.65],
      [2.5, 2.95, 0.0],
      [1.35, 2.5, 0.65],
      [0, 1.9, 0.8],
    ],
    [
      [-2.5, 0.9, -3.9],
      [-1.7, 1.45, -2.0],
      [-0.8, 2.1, -0.3],
      [0, 1.9, 0.8],
    ],
    [
      [2.5, 0.9, -3.9],
      [1.7, 1.45, -2.0],
      [0.8, 2.1, -0.3],
      [0, 1.9, 0.8],
    ],
  ];

  const colors = ["#75e8ff", "#a28aff", "#4e9dff", "#85f5ff"];

  useFrame(({ clock }) => {
    const time = clock.elapsedTime;

    particles.current.forEach((particle, i) => {
      if (!particle) return;

      const path = paths[i];
      const progress = (time * 0.22 + i * 0.27) % 1;
      const segmentPosition = progress * (path.length - 1);
      const segment = Math.min(
        Math.floor(segmentPosition),
        path.length - 2
      );
      const local = segmentPosition - segment;

      const a = path[segment];
      const b = path[segment + 1];

      particle.position.set(
        a[0] + (b[0] - a[0]) * local,
        a[1] + (b[1] - a[1]) * local,
        a[2] + (b[2] - a[2]) * local
      );

      const pulse = 0.85 + Math.sin(time * 5 + i) * 0.2;
      particle.scale.setScalar(pulse);
    });
  });

  return (
    <group>
      {paths.map((path, i) => (
        <group key={i}>
          <Line
            points={path}
            color={colors[i]}
            lineWidth={1.15}
            transparent
            opacity={0.5}
          />

          <mesh
            ref={(element) => {
              particles.current[i] = element;
            }}
          >
            <sphereGeometry args={[0.075, 16, 16]} />
            <meshBasicMaterial color={colors[i]} />
          </mesh>

          <mesh position={path[0]}>
            <sphereGeometry args={[0.045, 12, 12]} />
            <meshBasicMaterial color={colors[i]} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

function AIEnvironment() {
  return (
    <>
      <color attach="background" args={["#05091f"]} />
      <fog attach="fog" args={["#05091f", 12, 27]} />

      <ambientLight intensity={0.55} />
      <hemisphereLight args={["#9fcaff", "#080a24", 1.1]} />

      <directionalLight
        position={[4, 7, 6]}
        color="#b9d7ff"
        intensity={2.2}
      />

      <pointLight
        position={[-4, 3, -1]}
        color="#3569ff"
        intensity={18}
        distance={12}
      />

      <pointLight
        position={[4, 3, -3]}
        color="#9764ff"
        intensity={15}
        distance={12}
      />

      <Stars
        radius={50}
        depth={35}
        count={550}
        factor={2}
        saturation={0.35}
        fade
        speed={0.18}
      />

      <Sparkles
        count={150}
        scale={[13, 8, 11]}
        size={2}
        speed={0.28}
        opacity={0.7}
        color="#9bdcff"
      />

      <WorldArchitecture />
      <NeuralNetwork />
      <AICore />
      <DataStreams />

      {/* Perspective floor for a stronger sense of depth */}
      <Grid
        position={[0, -0.02, 0]}
        infiniteGrid
        cellSize={0.5}
        sectionSize={3}
        cellColor="#193875"
        sectionColor="#4265d5"
        fadeDistance={26}
        fadeStrength={1.3}
      />
    </>
  );
}

export default function AIWorld() {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        background: "#05091f",
      }}
    >
      <Canvas
        dpr={[1, 1.5]}
        camera={{
          position: [0, 3.0, 12.5],
          fov: 46,
          near: 0.1,
          far: 80,
        }}
        gl={{
          antialias: true,
          alpha: false,
          powerPreference: "high-performance",
        }}
      >
        <AIEnvironment />
      </Canvas>
    </div>
  );
}
