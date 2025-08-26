document. addEventListener ("DOMContentLoaded", ()=>{
    const OWM_API = "a4da0237c9c4411ec9c614d728e18e0f"; 
    const GEMINI_API_KEY = "AIzaSyDMpDE4ksv0aKkO9QP1eDcdj7FIf7VS1rE";
    let clockInterval = null;


    const searchForm = document.getElementById ( 'search-form');
    const cityInput = document.getElementById ('city-input');
    const geolocationBtn = document.getElementById ('geolocation-btn');
    const loadingOverlay = document.getElementById ('loading-overlay');
    const weatherContent = document.getElementById ( 'weather-content');
    const errorModal = document.getElementById ('error-modal');
    const errorMessageEl = document.getElementById ('error-message');
    const closeModalBtn = document.getElementById ('close-modal-btn');
    const animationContainer = document.getElementById ( 'animation-container');
    const suggestionsBox = document.getElementById ('suggestions-box');
    const cityNameEl = document.getElementById ('city-name');
    const currentDateEl = document.getElementById ('current-date');
    const currentTimeEl = document.getElementById ('current-time');
    const currentTempEl = document.getElementById ('current-temp');
    const currentWeatherDescEl = document.getElementById ('current-weather-desc');
    const currentWeatherIconEl = document.getElementById ('current-weather-icon');
    const forecastContainer = document.getElementById ('forecast-container');
    const randomSentence = document.getElementById('random-sentence')

    const sunriseTimeEl = document. getElementById ( 'sunrise-time');
    const sunsetTimeEl = document.getElementById ('sunset-time');
    const humidityEl = document.getElementById ('humidity');
    const windSpeedEl = document.getElementById ( 'wind-speed');
    const feelsLikeEl = document.getElementById('feels-like');
    const pressureEl = document. getElementById ( 'pressure');
    const visibilityEl = document.getElementById( 'visibility');
    const airQualityEl = document.getElementById( 'air-quality');
    const healthRecommendationsEl = document.getElementById('health-recommendations');

    // // Chatbot elements
    // const openChatBtn = document.getElementById ('openChatBtn') ;
    // const chatbotContainer = document.getElementById ('chatbotContainer') ;
    // const closeChatBtn = document.getElementById('closeChatBtn') ;
    // const sendMessageBtn = document.getElementById ('sendMessageBtn') ;
    // const chatInput = document.getElementById('chatInput');
    // const chatMessages = document.getElementById('chatMessages') ;

    // Added: Chatbot elements including typing indicator
    const openChatBtn = document.getElementById('openChatBtn');
    const chatbotContainer = document.getElementById('chatbotContainer');
    const closeChatBtn = document.getElementById('closeChatBtn');
    const sendMessageBtn = document.getElementById('sendMessageBtn');
    const chatInput = document.getElementById('chatInput');
    const chatMessages = document.getElementById('chatMessages');
    const typingIndicator = document.getElementById('typingIndicator');



        const backgroundImageDay ={
            Clear:'https://images.unsplash.com/photo-1601297183305-6df142704ea2?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            Clouds:'https://plus.unsplash.com/premium_photo-1673651378047-88a654e7a9b4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            Rain:'https://images.unsplash.com/photo-1519692933481-e162a57d6721?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            Drizzle:'https://static.independent.co.uk/s3fs-public/thumbnails/image/2015/07/27/08/weather-rain-Getty.jpg',
            Thunderstorm:'https://images.unsplash.com/photo-1605727216801-e27ce1d0cc28?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            Snow:'https://images.unsplash.com/photo-1641411921605-5e45f6b677ce?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            Mist:'https://images.unsplash.com/photo-1543968996-ee822b8176ba?q=80&w=2128&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            default:'https://images.unsplash.com/photo-1464660439080-b79116909ce7?q=80&w=2102&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        }

        const backgroundImageNight = {
            Clear:'https://images.unsplash.com/photo-1628725022723-00a47a683320?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            Clouds:'https://images.unsplash.com/photo-1503355292172-d861fcfa2228?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            Rain:'https://images.unsplash.com/photo-1470432581262-e7880e8fe79a?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            Drizzle:'https://images.unsplash.com/photo-1671544646787-7f183d6e2369?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            Thunderstorm:'https://images.unsplash.com/photo-1625818002003-c36cc8714a46?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            Snow:'https://images.unsplash.com/photo-1504805402391-d11b68988fd2?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            Mist:'https://images.unsplash.com/photo-1736714686274-ae5d9563e640?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            default:'https://images.unsplash.com/photo-1680542993889-078ce9c8538a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
        }

        const fetchWeather = async ({lat, lon, city}) =>{
            showLoading();
            if(clearInterval) clearInterval;
            (clockInterval);

            try {
                if(!OWM_API) throw new Error("OpenWeatherMap API key is missing");
                let latitude = lat;
                let longitude = lon;

                if(city){
                    const geoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${OWM_API}`;
                    const getResponse = await fetch(geoUrl);
                    if(!getResponse.ok) throw new Error(`Could not find weather data for ${city}`);
                    const geoData = await getResponse.json();
                    if(geoData.length === 0) throw new Error(`Could not find Location data for ${city}`);
                    latitude = geoData[0].lat;
                    longitude = geoData[0].lon;

                }

                const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${OWM_API}&units=metric` ;
                const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${OWM_API}&units=metric` ;
                const aqiUrl = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${latitude}&lon=${longitude}&appid=${OWM_API}`;
                
                const [weatherResponse, forecastResponse, aqiResponse] = await Promise.all([
                    fetch(weatherUrl),
                    fetch(forecastUrl),
                    fetch(aqiUrl)
                ])

                if([weatherResponse, forecastResponse, aqiResponse].some(res => !res.ok)){
                    throw new Error(`Failed to fetch all weather data. Please check your API key and network connection`);

                }

                const weatherData = await weatherResponse.json();
                const forecastData = await forecastResponse.json();
                const aqiData = await aqiResponse.json();

                updateUI(weatherData, forecastData, aqiData);

            } catch (error) {
                console.error("Weather Data Fetch Error: ", error);
                showError(error.message);

            }finally{
                hideLoding();
            }

        }


        const updateUI = (weather, forecast, aqi)=>{
            let weatherConditionForBg = weather.weather[0].main;
            if (weatherConditionForBg === "Clouds" && weather.clouds.all< 20){
                weatherConditionForBg = "Clear";  //new start 
            }
            updateClock(weather.timezone);
            clockInterval = setInterval(()=> updateClock (weather.timezone), 1000);

            const currentTimeUTC = weather.dt;
            const sunriseUTC = weather.sys.sunrise;
            const sunsetUTC = weather.sys.sunset;
            const isNight = (currentTimeUTC < sunriseUTC || currentTimeUTC > sunsetUTC);

            const backgroundSet = isNight? backgroundImageNight : backgroundImageDay;
            document.body.style.backgroundImage = `url('${backgroundSet[weatherConditionForBg] || backgroundSet.default}')`;

            currentWeatherIconEl.src=`https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`

            cityNameEl.textContent =`${weather.name}, ${weather.sys.country} `;
            const localDate = new Date((weather.dt + weather.timezone) *1000);
            currentDateEl.textContent = localDate.toLocaleDateString("en-US",{weekday:"long", month:"long", day:"numeric", timeZone:"UTC"})
            currentTempEl.textContent = `${Math.round(weather.main.temp)}°`;
            currentWeatherDescEl.textContent = weather.weather[0].description; 

            const formatTime = (timestamp) => new Date(timestamp * 1000).toLocaleTimeString("en-US", {hour: "2-digit", minute: "2-digit", hour12: true, timeZone: "UTC"}) ;
            sunriseTimeEl.textContent = formatTime(weather.sys.sunrise + weather.timezone);
            sunsetTimeEl.textContent = formatTime(weather.sys.sunset + weather.timezone);

            humidityEl.textContent = `${weather.main.humidity}%`;
            windSpeedEl.textContent = `${(weather.wind.speed * 3.6). toFixed (1)} km/h` ;
            feelsLikeEl. textContent = `${Math.round(weather.main.feels_like)}°`;
            pressureEl. textContent = `${weather.main.pressure} hPa`;
            visibilityEl. textContent = `${(weather.visibility / 1000). toFixed (1)} km`; 

            const aqiValue = aqi. list[0].main.aqi;
            const aqiInfo = getAqiInfo(aqiValue);
            airQualityEl.textContent = aqiInfo.text;
            airQualityEl.className = `font-bold px-3 py-1 rounded-full text-sm ${aqiInfo. color}`;
            healthRecommendationsEl.innerHTML = `<p class="text-gray-200 text-sm">${aqiInfo.recommendation}</p>`;

            const dailyForecast = processForecast(forecast.list);

            forecastContainer.innerHTML = "";
            dailyForecast.forEach(day =>{
                const card= document.createElement("div");
                card.className = `p-4 rounded-2xl text-center card backdrop-blur-xl`;
                card. innerHTML =`
                    <p class="font-bold text-lg">${new Date (day.dt_txt).toLocaleDateString("en-US", {weekday: "short"})}</p>
                    <img src="https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png" alt="${day.weather[0].description}" class="w-16 h-16 mx-auto"> 
                    <p class="text-md font-semibold">${day.weather[0].description} </p>
                    <br>
                    <p class="font-semibold">${Math.round (day.main.temp_max)}°/ ${Math.round (day.main.temps_min)}°</p> `;
                forecastContainer.appendChild(card);
            });

            updateNightAnimation(isNight, weatherConditionForBg);

        }

        const processForecast=(forecastList)=>{
            const dailyData = {};
            forecastList.forEach(entry =>{
                const date = entry.dt_txt.split(' ')[0];
                if(!dailyData[date]){
                    dailyData[date] = { temps_max: [], temps_min: [], icons:{},
                    entry:null}
                }
                dailyData [date]. temps_max.push (entry.main.temps_max); 
                dailyData[date].temps_min.push (entry.main.temp_min);
                const icon = entry.weather[0].icon;
                dailyData[date].icons[icon] = (dailyData[date].icons[icon] || 0) +1;

                if(!dailyData[date].entry || entry.dt_txt.includes("12:00:00")){
                    dailyData[date].entry = entry;
                }
            });

            const processed = [];
            for (const date in dailyData){
                const day = dailyData [date];
                const mostCommonIcon = Object.keys(day.icons).reduce((a,b)=> day.icons[a]>day.icons[b] ? a:b);
                day.entry.weather[0].icon = mostCommonIcon;
                day.entry.main.temps_max = Math.max (...day.temps_max)
                day.entry.main.temps_min = Math.max (...day.temps_min)
                processed.push(day.entry)
            }
            return processed.slice(0,5);
        }


        const updateNightAnimation = (isNight, condition)=>{
            animationContainer.innerHTML = "";
            if(!isNight) return;

            if(condition === "clear" ){
                for(let i=0; i<20; i++){
                    const star = document. createElement ('div');
                    star.className = 'star';
                    star.style. top = `${Math.random() * 100}%`;
                    star.style. left = `${Math. random() * 100}%`;
                    star.style.width = `${Math.random() * 2 + 1}px`;
                    star.style.height = star.style.width;
                    star.style.animationDelay = `${Math. random() * 5}s`;
                    star.style.animationDuration = `${Math.random() * 3 + 2}s`;
                    animationContainer.appendChild(star);
                }
            }
            else if(condition === "rain" || condition === "drizzle"){
                for(let i=0; i<50; i++){
                    const drop = document. createElement ('div');
                    drop.className = 'rain-drop';
                    //drop.style. top = `${Math.random() * 100}%`;
                    drop.style. left = `${Math. random() * 100}%`;
                    //drop.style.width = `${Math.random() * 2 + 1}px`;
                    //drop.style.height = drop.style.width;
                    drop.style.animationDelay = `${Math. random() * 2}s`;
                    drop.style.animationDuration = `${Math.random() * 0.5 + 0.5}s`;
                    animationContainer.appendChild(drop);
                }
            }
            else if(condition === "snow"){
                for(let i=0; i<50; i++){
                    const flake = document. createElement ('div');
                    flake.className = 'snowFlake';
                    //drop.style. top = `${Math.random() * 100}%`;
                    flake.style. left = `${Math. random() * 100}%`;
                    //drop.style.width = `${Math.random() * 2 + 1}px`;
                    //drop.style.height = drop.style.width;
                    flake.style.animationDelay = `${Math. random() * 10}s`;
                    flake.style.animationDuration = `${Math.random() * 5 + 5}s`;
                    flake.style.opacity = `${Math.random()* 0.5 + 0.3}`;
                    animationContainer.appendChild(flake);
                }
            }

        }

        const getAqiInfo = (aqi) =>{
            switch(aqi){
                case 1: return { text: 'Good', color: 'bg-green-500 text-white', recommendation: "Air quality is great. It's a perfect day to be active outside." };
                case 2: return { text: 'Fair', color: 'bg-yellow-500 text-black', recommendation: "Air quality is acceptable. Unusually sensitive people should consider reducing prolonged or heavy exertion." }; 
                case 3: return {text: 'Moderate', color: 'bg-orange-500 text-white', recommendation: "Sensitive groups may experience health effects. The general public is less likely to be affected." }; 
                case 4: return { text: 'Poor', color: 'bg-red-500 text-white', recommendation: "Everyone may begin to experience health effects. Members of sensitive groups may experience more serious health effects. " };
                case 5: return { text: 'Very Poor', color: 'bg-purple-700 text-white', recommendation: "Health alert: The risk of health effects is increased for everyone. Avoid outdoor activities." };
                default: return { text: 'Unknown', color: 'bg-gray-500 text-white', recommendation: "Air quality data is not available at the moment." };
            } 
        };


        const debounce = (func, delay)=>{
            let timeout;
            return(...args) => {
                clearTimeout (timeout);
                timeout = setTimeout (()=> func.apply (this, args),delay);
            }
        }

        const handleCityInput = async (event) =>{
            const query = event. target. value;
            if (query. length < 3){
                suggestionsBox. classList. add ("hidden"); 
                return;
            }
            try {
                const geoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${OWM_API}`;
                const response = await fetch(geoUrl);
                if (!response.ok) return;
                const cities = await response.json();

                suggestionsBox. innerHTML = "";
                if (cities. length > 0){
                    suggestionsBox.classList.remove("hidden");
                    cities.forEach(city =>{
                        const div = document.createElement("div");
                        div. className = 'p-3 hover:bg-white/10 cursor-pointer';
                        div.textContent = `${city.name}, ${city.state ? city.state + ', ' : ' ' } ${city.country}`;
                        div.onclick = ()=>{
                            cityInput.value = city.name;
                            suggestionsBox.classList.add("hidden");
                            fetchWeather({lat:city.lat, lon:city.lon});
                        } 
                        suggestionsBox.appendChild(div);
                    })
                }
                else{
                    suggestionsBox.classList.add("hidden");
                }

            }catch (error) {
                console.error ("Suggestion fetch error:", error)
            }
        }


        function getRandomSentence(){
            const sentence = [
                "Hi! I'm your personal AI WeatherBot. Get quick tips on what to wear, eat, do, and whether to carry an umbrella- all based on today's weather 😊",
                "Hi! I'm your AI WeatherBot. I give quick, daily suggestions on outfits, meals, activities, and whether to bring an umbrella—weather-smart and ready to go! 😎",
                "Hi! I'm your AI WeatherBot. Count on me for quick advice on what to wear, eat, and do today—plus whether to pack an umbrella. 🤖"
            ]

            const index = Math.floor(Math.random()*sentence.length);
            return sentence[index];
        }

        randomSentence.innerHTML = getRandomSentence();

        

        const updateClock = (timezoneOffset)=>{
            const now = new Date();
            const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
            const localTime = new Date(utc + (timezoneOffset * 1000));
            currentTimeEl.textContent = localTime.toLocaleTimeString ("en-US",{hour:"2-digit", minute:"2-digit", second:"2-digit", hour12:true})
        }
        
        const showLoading = () =>{
            loadingOverlay.classList.remove("hidden");
            loadingOverlay.classList.add("flex");
        }

        const hideLoding = () =>{
            loadingOverlay.classList.add("hidden");
            loadingOverlay.classList.remove("flex");
            weatherContent.classList.remove("opacity-0");
        }

        const showError = (message) =>{
            errorMessageEl.textContent = message;
            errorModal.classList.remove("hidden");
        }


        searchForm.addEventListener("submit", (e)=>{
            e.preventDefault() ;
            const city = cityInput.value.trim();
            if(city) fetchWeather({city});
            suggestionsBox.classList.add("hidden"); 
            cityInput.value= "";
        })

        cityInput.addEventListener("input", debounce(handleCityInput, 300)); 

        document.addEventListener("click", (e) =>{
            if(!searchForm.contains(e.target)){
                suggestionsBox.classList.add("hidden");
            }
        });

        geolocationBtn.addEventListener("click", () =>{
            if (navigator.geolocation){
                navigator.geolocation.getCurrentPosition(
                    (position)=> fetchWeather({lat:position.coords.latitude, lon:position.coords.longitude}),
                    ()=>{
                        console. log("Geolocation failed or was denied. Falling back to default city.");
                        fetchWeather({city: "New Delhi"});
                    },
                    {enableHighAccuracy: true, timeout:30000, maximumAge: 0}
                );
            } else {
                console. log ("Geolocation not suppoted. Falling back to default city.");
                fetchWeather({city:"New Delhi"});
            }
        });

        closeModalBtn.addEventListener("click", ()=>{
            errorModal. classList.add ("hidden");
        });

        //XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

    //     // Chatbot functionality
    // openChatBtn.addEventListener('click', () => {
    //     chatbotContainer.classList.remove('hidden', 'translate-y-full');
    //     chatbotContainer.classList.add('translate-y-0');
    //     chatInput.focus();
    // });

    // closeChatBtn.addEventListener('click', () => {
    //     chatbotContainer.classList.add('translate-y-full');
    //     setTimeout(() => chatbotContainer.classList.add('hidden'), 300);
    // });

    // sendMessageBtn.addEventListener('click', sendMessage);
    // chatInput.addEventListener('keypress', (e) => {
    //     if (e.key === 'Enter') sendMessage();
    // });

    // function sendMessage() {
    //     const message = chatInput.value.trim();
    //     if (!message) return;

    //     const userMessage = document.createElement('div');
    //     userMessage.className = 'chat-message user mb-2 text-right';
    //     userMessage.innerHTML = `<div class="chat-bubble user-bubble">${message}</div>`;
    //     chatMessages.appendChild(userMessage);

    //     setTimeout(() => {
    //         const botMessage = document.createElement('div');
    //         botMessage.className = 'chat-message bot mb-2';
    //         botMessage.innerHTML = `<div class="chat-bubble bot-bubble">Thanks for your message! I'm a dummy AI, so I'll just say: Looks like sunny vibes ahead! ������</div>`;
    //         chatMessages.appendChild(botMessage);
    //         chatMessages.scrollTop = chatMessages.scrollHeight;
    //     }, 500);

    //     chatInput.value = '';
    //     chatMessages.scrollTop = chatMessages.scrollHeight;
    // }
    //xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx




    // Chatbot functionality
    openChatBtn.addEventListener('click', () => {
        chatbotContainer.classList.remove('hidden', 'translate-y-full');
        chatbotContainer.classList.add('translate-y-0');
        chatInput.focus();
    });

    closeChatBtn.addEventListener('click', () => {
        chatbotContainer.classList.add('translate-y-full');
        setTimeout(() => chatbotContainer.classList.add('hidden'), 300);
    });

    sendMessageBtn.addEventListener('click', sendMessage);
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendMessage();
    });

    // Added: Function to fetch response from Gemini API
    async function fetchGeminiResponse(message, temperature, weather) {
        try {
            const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-goog-api-key': GEMINI_API_KEY
                },
                body: JSON.stringify({
                    contents: [
                        {
                            parts: [
                                {
                                    text: `Based on the current temperature ${temperature} and weather ${weather}, ${message}`
                                }
                            ]
                        }
                    ]
                })
            });

            if (!response.ok) {
                throw new Error('Failed to fetch response from Gemini API');
            }

            const data = await response.json();
            // Assuming the API returns a response in a format like { candidates: [{ content: { parts: [{ text: "response" }] } }] }
            const aiResponse = data.candidates?.[0]?.content?.parts?.[0]?.text || 'Sorry, I could not process your request.';
            return aiResponse;
        } catch (error) {
            console.error('Gemini API Error:', error);
            return 'Thanks for your message! I\'m a dummy AI, so I\'ll just say: Looks like sunny vibes ahead! ������';
        }
    }

    // Added: Updated sendMessage function with typing indicator and Gemini API call
    async function sendMessage() {
        const message = chatInput.value.trim();
        if (!message) return;

        // Add user message
        const userMessage = document.createElement('div');
        userMessage.className = 'chat-message user mb-2 text-right';
        userMessage.innerHTML = `<div class="chat-bubble user-bubble">${message}</div>`;
        chatMessages.appendChild(userMessage);

        // Show typing indicator
        typingIndicator.classList.remove('hidden');

        // Scroll to bottom
        chatMessages.scrollTop = chatMessages.scrollHeight;

        // Get current temperature from UI
        const temperature = currentTempEl.textContent || 'unknown';

        //Get current Weather from UI - )OWNNNNNNNNNNNNNNNNNNNNNNNNNNNNNN
        const weather = currentWeatherDescEl.textContent || 'unknown';


        
        // Fetch AI response from Gemini API
        const botResponse = await fetchGeminiResponse(message, temperature, weather);

        // Hide typing indicator
        typingIndicator.classList.add('hidden');

        // Add bot response
        const botMessage = document.createElement('div');
        botMessage.className = 'chat-message bot mb-2';
        botMessage.innerHTML = `<div class="chat-bubble bot-bubble">${botResponse}</div>`;
        chatMessages.appendChild(botMessage);

        // Clear input and scroll to bottom
        chatInput.value = '';
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

        geolocationBtn.click();

})


//AIzaSyDMpDE4ksv0aKkO9QP1eDcdj7FIf7VS1rE

//ssssssssssssssssyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyycccccccccccccccccccccccccc
