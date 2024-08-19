document.addEventListener('DOMContentLoaded',() => {
    window.addEventListener('load', function () {
        var preloader = document.getElementById('preloader');
        preloader.style.display = 'none';
      });
    let btn=document.getElementById('btn');
    let resultsDiv = document.getElementById('other_countries')
    resultsDiv.innerHTML = ''
    btn.addEventListener('click',() => {
        let countryName = document.getElementById('country').value.trim();
        let countryInput = document.getElementById('country')
        if(countryName == ''){
           return alert("Enter country name")
        }
        preloader.style.display = 'flex';
        async function getData() {
            const response = await fetch(`https://restcountries.com/v2/name/${countryName}`);
            const countryData = await response.json();
            let country = countryData[0]
            let capital = country.capital

            let weatherResponse = await fetch(`https://wttr.in/${capital}?format=j1`);
            let weatherData = await weatherResponse.json()
            let currentWeather = weatherData.current_condition[0]
            resultsDiv.innerHTML = `
            <h2>Country: ${country.name}</h2>
            <p>Capital: ${capital}</p>
            <p>Current weather: ${currentWeather.weatherDesc[0].value}, ${currentWeather.temp_C}°C Wind: ${currentWeather.winddir16Point} ${currentWeather.windspeedKmph} km/h</p>
            <h3>Bordering countries:</h3>
        `;
            let borders = country.borders
            borders.forEach(async code => {
                let borderCountryResponse = await fetch(`https://restcountries.com/v2/alpha/${code}`);
                let borderCountry = await borderCountryResponse.json();
                let borderCapital = borderCountry.capital;
                
                let bordersWeatherResponse = await fetch(`https://wttr.in/${borderCapital}?format=j1`);
                let bordersWeatherData = await bordersWeatherResponse.json()
                let borderCurrentWeather = bordersWeatherData.current_condition[0]

                resultsDiv.innerHTML += `
                    <h4>Country name: ${borderCountry.name}</h4>
                    <p>Capital: ${borderCapital}</p>
                    <p>Current weather: ${borderCurrentWeather.weatherDesc[0].value}, ${borderCurrentWeather.temp_C}°C Wind: ${borderCurrentWeather.winddir16Point} ${borderCurrentWeather.windspeedKmph} km/h</p>
                `;
            });
            preloader.style.display = 'none';
        }
        getData();
        countryInput.value = ''
    })
})
