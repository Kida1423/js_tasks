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
            const response = await fetch(`https://restcountries.com/v2/name/${countryName}`)
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
        const borderRequests = country.borders.map(code =>
        fetch(`https://restcountries.com/v2/alpha/${code}`)
            .then(response => response.json())
            .then(borderCountry => {
            const borderCapital = borderCountry.capital;
            return fetch(`https://wttr.in/${borderCapital}?format=j1`)
            .then(response => response.json())
            .then(bordersWeatherData => ({
                    name: borderCountry.name,
                    capital: borderCapital,
                    weather: bordersWeatherData.current_condition[0]
                }));
            })
        );
        const borderCountries = await Promise.all(borderRequests);
        
        borderCountries.forEach(border => {
            resultsDiv.innerHTML += `
                <h4>Country name: ${border.name}</h4>
                <p>Capital: ${border.capital}</p>
                <p>Current weather: ${border.weather.weatherDesc[0].value}, ${border.weather.temp_C}°C Wind: ${border.weather.winddir16Point} ${border.weather.windspeedKmph} km/h</p>
                `;
        });
            preloader.style.display = 'none';
        }
        getData();
        countryInput.value = ''
    })
})
