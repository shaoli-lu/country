let pic = document.getElementById('pic');
let zw ='';
let i = 0;
const refreshTime =60000;
document.addEventListener('DOMContentLoaded', function() {
showCountry();

})

function capitalize(str){
    return str[0].toUpperCase()+str.slice(1)
}

function showCountry() 
{
  
    let xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://restcountries.com/v3.1/all', true);
    xhr.onload = function() 
    {
        if (xhr.status == 200) 
        {
            i++;
            let countries = JSON.parse(this.response);
            // sort by common name
           /*  countries.sort(function (a, b) {
                return a.name.common.localeCompare(b.name.common);
            }); */

             // sort by population desc
            //  countries.country.population.reverse();
        /*     countries.sort(function (a, b) {
                return a.population.toLocaleString("en-US").localeCompare(b.population.toLocaleString("en-US"));
            }); */
        if ( i%2 == 0) {
            countries.sort(function (x, y) {
                let a = x.name.common.toUpperCase(),
                    b = y.name.common.toUpperCase();
                return a == b ? 0 : a > b ? 1 : -1;
            });
        } else {
            countries.sort(function (a, b) {
                return b.population - a.population;
            });
        }
            countries.forEach(  country => 
            {
                const countryCard = document.createElement('div');
                const countryCardImage = document.createElement('img');
                countryCardImage.id ='countryCardImage';
                if (country.translations.zho !== undefined) {zw = country.translations.zho.common;  } 
                else if (country.name.common =='Singapore') {zw = '新加坡';}
                else if (country.name.common =='Taiwan') {zw = '台湾';}
                else if (country.name.common =='Hong Kong') {zw = '香港';}
                else if (country.name.common =='Macau') {zw = '澳门';}
                else {zw = '中国'; }
                
                countryCard.innerHTML =  
                '</br>' + 'Name: ' +country.name.common + 
                '</br>' + '名称: ' + zw + 
                '</br>' + 'Capital: ' + country.capital + 
                // '</br>' + 'Language: ' + country.languages + 
                '</br>' + 'Population: ' + country.population.toLocaleString("en-US") + 
                '</br>' + 'Area(sq km): ' + country.area.toLocaleString("en-US") + 
                '</br>' + 'Car-Side: ' + capitalize(country.car.side) + 
                '</br>' + 'Timezone: ' + country.timezones[0] + 
                '</br>';
                countryCardImage.src = country.flags.png;
                countryCard.appendChild(countryCardImage);
                document.getElementById('feed').appendChild(countryCard);
            
            });
        }
    }
   
xhr.send();

}

pic.addEventListener('click', showCountry)
setInterval(showCountry, refreshTime)


 