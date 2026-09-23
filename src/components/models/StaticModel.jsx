import * as Config from "../../config.js"
import { useGLTF } from '@react-three/drei';
import useBoundingBox from '../../hooks/BoundingBox.jsx';
import { useEffect, useState } from "react";
import useDollyShot from "../../hooks/DollyShot.jsx";

function StaticModel(
    { 
        position=[0, 0, 0], 
        scale=1, 
        rotation=[0, 0, 0], 
        path=`${Config.STATIC_MODEL_PATH}/default.glb`,
        getNodes
    }, ref) {
    const { scene, nodes } = useGLTF(path);
    const box = useBoundingBox(scene);
    const [dollyObject, setDollyObject] = useState(null);
    const [dollyCamera, setDollyCamera] = useState(null);

    useDollyShot(dollyCamera, dollyObject);

    useEffect(() => {
        if (getNodes) getNodes(nodes);
    }, [nodes, getNodes])

    return (
    <group 
        ref={ref} 
        position={position} 
        scale={scale}
        rotation={rotation}
        onClick={(e) => {
            e.stopPropagation();
            setDollyCamera(nodes.CameraAnchor ?? null);
            setDollyObject(nodes.ObjectAnchor ?? null);
            console.log("Mesh clicked!")
        }}
        >
      <primitive object={scene} />
      {box && <box3Helper args={[box, 'red']} />}
    </group>
  );
}

export default StaticModel;