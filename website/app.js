/* Global Variables */
const APIKey = '9a6d61da498a766a38506d632834a197';
const BaseURL = `https://api.openweathermap.org/data/2.5/weather&units=metric`; // units=metric query the information in celsius format
const zipError = document.getElementById('notValidZip');
const button = document.getElementById('generate');
let zipInput = document.getElementById('zip');


// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getDate() + '/' + (d.getMonth() + 1) +'/'+ d.getFullYear();


button.addEventListener('click' , checkInput);


function fetchWeather(){
    // Get the user input value 
    const feeling = document.getElementById('feelings').value;
    fetchApiInfo()
    .then(function(data){ // if the app fetch the weathe info then post the data to endpoint in server.js
        console.log(data);
        postData('/app', {
            temp: data.main.temp,
            date: newDate,
            content: feeling
        })
    .then(updateUI()) // Once data posted to endpoint in server side update the UI by displaying the data in the website dynamically from data returned by app route
    })
};


const fetchApiInfo = async()=>{
        const zip = document.getElementById('zip').value;
        const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${zip},&appid=${APIKey}&units=metric`)
        try {
            const data = await res.json();
            console.log(data);
            return data;
        } catch (error) {
            console.log("error", error);
        }
}


const postData = async (url = '', data = {}) => {
    console.log(data);
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    try {
        const newData = await response.json();
        console.log(newData);
        return newData;

    } catch (error) {
        console.log("error", error);
    }
}

// Adding the data dynamically to UI that returend from app route 
const updateUI = async ()=> {
    const req = await fetch('/app');
    try{
        const DisplayedData = await req.json();
        document.getElementById('date').innerHTML = "Date:" + DisplayedData.date;
        document.getElementById('temp').innerHTML = "Tempreture:" + DisplayedData.temp;
        document.getElementById('content').innerHTML = "Feeling:" + DisplayedData.content;
    }
    catch(error) {
        console.log("error", error);
    }
}


// Check the validate of zip user input 
function isValidZipCode(value) {
    var zipPattern = /^\d{5}$/; // Allow the user to enter 5 character zip code only
    return zipPattern.test(value);
}


function checkInput() {
    const zip = document.getElementById('zip').value;
    const feeling = document.getElementById('feelings').value;
    
    if (zip === "" || feeling === "" ) {
        console.log('You should enter the values!');
        return false;
    } else if (!isValidZipCode(zip)){
        zipError.innerHTML = 'Zip code is not valid!';
        console.log('Zip code is not valid!');
    }else{
        fetchWeather();
    }
}