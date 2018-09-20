const fUrl = 'https://api.foursquare.com/v2/venues/';
const clientId = '3O5GTSKBYIUIKVBC4ZNKNLZT5DIJNJGVQANHDOC4QAQLOCEV';
const clientSecret = 'MYCT4S41YLTAZYVNA20WBCTDJEKRFFBXR1UMHDVKQ1KMYSHD';
const auth = `&client_id=${clientId}&client_secret=${clientSecret}&v=20180806`;


const places = require('./places.json');
// first, the function fetches places ids from the server then using received ids gets information about the places
export const getInfo = new Promise((resolve, reject) => {
    places.forEach(pl => fetch(`${fUrl}search?ll=${pl.lat},${pl.lng}${auth}&intent=match&query=${pl.name}`)
        .then(res => res.json())
        .then(data => pl.id = data.response.venues[0].id)
        .then(id => fetch(`${fUrl}${id}?${auth}`)
            .then(res => res.json())
            .then(data => {
                pl.address = data.response.venue.location.address;
                pl.rating = data.response.venue.rating;
                pl.venueType = data.response.venue.categories[0].name;
                pl.fsURL = data.response.venue.canonicalUrl;
                pl.photo = data.response.venue.bestPhoto.prefix + '100x100' + data.response.venue.bestPhoto.suffix;
            }))
        .catch(err => {
            console.log(err, 'Loading error');
        }));
    resolve(places);
    reject(new Error('Something went wrong!'));
});
