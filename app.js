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
    
    let pit = new Date();
    let dash = "-";
    let colon = ":";

    let d = ('0' + pit.getDate()).slice(-2);
    let m = ('0' + (pit.getMonth()+1)).slice(-2);
    let y = pit.getFullYear();

    let s = pit.getSeconds();
    let min = pit.getMinutes();
    let h = pit.getHours();
    
    var currentMinute = min;
    
    if((currentMinute % 15) == 0 && s == 0)
    {
      state: 'on',
      axios.post('https://thermo-db.herokuapp.com/fetchData', {
        Time: h+colon+min+colon+s,
        Date: d+dash+m+dash+y,
        
        Temperature: this.celsius
      })
      console.log(this.celsius + "°C", this.fahrenheit + "°F", new Date().getSeconds());
      console.log(h+colon+min+colon+s + " " + d+dash+m+dash+y);
    }
  });
  

  
});
