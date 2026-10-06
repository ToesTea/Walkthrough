import { useRef } from "react";

function useSlider(scene) {
	const sliderDrag = useRef(null);

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
		const pointer = slider.parent.worldToLocal(event.point.clone());

		sliderDrag.current = {
			pointerId: event.pointerId,
			slider,
			startPointer: pointer.x,
			startPosition: slider.position.x,
		};

		event.target.setPointerCapture(event.pointerId);
	};

	const onPointerMove = (event) => {
		const drag = sliderDrag.current;
		if (!drag || drag.pointerId !== event.pointerId) return;

		event.stopPropagation();
		const pointer = drag.slider.parent.worldToLocal(event.point.clone());
		drag.slider.position.x = drag.startPosition +
			pointer.x - drag.startPointer;
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