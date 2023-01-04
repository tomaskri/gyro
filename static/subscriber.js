
var verbose = false;

document.addEventListener('DOMContentLoaded', function() {

  var pusher = new Pusher('aeef6c853dfdf70e1390', {
    cluster: 'eu' //, encrypted:true
  });
  pusher.logToConsole = true;
  var channel = pusher.subscribe('subscribers');
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
  channel.bind("receive-pos", function(data){
    console.log(`received pos: ${JSON.stringify(data)}`);
    // Gera eitthvað annað hér
  });

  async function sendMessage(message) {
    fetch('/send_message', {
      method: 'POST',
      body: JSON.stringify({message: message, to_channel:"Computers"}),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });
  }


  // function sendData(datum){
  //   fetch('/process_data', {
  //     method: 'POST',
  //     body: JSON.stringify({data: datum}),
  //     headers: {
  //       'Content-Type': 'application/x-www-form-urlencoded'
  //     }
  //   })
  // }
  
  // function press_button(){
  //   fetch('/press_button', {
  //     method: 'POST',
  //     body: JSON.stringify({}),
  //     headers: {
  //       'Content-Type': 'application/x-www-form-urlencoded'
  //     }
  //   })
  // }

  
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

  
});
