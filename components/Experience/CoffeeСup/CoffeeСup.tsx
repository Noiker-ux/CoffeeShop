import { Float, OrbitControls } from "@react-three/drei";
import { extend } from "@react-three/fiber";
import * as THREE from "three";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
extend(THREE as any);

export default function CoffeeСup() {
  return (
    <>
      {" "}
      <OrbitControls />
      <Float rotation-y={-Math.PI * 0.15}>
        <mesh>
          <cylinderGeometry args={[2, 2, 6, 64]} />
          <meshStandardMaterial side={2} />
        </mesh>
      </Float>
    </>
  );
}
