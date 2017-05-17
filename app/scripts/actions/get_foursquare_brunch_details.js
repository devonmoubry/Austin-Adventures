export default function getFoursquareBrunchDetails(id, successFunction, errorFunction) {
  return (dispatch) => {
    return $.ajax({
      type: 'GET',
      url: `https://api.foursquare.com/v2/venues/${id}?client_id=IYDOPLZAOCRBWNU3E3NCG2BJAK3ZFJMHVQV5MF152EWLYAC5&client_secret=LBC4Y2PODOMSGZCVMUZ14ECQAYCGVXDCFQOM3X2UBOHT54PY&v=20170515`,
      headers: {

      },
      success: (data, status, xhr) => {
        successFunction(data)
      },
      error: (data, status, xhr) => {
        errorFunction(data)
      }
    })
  }
}
