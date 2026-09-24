import { useGLTF } from "@react-three/drei";
import {
  ROOM_MODEL_PATH,
  STATIC_MODEL_PATH,
} from "../config.js";

useGLTF.preload(ROOM_MODEL_PATH);
useGLTF.preload(`${STATIC_MODEL_PATH}/AudioTable.glb`);