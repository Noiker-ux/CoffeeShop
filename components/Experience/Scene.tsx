"use client";
import { ScrollControls, Scroll, Clouds, Cloud, Float } from "@react-three/drei";
import CoffeeСup from "./CoffeeСup/CoffeeСup";
import TextRing from "./TextRing/TextRing";
import * as THREE from "three";
import { extend } from "@react-three/fiber";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
extend(THREE as any);
export default function Scene() {
  return (
    <></>
    // <ScrollControls pages={3}>
    //   <Scroll>
    //     <group>
    //       <CoffeeСup />
    //       <TextRing text="Poisonous Punch STARBUCKS " posY={0} radius={3.3} height={4} segments={32} />
    //       {/*
    //       <Clouds material={THREE.MeshBasicMaterial} position={[0, -5, 3]}>
    //         <Float>
    //           <Cloud segments={20} bounds={[10, 0, 0]} volume={9} color="green" />
    //         </Float>
    //         <Float>
    //           <Cloud seed={1} scale={2} volume={5} color="pink" fade={100} />
    //         </Float>
    //       </Clouds> */}
    //     </group>
    //   </Scroll>
    // </ScrollControls>
  );
}
