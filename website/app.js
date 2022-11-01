/* Global Variables */

const { Server } = require("http");
const ser = 'http://localhost:3000'; // server to upload data

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

// Url for information weather
let baseURL = 'https://api.openweathermap.org/data/2.5/weather?lat';

// Personal API Key for OpenWeatherMap API
let apiKey = ',&appid=9b0b5dd516d35eb190d32c079eee7d92=metric';

/* Function to GET Web API Data*/
const getData = async(baseURL, zipCode ,apiKey) => {

    // Call Fake API
    const response = await fetch (baseURL + zipCode + apiKey);

    try {

        const allData = await response.json();
        console.log(allData);


        return allData;
        
    } catch (error) {
        console.log("error", error);
        // appropriately handle the error
    }
};

// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click', performAction);

function performAction() {
    // Save value when user write
    const feeling = document.getElementById('feelings').value;
    const zipCode = document.getElementById('zip').value;
 
    performAction(zipCode).then((allData) => {
        if (allData) {
            const {
                main: {temp},
                name: city,
            } = allData;
        
    
           const information = {
              newDate,
              city,
              feeling,
              temp: Math.round(temp),  // to havw a number
            }
            .then(
                updateUI()
            )
           postData(ser + '/add',information)
        };
    });
};

/* Function to POST data */
const postData = async ( url = '', information = {})=>{

    const response = await fetch(url, {
    method: 'POST', 
    credentials: 'same-origin', 
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(information), 
  });

    try {

      const newData = await response.json();
      return newData

    } catch(error) {

    console.log("error", error);
    // appropriately handle the error

    }
}

/* Function to GET Project Data */
// and update user interface
const updateUI = async () => {
    const request = await fetch(ser + '/all');
    try{

      const saveAllData = await request.json();

      document.getElementById('content').innerHTML = saveAllData.feeling;
      document.getElementById('date').innerHTML = saveAllData.newData;
      document.getElementById('temp').innerHTML = saveAllData.temp;
      document.getElementById('city').innerHTML = saveAllData.temp;
      
    }catch(error){
      console.log("error", error);
    }
};