import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Error() {

    const navigate = useNavigate();

    return (
        <>
            <main>
                <h4>OOPSS!!! Something went wrong</h4>
            </main>
        </>
    )
}

export default Error;