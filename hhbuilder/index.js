window.addEventListener('load', function() {
  var addButton = document.querySelector('.add');
  addButton.addEventListener('click', function(e) {
    e.preventDefault();
    addPeople();
  });
});
