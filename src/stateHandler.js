let dollyActive = false;
let onModel = false;

export function startDolly() {
    if (dollyActive) return false;

    dollyActive = true;
    return true;
}

export function completeDolly() {
    dollyActive = false;
}

export function isDollyActive() {
    return dollyActive;
}


export function enterModel() {
    onModel = true;
}

export function exitModel() {
    onModel = false;
}
 
export function isOnModel() {
    return onModel;
}