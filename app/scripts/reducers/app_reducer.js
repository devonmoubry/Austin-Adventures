export default function AppReducer(state, action) {
  if (state === undefined) {
    return {
      usertoken: null,
      ownerId: null,
      brunchFoursquareDetails: null,
      mapBoxAccessToken: 'pk.eyJ1IjoiZGV2b25tb3VicnkiLCJhIjoiY2oyOXA1cGl4MDAwMjJ3b2djdjh4cmV2cyJ9.ZrmYtWukYTSnSRnDgUJlcQ',
      favoriteHikes: [],
      favoriteRestaurants: []
    };
  }

  switch (action.type) {

    case "LOGGED_IN":
      var newState = {
        usertoken: action.usertoken,
        ownerId: action.ownerId
      };
      return Object.assign({}, state, newState);

    case "GOT_FAVORITE_HIKES":
      var newState = {
        favoriteHikes: action.favoriteHikes
      };
      return Object.assign({}, state, newState);

    case "GOT_FAVORITE_RESTAURANTS":
      var newState = {
        favoriteRestaurants: action.favoriteRestaurants
      };
      return Object.assign({}, state, newState);
  }

  console.log("Unhandled State!");
  return state;
}
