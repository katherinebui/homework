import fetch from '../util/fetch-fill';
import URI from 'urijs';

// /records endpoint
window.path = 'http://localhost:3000/records';

// Your retrieve function plus any additional functions go here ...
let records;

const dataAggregator = response => {
  const primary = ['red', 'blue', 'yellow'];
  if (response.length < 1) {
    records.nextPage = null;
    return Promise.resolve(records);
  }
  response.forEach(record => {
    records.ids.push(record.id);
    if (record.disposition === 'open') {
      if (primary.indexOf(record.color) > -1) {
        record.isPrimary = true;
      } else {
        record.isPrimary = false;
      }
      records.open.push(record);
    } else if (primary.indexOf(record.color) > -1) {
      records.closedPrimaryCount++;
    }
  });
  return Promise.resolve(records);
};

const previousPage = page => (page === 1 ? null : page - 1);

const nextPageData = (options = {}) => {
  const offset = options.page ? options.page * 10 - 10 : 0;
  const url = URI(window.path)
    .addSearch('limit', 10)
    .addSearch('offset', offset);
  return fetch(url)
    .then(resp => {
      return Promise.resolve(resp.json()).then(data => (data.length === 0 ? null : options.page));
    })
    .catch(err => console.log(err));
};

const retrieve = (options = {}) => {
  records = {
    ids: [],
    open: [],
    closedPrimaryCount: 0,
    previousPage: null,
    nextPage: 1
  };

  const page = options.page || 1;
  const colors = options.colors || [];
  const offset = options.page * 10 - 10;

  records.previousPage = previousPage(page);

  nextPageData({ page: page + 1 })
    .then(data => (records.nextPage = data))
    .catch(err => console.log(err));

  const url = URI(window.path)
    .addSearch('limit', 10)
    .addSearch('offset', offset)
    .addSearch('color[]', colors);
  return fetch(url)
    .then(resp => {
      return Promise.resolve(resp.json()).then(data => dataAggregator(data));
    })
    .catch(err => console.log(err));
};

export default retrieve;
