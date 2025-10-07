import { Center, useVideoTexture } from "@react-three/drei";
import { extend, useThree } from "@react-three/fiber";
// import { useEffect, useState } from "react";
import * as THREE from "three";
extend(THREE as any);
export default function Background() {
  // const [state, setState] = useState(null);
  const viewport = useThree((state) => state.viewport);

  const gridSize = 10;
  const spacing = 0.75;

  const videoTexture = useVideoTexture(
    "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    {
      muted: true,
      loop: true,
    }
  );
  videoTexture.minFilter = THREE.LinearFilter;
  videoTexture.magFilter = THREE.LinearFilter;
  videoTexture.colorSpace = THREE.SRGBColorSpace;
  videoTexture.wrapS = THREE.ClampToEdgeWrapping;
  videoTexture.wrapT = THREE.ClampToEdgeWrapping;

  // useEffect(() => {
  //   const canvas = document.createElement("canvas");
  //   const ctx = canvas.getContext("2d");
  //   const maskImage = new Image();
  //   let data = null;
  //   maskImage.crossOrigin = "anonymous";
  //   let gridWidth: number | null = null;
  //   let gridHeight: number | null = null;
  //   maskImage.onload = async () => {
  //     const originalWidth = maskImage.width;
  //     const originalHeight = maskImage.height;

  //     const aspectRatio = originalWidth / originalHeight;

  //     if (aspectRatio > 1) {
  //       gridWidth = gridSize;
  //       gridHeight = Math.round(gridSize / aspectRatio);
  //     } else {
  //       gridHeight = gridSize;
  //       gridWidth = Math.round(gridSize * aspectRatio);
  //     }
  //     canvas.width = gridWidth;
  //     canvas.height = gridHeight;

  //     if (ctx) {
  //       ctx.drawImage(maskImage, 0, 0, gridWidth, gridHeight);

  //       const imageData = ctx.getImageData(0, 0, gridWidth, gridHeight);
  //       data = imageData.data;
  //       setState(data);
  //     }
  //   };
  //   maskImage.src = "/i.webp";
  // }, []);
  // console.log(state);
  return (
    <Center>
      <group>
        {[...Array(gridSize).keys()].map((ex, ix) => {
          return [...Array(gridSize).keys()].map((ey, iy) => {
            const geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
            // const flippedY = typeof gridHeight === "number" ? gridHeight - 1 - ey : 0;
            // const pixelIndex = typeof gridWidth === "number" ? (flippedY * gridWidth + ex) * 4 : 0;
            // const r = state[pixelIndex];
            // const g = state[pixelIndex + 1];
            // const b = state[pixelIndex + 2];
            // const brightness = (r + g + b) / 3;
            // if (brightness < 128) {
            const uvX = ex / gridSize;
            const uvY = ey / gridSize;
            const uvWidth = 1 / gridSize;
            const uvHeight = 1 / gridSize;
            const uvAttribute = geometry.attributes.uv;
            const uvArray = uvAttribute.array;

            for (let i = 0; i < uvArray.length; i += 2) {
              // Map all faces to the same UV region for consistency
              uvArray[i] = uvX + uvArray[i] * uvWidth; // U coordinate
              uvArray[i + 1] = uvY + uvArray[i + 1] * uvHeight; // V coordinate
            }
            uvAttribute.needsUpdate = true;

            return (
              <mesh
                key={`cube_${ex}_${ey}`}
                position={[ex - ((gridSize - 1) / 2) * spacing, ey - ((gridSize - 1) / 2) * spacing, 0]}
                geometry={geometry}
              >
                <meshStandardMaterial side={THREE.FrontSide} map={videoTexture} />
              </mesh>
            );
            // }
          });
        })}
      </group>
    </Center>
  );
}
