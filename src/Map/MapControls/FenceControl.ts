import H from '@here/maps-api-for-javascript';

interface FenceControlProps {
    onStateChange?: () => void
}

export default function FenceControl({ onStateChange }: FenceControlProps) {
    const fenceButton = new H.ui.base.Button({
        onStateChange: (event: any) => {
            if(event.target.getState() === "down") {
                if(onStateChange) onStateChange();
            }
        },
        data: {
        }
    });

    fenceButton.addClass("fence-control-here");
    fenceButton.addClass("button-control-here");

    const fenceControl = new H.ui.Control();
    fenceControl.addChild(fenceButton);

    return fenceControl;
}