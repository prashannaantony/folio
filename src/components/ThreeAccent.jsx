/**
 * Optional React Three Fiber accent — a slow-rotating low-poly amber crystal.
 * Drop <ThreeAccent /> into the hero frame for a real 3D element.
 * Kept separate so the core UI has zero hard dependency on WebGL.
 */
import { Canvas } from "@react-three/fiber";
import { Float, Icosahedron } from "@react-three/drei";

export default function ThreeAccent() {
  return (
    <Canvas
      camera={{ position: [0, 0, 4] }}
      dpr={[1, 2]}
      style={{ position: "absolute", inset: 0 }}
    >
      <ambientLight intensity={0.6} />
      <directionalLight position={[3, 4, 5]} intensity={1.1} />
      <Float speed={1.4} rotationIntensity={1} floatIntensity={1.2}>
        <Icosahedron args={[1.2, 0]}>
          <meshStandardMaterial
            color="#FFAB00"
            flatShading
            metalness={0.2}
            roughness={0.4}
          />
        </Icosahedron>
      </Float>
    </Canvas>
  );
}
