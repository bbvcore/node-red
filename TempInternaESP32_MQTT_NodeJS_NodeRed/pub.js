//*********************************************************************************
// CLIENTE PARA PUBLICAR MENSAJES MQTT
//*********************************************************************************
var mqtt = require('mqtt');
var client = mqtt.connect('mqtt://localhost:1883');
client.on('connect', function () {
    client.publish('/temperature', "{\"temperature\":10}")
    client.end();
})