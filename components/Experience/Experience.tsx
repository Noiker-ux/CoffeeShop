"use client";
import { Canvas, extend } from "@react-three/fiber";
import CoffeeСup from "./CoffeeСup/CoffeeСup";
import TextRing from "./TextRing/TextRing";
import { Cloud, Clouds, Float } from "@react-three/drei";
import * as THREE from "three";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
extend(THREE as any);

export default function Experience() {
  return (
    <div className="fixed w-full h-screen z-50">
      <Canvas camera={{ position: [0, 3, 6] }}>
        <color args={["black"]} attach="background" />
        <ambientLight intensity={1} />
        <directionalLight intensity={3} />
        <CoffeeСup />
        <TextRing text="Poisonous Punch STARBUCKS " radius={3.3} height={4} segments={32} />
      </Canvas>
    </div>
  );
}
