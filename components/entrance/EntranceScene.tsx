"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Sparkles } from "@react-three/drei";
import { useRef } from "react";
import { useThree } from "@react-three/fiber";
import { journeyProgress } from "@/lib/journey-progress";
import * as THREE from "three";

function PortalWorld() {
  const sky = useRef<THREE.ShaderMaterial>(null);
  const horizon = useRef<THREE.Mesh>(null);

  const backRidge = new THREE.Shape();
  backRidge.moveTo(-1.95, -1.3);
  backRidge.quadraticCurveTo(-1.65, -0.9, -1.3, -0.72);
  backRidge.quadraticCurveTo(-1.0, -0.48, -0.68, -0.78);
  backRidge.quadraticCurveTo(-0.28, -0.35, 0.08, -0.67);
  backRidge.quadraticCurveTo(0.48, -0.42, 0.78, -0.72);
  backRidge.quadraticCurveTo(1.35, -0.35, 1.95, -0.72);
  backRidge.lineTo(1.95, -1.9);
  backRidge.lineTo(-1.95, -1.9);
  backRidge.closePath();

  const frontRidge = new THREE.Shape();
  frontRidge.moveTo(-1.95, -1.2);
  frontRidge.quadraticCurveTo(-1.5, -1.0, -1.1, -1.15);
  frontRidge.quadraticCurveTo(-0.6, -1.35, -0.15, -1.17);
  frontRidge.quadraticCurveTo(0.35, -1.02, 0.8, -1.22);
  frontRidge.quadraticCurveTo(1.4, -1.0, 1.95, -1.15);
  frontRidge.lineTo(1.95, -1.9);
  frontRidge.lineTo(-1.95, -1.9);
  frontRidge.closePath();

  const pathShape = new THREE.Shape();
  pathShape.moveTo(-1.0, -1.9);
  pathShape.lineTo(-0.12, -0.38);
  pathShape.quadraticCurveTo(0, -0.29, 0.12, -0.38);
  pathShape.lineTo(1.0, -1.9);
  pathShape.closePath();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    if (sky.current) {
      sky.current.uniforms.uTime.value = t;
    }

    if (horizon.current) {
      const material = horizon.current.material as THREE.MeshBasicMaterial;
      material.opacity = 0.48 + Math.sin(t * 0.65) * 0.1;
    }
  });

  return (
    <group>
      {/* Blue-purple atmospheric sky */}
      <mesh position={[0, 0, -0.13]}>
        <circleGeometry args={[1.86, 128]} />
        <shaderMaterial
          ref={sky}
          uniforms={{ uTime: { value: 0 } }}
          vertexShader={`
            varying vec2 vUv;
            void main() {
              vUv = uv;
              gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
          `}
          fragmentShader={`
            uniform float uTime;
            varying vec2 vUv;

            void main() {
              vec3 deep = vec3(0.025, 0.045, 0.13);
              vec3 blue = vec3(0.10, 0.25, 0.58);
              vec3 purple = vec3(0.31, 0.18, 0.60);
              vec3 light = vec3(0.57, 0.72, 1.0);

              float h = smoothstep(0.0, 0.95, vUv.y);
              vec3 col = mix(deep, blue, h * 0.85);
              col = mix(col, purple, smoothstep(0.52, 1.0, vUv.y) * 0.42);

              float horizonGlow = exp(-pow((vUv.y - 0.45) * 8.0, 2.0));
              float pulse = 0.85 + 0.15 * sin(uTime * 0.55);
              col += light * horizonGlow * 0.42 * pulse;

              float centerGlow = exp(-length((vUv - vec2(0.5, 0.47)) * vec2(1.0, 1.2)) * 3.0);
              col += vec3(0.13, 0.22, 0.55) * centerGlow * 0.3;

              gl_FragColor = vec4(col, 1.0);
            }
          `}
        />
      </mesh>

      {/* Distant soft horizon */}
      <mesh position={[0, -0.1, -0.055]}>
        <circleGeometry args={[0.62, 64]} />
        <meshBasicMaterial
          color="#8dbdff"
          transparent
          opacity={0.12}
          depthWrite={false}
        />
      </mesh>

      <mesh ref={horizon} position={[0, -0.1, -0.045]}>
        <circleGeometry args={[0.23, 64]} />
        <meshBasicMaterial
          color="#d6e7ff"
          transparent
          opacity={0.48}
          depthWrite={false}
        />
      </mesh>

      {/* Smooth distant mountain silhouettes */}
      <mesh position={[0, 0, -0.035]}>
        <shapeGeometry args={[backRidge]} />
        <meshBasicMaterial color="#26396f" side={THREE.DoubleSide} />
      </mesh>

      <mesh position={[0, 0, -0.005]}>
        <shapeGeometry args={[frontRidge]} />
        <meshBasicMaterial color="#172951" side={THREE.DoubleSide} />
      </mesh>

      {/* A pathway converging toward the horizon */}
      <mesh position={[0, 0, 0.012]}>
        <shapeGeometry args={[pathShape]} />
        <meshBasicMaterial
          color="#405caa"
          transparent
          opacity={0.48}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Fine blue and violet path edges */}
      <mesh position={[-0.42, -1.12, 0.02]} rotation={[0, 0, -0.49]}>
        <planeGeometry args={[1.75, 0.012]} />
        <meshBasicMaterial color="#80c8ff" transparent opacity={0.8} />
      </mesh>

      <mesh position={[0.42, -1.12, 0.02]} rotation={[0, 0, 0.49]}>
        <planeGeometry args={[1.75, 0.012]} />
        <meshBasicMaterial color="#b69bff" transparent opacity={0.8} />
      </mesh>

      {/* Mist banks floating above the landscape */}
      {[
        { x: -1.05, y: -0.63, sx: 0.7, sy: 0.13, color: "#8cbcff" },
        { x: 1.0, y: -0.57, sx: 0.72, sy: 0.12, color: "#a99bff" },
        { x: -1.3, y: -0.93, sx: 0.52, sy: 0.09, color: "#b2caff" },
        { x: 1.28, y: -0.95, sx: 0.48, sy: 0.1, color: "#b7a8ff" },
      ].map((cloud, i) => (
        <mesh
          key={i}
          position={[cloud.x, cloud.y, 0.025]}
          scale={[cloud.sx, cloud.sy, 0.08]}
        >
          <sphereGeometry args={[1, 24, 16]} />
          <meshBasicMaterial
            color={cloud.color}
            transparent
            opacity={0.14}
            depthWrite={false}
          />
        </mesh>
      ))}

      {/* Distant architectural lights */}
      {[
        { x: -0.92, y: 0.37, color: "#80c8ff" },
        { x: 0.94, y: 0.43, color: "#b69bff" },
        { x: -1.4, y: -0.38, color: "#7caeff" },
        { x: 1.38, y: -0.3, color: "#aa8aff" },
      ].map((light, i) => (
        <mesh key={i} position={[light.x, light.y, 0.03]}>
          <planeGeometry args={[0.12, 0.025]} />
          <meshBasicMaterial color={light.color} />
        </mesh>
      ))}

      <Sparkles
        count={36}
        scale={[3.3, 3.3, 0.15]}
        position={[0, 0, 0.04]}
        size={1.5}
        speed={0.12}
        opacity={0.5}
        color="#d2dfff"
      />
    </group>
  );
}

