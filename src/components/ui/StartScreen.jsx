import { useEffect, useState } from "react";
import { useProgress } from "@react-three/drei";

export function StartScreen({ gameStarted, onStart }) {
  const {active, progress} = useProgress();

  function handleClick() {
    if (progress >= 100) {
      onStart();
    }
  }

  return (
    <div
      onClick={handleClick}
      className={`
        absolute inset-0 z-50
        bg-gray-900 text-white
        w-screen h-screen
        flex items-center justify-center
        transition-opacity duration-700 cursor-pointer
        ${
          gameStarted
            ? "opacity-0 pointer-events-none"
            : "opacity-100 pointer-events-auto"
        }
      `}
    >
      <div className="w-1/2 text-center">

        <p className="text-8xl mb-6 select-none">
          {progress < 100
            ? `${progress.toFixed(0)}%`
            : "Click to Start"}
        </p>

        <div
          className={`
            w-full h-4
            bg-gray-600 rounded-2xl overflow-hidden
            transition-opacity duration-300
            ${progress < 100 ? "opacity-100" : "opacity-0"}
          `}
        >
          <div
            className="h-full bg-white transition-all duration-100"
            style={{ width: `${progress}%` }}
          />
        </div>

      </div>
    </div>
  );
}