var short = document.getElementsById('filter-length-short'),
medium = document.getElementsById('filter-length-medium'),
long = document.getElementsById('filter-length-long'),
all = document.getElementsById('filter-length-all');

short.onclick = function(e) {
  all.className = '';
  medium.className = '';
  long.className = '';
  this.className = 'active';
  map.featureLayer.setFilter(function(s) {
    return s.properties.activities['length'] <= 3.0;
  });
  return false;
};
medium.onclick = function(e) {
  all.className = '';
  short.className = '';
  long.className = '';
  this.className = 'active';
  map.featureLayer.setFilter(function(s) {
    return s.properties.activities['length'] <= 9.0 && ;
  });
  return false;
};
long.onclick = function(e) {
  all.className = '';
  short.className = '';
  medium.className = '';
  this.className = 'active';
  map.featureLayer.setFilter(function(s) {
    return s.properties.activities['length'] >= 10.0;
  });
  return false;
};
all.onclick = function() {
  short.className = '';
  medium.className = '';
  long.className = '';
  this.className = 'active';
  map.featureLayer.setFilter(function(s) {
    return true;
  });
  return false;
};

/******************************************************************************/

<nav id='filter-price-ui' className='filter-price-ui'>
  <a href='#' className='active' id='filter-price-all'>All brunch prices</a>
  <a href='#' id='filter-one'>$</a>
  <a href='#' id='filter-two'>$$</a>
</nav>

var one = document.getElementsById('filter-price-one'),
two = document.getElementsById('filter-price-two'),
ball = document.getElementsById('filter-price-ball');

one.onclick = function(e) {
  ball.className = '';
  two.className = '';
  one.className = 'active';
  this.map.setFilter('places', ['any', ['==', 'price', '$'], ['==', 'type', 'hike']]);
  return false;
}.bind(this);
two.onclick = function(e) {
  one.className = '';
  all.className = '';
  two.className = 'active';
  this.map.setFilter('places', ['any', ['==', 'price', '$$'], ['==', 'type', 'hike']]);
  return false;
}.bind(this);
all.onclick = function() {
  one.className = '';
  two.className = '';
  all.className = 'active';
  this.map.setFilter('places', ['any', ['==', 'type', 'brunch'], ['==', 'type', 'hike']]);
  return false;
}.bind(this);
