import { useEffect, useState } from "react"
import { getFighter } from "../api/fighters.api";
import { FighterCard } from "./FighterCard";
import { useNavigate, useParams } from 'react-router-dom'
import axios from "axios";


export function BattleComp() {

    const [fighter1, setFighter1] = useState([]);
    const [fighter2, setFighter2] = useState([]);

    const params = useParams();

    useEffect(() => {
        console.log("loaded page")
        async function loadFighters() {
            const res_f1 = await getFighter(params.id1);
            const res_f2 = await getFighter(params.id2);
            setFighter1(res_f1.data);
            setFighter2(res_f2.data);
            console.log(res_f1);
            console.log(res_f2)
        }
        loadFighters();
    }, []);

    

    

    const url = `http://localhost:8000/battle/${fighter1.id}/${fighter2.id}/`;

    const callBackendMethod = async () => {
        try {
            const response = await axios.post(url);
            console.log(response.data); // Handle the response
        } catch (error) {
            console.error('Error calling backend method:', error);
        }
    };

    return <div className="grid grid-cols-3 gap-3">
        
        <FighterCard key={fighter1.id} fighter={fighter1} />
        <FighterCard key={fighter2.id} fighter={fighter2} />
        <button
            className=' bg-indigo-500 p-3 rounded-lg block w-full mt-3'
            onClick={callBackendMethod}
        >
            FIGHT
        </button>
    </div>;
}