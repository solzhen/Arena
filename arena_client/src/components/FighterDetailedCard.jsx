import { useNavigate } from "react-router-dom"

export function FighterDetailedCard({ fighter }) {

    const getStatus = (statusCode) => {
        switch (statusCode) {
            case 'WR':
                return 'Working';
            case 'RT':
                return 'Retired';
            case 'DE':
                return 'Dead';
            case 'IN':
                return 'Injured';
            default:
                return 'Unknown'; // Handle any other cases or null status
        }
    };

    return (
        <div
            //className="bg-zinc-800 p-3 hover:bg-zinc-700 hover:cursor-pointer ${getGradientClass === 1 ? 'bg-gradient-to-r from-indigo-500 to-black' : 'bg-gradient-to-r from-indigo-500 to-black'}"
            // className={
            //     `bg-zinc-800 p-3 hover:bg-zinc-700 hover:cursor-pointer
            //     border-white ${getGradientClass() === 3 ? 'bg-gradient-to-r from-indigo-500 to-black' : 'bg-gradient-to-r from-red-600 to-black'}`
            // }
            className={
                `bg-zinc-800 p-3 hover:bg-zinc-700 hover:cursor-pointer border-slate-500 rounded-s-lg
                ${fighter.status === 'WR' ? 'bg-gradient-to-r from-indigo-500 to-black' : 'bg-gradient-to-r from-red-600 to-black'}                `
            }
        >
            <div className="flex justify-between ">
                <p className="text-lg font-bold uppercase">{fighter.name}</p>
                <div className="flex align-middle"> {/* Wrap in a div for styling */}
                    <p className="text-slate-400 font-extralight">of clan</p>
                    <p className="text-slate-400 font-bold ml-1 uppercase ">{fighter.clan}</p> {/* Apply smaller text size */}
                </div>
            </div>
            <div className="flex justify-between ">
                <p className=" text-xs font-light mt-4 text-slate-300">Born on {fighter.birth}</p>
                <p className=" text-xs font-light mt-4 text-slate-100">HP {fighter.percentHP}%</p>
            </div>
            <div>
                <p className=" text-xs font-light mt-4 text-slate-300">Strenght: {fighter.statSTR}</p>
                <p className=" text-xs font-light mt-4 text-slate-300">Dexterity: {fighter.statDEX}</p>
                <p className=" text-xs font-light mt-4 text-slate-300">Agility: {fighter.statAGI}</p>
                <p className=" text-xs font-light mt-4 text-slate-300">Resilience: {fighter.statRES}</p>
                <p className=" text-xs font-light mt-4 text-slate-300">Status: {getStatus(fighter.status)}</p>
            </div>

        </div>
    )

}