let dollyActive = false;

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