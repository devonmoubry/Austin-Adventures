export default function searchHikes (hikeSearch) {
  return (dispatch) => {
    return $.ajax({
      type: 'GET',
      url: '../../app/scripts/models/trailsAPI.json',
      dataType: 'JSON'
    }).then(function(data) {
      console.log('search_hikes data', data.places);
      dispatch({ type: "LOADED_HIKES", hikes: data.places });
    });
  }
}
