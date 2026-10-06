import { useEffect, useMemo } from "react"; 
import { isOnModel } from "../../stateHandler.js";
import { useAnimations } from "@react-three/drei";
import { LoopOnce } from "three";

function useCustomAnimation(scene, node, animation, isActive) {
    const clips = useMemo(() => (animation ? [animation] : []), [animation]); 

    const { actions } = useAnimations(
        clips, 
        scene,
    )
    
    useEffect(() => {
        if (!isOnModel() || !node || !animation || !scene) return;
        const action = actions[animation.name];

        if(!action) {
            console.log("Animation not found");
            return;
        }

        action.reset();
        action.setLoop(LoopOnce, 1);
        // eslint-disable-next-line react-hooks/immutability
        action.clampWhenFinished = true;
        action.time = isActive ? 0 : animation.duration;
        action.timeScale = isActive ? 1 : -1;
        action.play();

        return () => {
            action.stop();
        };
    }, [actions, animation, isActive, node, scene]);
    return actions;
}

export default useCustomAnimation;