export default function AppReducer(state, action) {
  if (state === undefined) {
    return {
      usertoken: null,
      mapBoxAccessToken: 'pk.eyJ1IjoiZGV2b25tb3VicnkiLCJhIjoiY2oyOXA1cGl4MDAwMjJ3b2djdjh4cmV2cyJ9.ZrmYtWukYTSnSRnDgUJlcQ'
    };
  }

  switch (action.type) {

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
