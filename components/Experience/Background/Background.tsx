import { Center, Html, useVideoTexture } from "@react-three/drei";
import { extend, useFrame } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { IGridConfig } from "./gridConfig";
import gsap from "gsap";
import { ThreeElements } from "@react-three/fiber";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
extend(THREE as any);
export default function Background({
  gridConfig,
  gridSize,
  spacing,
}: {
  gridConfig: IGridConfig[];
  gridSize: number;
  spacing: number;
}) {
  const [numConfiguration, setNumConfiguration] = useState(0);
  const [gridWidth, setGridWidth] = useState(null);
  const [gridHeight, setGridHeight] = useState(null);
  const [data, setData] = useState(null);

  const videoTexture = useVideoTexture(`${gridConfig[numConfiguration].video}`, {
    muted: true,
    loop: true,
  });
  videoTexture.minFilter = THREE.LinearFilter;
  videoTexture.magFilter = THREE.LinearFilter;
  videoTexture.colorSpace = THREE.SRGBColorSpace;
  videoTexture.wrapS = THREE.ClampToEdgeWrapping;
  videoTexture.wrapT = THREE.ClampToEdgeWrapping;

  useEffect(() => {
    const loadAndProcessMask = async () => {
      return new Promise((resolve, reject) => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        const maskImage = new Image();
        maskImage.crossOrigin = "anonymous";
        maskImage.onload = () => {
          try {
            const originalWidth = maskImage.width;
            const originalHeight = maskImage.height;
            const aspectRatio = originalWidth / originalHeight;

            let calculatedGridWidth, calculatedGridHeight;

            if (aspectRatio > 1) {
              // Изображение шире, чем высота
              calculatedGridWidth = gridSize;
              calculatedGridHeight = Math.round(gridSize / aspectRatio);
            } else {
              // Изображение выше ширины или квадратное
              calculatedGridHeight = gridSize;
              calculatedGridWidth = Math.round(gridSize * aspectRatio);
            }

            canvas.width = calculatedGridWidth;
            canvas.height = calculatedGridHeight;
            if (ctx) {
              ctx.drawImage(maskImage, 0, 0, calculatedGridWidth, calculatedGridHeight);
              const imageData = ctx.getImageData(0, 0, calculatedGridWidth, calculatedGridHeight);

              resolve({
                gridWidth: calculatedGridWidth,
                gridHeight: calculatedGridHeight,
                data: imageData.data,
              });
            }
          } catch (err) {
            reject(err);
          }
        };
        maskImage.onerror = (err) => reject(err);
        maskImage.src = `/${gridConfig[numConfiguration].mask}`;
      });
    };
    loadAndProcessMask()
      .then((result) => {
        setGridWidth(result.gridWidth);
        setGridHeight(result.gridHeight);
        setData(result.data);
      })
      .catch((error) => console.error("Ошибка обработки маски:", error));
  }, [gridConfig, gridSize, numConfiguration]);

  // Refs ---------------------
  const groupRef = useRef<ThreeElements["group"] | null>(null);

  // Animation -----------------
  useFrame(() => {
    if (groupRef.current && Array.isArray(groupRef.current.children)) {
      groupRef.current.children.forEach((model, index) => {
        model.position.z = Math.sin(Date.now() * 0.005 + index * 0.1) * 0.2;
      });
    }
  });

  return (
    <>
      {gridHeight !== null && gridWidth !== null && data !== null ? (
        <>
          <Center>
            <group ref={groupRef}>
              {[...Array(gridSize).keys()].map((ex, ix) => {
                return [...Array(gridSize).keys()].map((ey) => {
                  const geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
                  const flippedY = typeof gridHeight === "number" ? gridHeight - 1 - ey : 0;
                  const pixelIndex = typeof gridWidth === "number" ? (flippedY * gridWidth + ex) * 4 : 0;
                  const r = data[pixelIndex];
                  const g = data[pixelIndex + 1];
                  const b = data[pixelIndex + 2];
                  const brightness = (r + g + b) / 3;
                  if (brightness < 128) {
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
                      <mesh key={`cube_${ex}_${ey}`} position={[ex * spacing, ey * spacing, 0]} geometry={geometry}>
                        <meshStandardMaterial side={THREE.FrontSide} map={videoTexture} />
                      </mesh>
                    );
                  }
                });
              })}
            </group>
          </Center>
          <Center>
            <Html position-y={-6} className="flex gap-5 w-full justify-center">
              <button
                className="bg-blue-400 hover:bg-blue-600 transition-all text-white cursor-pointer rounded-md py-2 px-5"
                onClick={() => {
                  groupRef.current.children.forEach((e, i) => {
                    gsap.to(e.scale, {
                      x: 0,
                      y: 0,
                      duration: 1,
                      ease: "power2.out",
                      stagger: 0.02,
                    });
                  });

                  setTimeout(() => {
                    setNumConfiguration(0);
                  }, 1000);
                  setTimeout(() => {
                    groupRef.current.children.forEach((e, i) => {
                      gsap.to(e.scale, {
                        x: 1,
                        y: 1,
                        duration: 1,
                        ease: "power2.inOut",
                        stagger: 0.02,
                      });
                    });
                  }, 1100); // начинаем увеличение чуть позже
                }}
              >
                Сердце
              </button>
              <button
                className="bg-blue-400 hover:bg-blue-600 transition-all text-white cursor-pointer rounded-md py-2 px-5"
                onClick={async () => {
                  groupRef.current.children.forEach((e, i) => {
                    gsap.to(e.scale, {
                      x: 0,
                      y: 0,
                      duration: 1,
                      ease: "power2.out",
                      stagger: 0.02,
                    });
                  });

                  setTimeout(() => {
                    setNumConfiguration(1);
                  }, 1000);
                  setTimeout(() => {
                    groupRef.current.children.forEach((e, i) => {
                      gsap.to(e.scale, {
                        x: 1,
                        y: 1,
                        duration: 1,
                        ease: "power2.inOut",
                        stagger: 0.02,
                      });
                    });
                  }, 1250); // начинаем увеличение чуть позже
                }}
              >
                Капля
              </button>
              <button
                className="bg-blue-400 hover:bg-blue-600 transition-all text-white cursor-pointer rounded-md py-2 px-5"
                onClick={() => {
                  groupRef.current.children.forEach((e, i) => {
                    gsap.to(e.scale, {
                      x: 0,
                      y: 0,
                      duration: 1,
                      ease: "power2.out",
                      stagger: 0.02,
                    });
                  });

                  setTimeout(() => {
                    setNumConfiguration(2);
                  }, 1000);
                  setTimeout(() => {
                    if (groupRef.current) {
                      groupRef.current.children.forEach((e, i) => {
                        gsap.to(e.scale, {
                          x: 1,
                          y: 1,
                          duration: 1,
                          ease: "power2.inOut",
                          stagger: 0.02,
                        });
                      });
                    }
                  }, 1100); // начинаем увеличение чуть позже
                }}
              >
                Смайл
              </button>
            </Html>
          </Center>
        </>
      ) : (
        <></>
      )}
    </>
  );
}
