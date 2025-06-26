import React, { useEffect, useState } from 'react';
import useGlobalReducer from '../hooks/useGlobalReducer';

const VehicleCard = ({ item }) => {
    const { store, dispatch } = useGlobalReducer();
    const [isFavorite, setIsFavorite] = useState(false);
    const [details, setDetails] = useState(null);

    const toggleFavorite = () => {
        if (isFavorite) {
            dispatch({ type: "delete_from_favorite", payload: { deleteUID: item.uid, deleteName: item.name } });
        } else {
            dispatch({ type: "add_to_favorite", payload: { addUID: item.uid, addName: item.name } });
        }
        setIsFavorite(!isFavorite);
    };

    const getDetails = async (item) => {
        try {
            const response = await fetch(item.url);
            if (!response.ok) return;

            const data = await response.json();
            setDetails(data.result.properties);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        setIsFavorite(store.favorites.some(fav => fav.name === item.name));
        if (!details) getDetails(item);
    }, [details, store.favorites]);

    return (
        <div className="card" style={{ width: "18rem" }}>
            <img src="https://picsum.photos/400/200" className="card-img-top" alt="vehicle card" />
            <div className="card-body">
                <h5 className="card-title">{item.name}</h5>
                <div className="card-text">
                    {details ? (
                        <ul style={{ listStyle: "none" }}>
                            <li>Cargo capacity: {details.cargo_capacity}</li>
                            <li>Passengers: {details.passengers}</li>
                            <li>Cost in credits: {details.cost_in_credits}</li>
                        </ul>
                    ) : (
                        <p>Loading details...</p>
                    )}
                </div>
                <span className="card-actions d-flex justify-content-between">
                    <a href="#" className="btn btn-primary">Learn more</a>
                    <a href="#" className="btn btn-light btn-favorite" onClick={toggleFavorite}>
                        <i
                            className={`fa-heart ${isFavorite ? "fa-solid" : "fa-regular"}`}
                            style={{ color: isFavorite ? "yellow" : "black" }}
                        ></i>
                    </a>
                </span>
            </div>
        </div>
    );
}

export default VehicleCard;
