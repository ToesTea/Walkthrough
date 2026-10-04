import { useRef, useState } from "react";
import Model from "./Model.jsx";
import useCustomAnimation from "../../hooks/interaction/Animation.jsx";
import { STATIC_MODEL_PATH } from "../../config.js";

function NodeAnimator({ scene, node, animation, isActive }) {
  useCustomAnimation(scene, node, animation, isActive);
  return null;
}

function ModelLoader({ onAnimationStateChange }) {
  const AudioTableRef = useRef();
  const PalmerRef = useRef();
  const [animatedNodes, setAnimatedNodes] = useState({});

  const handleModelClick = (clickedNode, modelData) => {
    if (!clickedNode || !modelData) return;

    let activeNode = clickedNode;
    let animation;

    while (activeNode) {
      animation = modelData.animations?.find(
        (clip) => clip.name === `${activeNode.name}Action`,
      );
      if (animation) break;
      activeNode = activeNode.parent;
    }

    if (!animation || !activeNode) return;


    const key = activeNode.uuid;
    const currentActive = !animatedNodes[key]?.isActive;

    onAnimationStateChange?.({
      node: activeNode,
      action: animation,
      isActive: currentActive,
    });

    setAnimatedNodes((prev) => ({
      ...prev,
      [key]: {
        scene: modelData.scene ?? null,
        node: activeNode ?? null,
        animation: animation ?? null,
        isActive: currentActive,
      },
    })); 
  };
  const animators = [];
  for (const uuid in animatedNodes) {
    animators.push(<NodeAnimator key={uuid} {...animatedNodes[uuid]} />);
  }

  return (
    <>
      {animators}

      <Model
        ref={AudioTableRef}
        position={[-4.5, 0, -3.5]}
        rotation={[0, Math.PI / 2, 0]}
        path={`${STATIC_MODEL_PATH}/AudioTable.glb`}
        onClick={(clickedNode, modelData) => handleModelClick(clickedNode, modelData)}
      />
      <Model
        ref={PalmerRef}
        position={[-4.3, 0.78, -4.2]}
        rotation={[0, Math.PI / 2, 0]}
        path={`${STATIC_MODEL_PATH}/Palmer.glb`}
        onClick={(clickedNode, modelData) => handleModelClick(clickedNode, modelData)}
      />
    </>
  );
}

export default ModelLoader;