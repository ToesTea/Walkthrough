import { Canvas } from "@react-three/fiber";
import { Scene } from "./components/global/Scene";

function App() {
  return (
    <Canvas
      camera={{
        position: [0, 2, 5],
        fov: 45
      }}

      shadows
    >
      <Scene />
    </Canvas>
  );
}

export default App;