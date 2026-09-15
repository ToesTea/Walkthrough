import { useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";

import { StartScreen } from "./components/ui/StartScreen";
import { Scene } from "./components/global/Scene";

function App() {
  const [gameStarted, setGameStarted] = useState(false);
  const controlsRef = useRef();

  function startGame() {
    setGameStarted(true);
    controlsRef.current?.lock();
  }

  return (
    <div className="relative w-screen h-screen">
      <Canvas
        /*camera={{
          position: [0, 2, 5],
          fov: 45,
        }}*/
        shadows
      >
        <Scene
          gameStarted={gameStarted}
          controlsRef={controlsRef}
        />
      </Canvas>

      <StartScreen
        gameStarted={gameStarted}
        onStart={startGame}
      />
    </div>
  );
}

export default App;