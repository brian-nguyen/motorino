import _ from 'lodash';

const bbdb = require('./bbdb.json');
export const COMPANY_NAMES = ["Amazon", "Bed Bath and Beyond Canada", "Best Buy Canada", "Canadian Tire", "Costco Canada", "London Drugs", "Lussobaby", "Sears Canada", "Shopca", "Staples Canada", "The Bay", "The Brick", "Toys R Us Canada", "Walmart Canada", "Well Canada"]
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

export function checkForCompetitor( company, competitors, bb_price){ // return a price-matched price else false if not found
  const match = competitors.find( (e) => {return e["Retailer"] == company});
  console.log(company);
  console.log(match);
  if(!match) return false;
  const price = parseFloat(match["Price"].replace("$",""));
  if(bb_price > price)
    return price - (bb_price - price)*0.1;
  return false;
}