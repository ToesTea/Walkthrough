import { useGLTF } from '@react-three/drei';
import { useEffect, useState } from "react";
import useDollyShot from "../../hooks/interaction/DollyShot.jsx";
import useSlider from "../../hooks/interaction/Slider.jsx";
import { completeDolly, enterModel, startDolly } from "../../stateHandler.js";
import useKnob from '../../hooks/interaction/Knob.jsx';
import mergeHandlers from '../interactions/MergeHandlers.jsx';

function Model(
    { 
        position=[0, 0, 0], 
        scale=1, 
        rotation=[0, 0, 0], 
        path,
        getNodes,
        onClick
    }) {
    const { scene, nodes, animations } = useGLTF(path);
    const [dollyObject, setDollyObject] = useState(null);
    const [dollyCamera, setDollyCamera] = useState(null);
    const sliderHandlers = useSlider(scene);
    const knobHandlers = useKnob(scene);
    const pointerHandlers = mergeHandlers(sliderHandlers, knobHandlers);

    useDollyShot(dollyCamera, dollyObject, () => {
        setDollyCamera(null);
        setDollyObject(null);
        completeDolly();
    });

    useEffect(() => {
      getNodes?.({scene, nodes, animations})
    }, [scene, nodes, animations, getNodes])

  return (
    <group
        position={position} 
        scale={scale}
        rotation={rotation}
        {...pointerHandlers}
        onClick={(e) => {
          e.stopPropagation();

          if (e.object.name.includes("Slider")) return;

          onClick?.(e.object, { scene, nodes, animations });

          const Camera = nodes.CameraAnchor;
          const Object = nodes.ObjectAnchor;

          if (!Camera || !Object || !startDolly()) return;

          setDollyCamera(Camera);
          setDollyObject(Object);
          enterModel();
        }}
        >
      <primitive object={scene} />
    </group>
  );
}

export default Model;