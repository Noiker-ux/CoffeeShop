"use client";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Text3D } from "@react-three/drei";
import { IRingProps } from "./TextRing.props";
import { Group } from "three";

export default function TextRing({ text, radius, height, segments }: IRingProps) {
  const ref = useRef<Group>(null);

  useFrame((state, delta) => {
    if (ref.current) {
      console.log(typeof ref.current);
      ref.current.rotation.y -= delta * 0.2;
    }
  });

  const textPositions: { x: number; z: number }[] = [];
  const angleStep = (2 * Math.PI) / text.length;
  for (let i = 0; i < text.length; i++) {
    const angle = i * -angleStep + Math.PI * 0.5;
    const x = radius * Math.cos(angle);
    const z = radius * Math.sin(angle);
    textPositions.push({ x, z });
  }
  return (
    <group ref={ref} rotation-z={Math.PI * 0.1}>
      <mesh>
        <cylinderGeometry args={[radius, radius, height, segments]} />
        <meshBasicMaterial transparent opacity={0} side={2} />
      </mesh>
      {text.split("").map((char: string, index: number) => (
        <Text3D
          key={index}
          position={[textPositions[index].x, 0, textPositions[index].z]}
          rotation={[0, angleStep * index + Math.PI * 2, 0]}
          size={0.9}
          lineHeight={1}
          letterSpacing={0.5}
          font="/fonts/SoDo Sans Black_Regular.json"
        >
          <meshStandardMaterial color={"green"} />
          {char}
        </Text3D>
      ))}
    </group>
  );
}
