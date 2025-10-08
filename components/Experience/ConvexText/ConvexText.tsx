import { Html } from "@react-three/drei";
import { extend, useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { useDomToCanvas } from "./useDomToCanvas";
import FShader from "@/shaders/ConvexBg/fragment.glsl";
import CustomShaderMaterial from "three-custom-shader-material";
import VShader from "@/shaders/ConvexBg/vertex.glsl";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
extend(THREE as any);

export default function ConvexText() {
  const state = useThree();
  const { width, height } = state.viewport;

  const [domEl, setDomEl] = useState<HTMLDivElement>(null);

  const materialRef = useRef(null);
  const textureDOM = useDomToCanvas(domEl);

  const uniforms = useMemo(
    () => ({
      uTexture: { value: textureDOM },
      uMouse: { value: new THREE.Vector2(0, 0) },
    }),
    [textureDOM]
  );

  const mouseLerped = useRef({ x: 0, y: 0 });

  useFrame((state, delta) => {
    const mouse = state.pointer;
    mouseLerped.current.x = THREE.MathUtils.lerp(mouseLerped.current.x, mouse.x, 0.1);
    mouseLerped.current.y = THREE.MathUtils.lerp(mouseLerped.current.y, mouse.y, 0.1);
    if (materialRef.current) {
      materialRef.current.uniforms.uMouse.value.x = mouseLerped.current.x;
      materialRef.current.uniforms.uMouse.value.y = mouseLerped.current.y;
    }
  });

  return (
    <>
      <Html zIndexRange={[-1, -10]} prepend fullscreen>
        <div ref={(el) => setDomEl(el)} className="dom-element">
          <p className="flex flex-col">
            WHEN <br />
            WILL <br />
            WE <br />
            MEET ?<br />
          </p>
        </div>
      </Html>
      <mesh>
        <planeGeometry args={[width, height, 254, 254]} />
        <CustomShaderMaterial
          ref={materialRef}
          baseMaterial={THREE.MeshStandardMaterial}
          vertexShader={VShader}
          fragmentShader={FShader}
          uniforms={uniforms}
          flatShading
        />
      </mesh>
    </>
  );
}