function Gateway() {
  const gateway = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (gateway.current) {
      gateway.current.position.y =
        -0.1 + Math.sin(clock.getElapsedTime() * 0.45) * 0.018;
    }
  });

  return (
    <group ref={gateway} position={[0, -0.1, 0]}>
      {/* Deep opening behind the inner world */}
      <mesh position={[0, 0, -0.24]}>
        <circleGeometry args={[2.15, 128]} />
        <meshBasicMaterial color="#101936" />
      </mesh>

      <PortalWorld />

      {/* Outer architectural ring */}
      <mesh>
        <torusGeometry args={[2.55, 0.085, 24, 180]} />
        <meshStandardMaterial
          color="#8797b7"
          metalness={0.8}
          roughness={0.26}
          emissive="#344c85"
          emissiveIntensity={0.5}
        />
      </mesh>

      {/* Main metallic ring */}
      <mesh>
        <torusGeometry args={[2.3, 0.22, 32, 180]} />
        <meshStandardMaterial
          color="#cbd7ed"
          metalness={0.78}
          roughness={0.2}
          emissive="#304f9c"
          emissiveIntensity={0.65}
        />
      </mesh>

      {/* Inner blue light */}
      <mesh position={[0, 0, 0.07]}>
        <torusGeometry args={[2.04, 0.065, 20, 180]} />
        <meshBasicMaterial color="#60a5fa" />
      </mesh>

      {/* Purple inner trim */}
      <mesh position={[0, 0, 0.1]}>
        <torusGeometry args={[1.91, 0.025, 12, 160]} />
        <meshBasicMaterial color="#a78bfa" />
      </mesh>

      {/* Tall side supports */}
      {[-1, 1].map((side) => (
        <group key={side} position={[side * 2.67, 0, -0.1]}>
          <mesh>
            <boxGeometry args={[0.38, 5.25, 0.64]} />
            <meshStandardMaterial
              color="#aebbd2"
              metalness={0.72}
              roughness={0.3}
            />
          </mesh>

          <mesh position={[side * -0.08, 0, 0.333]}>
            <boxGeometry args={[0.035, 4.65, 0.018]} />
            <meshBasicMaterial color="#60a5fa" />
          </mesh>

          <mesh
            position={[side * 0.29, 0.05, -0.08]}
            rotation={[0, 0, side * -0.035]}
          >
            <boxGeometry args={[0.16, 5.6, 0.8]} />
            <meshStandardMaterial
              color="#58658c"
              metalness={0.8}
              roughness={0.26}
              emissive="#41347d"
              emissiveIntensity={0.45}
            />
          </mesh>

          <mesh position={[0, -2.72, 0]}>
            <boxGeometry args={[0.95, 0.38, 1.05]} />
            <meshStandardMaterial
              color="#aebbd2"
              metalness={0.65}
              roughness={0.3}
            />
          </mesh>
        </group>
      ))}

      {/* Entrance foundation */}
      <mesh position={[0, -2.88, 0]}>
        <boxGeometry args={[6.6, 0.22, 1.55]} />
        <meshStandardMaterial
          color="#7e8bad"
          metalness={0.65}
          roughness={0.3}
        />
      </mesh>
    </group>
  );
}

