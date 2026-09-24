import { useGLTF } from '@react-three/drei';
import { useThree } from "@react-three/fiber";
import { useEffect, useState } from "react";
import useDollyShot from '../../hooks/DollyShot';
import { ROOM_MODEL_PATH } from '../../config.js';
import { completeDolly } from '../../hooks/dollyLock.js';

function MainCamera() {
    const { cameras, nodes } = useGLTF(ROOM_MODEL_PATH);
    const { set } = useThree();
    const camera = cameras[0];
    const [dollyObject, setDollyObject] = useState(null);
    const [dollyCamera, setDollyCamera] = useState(null);

    useDollyShot(dollyCamera, dollyObject, () => {
        setDollyCamera(null);
        setDollyObject(null);
        completeDolly();
    });

    useEffect(() => {
        if (camera) set({camera});
    }, [camera, set]);

    useEffect(() => {
        const handleDolly = () => {
            setDollyCamera(nodes.CameraAnchor ?? null);
            setDollyObject(nodes.ObjectAnchor ?? null);
        };

        window.addEventListener("dolly", handleDolly);
        return () => window.removeEventListener("dolly", handleDolly);

    }, [nodes]);

    return <primitive object={camera} />;
}

export default MainCamera;