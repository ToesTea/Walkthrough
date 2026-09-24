import { useRef, useState } from "react";
import StaticModel from "./Model.jsx";

function ModelLoader() {
  const AudioTableRef = useRef();
  const [modelNodes, setModelNodes] = useState(null);
    return (
        <StaticModel
        ref={AudioTableRef}
        position={[-4.5, 0, -3.5]}
        rotation={[0, Math.PI /2, 0]}
        path="/assets/models/static/AudioTable.glb"
        getNodes={setModelNodes}
      />
    )
}

export default ModelLoader;