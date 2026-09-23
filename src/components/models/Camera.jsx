import { useGLTF } from '@react-three/drei';
import { useThree } from "@react-three/fiber";
import { useEffect, useState } from "react";
import useDollyShot from '../../hooks/DollyShot';

function MainCamera() {
    const { cameras, nodes } = useGLTF('../../../public/assets/models/room/MedtLab.glb');
    const { set } = useThree();
    const camera = cameras[0];
    const [dollyObject, setDollyObject] = useState(null);
    const [dollyCamera, setDollyCamera] = useState(null);

    useDollyShot(dollyCamera, dollyObject, () => {
        setDollyCamera(null);
        setDollyObject(null);
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