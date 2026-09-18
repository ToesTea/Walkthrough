import { Canvas } from "@react-three/fiber";
import { StartScreen } from "./components/ui/StartScreen";
import { Scene } from "./components/global/Scene";

function App() {

  return (
    <div className="relative w-screen h-screen">
      <Canvas shadows>
        <Scene/>
      </Canvas>
      <StartScreen />
    </div>
  );
}

export default App;