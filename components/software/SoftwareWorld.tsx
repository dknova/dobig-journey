"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Line, Sparkles } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";
import { journeyProgress } from "@/lib/journey-progress";

function DataTower({
  position,
  height,
  width,
  color,
}: {
  position: [number, number, number];
  height: number;
  width: number;
  color: string;
}) {
  const group = useRef<THREE.Group>(null);

  return (
    <group ref={group} position={position}>
      <mesh position={[0, height / 2, 0]}>
        <boxGeometry args={[width, height, width * 0.8]} />
        <meshStandardMaterial
          color="#101a3d"
          metalness={0.8}
          roughness={0.3}
        />
      </mesh>

      <mesh position={[0, height / 2, width * 0.41]}>
        <planeGeometry args={[width * 0.72, height * 0.88]} />
        <meshBasicMaterial color={color} transparent opacity={0.11} />
      </mesh>

      {Array.from({ length: Math.max(3, Math.floor(height * 2)) }).map(
        (_, i) => (
          <group key={i}>
            <mesh
              position={[
                0,
                0.3 + i * ((height - 0.5) / Math.max(3, Math.floor(height * 2))),
                width * 0.415,
              ]}
            >
              <boxGeometry args={[width * 0.52, 0.018, 0.012]} />
              <meshBasicMaterial color={color} />
            </mesh>
          </group>
        )
      )}

      <mesh position={[0, height, 0]}>
        <boxGeometry args={[width * 1.08, 0.035, width * 0.9]} />
        <meshBasicMaterial color={color} />
      </mesh>
    </group>
  );
}

function Portal({ z, index }: { z: number; index: number }) {
  const frame = useRef<THREE.Group>(null);
  const color = index % 2 === 0 ? "#3b83ff" : "#8065ff";

  useFrame(({ clock }) => {
    if (!frame.current) return;
    frame.current.position.y =
      0.15 + Math.sin(clock.elapsedTime * 0.45 + index) * 0.04;
  });

  return (
    <group ref={frame} position={[0, 0, z]}>
      <mesh position={[-4.7, 3.8, 0]}>
        <boxGeometry args={[0.065, 7.6, 0.11]} />
        <meshBasicMaterial color={color} />
      </mesh>
      <mesh position={[4.7, 3.8, 0]}>
        <boxGeometry args={[0.065, 7.6, 0.11]} />
        <meshBasicMaterial color={color} />
      </mesh>
      <mesh position={[0, 7.6, 0]}>
        <boxGeometry args={[9.4, 0.065, 0.11]} />
        <meshBasicMaterial color={color} />
      </mesh>

      <mesh position={[0, 3.1, -0.04]}>
        <planeGeometry args={[9.3, 7.5]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.025}
          side={THREE.DoubleSide}
          depthWrite={false}
        />
      </mesh>

      <pointLight
        position={[0, 5, 0.5]}
        color={color}
        intensity={index === 0 ? 8 : 4}
        distance={10}
      />
    </group>
  );
}


function SoftwareHub() {
  const hub = useRef<THREE.Group>(null);
  const orbit = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;

    if (hub.current) {
      hub.current.position.y = 3.2 + Math.sin(t * 0.65) * 0.12;
    }
if (orbit.current) {
      orbit.current.rotation.y = -t * 0.14;
      orbit.current.rotation.x = Math.sin(t * 0.2) * 0.08;
    }
  });

  return (
    <group ref={hub} position={[0, 3.2, -12]}>
      <mesh>
        <octahedronGeometry args={[0.42, 1]} />
        <meshStandardMaterial
          color="#a8caff"
          emissive="#527eff"
          emissiveIntensity={2}
          metalness={0.45}
          roughness={0.2}
        />
      </mesh>


      <group ref={orbit}>
        {[
          [2.3, 0.3, 0],
          [-1.6, 1.4, 0.5],
          [0.4, -1.9, -0.3],
          [-0.8, 0.1, 1.8],
        ].map((pos, i) => (
          <mesh
            key={i}
            position={pos as [number, number, number]}
          >
            <octahedronGeometry args={[0.16 + (i % 2) * 0.06, 0]} />
            <meshBasicMaterial
              color={i % 2 === 0 ? "#64dfff" : "#a58aff"}
            />
          </mesh>
        ))}
      </group>

      <pointLight color="#376cff" intensity={12} distance={9} />
      <pointLight color="#9167ff" intensity={7} distance={7} />
    </group>
  );
}