function EntrancePath() {
  return (
    <group>
      <mesh position={[0, -2.49, 3.8]} receiveShadow>
        <boxGeometry args={[3.5, 0.045, 17]} />
        <meshStandardMaterial
          color="#202b4a"
          metalness={0.78}
          roughness={0.2}
          emissive="#152a60"
          emissiveIntensity={0.2}
        />
      </mesh>

      {[-1, 1].map((side) => (
        <mesh key={side} position={[side * 1.69, -2.458, 3.8]}>
          <boxGeometry args={[0.025, 0.012, 16.8]} />
          <meshBasicMaterial color="#60a5fa" />
        </mesh>
      ))}

      {[-3.2, -0.8, 1.6, 4, 6.4, 8.8].map((z) => (
        <mesh key={z} position={[0, -2.455, z]}>
          <boxGeometry args={[2.7, 0.012, 0.025]} />
          <meshBasicMaterial
            color="#8b82dc"
            transparent
            opacity={0.7}
          />
        </mesh>
      ))}
    </group>
  );
}

function Environment() {
  return (
    <>
      <color attach="background" args={["#0a1028"]} />
      <fog attach="fog" args={["#111b3c", 13, 32]} />

      <ambientLight intensity={0.8} />
      <hemisphereLight args={["#c8ddff", "#252044", 1.35]} />

      <directionalLight
        position={[4, 7, 5]}
        intensity={2.4}
        color="#dce8ff"
      />

      <directionalLight
        position={[-5, 2, -3]}
        intensity={1.4}
        color="#8b83ff"
      />

      <pointLight
        position={[-2.5, 0, 1.5]}
        intensity={25}
        color="#397bff"
        distance={10}
      />

      <pointLight
        position={[2.5, 0.5, 0.5]}
        intensity={22}
        color="#9564ff"
        distance={9}
      />

      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -2.54, 0]}
        receiveShadow
      >
        <planeGeometry args={[200, 200]} />
        <meshStandardMaterial
          color="#141d39"
          metalness={0.65}
          roughness={0.3}
        />
      </mesh>

      <EntrancePath />

      {[-1, 1].map((side) => (
        <group key={side} position={[side * 4.5, -1.9, -2.5]}>
          <mesh rotation={[0, side * 0.12, 0]}>
            <boxGeometry args={[2.8, 0.16, 2.5]} />
            <meshStandardMaterial
              color="#303d68"
              metalness={0.62}
              roughness={0.3}
            />
          </mesh>

          <mesh position={[0, -0.1, 0]}>
            <boxGeometry args={[2.45, 0.04, 2.2]} />
            <meshBasicMaterial
              color={side < 0 ? "#397bff" : "#8b5cf6"}
              transparent
              opacity={0.65}
            />
          </mesh>
        </group>
      ))}

      <Sparkles
        count={100}
        scale={[12, 8, 7]}
        size={2}
        speed={0.2}
        opacity={0.5}
        color="#c8d9ff"
      />

      <Sparkles
        count={40}
        scale={[7, 6, 5]}
        size={2.6}
        speed={0.3}
        opacity={0.6}
        color="#a78bfa"
      />
    </>
  );
}


