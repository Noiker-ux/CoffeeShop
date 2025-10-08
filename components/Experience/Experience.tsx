"use client";
import { Canvas, extend } from "@react-three/fiber";
import * as THREE from "three";
import Scene from "./Scene";
import Background from "./Background/Background";
import { OrbitControls } from "@react-three/drei";
import { grids_config } from "./Background/gridConfig";
import ConvexText from "./ConvexText/ConvexText";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
extend(THREE as any);

export default function Experience() {
  return (
    <div className="fixed w-full h-screen z-50">
      <Canvas
        camera={{ position: [0, 0, 10] }}
        dpr={[1, 2]}
        gl={{
          antialias: true,
          preserveDrawingBuffer: true,
        }}
      >
        <ambientLight intensity={1} />
        <directionalLight intensity={3} />
        {/* <Background gridConfig={grids_config} gridSize={32} spacing={0.55} /> */}
        <ConvexText />
        <Scene />
      </Canvas>
    </div>
  );
}
