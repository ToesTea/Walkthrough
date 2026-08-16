import { useGLTF } from '@react-three/drei';
import { useThree } from "@react-three/fiber";
import { useEffect } from "react";

function MedtLab() {
    const { scene, cameras } = useGLTF('../../../public/assets/models/room/MedtLab.glb');
    const { set } = useThree();

    useEffect(() => {
        if (cameras.length > 0) {
            const frontalCamera = cameras[0];
            
            set({ camera: frontalCamera });
        }
    }, [cameras, set]);

    return <primitive object={scene}/>;
}

export default MedtLab;