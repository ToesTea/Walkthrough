import * as Config from "../../config.js"
import { useRef } from "react";
import StaticModel from "../models/StaticModel";
import MedtLab from "../models/MedtLab";
import Lights from "./Lights";
import {
  Environment,
} from "@react-three/drei";
import { CameraMovement } from "../ui/CameraMovement.jsx";
import MainCamera from "../models/Camera.jsx";

export function Scene() {
  const AudioTableRef = useRef();

  return (
    <>
      <Environment
        files="../../../public/assets/hdri/sky.hdr"
        background
      />

      <Lights />

      <MainCamera />
      <CameraMovement />

      <MedtLab />
      <StaticModel
        ref={AudioTableRef}
        position={[-4.5, 0, -3.5]}
        rotation={[0, Math.PI /2, 0]}
        path={`${Config.STATIC_MODEL_PATH}/AudioTable.glb`}
      />

    </>
  );
}