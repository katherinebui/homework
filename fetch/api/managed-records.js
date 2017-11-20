import fetch from '../util/fetch-fill';
import URI from 'urijs';

// /records endpoint
window.path = 'http://localhost:3000/records';

// Your retrieve function plus any additional functions go here ...
let page = 1;
let records;

const primary = ['red', 'blue', 'yellow'];

const dataAggregator = response => {
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

const retrieve = (options = {}) => {
  records = {
    ids: [],
    open: [],
    closedPrimaryCount: 0,
    previousPage: null,
    nextPage: 1
  };
  if (!options.colors) {
    options.colors = [];
  }
  page = options.page || 1;
  records.previousPage = page === 1 ? null : page - 1;
  records.nextPage = page + 1;
  if (options.page === 50) {
    records.nextPage = null;
  }
  const offset = options.page ? options.page * 10 - 10 : 0;
  const url = URI(window.path)
    .addSearch('limit', 10)
    .addSearch('offset', offset)
    .addSearch('color[]', options.colors);
  return fetch(url)
    .then(resp => {
      return Promise.resolve(resp.json()).then(data => dataAggregator(data));
    })
    .catch(err => console.log(err));
};
export default retrieve;
