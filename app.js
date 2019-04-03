var five = require("johnny-five");
const axios = require("axios");
var board = new five.Board();

let thermometer;



board.on("ready", function() {
  thermometer = new five.Thermometer({
    freq: 1000,
    pin: "A0"
  });

  thermometer.on("data", function() {
    var currentSecond = new Date().getSeconds();
    let pit = new Date();
    let space = " ";
    let colon = ":";

    let d = pit.getDate();
    let m = pit.getMonth()+1);
    let y = pit.getFullYear();

    let s = pit.getSeconds();
    let m = pit.getMinutes();
    let h = pit.getHours();
    
    if((currentSecond % 10) == 0)
    {
      state: 'on',
      axios.post('https://thermo-db.herokuapp.com/fetchData', {
        Time: h+colon+m+colon+s + " " + d+space+m+space+y;
        Temperature: this.celsius
      })
      console.log(this.celsius + "°C", this.fahrenheit + "°F", new Date().getSeconds()); 
    }
   
  });
  

  
});
