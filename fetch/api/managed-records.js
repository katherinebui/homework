import fetch from '../util/fetch-fill';
import URI from 'urijs';

// /records endpoint
window.path = 'http://localhost:3000/records';

// Your retrieve function plus any additional functions go here ...
const dataAggregator = response => {
  const primary = ['red', 'blue', 'yellow'];
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
  records.nextPage++;
  return Promise.resolve(records);
};

const retrieve = (options = {}) => {
  const records = {
    ids: [],
    open: [],
    closedPrimaryCount: 0,
    previousPage: null,
    nextPage: 1
  };
  let colors = options.colors || [];
  let page = options.page || 1;
  const url = URI(window.path);
  records.previousPage = page === 1 ? null : page - 1;
  // records.nextPage = page === 1 ? null : page - 1;
  // .addSearch('limit', 10)
  // .addSearch('offset', records.ids.length)
  // .addSearch('color[]', options.colors);
  return fetch(url)
    .then(resp => {
      return Promise.resolve(resp.json()).then(data => dataAggregator(data));
    })
    .catch(err => console.log(err));
};

export default retrieve;
