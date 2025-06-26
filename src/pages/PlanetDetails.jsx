import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const PlanetDetails = () => {
    const { id } = useParams();
    const [details, setDetails] = useState(null);

    useEffect(() => {
        const getDetails = async () => {
            try {
                console.log("Fetching details for UID:", id);
                const response = await fetch(`https://www.swapi.tech/api/planets/${id}`);
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
                                alt="Planet image."
                                src="https://picsum.photos/800/600"
                            />
                        </div>
                        <div className="col-sm-6 justify-content-center align-items-center">
                            <h3>{details.name}</h3>
                            <p>
                                Lorem ipsum dolor sit amet,{" "}
                                <strong>consectetur adipiscing elit</strong>. Aliquam eget sapien
                                sapien. Curabitur in metus urna. In hac habitasse platea dictumst.
                                Phasellus eu sem sapien, sed vestibulum velit. Nam purus nibh,
                                lacinia non faucibus et, pharetra in dolor. Sed iaculis posuere diam
                                ut cursus.{" "}
                                <em>
                                    Morbi commodo sodales nisi id sodales. Proin consectetur, nisi id
                                    commodo imperdiet, metus nunc consequat lectus, id bibendum diam
                                    velit et dui.
                                </em>{" "}
                                Proin massa magna, vulputate nec bibendum nec, posuere nec lacus.{" "}
                                <small>
                                    Aliquam mi erat, aliquam vel luctus eu, pharetra quis elit. Nulla
                                    euismod ultrices massa, et feugiat ipsum consequat eu.
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
                            <span>Climate </span>
                            <p>{details.climate}</p>
                        </div>
                        <div className="col-md-2 col-details">
                            <span>Population </span>
                            <p>{details.population}</p>
                        </div>
                        <div className="col-md-2 col-details">
                            <span>Orbital Period </span>
                            <p>{details.orbital_period}</p>
                        </div>
                        <div className="col-md-2 col-details">
                            <span>Rotation Period </span>
                            <p>{details.rotation_period}</p>
                        </div>
                        <div className="col-md-2 col-details">
                            <span>Diameter </span>
                            <p>{details.diameter}</p>
                        </div>
                    </div>

                </div>
            </div>

        </div>
    );
};

export default PlanetDetails;