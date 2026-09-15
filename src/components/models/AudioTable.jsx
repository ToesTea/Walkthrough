import { useGLTF } from '@react-three/drei';

function AudioTable({position, scale, rotation}) {
    const { scene } = useGLTF('../../../public/assets/models/static/AudioTable.glb');

    return <primitive 
        object={scene}
        scale={scale}
        position={position}
        rotation={rotation}
    />;
}

export default AudioTable;