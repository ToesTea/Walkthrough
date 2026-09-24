import { Canvas } from "@react-three/fiber";
import { LoadingScreen } from "./components/ui/LoadingScreen";
import { Scene } from "./components/global/Scene";
import { Suspense } from "react";
import { isDollyActive, startDolly } from "./hooks/dollyLock.js";

function App() {

    const handleBottomClick = (event) => {
        const isBottomClick = event.clientY > window.innerHeight * 0.75;

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
      className="relative w-screen h-screen"
      onClickCapture={handleBottomClick}
    >
      <Canvas
        dpr={1}
        shadows={false}  
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
      <LoadingScreen />
    </div>
  );
}

export default App;