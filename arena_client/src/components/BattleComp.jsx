import { useEffect, useState, Fragment } from "react"
import { getAllFighters, getFighter } from "../api/fighters.api";
import { FighterCard } from "./FighterCard";
import { FighterDetailedCard } from "./FighterDetailedCard";
import { useNavigate, useParams } from 'react-router-dom'
import axios from "axios";

import { FightersGrid } from "../components/FightersGrid"
import { FightersList } from "../components/FightersList"


export function BattleComp() {

    const [fighter1, setFighter1] = useState([]);
    const [fighter2, setFighter2] = useState([]);
    const [fighters, setFighters] = useState([]);

    const [fightData, setFightData] = useState([]);

    const [battleData, setBattleData] = useState(null);
    const [healData, setHealData] = useState(null);

    const params = useParams();

    useEffect(() => {
        console.log("loaded page")
        async function loadFighters() {
            const res = await getAllFighters();
            setFighters(res.data);
            const res_f1 = await getFighter(params.id1);
            const res_f2 = await getFighter(params.id2);
            setFighter1(res_f1.data);
            setFighter2(res_f2.data);
            console.log(res_f1);
            console.log(res_f2)
        }
        loadFighters();
    }, []);

    const url_battle = `http://localhost:8000/battle/${fighter1.id}/${fighter2.id}/`;

    const url_heal = `http://localhost:8000/heal/${fighter1.id}/${fighter2.id}/`;

    const callBatlleMethod = async () => {
        try {
            const response = await axios.post(url_battle);
            console.log(response.data); // Handle the response
            const updatedFighter1 = await getFighter(params.id1);
            const updatedFighter2 = await getFighter(params.id2);
            const updatedFighters = await getAllFighters();
            setFighters(updatedFighters.data);
            setFighter1(updatedFighter1.data);
            setFighter2(updatedFighter2.data);
            setBattleData(response.data); // Save the battle data
            setFightData(1)
            setHealData(null); // Reset heal data
        } catch (error) {
            console.error('Error calling battle backend method:', error);
        }
    };

    const callHealMethod = async () => {
        try {
            const response = await axios.post(url_heal);
            console.log(response.data); // Handle the response
            const updatedFighter1 = await getFighter(params.id1);
            const updatedFighter2 = await getFighter(params.id2);
            const updatedFighters = await getAllFighters();
            setFighters(updatedFighters.data);
            setFighter1(updatedFighter1.data);
            setFighter2(updatedFighter2.data);
            setHealData(response.data); // Save the heal data
            setFightData(2)
            setBattleData(null); // Reset battle data
        } catch (error) {
            console.error('Error calling heal backend method:', error);
        }
    };


    return (
        <div className={"grid grid-cols-6 gap-5"} >
            <div >
                <FightersList fighters={fighters} grid={"list_view_left"} />
            </div>
            <div className="col-span-4 grid grid-cols-5 gap-3" >
                <div className={"grid grid-cols-2 col-span-2 grid-rows-8 gap-3 h-full max-h-screen"}>
                    <button
                        className=' bg-indigo-500 p-3 rounded-lg block w-full mt-3 row-span-1'
                        onClick={callBatlleMethod}
                    >
                        START FIGHT
                    </button>
                    <button
                        className=' bg-indigo-500 p-3 rounded-lg block w-full mt-3 row-span-1'
                        onClick={callHealMethod}
                    >
                        HEAL BOTH
                    </button>
                    <div className="row-span-3">
                        <FighterDetailedCard key={fighter1.id} fighter={fighter1} />
                    </div>
                    <div className="row-span-3">
                        <FighterDetailedCard key={fighter2.id} fighter={fighter2} />
                    </div>
                </div>
                <div className=" col-span-3 max-h-80 overflow-y-auto">
                    {/* Display battle and heal data here */}
                    {fightData === 1 && battleData && (
                        <div>
                            <pre>
                                {battleData.message.map((line, index) => (
                                    <Fragment key={index}>
                                        {line}
                                        <br />
                                    </Fragment>
                                ))}
                            </pre>
                        </div>
                    )}
                    {fightData === 2 && healData && (
                        <div>
                            <pre>
                                {healData.message.map((line, index) => (
                                    <Fragment key={index}>
                                        {line}
                                        <br />
                                    </Fragment>
                                ))}
                            </pre>
                        </div>
                    )}
                </div>
            </div>
            <div>
                <FightersList fighters={fighters} grid={"list_view_right"} />
            </div>

        </div>
    );
}