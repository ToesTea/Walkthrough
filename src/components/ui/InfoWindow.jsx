import data from "../../Data.json";

function InfoWindow({ animationState }) {
    const activeData = data.find((entry) => (
        entry.activatorNode === animationState?.node?.name
        && animationState.isActive
    ));

    return (
        activeData && (<div
            className={`
                absolute left-2 top-2 z-10
                h-[calc(100%-1rem)] w-1/2
                rounded-2xl bg-black/30 p-6
                text-white backdrop-blur-lg
            `}
        >
            <h2 className="text-2xl font-bold">{activeData.title}</h2>
            <iframe
                    style={{
                        width: "100%",
                        aspectRatio: "16 / 9",
                        border: 0,
                        marginTop: "1rem"
                    }}
                    src={activeData.src}
                    title={activeData.title}
                    allow="autoplay; fullscreen"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                />
        </div>)
    );
}

export default InfoWindow;