export default function signupNewUser (signupFullName, signupEmail, signupPassword) {
  return (dispatch) => {
    return $.ajax({
      type: "POST",
      url: "https://api.backendless.com/v1/users/register",
      headers: {
        "application-id": "24B65924-C870-5359-FF6E-4A5396B35700",
        "secret-key": "BFBB0F72-782B-9CF9-FF71-D0C15271A900",
        "application-type": "REST",
        "Content-Type": "application/json"
      },
      data: JSON.stringify({
        "name": signupFullName,
        "email": signupEmail,
        "password": signupPassword
      }),
      success: (data, status, xhr) => {

      }
    })
  }
}
