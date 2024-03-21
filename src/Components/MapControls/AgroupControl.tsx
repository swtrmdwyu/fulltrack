import H from '@here/maps-api-for-javascript';

interface AgroupControlProps {
    onStateChange?: () => void
}

export default function AgroupControl({ onStateChange }: AgroupControlProps) {
    const agroupButton = new H.ui.base.Button({
        onStateChange: (event: any) => {
            if(event.target.getState() === "down") {
                console.log("down");
                if(onStateChange) onStateChange();
            }
        },
        data: {
        }
    });

    agroupButton.addClass("agroup-control-here");
    agroupButton.addClass("button-control-here");

    const agroupControl = new H.ui.Control();
    agroupControl.addChild(agroupButton);

    return agroupControl;
}