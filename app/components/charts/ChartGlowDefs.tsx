const ChartGlowDefs = () => {
    return (

        <defs>
            <filter
                id="shawryGlow"
                x="-50%"
                y="-50%"
                width="200%"
                height="200%"
            >
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feFlood floodColor="var(--color-shawry)" floodOpacity="0.9" />
                <feComposite in2="blur" operator="in" />
                <feMerge>
                <feMergeNode />
                <feMergeNode in="SourceGraphic" />
                </feMerge>

            </filter>

            <filter
                id="jpGlow"
                x="-50%"
                y="-50%"
                width="200%"
                height="200%"
            >
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feFlood floodColor="var(--color-jp)" floodOpacity="0.9" />
                <feComposite in2="blur" operator="in" />
                <feMerge>
                <feMergeNode />
                <feMergeNode in="SourceGraphic" />
                </feMerge>
            </filter>

            <filter
                id="shazGlow"
                x="-50%"
                y="-50%"
                width="200%"
                height="200%"
            >
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feFlood floodColor="var(--color-shaz)" floodOpacity="0.9" />
                <feComposite in2="blur" operator="in" />
                <feMerge>
                <feMergeNode />
                <feMergeNode in="SourceGraphic" />
                </feMerge>
            </filter>
            
        </defs>
    )
}

export default ChartGlowDefs