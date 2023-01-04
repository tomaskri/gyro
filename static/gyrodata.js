
var verbose = false;

document.addEventListener('DOMContentLoaded', function() {
    const accX = document.querySelector('#accX');
    const accY = document.querySelector('#accY');
    const accZ = document.querySelector('#accZ');
    const interval = document.querySelector('#interval');
    const gyroX = document.querySelector('#gyroX');
    const gyroY = document.querySelector('#gyroY');
    const gyroZ = document.querySelector('#gyroZ');
    const oriX = document.querySelector('#oriX');
    const oriY = document.querySelector('#oriY');
    const oriZ = document.querySelector('#oriZ');
    const posX = document.querySelector('#posX');
    const posY = document.querySelector('#posY');
    const posZ = document.querySelector('#posZ');
    // const date = new Date();
    var time_last_reading = Date.now(); 
    

    // Enable pusher logging - don't include this in production
    var pusher = new Pusher('aeef6c853dfdf70e1390', {
      cluster: 'eu' //, encrypted:true
    });
    pusher.logToConsole = true;
    var channel = pusher.subscribe('publishers');
    console.log(Object.keys(channel));
    console.log(Object.keys(pusher));
    
    // channel.bind('client-my-event', function(data) {
    //   alert(JSON.stringify(data));
    // });
    channel.bind('my-event', function(data) {
      alert(JSON.stringify(data));
    });
    channel.bind("receive-message", function(data){
      console.log(`received message: ${JSON.stringify(data)}`);
    });

    async function sendMessage(message) {
      // channel.trigger("client-my-event", {"message":message});
      // const response = await fetch('/send_message', {
      //   method: 'POST',
      //   body: JSON.stringify({message }),
      //   headers: {
      //     'Content-Type': 'application/x-www-form-urlencoded'
      //   }
      // });

      fetch('/send_message', {
        method: 'POST',
        body: JSON.stringify({message: message, to_channel:"Computers"}),
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });
    //   if (response.status === 204) {
    //     console.log('Message sent successfully');
    //   } else {
    //     console.error('Error sending message');
    //   }
    }
    

    // const socket = io();
    
    // socket.on('connect', () => {
      //   console.log('Connected to server');
      // });
      
      // socket.on('message', (message) => {
        //   console.log(message);
        // });
        
    // function join_room(message){
    //   console.log(`joining room: ${message["room"]}`);
    //   socket.emit("join", {"username":message["username"], "room":message["room"]});
    // };

    // function leave_room(message){
    //   console.log(`leaving room: ${message["room"]}`);
    //   socket.emit("leave", {"username":message["username"], "room":message["room"]});
    // };
    
    // socket.on('receive_message', (data) => {
      //   console.log("Received message: " + data.message);
      
    // });
    
    // function sendMessage(message) {
      //   socket.emit('send_message', { "message":message });
      // }

      
      
      navigator.permissions.query({name: "accelerometer"}).then((result) =>{
        if (result.state === "granted") {
          const laSensor = new LinearAccelerationSensor({frequency: 120}); //ekki los angeles , nibb, Linera Accelerator
          // let laSensor = new LinearAccelerationSensor({frequency: 120});
          laSensor.addEventListener('reading', (e) => {
            function handler_acceleration(){
              // console.log(`Linear acceleration along the X-axis ${laSensor.x}`);
              // var new_time = Date.now();
              // console.log(`Time since last reading: ${(new_time-time_last_reading)/1000} s`);
              // time_last_reading = new_time;
              // console.log(new_time);
              // console.log(`Linear acceleration along the Y-axis ${laSensor.y}`);
              // console.log(`Linear acceleration along the Z-axis ${laSensor.z}`);
            };
            handler_acceleration();
          });
          laSensor.start();
      }
    })
    navigator.permissions.query({name: "gyroscope"}).then((result) =>{
      if (result.state === "granted") {
        const gyroSensor = new Gyroscope({frequency: 120}); 
        // let laSensor = new LinearAccelerationSensor({frequency: 120});
        gyroSensor.addEventListener('reading', (e) => {
          function handler_gyroscope(){
            if(!verbose) {
              return;
            }
            console.log("Gyro: ");
            console.log(`${gyroSensor.x}`);
            // console.log(gyroSensor.frequency);
            // console.log()
          };
          handler_gyroscope();
        });
        gyroSensor.start();
      }
    })


  function sendData(datum){
    fetch('/process_data', {
      method: 'POST',
      body: JSON.stringify({data: datum}),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
      // .then(response => response.json())
      // .then(data => {
      //   // Handle the response from the server
      // });
    }
  
  function press_button(){
    fetch('/press_button', {
      method: 'POST',
      body: JSON.stringify({}),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
  }

  function update_ori(ori){
    fetch('/update_ori', {
      method: 'POST',
      body: JSON.stringify({data: ori}),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
  }
  
  function update_pos(accel, inter){
    fetch('/update_pos', {
      method: 'POST',
      body: JSON.stringify({"accel": accel, "interval":inter}),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
  }

  function get_pos(){
    // fetch('/get_position', {
    //   method: 'GET',
    //   body: JSON.stringify({}),
    //   headers: {
    //     'Content-Type': 'application/x-www-form-urlencoded'
    //   }
    // })
    fetch('/get_position')
    .then(response => response.json())
    .then(data => {
      // Handle the response from the server
      sendData(data);
      data = data["data"]
      // console.log(data);
      // console.log(data[0]);
      // console.log(data[0].toString())
      posX.innerHTML = data[0].toString();
      posY.innerHTML = data[1].toString();
      posZ.innerHTML = data[2].toString();
    });
  }

  // console.log("I got here")
  document.querySelector("#send_dta_to_server").addEventListener("click", function(e){
    e.preventDefault();
    message = document.querySelector('#dta_to_server').value;
    console.log('send clicked ' + message);
    sendMessage(message)
    // sendMessage(message);
    // join_room({"username":message, "room":0});

  });
  document.querySelector("#receive_dta_from_server").addEventListener("click", function(e){
    e.preventDefault();
   
  });

  document.querySelector('#submit').addEventListener('click', function(e) {

    e.preventDefault();
    sendData("I sent data")
    get_pos()
    update_pos([0.1, 0.12, 0.2], 0.16)
    press_button()
    // Request permission for iOS 13+ devices
    if (
      DeviceMotionEvent &&
      typeof DeviceMotionEvent.requestPermission === "function"
    ) {
      sendData("Requesting data...");
      DeviceOrientationEvent.requestPermission().then(permissionState => {
          window.addEventListener('devicemotion', function(event) {
            var acceleration = event.acceleration;
            var rotationRate = event.rotationRate;
            accX.innerHTML = acceleration.x;
            accY.innerHTML = acceleration.y;
            accZ.innerHTML = acceleration.z;
            gyroX.innerHTML = rotationRate.beta;
            gyroY.innerHTML = rotationRate.gamma;
            gyroZ.innerHTML = rotationRate.alpha;
            interval.innerHTML = event.interval;
            //sendData(acceleration);
            //console.log('Acceleration:', acceleration);
            update_pos([acceleration.x, acceleration.y, acceleration.z], event.interval)
            get_pos()
          });
          window.addEventListener('deviceorientation', function(event) {
            var alpha = event.alpha;
            var beta = event.beta;
            var gamma = event.gamma;
            oriX.innerHTML = beta;
            oriY.innerHTML = gamma;
            oriZ.innerHTML = alpha;
            update_ori([beta, gamma, alpha])
            //sendData(acceleration);
          });


      });

    }


    });


});
