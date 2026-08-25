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

      <PointerLockControls
        ref={controlsRef}
        enabled={gameStarted}
      />
    </>
  );
}