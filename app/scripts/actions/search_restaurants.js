export default function searchRestaurants () {
  return (dispatch) => {
    return $.ajax({
      type: 'GET',
      url: '../../app/scripts/models/brunch_bunch_api.json',
      dataType: 'JSON'
    }).then(function(data) {
      console.log('success');
      console.log('search_restaurants data', data);
      dispatch({ type: "LOADED_RESTAURANTS", restaurants: data.places })
    }).fail(function(data, status) {
      console.log(status);
      console.log('data', data);
    })
  }
}
