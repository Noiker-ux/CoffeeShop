import { Float } from "@react-three/drei";

export default function CoffeeСup() {
  return (
    <Float rotation-y={-Math.PI * 0.15}>
      <mesh>
        <cylinderGeometry args={[2, 2, 6, 64]} />
        <meshStandardMaterial side={2} />
      </mesh>
    </Float>
  );
}
