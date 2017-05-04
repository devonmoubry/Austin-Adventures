import searchHikes from '../components/search.js'
import searchRestaurants from '../components/search.js'

export default function AppReducer(state, action) {
  if (state === undefined) {
    return {
      searchResults: null,
      foodSearchResults: null,
      usertoken: null
    };
  }

  switch (action.type) {
    case "LOADED_HIKES":
      console.log("LOADED_HIKES");
      var newState = {
        searchResults: action.hikes
      };
      return Object.assign({}, state, newState);

    case "LOADED_RESTAURANTS":
      console.log("LOADED_RESTAURANTS");
      var newState = {
        foodSearchResults: action.restaurants
      };
      return Object.assign({}, state, newState);

    case "LOGGED_IN":
      console.log("LOGGED_IN");
      console.log("action.usertoken", action.usertoken);
      var newState = {
        usertoken: action.usertoken
      };
      return Object.assign({}, state, newState);
  }

  console.log("Unhandled State!");
  return state;
}
