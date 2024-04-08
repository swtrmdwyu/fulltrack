import H from '@here/maps-api-for-javascript';

const referenceMarker = (color: string): H.map.Icon => {
    const svg = `<svg width="2.3rem" height="2.3rem" viewBox="0 0 24 27" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clip-path="url(#clip0_7733_36917)">
                <path d="M20.4853 3.51472C25.1716 8.20101 25.1716 15.799 20.4853 20.4853C15.799 25.1716 8.20101 25.1716 3.51472 20.4853C-1.17157 15.799 -1.17157 8.20101 3.51472 3.51472C8.20101 -1.17157 15.799 -1.17157 20.4853 3.51472Z" fill="${color}"/>
                <path d="M4 19L12 11L20 19L12 27L4 19Z" fill="${color}"/>
                <path d="M7.99815 12.769C6.77297 13.3186 5.99731 14.1136 5.99731 15.0013C5.99731 16.6587 8.68443 18.0026 11.9998 18.0026C15.3152 18.0026 18.0023 16.6587 18.0023 15.0013C18.0023 14.1136 17.2267 13.3186 16.0015 12.769" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M13.4671 6.6062C14.0617 7.20074 14.2395 8.09491 13.9178 8.87174C13.596 9.64857 12.838 10.1551 11.9971 10.1551C11.1563 10.1551 10.3983 9.64857 10.0765 8.87174C9.75475 8.09491 9.93262 7.20074 10.5272 6.6062C10.917 6.21619 11.4458 5.99707 11.9971 5.99707C12.5485 5.99707 13.0773 6.21619 13.4671 6.6062" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M12 10.1538V14.0007" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </g>
            <defs>
                <clipPath id="clip0_7733_36917">
                    <rect width="24" height="27" fill="white"/>
                </clipPath>
            </defs>
        </svg>`;

    const icon = new H.map.Icon( svg , {

    })

    return icon;
}

export default referenceMarker;
