import { useNavigate } from "react-router-dom"

export function FighterCard({ fighter }) {

    const navigate = useNavigate();

    return (
        <div
            className="bg-zinc-800 p-3 hover:bg-zinc-700 hover:cursor-pointer "
            onClick={() => {
                navigate(`/fighters/${fighter.id}`)
            }}
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

        </div>
    )

}