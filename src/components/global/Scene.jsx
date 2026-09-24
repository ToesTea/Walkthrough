//import * as Config from "../../config.js"
import { useEffect } from "react";
import MedtLab from "../models/MedtLab";
import Lights from "./Lights";
import {
  Environment,
} from "@react-three/drei";
import { CameraMovement } from "../ui/CameraMovement.jsx";
import MainCamera from "../models/Camera.jsx";
import ModelLoader from "../models/ModelLoader.jsx";
import { HDRI_PATH } from "../../config.js";
import { useThree } from "@react-three/fiber";

function ShaderWarmup() {
  const { gl, scene, camera } = useThree();

  useEffect(() => {
    let cancelled = false;

    gl.compileAsync(scene, camera).then(() => {
      if (!cancelled) {
        console.log("Shaders compiled");
      }
    });

    return () => {
      cancelled = true;
    };
  }, [gl, scene, camera]);

  return null;
}

export function Scene() { 
  return (
    <>
      <Environment
        files={HDRI_PATH}
        background
      />

      <Lights />

      <MainCamera />
      <CameraMovement />

      <MedtLab />
      <ModelLoader />

      <ShaderWarmup />

    </>
  );
}