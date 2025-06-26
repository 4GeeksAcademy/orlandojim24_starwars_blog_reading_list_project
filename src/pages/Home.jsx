import { useEffect } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import PeopleCard from "../components/PeopleCard.jsx";
import PlanetCard from "../components/PlanetCard.jsx";
import VehicleCard from "../components/VehicleCard.jsx";

export const Home = () => {

	const { store, dispatch } = useGlobalReducer();


	const getPeople = async () => {
		try {
			const response = await fetch('https://www.swapi.tech/api/people');
			if (!response.ok) {
				throw new Error("Ocurrió un error al llamar el endpoint 'people' ");
			}

			const data = await response.json();
			

			// Make sure data.results exists and is an array before dispatching
			if (Array.isArray(data.results)) {
				dispatch({ type: 'set_people_data', payload: { people: data.results } });
			} else {
				console.error("API did not return an array for people", data);
			}

		} catch (error) {
			console.log(error);
		}
	};

	const getPlanets = async () => {
		try {
			const response = await fetch('https://www.swapi.tech/api/planets');
			if (!response.ok) {
				throw new Error("Ocurrió un error al llamar el endpoint 'planets' ");
			}

			const data = await response.json();
			console.log(data); // Check what data.results looks like

			// Make sure data.results exists and is an array before dispatching
			if (Array.isArray(data.results)) {
				dispatch({ type: 'set_planets_data', payload: { planets: data.results } });
			} else {
				console.error("API did not return an array for planets", data);
			}

		} catch (error) {
			console.log(error);
		}
	};


	const getVehicles = async () => {
		try {
			const response = await fetch('https://www.swapi.tech/api/vehicles');
			if (!response.ok) {
				throw new Error("Ocurrió un error al llamar el endpoint 'vehicles' ");
			}

			const data = await response.json();
			console.log(data); // Check what data.results looks like

			// Make sure data.results exists and is an array before dispatching
			if (Array.isArray(data.results)) {
				dispatch({ type: 'set_vehicles_data', payload: { vehicles: data.results } });
			} else {
				console.error("API did not return an array for vehicles", data);
			}

		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		getPeople();
		getPlanets();
		getVehicles();
	}, []);
	return (
		<div className="container">
			<div className="cards-container">
				<h3>People</h3>
				<div className="d-flex overflow-auto">
					{store.people.map((item, index) => {
						return <PeopleCard key={item.uid} item={item} />
					})}
				</div>
			</div>

			<div className="cards-container">
				<h3>Planets</h3>
				<div className="d-flex overflow-auto">
					{store.planets.map((item, index) => {
						return <PlanetCard key={item.uid} item={item} />
					})}
				</div>
			</div>

			<div className="cards-container">
				<h3>Vehicle</h3>
				<div className="d-flex overflow-auto">
					{store.vehicles.map((item, index) => {
						return <VehicleCard key={item.uid} item={item} />
					})}
				</div>
			</div>
		</div>
	);
}; 