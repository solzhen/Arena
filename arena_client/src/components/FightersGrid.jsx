import { useEffect, useState } from "react"
import { getAllFighters } from "../api/fighters.api";
import { FighterCard } from "./FighterCard";


export function FightersGrid() {

    const [fighters, setFighters] = useState([]);

    useEffect(() => {
        console.log("loaded page")
        async function loadFighters() {
            const res = await getAllFighters();
            setFighters(res.data);
            console.log(res);
        }
        loadFighters();
    }, []);

    return <div className="grid grid-cols-3 gap-3">
        {fighters.map(fighter => (
            <FighterCard key={fighter.id} fighter={fighter}  grid={"grid_view"} />
        ))}</div>;
}