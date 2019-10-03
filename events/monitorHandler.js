module.exports = function (socket, db) {
    // registration related behaviour goes here...
    socket.on('ready', function (data) {
        // do stuff
        db.on('notification', function(msg) {
            let payload = JSON.parse(msg.payload);
            
        });
        
        client.query('LISTEN new_monitor_entry');
    });
};