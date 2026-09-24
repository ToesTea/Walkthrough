import * as Config from "../../config.js"
import { useRef, useState } from "react";
import StaticModel from "./Model.jsx";

function ModelLoader() {
  const AudioTableRef = useRef();
  const [modelNodes, setModelNodes] = useState(null);
  console.log(modelNodes);
    return (
        <StaticModel
        ref={AudioTableRef}
        position={[-4.5, 0, -3.5]}
        rotation={[0, Math.PI /2, 0]}
        path={`${Config.STATIC_MODEL_PATH}/AudioTable.glb`}
        getNodes={setModelNodes}
      />
    )
}

export default ModelLoader;