import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const PersonDetails = () => {
    const { id } = useParams();
    const [details, setDetails] = useState(null);

    useEffect(() => {
        const getDetails = async () => {
            try {
                console.log("Fetching details for UID:", id);
                const response = await fetch(`https://www.swapi.tech/api/people/${id}`);
                if (!response.ok) throw new Error("Error fetching details");

                const data = await response.json();
                console.log("API Response:", data);

                if (data.result && data.result.properties) {
                    setDetails(data.result.properties);
                } else {
                    console.error("Unexpected API response structure:", data);
                }
            } catch (error) {
                console.log(error);
            }
        };

        if (id) getDetails();
    }, [id]);

    if (!details) return <p>Loading details...</p>;

    return (
        <div>
            <div className="container mt-3">
                <div className="row d-flex">
                    <div className="row d-flex justify-content-center align-items-center">
                        <div className="col-sm-6 img-container">
                            <img
                                alt="Person image."
                                src="https://picsum.photos/800/600"
                            />
                        </div>
                        <div className="col-sm-6 justify-content-center align-items-center">
                            <h3>{details.name}</h3>
                            <p>
                              Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium,{" "}
                              <strong>totam rem aperiam</strong>. Duis ac dui vel libero convallis efficitur. 
                               Integer condimentum magna in eros euismod, ut auctor libero volutpat. 
                               Quisque elementum mi vel sapien pharetra, a feugiat ipsum dignissim.{" "}
                               <em>
                               Fusce vitae nulla at erat sodales varius sit amet eget libero. Cras accumsan lectus 
                               a felis vehicula, ac tristique orci suscipit.
                               </em>{" "}
                               Nam euismod odio sed risus consequat, nec cursus libero pharetra.{" "}
                               <small>
                                Vivamus faucibus, velit in porttitor tincidunt, urna nunc dictum dui, a tincidunt libero 
                                dolor vel justo. Suspendisse in odio risus.
                              </small>
                         </p>

                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-2 col-details">
                            <span>Name </span>
                            <p>{details.name}</p>
                        </div>
                        <div className="col-md-2 col-details">
                            <span>Birth Year </span>
                            <p>{details.birth_year}</p>
                        </div>
                        <div className="col-md-2 col-details">
                            <span>Gender </span>
                            <p>{details.gender}</p>
                        </div>
                        <div className="col-md-2 col-details">
                            <span>Height </span>
                            <p>{details.height}</p>
                        </div>
                        <div className="col-md-2 col-details">
                            <span>Skin Color </span>
                            <p>{details.skin_color}</p>
                        </div>
                        <div className="col-md-2 col-details">
                            <span>Eye Color </span>
                            <p>{details.eye_color}</p>
                        </div>
                    </div>

                </div>
            </div>

        </div>
    );
};

export default PersonDetails;