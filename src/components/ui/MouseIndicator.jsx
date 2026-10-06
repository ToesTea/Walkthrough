function MouseIndicator() {
    return (
        <div className={`group absolute inset-x-0 bottom-0 z-10 h-[10vh]`}>
            <div className={`
                pointer-events-none flex h-full
                items-center justify-center
                bg-linear-to-t from-black/70 to-transparent
                text-white opacity-0 transition-opacity duration-200 
                group-hover:opacity-100 text-2xl select-none
            `}>
                <p className="pointer-events-none select-none font-bold">Return</p>
            </div>
        </div>
    );
}

export default MouseIndicator;