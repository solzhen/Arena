import { useNavigate, useParams } from 'react-router-dom'

export function FighterCard({ fighter, grid }) {

    const navigate = useNavigate();

    const params = useParams();

    const getGradientClass = () => {
        // Calculate the class based on percentHP
        if (fighter.percentHP < 30) {
            return 1
        } else if (fighter.percentHP < 70) {
            return 2
        } else {
            return 3
        }
    };

    return (
        <div
            className={
                `bg-zinc-800 p-3 hover:bg-zinc-700 hover:cursor-pointer
                ${fighter.status === 'WR' ?
                    grid === "list_view_left" ?
                        'bg-gradient-to-r from-indigo-500 to-black' :
                        'bg-gradient-to-l from-indigo-500 to-black' :
                    'bg-gradient-to-r from-red-600 to-black'}                `
            }

            onClick={() => {
                if (grid === "grid_view") {
                    navigate(`/fighters/${fighter.id}`)
                }
                if (grid === "list_view_left") {
                    navigate(`/battle/${fighter.id}/${params.id2}`)
                    navigate(0);
                }
                if (grid === "list_view_right") {
                    navigate(`/battle/${params.id1}/${fighter.id}`)
                    navigate(0);
                }
            }
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

        </div>
    )

}