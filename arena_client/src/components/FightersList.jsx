import { useEffect, useState } from "react"
import { getAllFighters } from "../api/fighters.api";
import { FighterCard } from "./FighterCard";


export function FightersList({ fighters, grid}) {
    return <div className="grid grid-cols-1 gap-2">
        {fighters.map(fighter => (
            <FighterCard key={fighter.id} fighter={fighter} grid={grid} />
        ))}</div>;
}