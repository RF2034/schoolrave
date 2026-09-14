"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const TRANSITION_MS = 500;

type Props = {
  images: readonly string[];
  intervalMs: number;
};

function preloadImage(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const img = new window.Image();
    img.onload = () => resolve();
    img.onerror = () => reject(new Error(`Failed to preload: ${src}`));
    img.src = src;
  });
}

export default function HeroSlideshow2026({ images, intervalMs }: Props) {
  const [activeLayer, setActiveLayer] = useState<0 | 1>(0);
  const [layerIndices, setLayerIndices] = useState<[number, number]>([0, 1]);
  const [isReady, setIsReady] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const imagesRef = useRef(images);
  const stateRef = useRef({
    activeLayer: 0 as 0 | 1,
    isTransitioning: false,
  });
  const transitionTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(
    null,
  );

  useEffect(() => {
    imagesRef.current = images;
  }, [images]);

  useEffect(() => {
    stateRef.current.activeLayer = activeLayer;
    stateRef.current.isTransitioning = isTransitioning;
  }, [activeLayer, isTransitioning]);

  useEffect(() => {
    if (images.length === 0) return;

    let cancelled = false;
    // ponytail: images 差し替え時にスライド状態を初期化。key リマウントに上げるならこの塊ごと消せる
    setIsReady(false);
    setActiveLayer(0);
    setLayerIndices([0, Math.min(1, images.length - 1)]);
    setIsTransitioning(false);

    void (async () => {
      if (images.length === 1) {
        try {
          await preloadImage(images[0]!);
        } catch {
          /* continue */
        }
        if (!cancelled) setIsReady(true);
        return;
      }

      images.forEach((src) => {
        void preloadImage(src).catch(() => {});
      });

      try {
        await Promise.all([preloadImage(images[0]!), preloadImage(images[1]!)]);
      } catch {
        /* continue */
      }

      if (!cancelled) setIsReady(true);
    })();

    return () => {
      cancelled = true;
    };
  }, [images]);

  const advanceSlide = useCallback(() => {
    const imgs = imagesRef.current;
    if (imgs.length <= 1) return;

    const { activeLayer: front, isTransitioning: transitioning } =
      stateRef.current;
    if (transitioning) return;

    const back = (1 - front) as 0 | 1;

    setLayerIndices((prev) => {
      const currentIndex = prev[front];
      const nextIndex = (currentIndex + 1) % imgs.length;
      const next = [...prev] as [number, number];
      next[back] = nextIndex;
      return next;
    });
    setIsTransitioning(true);

    transitionTimeoutRef.current = setTimeout(() => {
      setLayerIndices((prev) => {
        const currentIndex = prev[front];
        const nextIndex = (currentIndex + 1) % imgs.length;
        const hidden = front;
        const preloadIndex = (nextIndex + 1) % imgs.length;
        const next = [...prev] as [number, number];
        next[hidden] = preloadIndex;
        const preloadSrc = imgs[preloadIndex];
        if (preloadSrc) {
          void preloadImage(preloadSrc).catch(() => {});
        }
        return next;
      });
      setActiveLayer(back);
      setIsTransitioning(false);
    }, TRANSITION_MS);
  }, []);

  useEffect(() => {
    if (!isReady || images.length <= 1) return;

    const t = window.setInterval(advanceSlide, intervalMs);
    return () => window.clearInterval(t);
  }, [advanceSlide, images.length, intervalMs, isReady]);

  useEffect(() => {
    return () => {
      if (transitionTimeoutRef.current) {
        clearTimeout(transitionTimeoutRef.current);
      }
    };
  }, []);

  if (images.length === 0) return null;

  const backLayer = (1 - activeLayer) as 0 | 1;

  return (
    <div
      className="absolute inset-0 h-full w-full"
      style={{ zIndex: 0, pointerEvents: "none" }}
    >
      {([0, 1] as const).map((layer) => {
        const index = layerIndices[layer] ?? 0;
        const src = images[index] ?? images[0]!;
        const targetOpacity = isTransitioning
          ? layer === backLayer
            ? 1
            : 0
          : layer === activeLayer
            ? 1
            : 0;
        const zIndex =
          isTransitioning && layer === backLayer
            ? 2
            : !isTransitioning && layer === activeLayer
              ? 2
              : 1;

        return (
          <img
            key={layer}
            src={src}
            alt=""
            className="absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ease-in-out"
            style={{
              opacity: targetOpacity,
              zIndex,
              pointerEvents: "none",
            }}
            draggable={false}
          />
        );
      })}
    </div>
  );
}
