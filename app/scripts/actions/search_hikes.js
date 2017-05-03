export default function searchHikes (inputSearch) {
  return (dispatch) => {
    return $.ajax({
      type: 'GET',
      url: '../../app/scripts/models/trailsAPI.json',
      dataType: 'JSON'
    }).then(function(data) {
      console.log(data);
      dispatch({/* type: "LOADED_RESULTS", hikes: this.data.something*/});
    });
  }
}
