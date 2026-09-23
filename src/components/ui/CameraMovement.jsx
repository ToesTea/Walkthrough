import { useFrame } from "@react-three/fiber";
import useMousePosition from "../../hooks/MousePosition";


export function CameraMovement() {
    const {x, y} = useMousePosition();
    const SPEED = 1.5;

    const area = {
        x: window.innerWidth/4,
        y: window.innerHeight/4,
    }

    useFrame(({ camera }, delta) => {
        if (x === null || y === null) return;

        let moveX = 0;
        //let moveY = 0;

        if (x < area.x) {
            moveX = -(area.x - x) / area.x;
        } else if (x > window.innerWidth - area.x) {
            moveX = (x - (window.innerWidth - area.x)) / area.x;
        }

        /*if (y < area.y) {
            moveY = -(area.y - y) / area.y;
        } else if (y > window.innerHeight - area.y) {
            moveY = (y - (window.innerHeight - area.y)) / area.y;
        }*/
        const amount = 1 - Math.exp(-SPEED * delta);
        camera.rotation.y -= moveX * amount;
    });

    return null;
}