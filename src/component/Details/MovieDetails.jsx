
import ReactStars from "react-stars";
import { useState, useEffect } from "react";
import { doc } from "firebase/firestore";
import { getDoc } from "firebase/firestore";
import { database } from "../../firebase/Firebase";
import { Bars } from "react-loader-spinner";
import { useParams, Link, NavLink, useNavigate} from "react-router-dom";
import Reviews from "../Reviews/Reviews";

const MovieDetails = () => {

    const [data, setData] = useState({
        image: "https://images.hdqwalls.com/download/avengers-endgame-2019-official-new-poster-3p-1280x2120.jpg",
        name: "Avengers end game",
        year: "2019",
        description: "Amazing movie",
        rating: 0,
        rated: 0,
        link: "https://bollyflix.beer/deadpool-wolverine-2024-dual-audio-hindi-line-english-movie/",

    })

    const { id } = useParams();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    useEffect(() => {

        async function getData() {

            try {

                setLoading(true);

                const _doc = doc(database, "movies", id);
                const _data = await getDoc(_doc);
                setData(_data.data())

                setLoading(false);

            } catch (error) {
                console.log(error + " There is an error in the code.")
            }
        }

        getData();
    }, []);



    return (
        <>
            <div
                className="w-full h-screen"
            >
                {
                    loading ?

                        <div
                            className="flex justify-center items-start mt-24"
                        >
                            <Bars height={50} color="white" />
                        </div>

                        :

                        <div className="md:w-[80%] w-full h-full block md:flex md:justify-center md:gap-4 p-8 mt-4 ">
                            <div>
                                <img className="h-80 w-80 rounded-lg block md:sticky md:top-20" src={data.image} alt="Movie Image" />
                                <button className="p-2 rounded-xl bg-green-500 w-full mt-4"><a href={data.link} target="_blank">Download Movie</a></button>
                            </div>
                            <div
                                className="ml-4 w-full"
                            >
                                <h1 className="text-4xl text-slate-300 font-bold">{data.name} <span className="text-2xl text-slate-400">({data.year})</span></h1>
                                <h1>
                                    <ReactStars
                                        count={5}
                                        value={data.rating / data.rated}
                                        edit={false}
                                        size={22}
                                    />
                                </h1>
                                <p>
                                    {data.description}
                                </p>

                                <Reviews id={id} prevRating={data.rating} userRated={data.rated} />
                            </div>
                        </div>
                }
            </div>
        </>
    )
}

export default MovieDetails;