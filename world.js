let pic = document.getElementById('pic');
let zw = '';
let i = 1, j = 1;
const refreshTime = 8640000;
let allCountries = []; // Store all countries here

document.addEventListener('DOMContentLoaded', function() {
    showCountry();
    // Add event listener for real-time search
    document.getElementById('search-input').addEventListener('input', searchCountries);
});

function capitalize(str) {
    return str && str[0] ? str[0].toUpperCase() + str.slice(1) : '';
}

function showCountry() {
    const fields = 'name,translations,capital,population,area,car,flags';
    let xhr = new XMLHttpRequest();
    xhr.open('GET', `https://restcountries.com/v3.1/all?fields=${fields}`, true);
    xhr.onload = function() {
        if (xhr.status == 200) {
            allCountries = JSON.parse(this.response);
            // Sort and display all countries
            displayCountries(allCountries);
        }
    };
    xhr.send();
}

function displayCountries(countries) {
    // Sort by area or population, depending on j
    countries.sort(function(a, b) {
        if (j % 2 === 0) return (b.area || 0) - (a.area || 0);
        else return (b.population || 0) - (a.population || 0);
    });
    document.getElementById('feed').innerHTML = '';
    i = 1;
    countries.forEach(country => {
        const countryCard = document.createElement('div');
        const countryCardImage = document.createElement('img');
        countryCardImage.id = 'countryCardImage';
        // Determine Chinese name
        if (country.translations && country.translations.zho && country.translations.zho.common) {
            zw = country.translations.zho.common;
        } else if (country.name.common === 'Singapore') {
            zw = '新加坡';
        } else if (country.name.common === 'Taiwan') {
            zw = '台湾';
        } else if (country.name.common === 'Hong Kong') {
            zw = '香港';
        } else if (country.name.common === 'Macau') {
            zw = '澳门';
        } else if (country.name.common === 'China') {
            zw = '中国';
        } else {
            zw = country.name.common; // fallback
        }
        // Build card content
        let capitalStr = country.capital ? country.capital.join(', ') : 'N/A';
        let areaStr = country.area ? country.area.toLocaleString("en-US") : 'N/A';
        let carSide = country.car && country.car.side ? capitalize(country.car.side) : 'N/A';
        countryCard.innerHTML =
            '<br>Ranking: ' + i +
            '<br>Name: ' + country.name.common +
            '<br>名称: ' + zw +
            '<br>Capital: ' + capitalStr +
            '<br>Population: ' + (country.population || 0).toLocaleString("en-US") +
            '<br>Area(sq km): ' + areaStr +
            '<br>Car-Side: ' + carSide +
            '<br>';
        if (country.flags && country.flags.png) {
            countryCardImage.src = country.flags.png;
            countryCard.appendChild(countryCardImage);
        }
        document.getElementById('feed').appendChild(countryCard);
        i++;
    });
    j++;
}

function searchCountries() {
    const searchTerm = document.getElementById('search-input').value.toLowerCase();
    if (!searchTerm) {
        // If search box is empty, show all countries
        displayCountries(allCountries);
        return;
    }
    // Filter countries whose name (or Chinese name) includes the search term
    const filtered = allCountries.filter(country => {
        let name = country.name.common.toLowerCase();
        let chineseName = '';
        if (country.translations && country.translations.zho && country.translations.zho.common) {
            chineseName = country.translations.zho.common.toLowerCase();
        } else if (country.name.common === 'Singapore') {
            chineseName = '新加坡';
        } else if (country.name.common === 'Taiwan') {
            chineseName = '台湾';
        } else if (country.name.common === 'Hong Kong') {
            chineseName = '香港';
        } else if (country.name.common === 'Macau') {
            chineseName = '澳门';
        } else if (country.name.common === 'China') {
            chineseName = '中国';
        }
        return name.includes(searchTerm) || chineseName.includes(searchTerm);
    });
    displayCountries(filtered);
}

pic.addEventListener('click', showCountry);
setInterval(showCountry, refreshTime);
