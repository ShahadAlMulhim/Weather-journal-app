/* Global Variables */
const APIKey = '9a6d61da498a766a38506d632834a197';
const BaseURL = `https://api.openweathermap.org/data/2.5/weather?appid=${APIKey}&units=metric`; // units=metric query the information in celsius format


// Assign element properties dynamically by adding three child divs to entryHolder div
const entryHolder = document.getElementById('entryHolder');
const date = document.createElement('div');
date.setAttribute('id', 'date');
date.textContent = 'Date:'
date.setAttribute('style','font-size: 18px;');
date.setAttribute('style','color: white;');

const temp = document.createElement('div');
temp.setAttribute('id', 'temp');
temp.textContent = 'Tempreture:'
temp.setAttribute('style', 'font-size: 18px;');
temp.setAttribute('style', 'color: white;');

const content = document.createElement('div');
content.setAttribute('id', 'content');
content.textContent = 'Feeling:'
content.setAttribute('style', 'font-size: 18px;');
content.setAttribute('style', 'color: white;');

entryHolder.appendChild(date);
entryHolder.appendChild(temp);
entryHolder.appendChild(content);



// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getDate()+'/'+ d.getMonth()+'/'+ d.getFullYear();



const button = document.getElementById('generate');
button.addEventListener('click' , function(e) {
    e.preventDefault();
    fetchWeather();
})



async function fetchWeather(){
    // Get the user input value 
    const zip = document.getElementById('zip').value;
    const feeling = document.getElementById('feelings').value;
    
    const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${zip},&appid=${APIKey}&units=metric`);
    const result = await res.json();
    const tempreture = result.main.temp;
    // console.log(result);
    
    const info = { 
        temp: tempreture, 
        date: newDate, 
        content: feeling 
    };
    
    const response = await fetch('/app', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(info),
    });

    try {
        const newData = await response.json();
        console.log(newData);
        return newData;

    } catch (error) {
        console.log("error", error);
    }
}
    
    
   // date.textContent = 'Date:' + '  ' + newDate;
    // temp.textContent = 'Tempreture:' + '  ' + tempreture;
   // content.textContent = 'Feeling:' + '  ' + feeling; 
   /* document.getElementById('date').innerHTML = newData[0].date;
    document.getElementById('temp').innerHTML = newData[1].temp;
    document.getElementById('content').innerHTML = newData[2].content; */

    /* const response = await fetch('/app', data);
    const jsonRes = await response.json();
    console.log(jsonRes); */


