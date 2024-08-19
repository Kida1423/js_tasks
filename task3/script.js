document.addEventListener('DOMContentLoaded',()=>{
    document.getElementById('btn').addEventListener('click',() => {
        let country = document.getElementById('country').value.trim();
        const resultsDiv = document.getElementById('results');
        let preloader = document.getElementsByClassName('preloader-6')[0];

        resultsDiv.innerHTML = '';
        preloader.style.display = 'block';
        new Promise((resolve,reject) => {
            let xhr = new XMLHttpRequest();
            xhr.open('GET',`https://restcountries.com/v2/name/${country}`);
            xhr.onload = () => {
                if(xhr.status == 200){
                    resolve(JSON.parse(xhr.responseText))
                }else{
                    reject(Error(xhr.statusText));
                }
            }
            xhr.onerror = () => reject(Error('Network Error'));
            xhr.send();
        }).then(countryData => {
            let country= countryData[0];
            let borders=country.borders.map(code => {
                return new Promise((resolve,reject) => {
                    let xhr= new XMLHttpRequest();
                    xhr.open('GET',`https://restcountries.com/v2/alpha/${code}`)
                    xhr.onload = () => {
                        if (xhr.status === 200) {
                            resolve(JSON.parse(xhr.responseText));
                        } else {
                            reject(Error(xhr.statusText));
                        }
                    }
                    xhr.send();

                })
            })
            return Promise.all(borders);
            
        })
        .then(borderCountries => {
            resultsDiv.innerHTML += '<br>Neighbors:<br>';
            borderCountries.forEach(borderCountry => {
                resultsDiv.innerHTML += `- ${borderCountry.name}<br>`;
            });
        })
        .catch(error => {
            console.log(error);
            
        })        
        .finally(() => {
            preloader.style.display = 'none'; // Скрываем прелоадер
        });
    })
})
