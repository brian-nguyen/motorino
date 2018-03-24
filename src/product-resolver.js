export async function getProductInfo(searchString) {
    const encodedSearchString = encodeURIComponent(searchString.trim())
    
    const url = `https://bizhacks.bbycastatic.ca/mobile-si/si/v3/products/search?query=${encodedSearchString}`;
    var res = await fetch(url);
    res = await res.json();
    console.log(res);
    
    const documents = res.searchApi.documents;

    var filteredDocs = filterOutOfStock(documents);
    console.log(filteredDocs);
    return filteredDocs    
};

function filterOutOfStock(documents) {
    const filterDocs = documents.filter(function (document) {
        const availability = document.summary.availability;
        var shipAvailability = availability.ship && availability.ship.available;
        var pickupAvailability = availability.pickup && availability.pickup.available;
        return pickupAvailability || shipAvailability;
    });
    return filterDocs;
}