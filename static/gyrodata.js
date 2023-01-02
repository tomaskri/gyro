document.addEventListener('DOMContentLoaded', function() {
  const texti = document.querySelector('.pee');
  texti.innerHTML = "world";

    const accX = document.querySelector('#accX');
    const accY = document.querySelector('#accY');
    const accZ = document.querySelector('#accZ');
    const gyroX = document.querySelector('#gyroX');
    const gyroY = document.querySelector('#gyroY');
    const gyroZ = document.querySelector('#gyroZ');
    const oriX = document.querySelector('#oriX');
    const oriY = document.querySelector('#oriY');
    const oriZ = document.querySelector('#oriZ');


  function sendData(datum){
    fetch('/process_data', {
      method: 'POST',
      body: JSON.stringify({data: datum}),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
      .then(response => response.json())
      // .then(data => {
      //   // Handle the response from the server
      // });
    }

  document.querySelector('#submit').addEventListener('click', function(e) {

    e.preventDefault();
    sendData("I sent data")
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
            //sendData(acceleration);
            //console.log('Acceleration:', acceleration);
          });
          window.addEventListener('deviceorientation', function(event) {
            var alpha = event.alpha;
            var beta = event.beta;
            var gamma = event.gamma;
            oriX.innerHTML = gamma;
            oriY.innerHTML = beta;
            oriZ.innerHTML = alpha;
            //sendData(acceleration);
          });


      });


    }









    });



});
