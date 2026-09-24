import { useGLTF } from '@react-three/drei';
import useBoundingBox from '../../hooks/BoundingBox.jsx';
import { useEffect, useState } from "react";
import useDollyShot from "../../hooks/DollyShot.jsx";
import { completeDolly, startDolly } from "../../hooks/dollyLock.js";

function StaticModel(
    { 
        position=[0, 0, 0], 
        scale=1, 
        rotation=[0, 0, 0], 
        path,
        getNodes
    }, ref) {
    const { scene, nodes } = useGLTF(path);
    const box = useBoundingBox(scene);
    const [dollyObject, setDollyObject] = useState(null);
    const [dollyCamera, setDollyCamera] = useState(null);

    useDollyShot(dollyCamera, dollyObject, () => {
        setDollyCamera(null);
        setDollyObject(null);
        completeDolly();
    });

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

            const Camera = nodes.CameraAnchor;
            const Object = nodes.ObjectAnchor;

            if (!Camera || !Object || !startDolly()) return;

            setDollyCamera(Camera);
            setDollyObject(Object);
        }}
        >
      <primitive object={scene} />
      {box && <box3Helper args={[box, 'red']} />}
    </group>
  );
}

export default StaticModel;