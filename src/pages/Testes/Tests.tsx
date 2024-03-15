
import { useEffect } from "react";
import api from "../../config/api/api";

export default function Tests() {
    useEffect(() => {
        function getAdrees() {
            api.get("maps/v2/last-positions/?ignitions=on,off,moving", {
                headers:  {
                    Authorization: "Bearer 263252e430c92db7a09b75a1ff02a28e347ceb71"
                }
            }).then(res => console.log(res)).catch(err => console.log(err))
        }

        getAdrees();
    }, [])
    return(
        <></>
    );
}