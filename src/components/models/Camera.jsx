import { useGLTF } from '@react-three/drei';
import { useThree } from "@react-three/fiber";
import { useEffect, useMemo } from "react";
import * as THREE from 'three';

function MainCamera({position=[0, 0, 0], rotation=[0, 0, 0]}) {
    const { cameras } = useGLTF('../../../public/assets/models/room/MedtLab.glb');
    const { set } = useThree();
    const camera = cameras[0];

    const [px, py, pz] = position;
    const [rx, ry, rz] = rotation;


    useEffect(() => {
        if (camera) set({camera});
    }, [camera, set]);

    useEffect(() => {
        if (camera) camera.rotation.set(rx, ry, rz)
    },[camera, rx, ry, rz]);

    const memoPosition = useMemo(
        () => position.every((value) => value === 0)
            ? camera.position
            : new THREE.Vector3(px, py, pz),
        [camera, position, px, py, pz]
    );


    return cameras[0] ? <primitive object={camera} position={memoPosition}/> : null;
}

export default MainCamera;