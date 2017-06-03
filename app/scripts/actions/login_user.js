export default function loginUser (loginEmail, loginPassword, successFunction, errorFunction) {
  return (dispatch) => {
    return $.ajax({
      type: "POST",
      url: "https://api.backendless.com/v1/users/login",
      headers: {
        "application-id": "24B65924-C870-5359-FF6E-4A5396B35700",
        "secret-key": "BFBB0F72-782B-9CF9-FF71-D0C15271A900",
        "application-type": "REST",
        "Content-Type": "application/json"
      },
      data: JSON.stringify({
        "login": loginEmail,
        "password": loginPassword
      }),
      success: (data, status, xhr) => {
        dispatch ({ type: "LOGGED_IN", usertoken: data["user-token"], name: data.name, ownerId: data.ownerId })
        successFunction()
      },
      error: (data, status, xhr) => {
        errorFunction(data)
      }
    })
  }
}
