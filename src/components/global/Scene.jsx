//import * as Config from "../../config.js"
//import { useRef, useState } from "react";
import MedtLab from "../models/MedtLab";
import Lights from "./Lights";
import {
  Environment,
} from "@react-three/drei";
import { CameraMovement } from "../ui/CameraMovement.jsx";
import MainCamera from "../models/Camera.jsx";
import ModelLoader from "../models/ModelLoader.jsx";

export function Scene() {

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
      <ModelLoader />

    </>
  );
}