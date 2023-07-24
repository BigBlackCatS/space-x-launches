import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from 'axios';
import '../App.css';

export default function PastLaunchDetails() {
    const [launch, setLaunch] = useState<any>();
    const [loading, setLoading] = useState(false);
    let { id } = useParams();

    useEffect(() => {
        fetchLaunch(); // fetch page 1 of users
    }, []);

    const fetchLaunch = async () => {
        setLoading(true);

        const url = `http://localhost:5204/api/v1/Launches/${id}`;
        const response = await axios.get(url);
        setLaunch(response?.data?.launch);
        setLoading(false);
    };

    return (
        <div>
            <div className="flex-container">
                <header>
                    <h1>{launch?.name.toUpperCase()}</h1>
                </header>
                <div>
                    <div className="video-responsive">
                        <iframe
                            width="1200"
                            height="700"
                            src={`https://www.youtube.com/embed/${launch?.links?.youTubeId}`}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            title="Embedded youtube"
                            style={{ display: "flex", justifyContent: "center", alignItems: "center" }}
                        />

                    </div>
                    {
                        launch?.details
                            && <div className="description">
                                <p>
                                    {launch?.details}
                                </p>
                            </div>
                    }
                </div>
                <div className="footer">
                    <a href={`${launch?.links?.webcast}`}>YouTube</a>
                    <a href={`${launch?.links?.wikipedia}`}>Wikipedia</a>
                    <a href={`${launch?.links?.reddit?.media ?? "#"}`}>Reddit</a>
                </div>
            </div>
        </div>
    );
}