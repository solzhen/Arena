import { useForm } from 'react-hook-form'
import {
    createFighter, deleteFighter, updateFighter, getFighter
} from '../api/fighters.api'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-hot-toast';
import { useEffect } from 'react';


export function FighterFormPage() {

    const {
        register, handleSubmit, formState: { errors }, setValue
    } = useForm();

    const navigate = useNavigate();
    const params = useParams();

    const onSubmit = handleSubmit(async data => {
        //console.log(data);
        if (params.id) {
            await updateFighter(params.id, data)
            toast.success("Fighter updated", {
                style: {
                    background: "#101010",
                    color: "#fff"
                }
            });
        } else {
            await createFighter(data);
            toast.success("Fighter created");
        }
        navigate("/fighters");
    });

    useEffect(() => {
        async function loadFighter() {
            if (params.id) {
                const res = await getFighter(params.id);
                setValue('name', res.data.name);
                setValue('clan', res.data.clan);
                setValue('birth', res.data.birth);
                setValue('statSTR', res.data.statSTR);
                setValue('statDEX', res.data.statDEX);
                setValue('statAGI', res.data.statAGI);
                setValue('statRES', res.data.statRES);
            }
        }
        loadFighter();
    }, []);


    return (
        <div className=' max-w-xl mx-auto'>
            <form onSubmit={onSubmit}>
                <div className=" mb-3 relative">
                    <input
                        type="text"
                        placeholder="Name"
                        {...register("name", { required: true })}
                        className=' bg-zinc-700 p-3 rounded-lg block w-full mb-3'
                    />
                    {errors.name && <span>name is required</span>}
                    <label className=" text-slate-400 text-xs absolute bottom-1 right-2 font-extralight">Name</label>
                </div>

                <div className=" mb-3 relative">
                    <input
                        type="text"
                        placeholder="Clan"
                        {...register("clan", { required: true })}
                        className=' bg-zinc-700 p-3 rounded-lg block w-full mb-3'
                    />
                    {errors.clan && <span>clan name is required</span>}
                    <label className=" text-slate-400 text-xs absolute bottom-1 right-2 font-extralight">Clan</label>
                </div>

                <div className=" mb-3 relative">
                    <input
                        type="text"
                        placeholder="Birth year"
                        {...register("birth", { required: true })}
                        className=' bg-zinc-700 p-3 rounded-lg block w-full mb-3'
                    />
                    {errors.clan && <span>birth year is required</span>}
                    <label className=" text-slate-400 text-xs absolute bottom-1 right-2 font-extralight">Birth Year</label>

                </div>

                <div className=" mb-3 relative">
                    <input
                        type="text"
                        placeholder="Strength"
                        value="5"
                        {...register("statSTR", { required: true })}
                        className=' bg-zinc-700 p-3 rounded-lg block w-full mb-3'
                    />
                    {errors.clan && <span>Strength stat is required</span>}
                    <label className=" text-slate-400 text-xs absolute bottom-1 right-2 font-extralight">Strength</label>

                </div>

                <div className=" mb-3 relative">
                    <input
                        type="text"
                        placeholder="Dexterity"
                        value="5"
                        {...register("statDEX", { required: true })}
                        className='bg-zinc-700 p-3 rounded-lg block w-full mb-3'
                    />
                    {errors.statDEX && <span>Dexterity stat is required</span>}
                    <label className=" text-slate-400 text-xs absolute bottom-1 right-2 font-extralight">Dexterity</label>

                </div>

                <div className=" mb-3 relative">
                    <input
                        type="text"
                        placeholder="Agility"
                        value="5"
                        {...register("statAGI", { required: true })}
                        className='bg-zinc-700 p-3 rounded-lg block w-full mb-3'
                    />
                    {errors.statAGI && <span>Agility stat is required</span>}
                    <label className=" text-slate-400 text-xs absolute bottom-1 right-2 font-extralight">Agility</label>

                </div>


                <div className=" mb-3 relative">
                    <input
                        type="text"
                        placeholder="Resilience"
                        value="5"
                        {...register("statRES", { required: true })}
                        className='bg-zinc-700 p-3 rounded-lg block w-full mb-3'
                    />
                    {errors.statRES && <span>Resilience stat is required</span>}
                    <label className=" text-slate-400 text-xs absolute bottom-1 right-2 font-extralight">Resilience</label>

                </div>

                <button
                    className=' bg-indigo-500 p-3 rounded-lg block w-full mt-3'
                >Save</button>
            </form>
            {
                params.id &&
                <div
                    className=' flex justify-end'
                >
                    <button
                        className=' bg-red-500 p-3 rounded-lg w-48 mt-3'

                        onClick={async () => {
                            const accepted = window.confirm('are you sure?');
                            if (accepted) {
                                await deleteFighter(params.id)
                                toast.success("Deleted Fighter", {
                                    position: "bottom-right",
                                    style: {
                                        background: "#101010",
                                        color: "#fff"
                                    }
                                })
                                navigate("/fighters");
                            }
                        }}>
                        Delete
                    </button>

                </div>

            }
        </div>


    )
}