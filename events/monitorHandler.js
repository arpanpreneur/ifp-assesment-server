module.exports = function (socket, pool) {
    // registration related behaviour goes here...
    const user = socket.decoded_token.userDetails;
    
    socket.on('get_device_list', async () => {

        try {
          const { rows } = await pool.query(`SELECT deviceid, devicename from device where userid = $1`, [user['userid']]);
          if(rows && rows.length > 0) {
            socket.emit('get_device_list', rows);
          }
        } catch(ex) {
          console.log(ex);
        }
      }); 
  
      socket.on('get_initial_data', async () => {
        console.log("hello");
        try{
          const { rows } = await pool.query(
            `select 
              device.deviceid, 
              monitor.status, 
              monitor.load, 
              monitor.time 
            from 
              monitor
              inner join device on device.deviceid = monitor.deviceid 
              inner join users on users.userid = device.userid
            where users.userid = $1`, [user['userid']]);
  
          console.log(rows);
          
          socket.emit('get_initial_data', rows);
  
        } catch(ex) {
  
        }
      })
};