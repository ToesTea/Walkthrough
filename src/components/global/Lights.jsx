function Lights() {
  return (
    <>
        <directionalLight
            position={[10, 10, 5]}
            intensity={3}
            castShadow
        />
        <ambientLight intensity={0.5} />
    </>
  );
}

export default Lights;