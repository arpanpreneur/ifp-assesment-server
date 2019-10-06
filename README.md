# ifp-assesment-server

To deploy this project you might need to obtain the .env environment settings file which is not uploaded in repo for security reasons. We have used docker-compose for deployment.

Steps to deploy:

1) It is needed to have Node, NPM, Docker and Docker Compose to be installed in the server
2) Cloning the Repository on the target server is needed
3) .env file is to be copied in the project directory
4) The following command is run
`
bash deploy.sh
`
inside the project directory

Our server is run on port 8000 by default (can be changed in .env file). You might also need to allow the PORT for inbound connections in your Firewall Settings (Security Groups for EC2 and native server firewall if any [firewalld, ufw etc]).

You can access the server at http://YOUR_SERVER_IP:PORT/

Backend Endpoints (Apart from Socket Events) :
1) /login
Request Structure:
Method: POST
```
{
  "username": "your_user_name",
  "password": "your_password"
}
```

Response Structure
On Success 200 is returned
```
{
  "error": false,
  "token": "A_JWT_TOKEN"
}
```
By default there are four users "john", "jane", "koustav", "arpan" with password 123456789 for all of them.
We also have kept a signup endpoint at /users (POST).

2) /monitor
Request Structure:
Method: POST
```
{
	"deviceId": "B92",
	"status": "offline",
	"time": "2019-09-19T18:16:50+05:30",
	"load": 23.69
}
```

Response Structure
On Success 200 is returned
```
{
  "error": false, 
  "message": "Data Inserted Successfully"
}
```
SocketIO Events (apart from authentication event and other default events)

Handled in Server:

```
get_initial_data - Gives back all data for all device of authenticated user
get_device_list - Gives back the list of devices of current user
get_latest_device_status - Gives back latest status and timestamp of all devices of the current user
```

Emitted from Server:
```
new_monitor_data - When a new data is POSTed using the /monitor endpoint, this event is emitted with the request payload, handled in client to update Status in realtime
```

DB Schema:
```
users: userid, username, password
device: deviceid, devicename, userid (One User has Many Devices, each Device belongs to a User)
monitor: id, deviceid, time, load, status

(All relavent Integrity constraints are there)
```
