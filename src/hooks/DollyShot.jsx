import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

function useDollyShot(anchorCamera, anchorObject, onComplete) {
    const completed = useRef(false);
    const targetPosition = {
        camera: new THREE.Vector3(),
        object: new THREE.Vector3()
    };

    const lookAtMatrix = new THREE.Matrix4();
    const lookQuaternion = new THREE.Quaternion();

    useFrame(({ camera }, delta) => {
        if (!anchorCamera || !anchorObject) {
            completed.current = false;
            return;
        }

        if (completed.current) return;

        anchorCamera.getWorldPosition(targetPosition.camera);
        anchorObject.getWorldPosition(targetPosition.object);


        lookAtMatrix.lookAt(
            targetPosition.camera,
            targetPosition.object,
            camera.up
        );

        lookQuaternion.setFromRotationMatrix(lookAtMatrix);


        const amount = 1 - Math.exp(-4 * delta);
        camera.position.lerp(targetPosition.camera, amount);
        camera.quaternion.slerp(lookQuaternion, amount);

        if (
            camera.position.distanceTo(targetPosition.camera) < 0.01 &&
            camera.quaternion.angleTo(lookQuaternion) < 0.01
        ) {
            camera.position.copy(targetPosition.camera);
            camera.quaternion.copy(lookQuaternion);
            completed.current = true;
            onComplete?.();
        }
    });
}

export default useDollyShot;