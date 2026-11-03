import { useRef } from "react";
import { MathUtils, Quaternion, Vector3 } from "three";

function useLever(scene) {
	const leverDrag = useRef(null);
	const MIN_ANGLE = -Math.PI / 3;
	const MAX_ANGLE = Math.PI / 3;

	const onPointerDown = (event) => {
		let lever = event.object;
		while (lever && lever !== scene && lever.name !== "Lever") {
			lever = lever.parent;
		}

		const pivot = scene.getObjectByName("PivotLever");
		if (!lever || lever === scene || !pivot) return;

		event.stopPropagation();

		leverDrag.current = {
			pointerId: event.pointerId,
			lever,
			startPointerY: event.clientY,
			startLeverPosition: lever.getWorldPosition(new Vector3()),
			startLeverQuaternion: lever.getWorldQuaternion(new Quaternion()),
			pivotPosition: pivot.getWorldPosition(new Vector3()),
			rotationAxis: new Vector3(0, 0, 1)
				.applyQuaternion(pivot.getWorldQuaternion(new Quaternion()))
				.normalize(),
		};
		
		// DOM feature, browser keeps receiving pointer events even after pointer leaves object
		event.target.setPointerCapture(event.pointerId);
	};

	const onPointerMove = (event) => {
		const drag = leverDrag.current;
		if (!drag || drag.pointerId !== event.pointerId) return;

		event.stopPropagation();
		const rotation = MathUtils.clamp(
			(drag.startPointerY - event.clientY) * 0.01,
			MIN_ANGLE,
			MAX_ANGLE
		);
		const rotationQuaternion = new Quaternion()
			.setFromAxisAngle(drag.rotationAxis, rotation);


		// Adjusts position of the lever to orbit around the pivot
		const position = drag.startLeverPosition
			.clone()
			.sub(drag.pivotPosition) //shifts the origin to the position of the pivot
			.applyQuaternion(rotationQuaternion) // rotates around the pivot
			.add(drag.pivotPosition); // shifts origin back so the its the world position again
		drag.lever.parent.worldToLocal(position);
		drag.lever.position.copy(position);

		drag.lever.quaternion.copy(
			drag.lever.parent
				.getWorldQuaternion(new Quaternion())
				.invert()
				.multiply(rotationQuaternion.clone().multiply(drag.startLeverQuaternion))
		);
	};

	const onPointerUp = (event) => {
		if (leverDrag.current?.pointerId !== event.pointerId) return;

		event.stopPropagation();
		event.target.releasePointerCapture(event.pointerId);
		leverDrag.current = null;
	};

	const onPointerCancel = () => {
		leverDrag.current = null;
	};

	return {
		onPointerDown,
		onPointerMove,
		onPointerUp,
		onPointerCancel,
	};
}

export default useLever;