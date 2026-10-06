import { useRef } from "react";
import { Quaternion, Vector3 } from "three";

function useKnob(scene) {
    const knobDrag = useRef(null);
    const TILT_ANGLE = 20 * Math.PI / 180;

    const findKnob = (object) => {
        let knob = object;

        while (knob && knob !== scene && !knob.name.includes("Knob")) {
            knob = knob.parent;
        }

        return knob === scene ? null : knob;
    };

    const onPointerDown = (event) => {
        const knob = findKnob(event.object);
        if (!knob) return;
        // Check if clicked knob is tilted
        const isTilted = knob.name == "CUEOUTPUTKnob" || knob.name == "INPUT3AUXKnob";
        // Rotation axis (0, 1, 0) is looking 90° up, (0, cos(rad(20°)), sin(rad(20))) is tilted at 20°
        const rotationAxis = isTilted
            ? new Vector3(0, Math.cos(TILT_ANGLE), Math.sin(TILT_ANGLE))
            : new Vector3(0, 1, 0);

        event.stopPropagation();

        knobDrag.current = {
            pointerId: event.pointerId,
            knob,
            startQuaternion: knob.quaternion.clone(),
            rotationAxis,
            startX: event.clientX
        };

        // used to even capture the cursors position when not directly on the mesh
        event.target.setPointerCapture(event.pointerId);
    };

    const onPointerMove = (event) => {
		const drag = knobDrag.current;
		if (!drag || drag.pointerId !== event.pointerId) return;

		event.stopPropagation();
        
        const x = event.clientX - drag.startX;
        const rotation = new Quaternion().setFromAxisAngle(
            drag.rotationAxis,
            x * 0.01,
        );
        drag.knob.quaternion.copy(drag.startQuaternion).multiply(rotation);
    }

    	const onPointerUp = (event) => {
		if (knobDrag.current?.pointerId !== event.pointerId) return;

		event.stopPropagation();
		event.target.releasePointerCapture(event.pointerId);
		knobDrag.current = null;
	};

	const onPointerCancel = () => {
		knobDrag.current = null;
	};

    return {
        onPointerDown,
        onPointerMove,
        onPointerUp,
        onPointerCancel,
    };
}

export default useKnob;