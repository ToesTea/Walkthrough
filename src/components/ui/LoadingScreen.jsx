import { useProgress } from "@react-three/drei";
export function LoadingScreen({ sceneReady }) {
  const {progress} = useProgress();
  const gameStarted = progress >= 100 && sceneReady;
  const displayedProgress = sceneReady ? 100 : Math.min(progress, 99);
  return (
    <div
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
            {`${displayedProgress.toFixed(0)}%`}
        </p>

        <div
          className={`
            w-full h-4
            bg-gray-600 rounded-2xl overflow-hidden
            transition-opacity duration-300
            ${gameStarted ? "opacity-0" : "opacity-100"}
          `}
        >
          <div
            className="h-full bg-white transition-all duration-100"
            style={{ width: `${displayedProgress}%` }}
          />
        </div>

      </div>
    </div>
  );
}