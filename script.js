const apiKey = 'c0f3837f11c78bea70fe521c2d1f27c1';
const button = document.getElementById("btnsearch");
button.addEventListener("click", getWeather);

document.getElementById('packingForm').addEventListener('submit', async (e) => {
    e.preventDefault(); 

    const activity = document.getElementById('activities').value.trim();
    const city = document.getElementById('location').value.trim();

    if (!activity || !city) {
        alert("Please enter both city and activity.");
        return;
    }

    await getPackingSuggestions(city, activity);
});


function formatCityName(city) {
    if (!city) return "";
    return city.trim().toLowerCase().replace(/(^|\s)\S/g, letter => letter.toUpperCase());
}
async function getWeather() {
    const rawcity = document.getElementById("bar").value;
    const city = formatCityName(rawcity);
    if (!city) {
        console.log("Invalid input");
        return;
    }
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        if (data.error) {
            throw new Error();
        }
        displayWeather(data);
    } catch (error) {
        document.getElementById("hero").innerHTML = `<p style="color: white; font-family: Segoe UI;">${error.message}</p>`;
    }
}

function getGradient(description) {
    const gradients = {
        "clear": "linear-gradient(to bottom, #4A90E2, #87CEEB)",
        "cloudy": "linear-gradient(to bottom, #B0C4DE, #D3D3D3)",
        "partly cloudy": "linear-gradient(to bottom, #A9A9A9, #D3D3D3)",
        "rain": "linear-gradient(to bottom, #5F9EA0, #A9A9A9)",
        "light rain": "linear-gradient(to bottom, #5F9EA0, #A9A9A9)",
        "thunderstorm": "linear-gradient(to bottom, #2C3E50, #4B79A1)",
        "snow": "linear-gradient(to bottom, #E0E4CC, #FFFFFF)",
        "fog": "linear-gradient(to bottom, #B6B6B4, #DCDCDC)",
        "mist": "linear-gradient(to bottom, #8C8C8C, #D9D9D9)",
        "smoke": "linear-gradient(to bottom, #6E6E6E, #A9A9A9)",
        "overcast clouds": "linear-gradient(to bottom, #A9A9A9, #808080)",
        "sandstorm": "linear-gradient(to bottom, #C2B280, #E3DAC9)",
    };
    return gradients[description] || "linear-gradient(to bottom, #4A90E2, #87CEEB)";
}

function getEmoji(description) {
    const emojis = {
        "clear": "☀️",
        "cloudy": "☁️",
        "partly cloudy": "⛅",
        "rain": "🌧️",
        "light rain": "🌧️",
        "thunderstorm": "🌩️",
        "snow": "🌨️",
        "fog": "🌫️",
        "mist": "🌁",
        "smoke": "💨",
        "overcast clouds": "🌥️",
        "sandstorm": "🌪️",
    };
    return emojis[description] || "☀️";
}

function displayWeather(data) {
    const { name: city, main: { temp, feels_like, humidity }, weather: [{ description }], wind: { speed } } = data;
    const temperature = document.getElementById("temp");
    const tempCelsius = (temp - 273.15).toFixed(1);
    temperature.innerHTML = `<div id="emoji"></div>
                    <div id="tempnum">${tempCelsius}</div>
                    <div id="tempunit">°C</div>`;
    const otherspecs = document.getElementById("otherspecs");
    otherspecs.innerHTML = ` <p id="name">${city}</p>
                            <p id="description">${description}</p>
                            <div id="feeltemp">Feels Like: ${(feels_like - 273.15).toFixed(1)} °C</div>
                            <p id="humidity">Humidity: ${humidity}%</p>
                            <p id="wind">Wind Speed: ${speed} km/h</p>`;
    const descrip = description;
    const gradient = getGradient(descrip);
    document.getElementById("hero").style.background = gradient;
    const emoji = getEmoji(descrip);
    document.getElementById("emoji").textContent = emoji;
}

document.getElementById('btnsearch').addEventListener('click', () => {
    const cityInput = document.getElementById("bar").value.trim();
    if (cityInput) {
        document.getElementById("location").value = cityInput;
    }
});

// New Function: Fetch Packing Suggestions
async function getPackingSuggestions(city, activity) {
    console.log("Fetching packing suggestions for:", { city, activity });

    try {
        const response = await fetch('/getPackingSuggestions', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ city, activity }),
        });

        const data = await response.json();
        const suggestionsDiv = document.getElementById('suggestions');
        const actmainDiv = document.getElementById('act');
        const titleDiv = document.createElement('h2');
        titleDiv.id = 'suggestions-title';
        titleDiv.classList.add('poppins-semibold');

        suggestionsDiv.textContent = "";  
          titleDiv.textContent = "";   
      


        if (data.suggestions && data.suggestions.length > 0) {  
           
            data.suggestions.forEach(suggestion => {
                const packitem = document.createElement('div');
                packitem.textContent = suggestion;
                packitem.classList.add('items');
                packitem.classList.add('poppins-regular');
                suggestionsDiv.appendChild(packitem);
            });

            actmainDiv.prepend(titleDiv);

        } else {
            titleDiv.textContent = "No packing suggestions available.";
        }
    } catch (error) {
        console.error("Error fetching packing suggestions:", error);
        document.getElementById('suggestions-title').textContent = 'Error fetching packing suggestions.';
    }
}



// window.onload = function () {
//     const storedData = localStorage.getItem("weatherData");
//     if (storedData) {
//         const weatherData = JSON.parse(storedData);
//         displayWeather(weatherData);
//     }
// };

// document.getElementById("contact").addEventListener("click", function () {
//     document.getElementById("footer-main").scrollIntoView({ behavior: "smooth" });
// });
