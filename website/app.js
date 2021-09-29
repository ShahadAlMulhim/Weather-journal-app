/* Global Variables */
const APIKey = '9a6d61da498a766a38506d632834a197';
const BaseURL = `https://api.openweathermap.org/data/2.5/weather?q=Riyadh&appid=9a6d61da498a766a38506d632834a197&units=metric`; // units=metric query the information in celsius format

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getDate()+'/'+ d.getMonth()+'/'+ d.getFullYear();
const button = document.getElementById('generate');

button.addEventListener('click' , function(e) {
    e.preventDefault();
    fetchWeather();
})

async function fetchWeather(){
    const zip = document.getElementById('zip').value;
    const feeling = document.getElementById('feelings').value;
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${zip},&appid=${APIKey}&units=metric`);
    const result = await response.json();
    const tempreture = result.main.temp;
    const info = {
        Tempreture: tempreture,
        Date: newDate,
        Content: feeling
    }
    console.log(result);
    console.log(info);
    
} 

const PostData = async (url = '' , data = {})=>{
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type' : 'application/json',
        },
        body: JSON.stringify(data);
    })
}
PostData('/app', zip);

// Assign element properties dynamically by adding three child divs to entryHolder div
const entryHolder = document.getElementById('entryHolder');
const date1 = document.createElement('div')
date1.setAttribute('id', 'date');
const temp1 = document.createElement('div')
temp1.setAttribute('id', 'temp');
const content1 = document.createElement('div');
content1.setAttribute('id', 'content');
entryHolder.appendChild(date1);
entryHolder.appendChild(temp1);
entryHolder.appendChild(content1);