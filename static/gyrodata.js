document.addEventListener('DOMContentLoaded', function() {
  const texti = document.querySelector('.pee');
  texti.innerHTML = "world";
  
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
      DeviceOrientationEvent.requestPermission().then(permissionState => {sendData(permissionState)});
    }
    // DeviceMotionEvent.requestPermission()
    //   .then(response => {
    //     if (response == 'granted') {
    //       // Permission granted, register the event listener
    //       window.addEventListener('devicemotion', function(event) {
    //         var acceleration = event.acceleration;
    //         texti.innerHTML = acceleration; 
    //         sendData(acceleration);
    //         console.log('Acceleration:', acceleration);
    //       });
    //     }
    //   })





    // if (typeof DeviceMotionEvent.requestPermission === 'function') {

    //   sendData("supported")
    //   DeviceMotionEvent.requestPermission()
    //     .then(permissionState => {
    //       if (permissionState === 'granted') {
    //         sendData("granted")
    //         window.addEventListener('devicemotion', function(event) {
    //           var acceleration = event.acceleration;
    //           texti.innerHTML = acceleration; 
    //           sendData(acceleration);
    //           console.log('Acceleration:', acceleration);
    //         });
    //       }
    //       else{
    //         sendData("Denied");
    //         sendData(permissionState);
    //       }
    //     })
    //     .catch(console.error);
    // } else {
    //   sendData("some error")
    //   console.warn('DeviceMotionEvent.requestPermission is not supported on your device');
    // }




    });
    

  


  // window.addEventListener('devicemotion', function(event) {
  //   var acceleration = event.acceleration;
  //   texti.innerHTML = acceleration; 
  //   sendData(acceleration);
  //   console.log('Acceleration:', acceleration);
  // });

    // if ('ondevicemotion' in window) {
    //   DeviceMotionEvent.requestPermission()
    //     .then(response => {
    //       if (response == 'granted') {
    //         // Permission granted, register the event listener
    //         window.addEventListener('devicemotion', function(event) {
    //           // Your code here
    //         });
    //       } else {
    //         // Permission denied, provide a fallback or alternative solution
    //       }
    //     })
    //     .catch(console.error);
    // } else {
    //   // Device does not support the devicemotion event, provide a fallback or alternative solution
    // }
    
});
