import { Canvas } from "@react-three/fiber";
import { StartScreen } from "./components/ui/StartScreen";
import { Scene } from "./components/global/Scene";
import { Suspense } from "react";

function App() {

    const handleBottomClick = (event) => {
        if (event.clientY > window.innerHeight * 0.75) {
          event.stopPropagation();
          window.dispatchEvent(new CustomEvent("dolly"));
        }
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
          <Scene/>
        </Suspense>
      </Canvas>
      <StartScreen />
    </div>
  );
}

export default App;