import { useGLTF } from '@react-three/drei';

function MedtLab() {
    const { scene } = useGLTF("/assets/models/room/MedtLab.glb");
     
    return <primitive object={scene} />;
}

export default MedtLab;