function SoftwareArchitecture() {
  const world = useRef<THREE.Group>(null);
  const cameraTarget = useRef(new THREE.Vector3());

  useFrame(({ camera, clock }) => {
    const p = THREE.MathUtils.clamp(
      (journeyProgress.value - 0.88) / 0.12,
      0,
      1
    );

    const smooth = p * p * (3 - 2 * p);

    camera.position.x = Math.sin(clock.elapsedTime * 0.12) * 0.16;
    camera.position.y = THREE.MathUtils.lerp(2.1, 2.7, smooth);
    camera.position.z = THREE.MathUtils.lerp(9, -9, smooth);

    cameraTarget.current.set(
      0,
      THREE.MathUtils.lerp(2.8, 3.2, smooth),
      THREE.MathUtils.lerp(-4, -23, smooth)
    );
    camera.lookAt(cameraTarget.current);

    if (world.current) {
      world.current.rotation.y = Math.sin(clock.elapsedTime * 0.08) * 0.012;
    }
  });

  return (
    <group ref={world}>
      {/* Deep architectural corridor */}
      {Array.from({ length: 7 }).map((_, i) => (
        <Portal key={i} z={1 - i * 5} index={i} />
      ))}

      {/* Left infrastructure */}
      {Array.from({ length: 10 }).map((_, i) => (
        <DataTower
          key={`left-${i}`}
          position={[-4.9 - (i % 3) * 0.25, 0, 1 - i * 3.7]}
          height={2.3 + ((i * 7) % 5) * 0.62}
          width={0.72 + (i % 2) * 0.18}
          color={i % 3 === 0 ? "#866cff" : "#287cff"}
        />
      ))}

      {/* Right infrastructure */}
      {Array.from({ length: 10 }).map((_, i) => (
        <DataTower
          key={`right-${i}`}
          position={[4.9 + (i % 3) * 0.25, 0, -1 - i * 3.7]}
          height={2.7 + ((i * 3) % 5) * 0.58}
          width={0.7 + (i % 2) * 0.2}
          color={i % 3 === 1 ? "#a38bff" : "#398bff"}
        />
      ))}

      {/* Central connected software system */}
      <SoftwareHub />

      {/* Continuous luminous floor lines */}
      <gridHelper
        args={[60, 60, "#3265d8", "#182951"]}
        position={[0, 0.025, -12]}
      />

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.04, -12]}>
        <planeGeometry args={[18, 50]} />
        <meshStandardMaterial
          color="#0b1430"
          metalness={0.65}
          roughness={0.35}
        />
      </mesh>

      {/* Converging data pathways */}
      {Array.from({ length: 13 }).map((_, i) => {
        const x = -6 + i;
        return (
          <Line
            key={i}
            points={[
              [x * 1.6, 0.07, 3],
              [x * 0.9, 0.07, -8],
              [x * 0.65, 0.07, -22],
              [x * 0.8, 0.07, -32],
            ]}
            color={i % 3 === 0 ? "#9a83ff" : "#397fff"}
            transparent
            opacity={0.4}
            lineWidth={1}
          />
        );
      })}

      {/* Overhead architectural beams */}
      {Array.from({ length: 8 }).map((_, i) => (
        <mesh key={i} position={[0, 7.1, -i * 4.5]}>
          <boxGeometry args={[12, 0.035, 0.08]} />
          <meshBasicMaterial
            color={i % 2 ? "#655cff" : "#438dff"}
            transparent
            opacity={0.6}
          />
        </mesh>
      ))}

      <Sparkles
        count={260}
        scale={[15, 9, 42]}
        position={[0, 3.5, -14]}
        size={1.5}
        speed={0.2}
        opacity={0.55}
        color="#a9caff"
      />
    </group>
  );
}

export default function SoftwareWorld() {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        background: "#080e25",
      }}
    >
      <Canvas
        dpr={[1, 1.5]}
        camera={{
          position: [0, 2.1, 9],
          fov: 58,
          near: 0.1,
          far: 120,
        }}
        gl={{
          antialias: true,
          powerPreference: "high-performance",
        }}
      >
        <color attach="background" args={["#080e25"]} />
        <fog attach="fog" args={["#080e25", 15, 52]} />

        <ambientLight intensity={0.8} />
        <hemisphereLight args={["#b7d7ff", "#10132d", 1.5]} />
        <directionalLight
          position={[-5, 9, 7]}
          intensity={2.2}
          color="#a9cfff"
        />
        <pointLight
          position={[-4, 3, -8]}
          intensity={18}
          distance={24}
          color="#285fff"
        />
        <pointLight
          position={[4, 4, -20]}
          intensity={20}
          distance={25}
          color="#7653ff"
        />

        <SoftwareArchitecture />
      </Canvas>
    </div>
  );
}
