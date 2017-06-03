export default function favHike (id, name, usertoken, ownerId) {
  return (dispatch) => {
    return $.ajax({
      type: 'POST',
      url: 'https://api.backendless.com/v1/data/AustinAdventureFavHikes',
      headers: {
        "application-id": "24B65924-C870-5359-FF6E-4A5396B35700",
        "secret-key":  "BFBB0F72-782B-9CF9-FF71-D0C15271A900",
        "user-token": usertoken,
        "application-type": "REST",
        "Content-Type": "application/json"
      },
      data: JSON.stringify({
        "id": id,
        "name": name,
        "ownerId": ownerId
      }),
      success: (data, status, xhr) => {
        console.log('we have saved your hike');
        console.log(status);
        console.log(data);
      }
    });
    }
  }
