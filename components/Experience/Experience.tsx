"use client";
import { Canvas, extend } from "@react-three/fiber";
import * as THREE from "three";
import Scene from "./Scene";
import Background from "./Background/Background";
import { OrbitControls } from "@react-three/drei";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
extend(THREE as any);

export default function Experience() {
  return (
    <div className="fixed w-full h-screen z-50">
      <Canvas camera={{ position: [0, 0, 8] }}>
        <OrbitControls />
        <ambientLight intensity={1} />
        <directionalLight intensity={3} />
        <Background />
        <Scene />
      </Canvas>
    </div>
  );
}
