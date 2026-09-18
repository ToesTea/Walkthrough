import * as Config from "../../config.js"
import { useGLTF } from '@react-three/drei';
import useBoundingBox from '../../hooks/BoundingBox.jsx';

function StaticModel(
    { position=[0, 0, 0], scale=1, rotation=[0, 0, 0], path=`${Config.STATIC_MODEL_PATH}/default.glb`},
    ref) {
    const { scene } = useGLTF(path);
    const box = useBoundingBox(scene);

    return (
    <group 
        ref={ref} 
        position={position} 
        scale={scale} 
        rotation={rotation}
        onClick={(e) => {
            e.stopPropagation();
            console.log("Mesh clicked!")
        }}
        >
      <primitive object={scene} />
      {box && <box3Helper args={[box, 'red']} />}
    </group>
  );
}

export default StaticModel;