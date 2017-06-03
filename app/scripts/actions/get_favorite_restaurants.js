export default function getFavoriteRestaurants (usertoken, ownerId) {
  return (dispatch) => {
    return $.ajax({
      type: 'GET',
      url: `https://api.backendless.com/v1/data/AustinAdventureFavRestaurants?where=ownerId%3D%27${ownerId}%27`,
      headers: {
        "application-id": "24B65924-C870-5359-FF6E-4A5396B35700",
        "secret-key":  "BFBB0F72-782B-9CF9-FF71-D0C15271A900",
        "user-token": usertoken,
        "application-type": "REST"
      },
      success: (data, status, xhr) => {
        console.log('here are your favorite restaurants');
        console.log(data);
        dispatch ({ type: "GOT_FAVORITE_RESTAURANTS", favoriteRestaurants: data.data })
      },
      error: (data, status, xhr) => {
        console.log(status);
        console.log(data);
      }
    });
  }
}
