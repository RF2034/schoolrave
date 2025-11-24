

"use client";
import { useEffect, useRef, useState } from "react";

export default function EventClosedPopup() {
  const [open, setOpen] = useState(true);
  const [visible, setVisible] = useState(true);
  const popupRef = useRef<HTMLDivElement>(null);

  // フェードアウト時に非表示にする
  useEffect(() => {
    if (!open) {
      const timer = setTimeout(() => {
        setVisible(false);
      }, 250); // アニメーション時間と合わせる
      return () => clearTimeout(timer);
    } else {
      setVisible(true);
    }
  }, [open]);

  // 外側クリックで閉じる
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  if (!visible) return null;
  return (
    <div
  className={`fixed inset-0 z-50 flex items-center justify-center bg-gray-500/30 transition-opacity duration-250 ${open ? "opacity-100" : "opacity-0"}`}
    >
      <div
        ref={popupRef}
        className={`relative bg-white rounded-lg shadow-lg p-6 max-w-sm w-full text-center transform transition-all duration-250 ${open ? "scale-100 opacity-100" : "scale-95 opacity-0"}`}
        role="dialog"
        aria-modal="true"
      >
        <button
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 text-2xl font-bold focus:outline-none"
          aria-label="閉じる"
          onClick={() => setOpen(false)}
        >
          ×
        </button>
        <p className="text-lg font-semibold mb-2">2025年のガッコウレイヴは無事閉校しました！</p>
        <p>また来年お会いしましょう！</p>
      </div>
    </div>
  );
}
