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
    /*pit = Point In Time*/
    var pit = new Date();
    
    let s = ("0" + pit.getSeconds()).slice(-2);
    let min = ("0" + pit.getMinutes()).slice(-2);
    
    if((min % 30) == 0 && s == 0) {
      let d = ("0" + pit.getDate()).slice(-2);
      let m = ("0" + (pit.getMonth()+1)).slice(-2);
      let y = ("0" + pit.getFullYear()).slice(-2);
      
      let h = ("0" + pit.getHours()).slice(-2);
      
      console.log(this.celsius + "°C " + "~ ",this.fahrenheit + "°F " + "@ " +h+ ":" +min+ ":" +s+ " " +d+ "-" +m+ "-" +y);
      
      state: 'on',
      axios.post('https://thermo-db.herokuapp.com/fetchData', {
        Time: h+ ":" + min + ":" +s,
        Date: d+ "-" +m+ "-" +y,
        
        Temperature: this.celsius
      })
      
      .then(function (response) {
        console.log("POST Success!");
      })
      .catch(function (error) {
        console.log("An error occured with Axios");
      })
      
    }
  });
});
