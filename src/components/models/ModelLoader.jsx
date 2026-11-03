import { useState } from "react";
import Model from "./Model.jsx";
import useCustomAnimation from "../../hooks/interaction/Animation.jsx";
import { STATIC_MODEL_PATH } from "../../config.js";
import { isOnModel } from "../../stateHandler.js";
// import useSlider from "../../hooks/interaction/Slider.jsx";

function NodeAnimator({ scene, node, animation, isActive }) {
  useCustomAnimation(scene, node, animation, isActive);
  return null;
}

function ModelLoader({ onAnimationStateChange }) {
  const [animatedNodes, setAnimatedNodes] = useState({});

  const handleModelClick = (clickedNode, modelData) => {
    let activeNode = clickedNode;

    if (!clickedNode || 
        !modelData ||
        !isOnModel() ||
        activeNode.name.includes("Slider") ||
        activeNode.name.includes("Knob")
      ) return;
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
        position={[-4.5, 0, -3.7]}
        rotation={[0, Math.PI / 2, 0]}
        path={`${STATIC_MODEL_PATH}/AudioTable.glb`}
        onClick={(clickedNode, modelData) => handleModelClick(clickedNode, modelData)}
      />
      <Model
        position={[-4.5, 0.78, -4.4]}
        rotation={[0, Math.PI / 2, 0]}
        path={`${STATIC_MODEL_PATH}/Palmer.glb`}
        onClick={(clickedNode, modelData) => handleModelClick(clickedNode, modelData)}
      />
      <Model
        position={[-4.7, 0, -5.5]}
        rotation={[0, Math.PI / 2, 0]}
        path={`${STATIC_MODEL_PATH}/Closet.glb`}
        onClick={(clickedNode, modelData) => handleModelClick(clickedNode, modelData)}
      />
      <Model
        position={[-4.3, 0, -3.7]}
        rotation={[0, Math.PI / 2, 0]}
        path={`${STATIC_MODEL_PATH}/Chair_Black.glb`}
      />
      <Model
        position={[-1.2, 0, -5.5]}
        rotation={[0, Math.PI / 2, 0]}
        path={`${STATIC_MODEL_PATH}/Chair_Wood.glb`}
      />
      <Model
        position={[-.5, 0, -5.5]}
        rotation={[0, -Math.PI / 2, 0]}
        path={`${STATIC_MODEL_PATH}/MixerTable.glb`}
      />
      <Model
        position={[-4.5, 0, -.6]}
        rotation={[0, Math.PI / 2, 0]}
        path={`${STATIC_MODEL_PATH}/ProductTable.glb`}
      />
      <Model
        position={[-4.4, 0.8, -3.95]}
        rotation={[0, 0, 0]}
        path={`${STATIC_MODEL_PATH}/DLZ.glb`}
        onClick={(clickedNode, modelData) => handleModelClick(clickedNode, modelData)}
      />
      <Model
        position={[-2.5, 0, -6]}
        rotation={[0, -Math.PI / 2, 0]}
        path={`${STATIC_MODEL_PATH}/Teleprompter.glb`}
        onClick={(clickedNode, modelData) => handleModelClick(clickedNode, modelData)}
      />

      <Model
        position={[-.5, .6, -5]}
        rotation={[0, Math.PI, 0]}
        path={`${STATIC_MODEL_PATH}/Videomischer.glb`}
        onClick={(clickedNode, modelData) => handleModelClick(clickedNode, modelData)}
      />
      {/*<Model
        position={[-3.5, 0, -5.5]}
        rotation={[0, 100, 0]}
        path={`${STATIC_MODEL_PATH}/LightBig.glb`}
      />
      <Model
        position={[-2, 0, -5.5]}
        rotation={[0, -Math.PI / 2 + 50, 0]}
        path={`${STATIC_MODEL_PATH}/LightSmall.glb`}
      />
      <Model
        position={[-3.5, 0, -5.5]}
        rotation={[0, 0, 0]}
        path={`${STATIC_MODEL_PATH}/Wall.glb`}
      />*/}
    </>
  );
}

export default ModelLoader;