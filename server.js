const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();
const port = 4000;

// Middleware to serve static files from the 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

// Middleware to parse incoming JSON requests
app.use(express.json());

const apiKey = 'c0f3837f11c78bea70fe521c2d1f27c1';

// Function to fetch coordinates for a location using OpenWeather Geocoding API
const getWeatherData = async (city) => {
    const url = `https://api.openweathermap.org/data/2.5/weather`;
    try {
        const response = await axios.get(url, {
            params: {
                q: city,
                appid: apiKey,
                units: 'metric',
            }
        });
        return response.data;
        
    } catch (error) {
        console.error('Error fetching weather data:', error.message);
        throw new Error('Could not fetch weather data, Please check the city name.');
    }
};


// Function to generate packing suggestions based on weather and activity
const getPackingSuggestions = (temp, humidity, speed, description, activity) => {
    const suggestions = [];

    // Weather-based suggestions based on temperature
    if (temp < 10) {
        suggestions.push(
            'Warm clothes: thermal tops, heavy sweaters, insulated jackets, wool coats, thermal leggings, fleece-lined pants',
            'Accessories: gloves, woolen scarves, beanies, insulated boots'
        );
    } else if (temp >= 10 && temp <= 25) {
        suggestions.push(
            'Moderate clothes: long-sleeve shirts, lightweight sweaters, jeans, chinos',
            'Accessories: comfortable sneakers, lightweight scarves'
        );
    } else {
        suggestions.push(
            'Light clothes: T-shirts, tank tops, shorts, sundresses, breathable fabrics (cotton or linen)',
            'Accessories: hats, sunglasses, sandals or flip-flops'
        );
    }

    // Suggestions based on humidity
    if (humidity > 55) {
        suggestions.push('Humidity considerations: pack breathable and moisture-wicking fabrics, bring a sweat towel');
    }

    // Suggestions based on wind speed
    if (speed > 15) {
        suggestions.push('Windy conditions: windbreaker or lightweight jacket, secure hats or scarves');
    }

    // Suggestions based on weather description
    if (description.includes('rain')) {
        suggestions.push('Rain protection: raincoat, umbrella, waterproof shoes');
    } else if (description.includes('snow')) {
        suggestions.push('Snow gear: insulated snow boots, heavy jackets, snow gloves');
    } else if (description.includes('clear')) {
        suggestions.push('Sunny weather: sunglasses, sunscreen, a hat');
    } else if (description.includes('cloud')) {
        suggestions.push('Cloudy weather: lightweight jacket or sweater');
    } else if (description.includes('mist') || description.includes('fog')) {
        suggestions.push('Low visibility: reflective clothing, flashlight');
    }

    // Activity-specific adjustments
    if (activity.toLowerCase() === 'hiking') {
        suggestions.push('Hiking boots', 'Backpack', 'Water bottle');
    } else if (activity.toLowerCase() === 'beach') {
        suggestions.push('Swimwear', 'Sunscreen', 'Beach towel');
    } else if (activity.toLowerCase() === 'camping') {
        suggestions.push('Tent', 'Sleeping bag', 'Flashlight');
    } else if (activity.toLowerCase() === 'cycling') {
        suggestions.push('Helmet', 'Cycling gloves', 'Water bottle');
    } else if (activity.toLowerCase() === 'skiing') {
        suggestions.push('Ski jacket', 'Goggles', 'Ski poles');
    } else if (activity.toLowerCase() === 'rock climbing') {
        suggestions.push('Climbing shoes', 'Chalk bag', 'Harness');
    } else if (activity.toLowerCase() === 'kayaking') {
        suggestions.push('Life jacket', 'Dry bag', 'Paddle');
    } else if (activity.toLowerCase() === 'bird watching') {
        suggestions.push('Binoculars', 'Field guide', 'Notebook');
    } else if (activity.toLowerCase() === 'fishing') {
        suggestions.push('Fishing rod', 'Bait', 'Tackle box');
    } else if (activity.toLowerCase() === 'trail running') {
        suggestions.push('Trail shoes', 'Water bottle', 'Sunscreen');
    } else if (activity.toLowerCase() === 'photography') {
        suggestions.push('Camera', 'Tripod', 'Extra batteries');
    } else if (activity.toLowerCase() === 'stargazing') {
        suggestions.push('Telescope', 'Star map', 'Blanket');
    } else if (activity.toLowerCase() === 'surfing') {
        suggestions.push('Surfboard', 'Wetsuit', 'Wax');
    } else if (activity.toLowerCase() === 'paddleboarding') {
        suggestions.push('Paddleboard', 'Life jacket', 'Dry bag');
    } else if (activity.toLowerCase() === 'snowboarding') {
        suggestions.push('Snowboard', 'Snow boots', 'Goggles');
    } else if (activity.toLowerCase() === 'horseback riding') {
        suggestions.push('Riding boots', 'Helmet', 'Gloves');
    } else if (activity.toLowerCase() === 'caving') {
        suggestions.push('Helmet', 'Headlamp', 'Gloves');
    } else if (activity.toLowerCase() === 'rafting') {
        suggestions.push('Life jacket', 'Paddle', 'Waterproof bag');
    } else if (activity.toLowerCase() === 'snorkeling') {
        suggestions.push('Snorkel', 'Mask', 'Fins');
    } else if (activity.toLowerCase() === 'scuba diving') {
        suggestions.push('Diving suit', 'Tank', 'Regulator');
    } else if (activity.toLowerCase() === 'ziplining') {
        suggestions.push('Gloves', 'Helmet', 'Harness');
    } else if (activity.toLowerCase() === 'bungee jumping') {
        suggestions.push('Comfortable clothes', 'Closed-toe shoes', 'GoPro');
    } else if (activity.toLowerCase() === 'paragliding') {
        suggestions.push('Harness', 'Helmet', 'Goggles');
    } else if (activity.toLowerCase() === 'skateboarding') {
        suggestions.push('Skateboard', 'Helmet', 'Knee pads');
    } else if (activity.toLowerCase() === 'mountain biking') {
        suggestions.push('Mountain bike', 'Helmet', 'Gloves');
    } else if (activity.toLowerCase() === 'outdoor yoga') {
        suggestions.push('Yoga mat', 'Water bottle', 'Comfortable clothes');
    } else if (activity.toLowerCase() === 'geocaching') {
        suggestions.push('GPS device', 'Pen', 'Notebook');
    } else if (activity.toLowerCase() === 'paintball') {
        suggestions.push('Paintball gun', 'Mask', 'Protective clothing');
    } else if (activity.toLowerCase() === 'archery') {
        suggestions.push('Bow', 'Arrows', 'Target');
    } else if (activity.toLowerCase() === 'golf') {
        suggestions.push('Golf clubs', 'Golf balls', 'Gloves');
    } else if (activity.toLowerCase() === 'kite flying') {
        suggestions.push('Kite', 'String', 'Gloves');
    } else if (activity.toLowerCase() === 'boating') {
        suggestions.push('Life jacket', 'Anchor', 'First aid kit');
    } else if (activity.toLowerCase() === 'orienteering') {
        suggestions.push('Compass', 'Map', 'Whistle');
    } else if (activity.toLowerCase() === 'sledding') {
        suggestions.push('Sled', 'Gloves', 'Warm clothes');
    } else if (activity.toLowerCase() === 'ice skating') {
        suggestions.push('Ice skates', 'Helmet', 'Warm clothes');
    } else if (activity.toLowerCase() === 'volleyball') {
        suggestions.push('Volleyball', 'Knee pads', 'Sunscreen');
    } else if (activity.toLowerCase() === 'rockhounding') {
        suggestions.push('Rock hammer', 'Chisel', 'Safety goggles');
    } else if (activity.toLowerCase() === 'wildlife photography') {
        suggestions.push('Camera', 'Telephoto lens', 'Camouflage clothing');
    } else if (activity.toLowerCase() === 'kite surfing') {
        suggestions.push('Kite', 'Harness', 'Wetsuit');
    } else if (activity.toLowerCase() === 'basketball') {
     suggestions.push('Basketball', 'Sneakers', 'Jersey');
} else if (activity.toLowerCase() === 'soccer' || activity.toLowerCase() === 'football') {
    suggestions.push('Soccer Ball', 'Cleats', 'Shin Guards');
} else if (activity.toLowerCase() === 'tennis') {
    suggestions.push('Tennis Racket', 'Tennis Balls', 'Wristbands');
} else if (activity.toLowerCase() === 'table tennis') {
    suggestions.push('Paddle', 'Ping Pong Balls', 'Sports Shoes');
} else if (activity.toLowerCase() === 'badminton') {
    suggestions.push('Badminton Racket', 'Shuttlecocks', 'Grip Tape');
} else if (activity.toLowerCase() === 'baseball') {
    suggestions.push('Baseball Bat', 'Glove', 'Cap');
} else if (activity.toLowerCase() === 'rugby') {
    suggestions.push('Rugby Ball', 'Mouth Guard', 'Cleats');
} else if (activity.toLowerCase() === 'wrestling') {
    suggestions.push('Wrestling Shoes', 'Headgear', 'Singlet');
} else if (activity.toLowerCase() === 'boxing') {
    suggestions.push('Boxing Gloves', 'Mouthguard', 'Hand Wraps');
} else if (activity.toLowerCase() === 'mma') {
    suggestions.push('MMA Gloves', 'Rash Guard', 'Shin Guards');
} else if (activity.toLowerCase() === 'gym workout') {
    suggestions.push('Gym Bag', 'Water Bottle', 'Weightlifting Gloves');
} else if (activity.toLowerCase() === 'crossfit') {
    suggestions.push('Workout Gloves', 'Resistance Bands', 'Jump Rope');
} else if (activity.toLowerCase() === 'powerlifting') {
    suggestions.push('Knee Sleeves', 'Wrist Wraps', 'Deadlift Socks');
} else if (activity.toLowerCase() === 'marathon running') {
    suggestions.push('Energy Gels', 'Running Shorts', 'Compression Socks');
} else if (activity.toLowerCase() === 'handball') {
    suggestions.push('Handball', 'Knee Pads', 'Sports Shoes');
} else if (activity.toLowerCase() === 'lacrosse') {
    suggestions.push('Lacrosse Stick', 'Helmet', 'Protective Gear');
} else if (activity.toLowerCase() === 'hockey') {
    suggestions.push('Hockey Stick', 'Puck', 'Helmet');
} else if (activity.toLowerCase() === 'swimming') {
    suggestions.push('Swimsuit', 'Goggles', 'Swim Cap');

} else if (activity.toLowerCase() === 'soccer' || activity.toLowerCase() === 'football') {
    suggestions.push('Soccer Ball', 'Cleats', 'Shin Guards');
} else if (activity.toLowerCase() === 'tennis') {
    suggestions.push('Tennis Racket', 'Tennis Balls', 'Wristbands');
} else if (activity.toLowerCase() === 'table tennis') {
    suggestions.push('Paddle', 'Ping Pong Balls', 'Sports Shoes');
} else if (activity.toLowerCase() === 'badminton') {
    suggestions.push('Badminton Racket', 'Shuttlecocks', 'Grip Tape');
} else if (activity.toLowerCase() === 'baseball') {
    suggestions.push('Baseball Bat', 'Glove', 'Cap');
} else if (activity.toLowerCase() === 'rugby') {
    suggestions.push('Rugby Ball', 'Mouth Guard', 'Cleats');
} else if (activity.toLowerCase() === 'wrestling') {
    suggestions.push('Wrestling Shoes', 'Headgear', 'Singlet');
} else if (activity.toLowerCase() === 'boxing') {
    suggestions.push('Boxing Gloves', 'Mouthguard', 'Hand Wraps');
} else if (activity.toLowerCase() === 'mma') {
    suggestions.push('MMA Gloves', 'Rash Guard', 'Shin Guards');
} else if (activity.toLowerCase() === 'gym workout') {
    suggestions.push('Gym Bag', 'Water Bottle', 'Weightlifting Gloves');
} else if (activity.toLowerCase() === 'crossfit') {
    suggestions.push('Workout Gloves', 'Resistance Bands', 'Jump Rope');
} else if (activity.toLowerCase() === 'powerlifting') {
    suggestions.push('Knee Sleeves', 'Wrist Wraps', 'Deadlift Socks');
} else if (activity.toLowerCase() === 'marathon running') {
    suggestions.push('Energy Gels', 'Running Shorts', 'Compression Socks');
} else if (activity.toLowerCase() === 'handball') {
    suggestions.push('Handball', 'Knee Pads', 'Sports Shoes');
} else if (activity.toLowerCase() === 'lacrosse') {
    suggestions.push('Lacrosse Stick', 'Helmet', 'Protective Gear');
} else if (activity.toLowerCase() === 'hockey') {
    suggestions.push('Hockey Stick', 'Puck', 'Helmet');
} else if (activity.toLowerCase() === 'swimming') {
    suggestions.push('Swimsuit', 'Goggles', 'Swim Cap');
} else if (activity.toLowerCase() === 'fencing') {
    suggestions.push('Fencing Sword', 'Protective Jacket', 'Mask');
} else if (activity.toLowerCase() === 'cricket') {
    suggestions.push('Cricket Bat', 'Pads', 'Helmet');
} else if (activity.toLowerCase() === 'softball') {
    suggestions.push('Softball Glove', 'Bat', 'Cleats');
} else if (activity.toLowerCase() === 'field hockey') {
    suggestions.push('Hockey Stick', 'Shin Guards', 'Mouth Guard');
} else if (activity.toLowerCase() === 'bowling') {
    suggestions.push('Bowling Ball', 'Bowling Shoes', 'Wrist Support');
} else if (activity.toLowerCase() === 'disc golf') {
    suggestions.push('Frisbee Discs', 'Bag', 'Scorecard');
} else if (activity.toLowerCase() === 'ultimate frisbee') {
    suggestions.push('Frisbee', 'Sports Shoes', 'Knee Pads');
} else if (activity.toLowerCase() === 'dodgeball') {
    suggestions.push('Rubber Dodgeball', 'Sportswear', 'Knee Pads');
} else if (activity.toLowerCase() === 'squash') {
    suggestions.push('Squash Racket', 'Ball', 'Eye Protection');
} else if (activity.toLowerCase() === 'racquetball') {
    suggestions.push('Racquet', 'Racquetball Goggles', 'Ball');
} else if (activity.toLowerCase() === 'polo') {
    suggestions.push('Polo Mallet', 'Helmet', 'Riding Boots');
} else if (activity.toLowerCase() === 'water polo') {
    suggestions.push('Water Polo Ball', 'Cap', 'Swimwear');
} else if (activity.toLowerCase() === 'sailing') {
    suggestions.push('Life Jacket', 'Sailing Gloves', 'Waterproof Bag');
} else if (activity.toLowerCase() === 'rowing') {
    suggestions.push('Rowing Oars', 'Seat Pad', 'Water Bottle');
} else if (activity.toLowerCase() === 'triathlon') {
    suggestions.push('Running Shoes', 'Swim Goggles', 'Bike Helmet');
} else if (activity.toLowerCase() === 'parkour') {
    suggestions.push('Grip Gloves', 'Athletic Shoes', 'Stretching Bands');
} else if (activity.toLowerCase() === 'judo') {
    suggestions.push('Judo Gi', 'Belt', 'Mouth Guard');
} else if (activity.toLowerCase() === 'karate') {
    suggestions.push('Karate Gi', 'Belt', 'Sparring Gloves');
} else if (activity.toLowerCase() === 'taekwondo') {
    suggestions.push('Headgear', 'Chest Protector', 'Shin Guards');
} else if (activity.toLowerCase() === 'jiu-jitsu') {
    suggestions.push('BJJ Gi', 'Rash Guard', 'Mouth Guard');
} else if (activity.toLowerCase() === 'cheerleading') {
    suggestions.push('Pom-Poms', 'Cheer Shoes', 'Hair Ties');
} else if (activity.toLowerCase() === 'roller skating') {
    suggestions.push('Roller Skates', 'Knee Pads', 'Helmet');
} else {
        suggestions.push('General items: Comfortable clothes, water, snacks');
    }

    return suggestions;
};


// API endpoint for generating packing suggestions
app.post('/getPackingSuggestions', async (req, res) => {
    const { city, activity } = req.body;

    if (!city || !activity) {
        return res.status(400).json({ error: 'Both city and activity are required.' });
    }

    try {
        // Fetch weather data for the city
        const weatherData = await getWeatherData(city);
        const temp = weatherData.main.temp; // Temperature
        const humidity = weatherData.main.humidity; // Humidity
        const speed = weatherData.wind.speed; // Wind Speed
        const description = weatherData.weather[0].description.toLowerCase(); // Weather description

        // Generate packing suggestions
        const suggestions = getPackingSuggestions(temp, humidity, speed, description, activity);

        res.json({ city, suggestions });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


// Serve the index.html file for the root URL
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
