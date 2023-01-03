document.addEventListener('DOMContentLoaded', function() {
  const texti = document.querySelector('.pee');
  texti.innerHTML = "world";

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
