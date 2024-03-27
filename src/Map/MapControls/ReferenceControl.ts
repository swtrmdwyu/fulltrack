import H from '@here/maps-api-for-javascript';

interface ReferenceControlProps {
    onStateChange?: () => void
}

export default function ReferenceControl({ onStateChange }: ReferenceControlProps) {
    const referenceButton = new H.ui.base.Button({
        onStateChange: (event: any) => {
            if(event.target.getState() === "down") {
                if(onStateChange) onStateChange();
            }
        },
        data: {
            
        }
    });

    referenceButton.addClass("reference-control-here");
    referenceButton.addClass("button-control-here");

    const referenceControl = new H.ui.Control();
    referenceControl.addChild(referenceButton);

    return referenceControl;
}