import { useMemo } from 'react'
import * as THREE from 'three'

function useBoundingBox(object) {

    return useMemo(() => {
        if (!object) return null;

        object.updateWorldMatrix(true, true);
        return new THREE.Box3().setFromObject(object);
    }, [object]);
}

export default useBoundingBox;