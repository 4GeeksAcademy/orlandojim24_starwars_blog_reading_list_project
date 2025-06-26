export const initialStore = () => {
  return {
    people: [],
    planets: [],
    vehicles: [],
    favorites: []
  }
}

export default function storeReducer(store, action = {}) {
  switch (action.type) {
    case 'set_people_data':
      const { people } = action.payload;
      return { ...store, people: people };

    case 'set_planets_data':
      const { planets } = action.payload;
      return { ...store, planets: planets };

    case 'set_vehicles_data':
      const { vehicles } = action.payload;
      return { ...store, vehicles: vehicles };


    case 'add_to_favorite':
      const { addUID, addName } = action.payload;
      
      if (store.favorites.some(fav => fav.name === addName)) {
        return store;
      }
      return {
        ...store,
        favorites: [...store.favorites, { uid: addUID, name: addName}]
      };

    case 'delete_from_favorite':
      return {
        ...store,
        favorites: store.favorites.filter(fav => fav.name !== action.payload.name) };

    case 'get_favorites':
      const { uid, name } = action.payload;
      return { ...store, favorites: [...store.favorites, { uid: uid, name: name }] };
      
    default:
      throw Error('Unknown action.');
  }
}