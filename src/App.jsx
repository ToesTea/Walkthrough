import { Canvas } from "@react-three/fiber";
import { useState } from "react";
import { LoadingScreen } from "./components/ui/LoadingScreen";
import { Scene } from "./components/global/Scene";
import { Suspense } from "react";
import { isDollyActive, startDolly } from "./hooks/dollyLock.js";
import InfoWindow from "./components/ui/InfoWindow.jsx";

function App() {
  const [activeAnimation, setActiveAnimation] = useState(null);
  const [sceneReady, setSceneReady] = useState(false);

    const handleBottomClick = (event) => {
        const isBottomClick = event.clientY > window.innerHeight * 0.90;

        if (!isBottomClick) {
          if (isDollyActive()) {
            event.stopPropagation();
          }
            return;
        }

        event.stopPropagation();

        if (!startDolly()) return;

        window.dispatchEvent(new CustomEvent("dolly"));
    };

  return (
    <div
      className="relative h-screen w-screen bg-gray-900"
      onClickCapture={handleBottomClick}
    >
      <Canvas
        dpr={1}
        shadows={false}  
      >
        <Suspense fallback={null}>
          <Scene
            onAnimationStateChange={setActiveAnimation}
            onSceneReady={setSceneReady}
          />
        </Suspense>
      </Canvas>
      <LoadingScreen sceneReady={sceneReady} />
      <InfoWindow animationState={activeAnimation} />
    </div>
  );
}

export default App;