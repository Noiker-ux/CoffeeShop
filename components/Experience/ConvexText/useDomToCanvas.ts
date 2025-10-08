import { extend } from "@react-three/fiber";
import html2canvas from "html2canvas";
import { useState, useEffect } from "react";
import * as THREE from "three";
import { debounce } from "lodash";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
extend(THREE as any);

type TextureType = THREE.Texture | null;

export const useDomToCanvas = (domEl: HTMLElement | null) => {
  const [texture, setTexture] = useState<TextureType>(null);

  useEffect(() => {
    let cleanupFunc: (() => void) | null = null;

    const updateTexture = async () => {
      if (!domEl || !document.body.contains(domEl)) return;

      const canvas = await html2canvas(domEl, { backgroundColor: null });
      setTexture(new THREE.CanvasTexture(canvas));
    };

    // Первый вызов сразу после установки элемента
    updateTexture();

    // Дебоунсим событие изменения размера окна
    const debouncedResize = debounce(updateTexture, 100); // дебоунс на 100мс

    window.addEventListener("resize", debouncedResize);

    cleanupFunc = () => {
      window.removeEventListener("resize", debouncedResize);
    };

    return cleanupFunc;
  }, [domEl]);

  return texture;
};
