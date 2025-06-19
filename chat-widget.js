async function sendMessage() {
    let inputBox = document.getElementById("user-input");
    let chatBox = document.getElementById("chat-box");
    let userMessage = inputBox.value;

    if (!userMessage) return;

    // Display user message
    chatBox.innerHTML += `<p><b>You:</b> ${userMessage}</p>`;
    inputBox.value = "";

    // Fetch AI response
    let response = await getActivitySuggestions(userMessage);
    
    // Display AI response
    chatBox.innerHTML += `<p><b>AI:</b> ${response}</p>`;
    chatBox.scrollTop = chatBox.scrollHeight;
}

async function getActivitySuggestions(location) {
    const weatherData = await getWeather(location);

    const response = await fetch("https://api.cohere.ai/v1/generate", {
        method: "POST",
        headers: {
            "Authorization": "Bearer yR0lzsxPzmvxjLmBkGDTphaMwdlbEDrugWK5mAuy",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            model: "command-r-plus",
            prompt: `I am a travel assistant. The weather in ${location} is ${weatherData}. Suggest the best activities to do there.`,
            max_tokens: 100
        })
    });

    const data = await response.json();
    return data.generations[0].text || "Sorry, I couldn't find any activities.";
}

async function getWeather(location) {
    const API_KEY = "c0f3837f11c78bea70fe521c2d1f27c1";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}&units=metric`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        return `Temperature: ${data.main.temp}°C, Condition: ${data.weather[0].description}`;
    } catch (error) {
        return "Weather data unavailable.";
    }
}
