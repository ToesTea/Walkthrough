import { useGLTF } from '@react-three/drei';
import useBoundingBox from '../../hooks/BoundingBox.jsx';
import { useEffect, useState } from "react";
import useDollyShot from "../../hooks/DollyShot.jsx";
import { completeDolly, enterModel, startDolly } from "../../hooks/dollyLock.js";

function Model(
    { 
        position=[0, 0, 0], 
        scale=1, 
        rotation=[0, 0, 0], 
        path,
        getNodes,
        onClick
    }, ref) {
    const { scene, nodes, animations } = useGLTF(path);
    const box = useBoundingBox(scene);
    const [dollyObject, setDollyObject] = useState(null);
    const [dollyCamera, setDollyCamera] = useState(null);
    const [modelActive, setModelActive] = useState(false);

    useDollyShot(dollyCamera, dollyObject, () => {
        setDollyCamera(null);
        setDollyObject(null);
        completeDolly();
    });

    useEffect(() => {
      getNodes?.({scene, nodes, animations})
    }, [scene, nodes, animations, getNodes])

    useEffect(() => {
      const handleDolly = () => setModelActive(false);

      window.addEventListener("dolly", handleDolly);
      return () => window.removeEventListener("dolly", handleDolly);
    }, []);

  return (
    <group 
        ref={ref} 
        position={position} 
        scale={scale}
        rotation={rotation}
        onClick={(e) => {
          e.stopPropagation();
          onClick?.(e.object, { scene, nodes, animations });

          const Camera = nodes.CameraAnchor;
          const Object = nodes.ObjectAnchor;

          if (!Camera || !Object || !startDolly()) return;

          setDollyCamera(Camera);
          setDollyObject(Object);
          enterModel();
          setModelActive(true);
        }}
        >
      <primitive object={scene} />
      {box && !modelActive && (
        <box3Helper
          args={[box, 'red']}
        />
      )}
    </group>
  );
}

export default Model;