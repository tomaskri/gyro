import pusher

pusher_client = pusher.Pusher(
  app_id='1533254',
  key='aeef6c853dfdf70e1390',
  secret='42f5c50d1d99f7209580',
  cluster='eu',
  ssl=True
)

pusher_client.trigger('my-channel', 'my-event', {'message': 'hello world'})
# A very simple Flask Hello World app for you to get started with...
print(dir(pusher_client))
print(pusher_client.channel_info("my-channel"))
# my_channel = pusher_client.subscribe("my-channel")




from flask import Flask, request, render_template, redirect
import numpy as np


#from flask_sqlalchemy import SQLAlchemy
import json

with open("trash.log", "a") as f:
    f.writelines("TEST, started\n")

app = Flask(__name__) #, template_folder='/home/tomaskri/mysite/templates/', static_folder='/home/tomaskri/mysite/static/'

# from flask_socketio import SocketIO, emit, send
# from flask_socketio import join_room, leave_room
# socketio = SocketIO(app)




    

# @socketio.on('join')
# def on_join(data):
#     username = data['username']
#     room = data['room']
#     join_room(room)
#     send(username + ' has entered the room.', to=room)

# @socketio.on('leave')
# def on_leave(data):
#     username = data['username']
#     room = data['room']
#     leave_room(room)
#     send(username + ' has left the room.', to=room)

# @socketio.on('send_message')
# def handle_send_message(data):
#     message = data['message']
#     emit('receive_message', {'message': message}, broadcast=True)


@app.route('/')
def home():
    return render_template('home.html') #return 'Hello from Flask!'

@app.route("/<info>")
def index(info):
    # return render_template(info)
    if info == "publisher":
        return render_template("index.html")
    elif info == "subscriber":
        return render_template("subscriber.html")
    pass

@app.route('/send_message', methods=['POST'])
def send_message():
    message = json.loads(request.get_data())
    channel = message["to_channel"]
    message = message["message"]
    pusher_client.trigger(channel, 'receive-message', {'message': message})
    return '', 204



button_active = False
@app.route('/press_button', methods=['POST'])
def press_button():
    global button_active
    button_active = not button_active
    if button_active:
        global position, velocity, orientation
        position = np.array([1.5, 0.0, 0.0]).astype(float)
        velocity = np.array([0.0, 0.0, 0.0]).astype(float)
        orientation = np.array([0.0, 0.0, 0.0]).astype(float)
    return json.dumps({"data":"return"}) #þetta gefur bara error á 'r' eins og hitt á 'p'  en já sé errorinn, nei þetta er betri error, því hann er bara svona warning


@app.route('/process_data', methods=['POST'])
def process_data():
    if request.method == "POST":
        print(json.loads(request.get_data())['data'], flush=True)

    # Process the data and return a response
    return json.dumps({"data":"return"}) #enginn error :) 

# Initialize position, velocity, and orientation
position = np.array([0.0, 0.0, 0.0]).astype(float)
velocity = np.array([0.0, 0.0, 0.0]).astype(float)
orientation = np.array([0.0, 0.0, 0.0]).astype(float)

@app.route('/update_ori', methods=['POST'])
def update_ori():
    ori = json.loads(request.get_data())["data"]
    global orientation
    orientation[:] = ori
    pass
    return json.dumps({"data":"return"}) #enginn error :) 

@app.route('/update_pos', methods=['POST'])
def update_pos():
    with open("trash.log", "a") as f:
        f.writelines("Running update_pos()...\n")
        # print("Running update_pos()...", file=f)
    print(f"Running update_pos()...")
    data = json.loads(request.get_data())
    accel, interval = data["accel"], data["interval"]
    # update_position([0.0,0.0,0.0], accel, interval)
    print(position, velocity)
    return json.dumps({"data":"return"}) #enginn error :)

@app.route('/get_position', methods=['GET'])
def get_position():
    global position, velocity
    with open("trash.log", "a") as f:
        f.write(f"position: {position},  velocity: {velocity}\n")
    return json.dumps({"data": [float(position[0]), float(position[1]), float(position[2])]})
    

# def update_position(gyroscope, accelerometer, time_interval):
#     global position, velocity, orientation

#     # Iterate over the sensor data and update position, velocity, and orientation
#     # for i in range(len(gyroscope)):
#     gyro_data = np.array(gyroscope)
#     accel_data = np.array(accelerometer)
#     dt = time_interval
    
#     # Update orientation using gyroscope data
#     orientation += gyro_data * dt
    
#     # Transform accelerometer data into global coordinate system
#     R = rotation_matrix(orientation)
#     accel_global = np.matmul(R, accel_data)
#     with open("trash.log", "a") as f:
#         f.writelines(f"accel_global: {accel_global}\n")
    
#     # Update velocity using accelerometer data
#     velocity += accel_global * dt
    
#     # Update position using velocity data
#     position += velocity * dt
    
#     return position, velocity, orientation


# def rotation_matrix(orientation):
#     # Convert orientation angles to radians
#     roll = np.radians(orientation[0])
#     pitch = np.radians(orientation[1])
#     yaw = np.radians(orientation[2])
    
#     # Create rotation matrix using Euler angles
#     R_x = np.array([[1.0, 0.0, 0.0],
#                     [0.0, np.cos(roll), -np.sin(roll)],
#                     [0.0, np.sin(roll), np.cos(roll)]])
#     R_y = np.array([[np.cos(pitch), 0.0, np.sin(pitch)],
#                     [0.0, 1.0, 0.0],
#                     [-np.sin(pitch), 0.0, np.cos(pitch)]])
#     R_z = np.array([[np.cos(yaw), -np.sin(yaw), 0.0],
#                     [np.sin(yaw), np.cos(yaw), 0.0],
#                     [0.0, 0.0, 1.0]])
                    
#     R = R_z @ R_y @ R_x
#     return R
    