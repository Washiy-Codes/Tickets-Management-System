"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

const MoreButton = ({ ticketId }: { ticketId: string }) => {
    const [loading, setLoading] = useState(false);

    const handleClick = async () => {
        setLoading(true);
        try {
            // const newComments = await fetchMoreCommentsAction(ticketId, 0, 2);
            // return newComments;
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Button variant="outline" size="lg" onClick={handleClick} disabled={loading}>
            {loading ? "Loading..." : "More"}
        </Button>
    );
};

export { MoreButton };


























// "use client";

// import { Button } from "@/components/ui/button";

// const MoreButton = ({ handleClick } : { handleClick: () => void }) => {

//     return (
//         <Button variant="outline" size="lg" onClick={handleClick}>
//             More
//         </Button>
//     );
// };

// export { MoreButton };