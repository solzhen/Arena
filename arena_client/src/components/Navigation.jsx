import { Link } from "react-router-dom"

export function Navigation() {
    return (
        <div className="flex justify-between py-3">
            <Link to="/fighters">
                <h1 className="font-bold text-3xl mb-4">Fighter List</h1>
            </Link>
            <Link to="/battle">
                <button className="bg-indigo-500 px-3 py-2 rounded-lg">
                    start fight
                </button>
            </Link>
            <Link to="/fighters-create">
                <button className="bg-indigo-500 px-3 py-2 rounded-lg">
                    create fighter
                </button>
            </Link>
        </div>
    )
}