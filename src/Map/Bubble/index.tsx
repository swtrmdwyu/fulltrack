import { useContext, useRef } from "react";
import { MapContext } from "../../Contexts/MapContext";
import { FormatedVehicle } from "../../interfaces/FormatedVehicle";
import { stringBubbleContent } from "../../Components/BubbleContent";
import VehicleBubble from "../MapVehicleBubble/VehicleBubble";

export default function Bubble() {
    const { ui } = useContext(MapContext);
    const bubblesRef = useRef<H.ui.InfoBubble | null>(null);

    if(!ui) {
        return null
    }
    
    function addMarkerBubble(vehicle: FormatedVehicle) {
		const content  = stringBubbleContent(vehicle);
		const bubble = VehicleBubble(vehicle, content);
		bubble.addEventListener("statechange", () => {
			if(bubble.getState() === "closed") {
                if(ui) {
                    ui.removeBubble(bubble)
				    bubblesRef.current = null;
                }
				
			}
		})

		if(!bubblesRef.current) {
            if(ui) {
                ui.addBubble(bubble);
			    bubblesRef.current = bubble;
            }
		}

	}

    return null;
}