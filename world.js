let pic = document.getElementById('pic');

document.addEventListener('DOMContentLoaded', function() {
showCountry();

})

function showCountry() 
{
    let xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://restcountries.com/v3.1/all', true);
    xhr.onload = function() 
    {
        if (xhr.status == 200) 
        {
            let countries = JSON.parse(this.response);
            // countries.push().sort;
            countries.forEach(  country => 
            {
                const countryCard = document.createElement('div');
                const countryCardImage = document.createElement('img');
                countryCard.innerHTML =  
                
                '</br>' + 'Name: ' +country.name.common + 
                // '</br>' + 'Chinese: ' + country.translations.zho.common + 
                '</br>' + 'Capital: ' + country.capital + 
                // '</br>' + 'Language: ' + country.languages + 
                '</br>' + 'Population: ' + country.population.toLocaleString("en-US") + 
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


 