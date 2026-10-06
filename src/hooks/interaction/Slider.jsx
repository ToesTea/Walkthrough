import { useRef } from "react";

function useSlider(scene) {
	const sliderDrag = useRef(null);
	const MIN_X = 0.053;   // slider's own limits, not pointer limits
	const MAX_X = 0.16;	

	const findSlider = (object) => {
		let slider = object;

		while (slider && slider !== scene && !slider.name.includes("Slider")) {
			slider = slider.parent;
		}

		return slider === scene ? null : slider;
	};

	const onPointerDown = (event) => {
		const slider = findSlider(event.object);
		if (!slider) return;

		event.stopPropagation();
		// Converts the global position of the cursor to the local Coordinate system of the parent mesh.
		const pointer = slider.parent.worldToLocal(event.point.clone());

		sliderDrag.current = {
			pointerId: event.pointerId,
			slider,
			startPointer: pointer.x,
			startPosition: slider.position.x,
		};

		// used to even capture the cursors position when not directly on the mesh
		event.target.setPointerCapture(event.pointerId);
	};

	const onPointerMove = (event) => {
		const drag = sliderDrag.current;
		if (!drag || drag.pointerId !== event.pointerId) return;

		event.stopPropagation();
		const pointer = drag.slider.parent.worldToLocal(event.point.clone());
		//This is done, because if you would just copy the pointer.x position and not click on the very origin of
		// the mesh the slider would jump to the position of the cursor. To prevent this only the difference between
		// where the cursor started and ended gets added to the position of the mesh.
		const x = drag.startPosition +
			pointer.x - drag.startPointer;
		
		//
		drag.slider.position.x = Math.min(MAX_X, Math.max(MIN_X, x))
	};

	const onPointerUp = (event) => {
		if (sliderDrag.current?.pointerId !== event.pointerId) return;

		event.stopPropagation();
		event.target.releasePointerCapture(event.pointerId);
		sliderDrag.current = null;
	};

	const onPointerCancel = () => {
		sliderDrag.current = null;
	};

	return {
		onPointerDown,
		onPointerMove,
		onPointerUp,
		onPointerCancel,
	};
}

export default useSlider;