function DataPulse({ y, delay = 0 }: { y: number; delay?: number }) {
  const pulse = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!pulse.current) return;
    const progress = (clock.getElapsedTime() * 0.65 + delay) % 1;
    pulse.current.position.x = -3.5 + progress * 7;
  });

  return (
    <>
      <mesh position={[0, y, 0.555]}>
        <boxGeometry args={[7, 0.012, 0.012]} />
        <meshBasicMaterial
          color="#438cff"
          transparent
          opacity={0.55}
        />
      </mesh>
      <mesh ref={pulse} position={[-3.5, y, 0.57]}>
        <sphereGeometry args={[0.045, 12, 12]} />
        <meshBasicMaterial color="#d9f5ff" toneMapped={false} />
      </mesh>
    </>
  );
}

function InfrastructureWorld() {
  return (
    <group position={[0, 0, -14]}>
      {/* Floating architectural foundation */}
      <mesh position={[0, -2.48, 0]}>
        <boxGeometry args={[12, 0.28, 15]} />
        <meshStandardMaterial
          color="#293858"
          metalness={0.65}
          roughness={0.3}
          emissive="#152a60"
          emissiveIntensity={0.3}
        />
      </mesh>

      {/* Illuminated foundation edges */}
      {[-1, 1].map((side) => (
        <mesh key={side} position={[side * 5.85, -2.31, 0]}>
          <boxGeometry args={[0.035, 0.025, 14.7]} />
          <meshBasicMaterial color={side < 0 ? "#60a5fa" : "#a78bfa"} />
        </mesh>
      ))}

      {/* Architectural portal frames */}
      {[-1, 1].map((side) => (
        <group key={side} position={[side * 4.8, 0, 0]}>
          <mesh position={[0, 0, 0]}>
            <boxGeometry args={[0.22, 5.1, 0.28]} />
            <meshStandardMaterial
              color="#aebedc"
              metalness={0.75}
              roughness={0.25}
              emissive="#304d91"
              emissiveIntensity={0.35}
            />
          </mesh>

          <mesh position={[0, 2.5, 0]}>
            <boxGeometry args={[0.72, 0.16, 0.42]} />
            <meshStandardMaterial
              color="#8598c2"
              metalness={0.7}
              roughness={0.25}
            />
          </mesh>

          <mesh position={[side * -0.13, 0, 0.16]}>
            <boxGeometry args={[0.025, 4.6, 0.02]} />
            <meshBasicMaterial color="#7cc8ff" />
          </mesh>
        </group>
      ))}

      {/* Overhead structural beams */}
      {[-3.8, -0.5, 2.8].map((z) => (
        <mesh key={z} position={[0, 2.35, z]}>
          <boxGeometry args={[9.6, 0.14, 0.18]} />
          <meshStandardMaterial
            color="#697ca7"
            metalness={0.75}
            roughness={0.28}
          />
        </mesh>
      ))}

      {/* Modular server racks */}
      {[-2.7, -0.9, 0.9, 2.7].map((x, index) => (
        <group key={x} position={[x, -0.65, -0.3]}>
          {/* Rack enclosure */}
          <mesh>
            <boxGeometry args={[1.12, 2.65, 0.95]} />
            <meshStandardMaterial
              color={index % 2 === 0 ? "#364768" : "#303b60"}
              metalness={0.62}
              roughness={0.32}
            />
          </mesh>

          {/* Front face */}
          <mesh position={[0, 0, 0.485]}>
            <boxGeometry args={[0.98, 2.48, 0.025]} />
            <meshStandardMaterial
              color="#111b35"
              metalness={0.45}
              roughness={0.36}
            />
          </mesh>

          {/* Individual server units */}
          {Array.from({ length: 8 }, (_, i) => (
            <group key={i} position={[0, 1.02 - i * 0.29, 0.515]}>
              <mesh>
                <boxGeometry args={[0.84, 0.19, 0.025]} />
                <meshStandardMaterial
                  color="#43577f"
                  metalness={0.55}
                  roughness={0.3}
                />
              </mesh>

              <mesh position={[-0.31, 0, 0.018]}>
                <boxGeometry args={[0.025, 0.065, 0.012]} />
                <meshBasicMaterial color="#60c7ff" />
              </mesh>

              <mesh position={[-0.23, 0, 0.018]}>
                <boxGeometry args={[0.025, 0.065, 0.012]} />
                <meshBasicMaterial color="#a78bfa" />
              </mesh>

              <mesh position={[0.17, 0, 0.018]}>
                <boxGeometry args={[0.22, 0.018, 0.012]} />
                <meshBasicMaterial color="#6d85b8" />
              </mesh>
            </group>
          ))}

          {/* Rack base */}
          <mesh position={[0, -1.38, 0]}>
            <boxGeometry args={[1.2, 0.12, 1.02]} />
            <meshStandardMaterial color="#8497bb" metalness={0.7} />
          </mesh>
        </group>
      ))}

      {/* Distant infrastructure towers */}
      {[-4.2, 4.2].map((x, i) => (
        <group key={i} position={[x, 0.1, -4.5]}>
          <mesh>
            <boxGeometry args={[0.55, 3.5, 0.55]} />
            <meshStandardMaterial
              color="#52648e"
              metalness={0.7}
              roughness={0.3}
            />
          </mesh>

          {[-1, 0, 1].map((n) => (
            <mesh key={n} position={[0, n * 0.85, 0.29]}>
              <boxGeometry args={[0.28, 0.025, 0.018]} />
              <meshBasicMaterial color="#88caff" />
            </mesh>
          ))}
        </group>
      ))}

      {/* Subtle luminous ceiling panels */}
      {[-2.8, 0, 2.8].map((x) => (
        <mesh key={x} position={[x, 2.25, -1.8]}>
          <boxGeometry args={[1.8, 0.025, 1.1]} />
          <meshBasicMaterial
            color="#a7caff"
            transparent
            opacity={0.65}
          />
        </mesh>
      ))}

      {/* Animated data streams */}
      <DataPulse y={0.75} delay={0} />
      <DataPulse y={0} delay={0.35} />
      <DataPulse y={-0.75} delay={0.7} />

      <pointLight position={[0, 1.8, 1]} intensity={8} color="#579dff" distance={12} />
      <pointLight position={[3, 0.5, -3]} intensity={5} color="#9874ff" distance={8} />

      <Sparkles
        count={65}
        scale={[10, 5, 12]}
        position={[0, 0, -1]}
        size={1.6}
        speed={0.18}
        opacity={0.45}
        color="#b9d7ff"
      />
    </group>
  );
}

function SceneContents() {
  const { camera } = useThree();

  useFrame(() => {
    const progress = THREE.MathUtils.clamp(journeyProgress.value, 0, 1);

    // Move through the entrance and toward the infrastructure world.
    camera.position.set(
      0,
      0.15 + progress * 0.08,
      10.5 - progress * 19
    );

    camera.lookAt(0, 0.1, -progress * 16.5);
  });

  return (
    <>
      <Environment />
      <Gateway />
      <InfrastructureWorld />
    </>
  );
}

export default function EntranceScene() {
  return (
    <div className="entrance-canvas">
      <Canvas
        camera={{ position: [0, 0.15, 10.5], fov: 43 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: false }}
      >
        <SceneContents />
      </Canvas>
    </div>
  );
}
