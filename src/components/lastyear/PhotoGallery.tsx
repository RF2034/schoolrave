"use client";
import { useEffect, useState } from "react";

const PhotoGallery = () => {
  const [images, setImages] = useState<string[]>([]);
  const [current, setCurrent] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchImages = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch("https://api.schoolrave.net");
        if (!res.ok) throw new Error("APIリクエストに失敗しました");
        const data = await res.json();
        if (data.success && Array.isArray(data.images)) {
          setImages(data.images);
        } else {
          throw new Error("画像データの取得に失敗しました");
        }
      } catch (e: unknown) {
        if (e instanceof Error) {
          setError(e.message || "不明なエラーが発生しました");
        } else {
          setError("不明なエラーが発生しました");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchImages();
  }, []);

  return (
    <section>
      <h2 className="text-2xl font-bold mb-6">フォトギャラリー</h2>
      <div className="flex flex-col items-center">
        <div className="w-full max-w-xl">
          <div className="carousel rounded-box relative flex justify-center items-center min-h-[200px]">
            {loading ? (
              <div className="w-full flex justify-center items-center py-12 text-lg text-gray-500">
                画像を読み込み中...
              </div>
            ) : error ? (
              <div className="w-full flex justify-center items-center py-12 text-red-500">
                {error}
              </div>
            ) : images.length === 0 ? (
              <div className="w-full flex justify-center items-center py-12 text-gray-500">
                画像がありません
              </div>
            ) : (
              <div className="relative w-full aspect-[16/9] flex justify-center items-center bg-base-200 overflow-hidden">
                {images.map((src, idx) => (
                  <img
                    key={src}
                    src={src}
                    alt={`フォト${idx + 1}`}
                    className={`absolute left-0 top-0 w-full h-full object-cover transition-opacity duration-150 ${current === idx ? "opacity-100 z-10" : "opacity-0 z-0"}`}
                    draggable={false}
                    style={{ pointerEvents: current === idx ? "auto" : "none" }}
                  />
                ))}
              </div>
            )}
          </div>
          {/* 遷移ボタンを下部に配置 */}
          {!loading && !error && images.length > 0 && (
            <div className="flex justify-center gap-4 mt-4">
              <button
                className="btn btn-circle btn-outline"
                onClick={() =>
                  setCurrent(current === 0 ? images.length - 1 : current - 1)
                }
                aria-label="前の画像"
                type="button"
                disabled={images.length === 0}
              >
                ‹
              </button>
              <button
                className="btn btn-circle btn-outline"
                onClick={() =>
                  setCurrent(current === images.length - 1 ? 0 : current + 1)
                }
                aria-label="次の画像"
                type="button"
                disabled={images.length === 0}
              >
                ›
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default PhotoGallery;
