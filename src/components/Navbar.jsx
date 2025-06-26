import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SWICO from "../assets/img/SWICO.png";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const Navbar = () => {

	const { store, dispatch } = useGlobalReducer();
	const [favorites, setFavorites] = useState([]);

	const deleteFromFavorites = (id, name) => {
		dispatch({ type: 'delete_from_favorite', payload: { "uid": id, "name": name } })
	};

	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/">
					<img src={SWICO} alt="Go to Home image" ></img>
				</Link>
				<div className="ml-auto">
					<div className="btn-group">
						<button
							type="button"
							className="btn btn-primary dropdown-toggle"
							data-bs-toggle="dropdown"
							aria-expanded="false"
						>
							Favorites <span className="justify-content-between align-items-center mr-1"
										style = {{background:"Gray"}}>{store.favorites.length} </span>
						</button>
						<ul className="dropdown-menu">
							{store.favorites.length > 0 ?
								store.favorites.map((item, index) => {
									return (
										<li key= {item.uid} className="favorite-item dropdown-item d-flex justify-content-between align-items-center">
											<button type="button" className="btn btn-light">{item.name}</button>
											<i className="fa-regular fa-trash-can" onClick={() => {
												deleteFromFavorites(item.uid, item.name);
											}}></i>
										</li>
									);
								})
								:
								<li className="favorite-item dropdown-item d-flex justify-content-between align-items-center">
									<button type="button" className="btn btn-light"></button>
								</li>
							}

						</ul>
					</div>
				</div>
			</div>
		</nav>
	);
};