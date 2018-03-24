import _ from 'lodash';

const bbdb = require('./bbdb.json');
const MONTH_NAMES = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

export function searchBBDB(sku) {
  return bbdb.filter((field) => field.SKU === parseInt(sku, 10));
}

export function dateFromObject(obj) {
  const date = "Crawl Date"
  return new Date(
      '20' + obj[date].substring(7, 9),
      MONTH_NAMES.indexOf(obj[date].substring(3, 6)),
      obj[date].substring(0, 2),
    );
}

export function sortByDate(sku) {
  let searched = searchBBDB(sku);
  return searched.sort((a, b)=> dateFromObject(b) - dateFromObject(a));
}

export function sortByCompany(sku) {
  let sorted = sortByDate(sku);
  return _.uniqBy(sorted, (x) => x["Retailer"]);
}