let pic = document.getElementById('pic');
let zw = '';
let i = 1, j = 1;
const refreshTime = 8640000;
let searchInput = document.getElementById('search-input'); // add a search input

document.addEventListener('DOMContentLoaded', function() {
  showCountry();
})

function capitalize(str) {
  return str[0].toUpperCase() + str.slice(1)
}

function showCountry() {
  let xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://restcountries.com/v3.1/all', true);
  xhr.onload = function() {
    if (xhr.status == 200) {
      let countries = JSON.parse(this.response);
      // sort by common name
      /* countries.sort(function (a, b) {
        return a.name.common.localeCompare(b.name.common);
      }); */

      // sort by population desc
      //  countries.country.population.reverse();
      /* countries.sort(function (a, b) {
        return a.population.toLocaleString("en-US").localeCompare(b.population.toLocaleString("en-US"));
      }); */
      if (j % 2 == 0) {
        /* countries.sort(function (x, y) {
          let a = x.name.common.toUpperCase(),
            b = y.name.common.toUpperCase();
          return a == b ? 0 : a > b ? 1 : -1;
        }); */
        countries.sort(function(a, b) {
          return b.area - a.area;
        });
      } else {
        countries.sort(function(a, b) {
          return b.population - a.population;
        });
      }
      countries.forEach(country =>
        {
          const countryCard = document.createElement('div');
          countryCard.classList.add('country-card'); // add class to country card
          const countryCardImage = document.createElement('img');
          countryCardImage.id = 'countryCardImage';
          if (country.translations.zho !== undefined) {
            zw = country.translations.zho.common;
          } else if (country.name.common == 'Singapore') {
            zw = '新加坡';
          } else if (country.name.common == 'Taiwan') {
            zw = '台湾';
          } else if (country.name.common == 'Hong Kong') {
            zw = '香港';
          } else if (country.name.common == 'Macau') {
            zw = '澳门';
          } else {
            zw = '中国';
          }

          countryCard.innerHTML =
            '</br>' + 'Ranking: ' + i +
            '</br>' + 'Name: ' + '<span>' + country.name.common + '</span>'+
            '</br>' + '名称: ' + zw +
            '</br>' + 'Capital: ' + country.capital +
            // '</br>' + 'Language: ' + country.languages +
            '</br>' + 'Population: ' + country.population.toLocaleString("en-US") +
            '</br>' + 'Area(sq km): ' + country.area.toLocaleString("en-US") +
            '</br>' + 'Car-Side: ' + capitalize(country.car.side) +
            // '</br>' + 'Timezone: ' + country.timezones[0] +
            '</br>';
          countryCardImage.src = country.flags.png;
          countryCard.appendChild(countryCardImage);
          document.getElementById('feed').appendChild(countryCard);
          i++;
        });
      j++;

      // move event listener inside showCountry function
      searchInput.addEventListener('input', function() {
        let filter = searchInput.value.toUpperCase();
        let countryCards = document.querySelectorAll('.country-card');

        countryCards.forEach(function(countryCard) {
          let countryName = countryCard.querySelector('span').textContent.toUpperCase(); // changed to span
          if (countryName.indexOf(filter) > -1) {
            countryCard.style.display = '';
          } else {
            countryCard.style.display = 'none';
          }
        });
      });
    }
  }
  xhr.send();
  document.getElementById('feed').innerHTML = '';
  i = 1;
}

pic.addEventListener('click', showCountry)
setInterval(showCountry, refreshTime)