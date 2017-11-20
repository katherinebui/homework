window.addEventListener('load', function() {
  var addButton = document.querySelector('.add');
  addButton.addEventListener('click', function(e) {
    e.preventDefault();
    addPeople();
  });

  var header = document.createElement('h3');
  var h1 = document.querySelector('h1');
  h1.insertAdjacentHTML('afterend', '<h3>Age, Relationship, Smoker?</h3>');

  var div = document.createElement('div');
  var removeButton = document.createElement('button');
  removeButton.className = 'remove';
  removeButton.innerHTML = 'remove previous item';
  div.appendChild(removeButton);
  document.querySelector('form').appendChild(div);
  removeButton.addEventListener('click', function(e) {
    e.preventDefault();
    removeItem();
  });

  var submitButton = document.querySelector('[type=submit]');
  submitButton.addEventListener('click', function(e) {
    e.preventDefault();
    serializeHousehold();
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

function addPeople() {
  if (validateForm()) {
    var age = [document.querySelector('[name=age]').value, ',', ' '].join('');
    var relationship = [document.querySelector('[name=rel]').value, ',', ' '].join('');
    var smoker = [document.querySelector('[name=smoker]').checked].join('');
    var li = document.createElement('li');
    li.append(age);
    li.append(relationship);
    li.append(smoker);
    document.querySelector('form').reset();
    var householdList = document.querySelector('.household');
    householdList.append(li);
  }
}

function removeItem() {
  var container = document.getElementsByTagName('ol')[0];
  var lastListItem = container.lastChild;
  lastListItem.remove();
}

function serializeHousehold() {
  var data = {};
  var result = {};
  var list = document.querySelectorAll('li');
  for (var i = 0; i < list.length; i++) {
    data[i] = list[i].innerHTML.split(',');
    result[i] = {
      age: data[i][0],
      relationship: data[i][1],
      smoker: data[i][2]
    };
  }
  var preTag = document.querySelector('pre');
  var json = JSON.stringify(result);
  preTag.innerHTML = json;
}
