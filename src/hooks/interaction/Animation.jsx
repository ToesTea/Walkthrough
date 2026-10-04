import { useEffect, useMemo } from "react"; // CHANGED: added useMemo
import { isOnModel } from "../dollyLock.js";
import { useAnimations } from "@react-three/drei";
import { LoopOnce } from "three";

function useCustomAnimation(scene, node, animation, isActive) {
    const clips = useMemo(() => (animation ? [animation] : []), [animation]); // ADDED

    const { actions } = useAnimations(
        clips, // CHANGED: was animation ? [animation] : []
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