//*************************************************************************
// CREAR UN BROKER
//*************************************************************************
const aedes = require('aedes')()
const net = require('net')
const http = require('http')
const ws = require('websocket-stream')

// Configurar puertos
// const mqttPort = 1886 // Puerto alternativo
const mqttPort = 1883 // Puerto para Mqtt 
const wsPort = 8888 // Puerto para websockets

// Crear Servers
const MqttServer = net.createServer(aedes.handle)
const WsServer = http.createServer()



//*************************************************************************
// Código para visualizar por CONSOLA lo que sucede en el BROKER
//*************************************************************************
// Mostrar por consola cada vez que se publica un mensaje
// las palabras son eventos y on() es un manejador 
aedes.on('publish',  (packet, client) => {
    if (client) {
        console.log(' - Message Published: ', packet.topic);
    }
});
//mostrar por consola cada vez que se desconecta un cliente
aedes.on('clientDisconnect', (client) => {
    console.log(' - Client Disconnected: ', client.id);
});
//mostrar por consola cada vez que se conecta un cliente
aedes.on('client',(client) => {
    console.log(' - New Client: ', client.id);
});
//mostrar por consola cada vez que se suscribe un cliente
aedes.on('subscribe', (subscriptions, client) => {
    console.log(' - Client Subscribed:', subscriptions);
})

// Exporta un objeto con 3 métodos: 
// startBroker: Arranca Broker
// publish: publicación
// subscribe: subscripción
module.exports = {
// Arranca el servidor y hace que escuche y arranque el puerto
    startBroker: function () {
        MqttServer.listen(mqttPort, function () {
            console.log('Servidor MQTT en el puerto', mqttPort);
        });
        WsServer.listen(wsPort, function () { // Arranque el websocket server
            console.log('Envío de mensajes MQTT por WebSocket puerto', wsPort);
        });
    },
    //funcion para publicar
    publish: function (topic, message) {
        aedes.publish({ topic: topic, payload: message });
    },
    //funcion para suscribirse
    subscribe: function (topic) {
        aedes.subscribe(topic, function () {
            console.log(' - Client suscribed to:', topic);
        });
    }
};


ws.createServer({server:WsServer},aedes.handle)