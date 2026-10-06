function mergeHandlers(...handlerSets) {
    const merged = {};

    for (const handlers of handlerSets) {
        // Object.entries turns an object into a list of [name, value] pairs
        // the name is for example "onPointerDown" and the value the function
        for (const [name, handler] of Object.entries(handlers)) {
            const previous = merged[name];
            merged[name] = previous
                ? (event) => { previous(event); handler(event); }
                : handler;
        }
    }

    return merged;
}

export default mergeHandlers;