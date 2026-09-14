"use client";
import { useEffect, useState } from "react";

const images = [
  "https://images.schoolrave.net/cdn-cgi/image/f=webp/20241005_085614.webp",
  "https://images.schoolrave.net/cdn-cgi/image/f=webp/DSC03758.webp",
  "https://images.schoolrave.net/cdn-cgi/image/f=webp/DSC_0039.webp",
  "https://images.schoolrave.net/cdn-cgi/image/f=webp/DSC_0003.webp",
  "https://images.schoolrave.net/cdn-cgi/image/f=webp/DSC_0300.webp",
];

const SLIDE_INTERVAL = 4000;

const HeroSlideshow = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // 画像プリロード
  useEffect(() => {
    images.forEach((src) => {
      const img = new window.Image();
      img.src = src;
    });
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setIsTransitioning(true);

      setTimeout(() => {
        // トランジション完了後、状態を更新
        setCurrentIndex(nextIndex);
        setNextIndex((nextIndex + 1) % images.length);
        setIsTransitioning(false);
      }, 500); // トランジション時間と同じ
    }, SLIDE_INTERVAL);

    return () => clearInterval(timer);
  }, [nextIndex]);

  return (
    <div
      className="absolute inset-0 w-full h-full"
      style={{
        zIndex: 0,
        pointerEvents: "none",
      }}
    >
      {/* 現在の画像 */}
      <img
        src={images[currentIndex]}
        alt=""
        className="!w-full !h-full !object-cover !absolute !inset-0"
        style={{
          opacity: 1,
          transition: "opacity 0.5s ease-in-out",
          pointerEvents: "none",
        }}
        draggable={false}
      />

      {/* 次の画像（トランジション中のみ表示） */}
      {isTransitioning && (
        <img
          src={images[nextIndex]}
          alt=""
          className="!w-full !h-full !object-cover !absolute !inset-0"
          style={{
            opacity: 1,
            transition: "opacity 0.5s ease-in-out",
            pointerEvents: "none",
          }}
          draggable={false}
        />
      )}
    </div>
  );
};

export default HeroSlideshow;
