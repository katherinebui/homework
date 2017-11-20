window.addEventListener('load', function() {
  var addButton = document.querySelector('.add');
  addButton.addEventListener('click', function(e) {
    e.preventDefault();
    addPeople();
  });
});

function validateForm() {
  var age = document.querySelector('[name=age]').value;
  var relationship = document.querySelector('[name=rel]').value;
  if (age <= 0 && relationship == '') {
    alert('Invalid age and relationship input');
    return false;
  } else if (age <= 0) {
    alert('Invalid age');
    return false;
  } else if (relationship == '') {
    alert('Please specify a relationship');
    return false;
  } else {
    return true;
  }
}
