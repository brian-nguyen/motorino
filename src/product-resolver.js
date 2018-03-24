export function getSKUS() {
    const url = 'https://bizhacks.bbycastatic.ca/mobile-si/si/v3/products/search?query=i5%204460';

    fetch(url) // Call the fetch function passing the url of the API as a parameter
    .then((resp) => resp.json())
    .then(function(data) {
        console.log(data)
    })
    .catch(function(error) {
        console.log(error)
    });
}

