import AudioTable from "../models/AudioTable";
import MedtLab from "../models/MedtLab";
import Lights from "./Lights";
import {
  Environment,
  PointerLockControls,
} from "@react-three/drei";

export function Scene({ gameStarted, controlsRef }) {
  return (
    <>
      <Environment
        files="../../../public/assets/hdri/sky.hdr"
        background
      />

      <Lights />

      <MedtLab />
      <AudioTable 
        scale={1}
        position={[-4.5, 0, -3.5]}
        rotation={[0, Math.PI /2, 0]}
      />

      <PointerLockControls
        ref={controlsRef}
        enabled={gameStarted}
      />
    </>
  );
}