//*************************************************************************
//		 		SUBSCRIPTOR MQTT
//*************************************************************************
// Módulo MQTT
const mqtt = require('mqtt');
// Creación de un cliente
const client = mqtt.connect('mqtt://localhost:1883');
client.on('connect', function () {
    client.subscribe('/temperature');
    client.on('message', function (topic, message) {
        console.log(message.toString()) 
	})
})

/*
// Código para la inserción en una base de datos MySQL - Opcional, por eso está comentado este código
//==========================================================================
// FORMATEAR MENSAJE ANTES DE INTRODUCIR EN BASE DE DATOS (MySQL)
//============================================================================
// Split da problemas, usar Flat
        let almacenarMensaje = JSON.parse(message); // Conversión a Objeto JS
// Al ser un objeto, estan los métodos values, entries y keys, usando entries se obtienen las propiedades, flat() aplana arrays, solo mantiene 1 dimensión
        let propiedadMensaje = Object.entries(almacenarMensaje).flat();
// Posición 0 : temperature texto, posición 1 : temperature value, posición 2 : humidity texto, posición 3 : humidity value
        console.log(propiedadMensaje) 
        let insertarPropiedad = propiedadMensaje[1]
//============================================================================
// ALMACENAR EN BASE DE DATOS
//============================================================================
// En nodejs se puede usar el insert sin values y en su lugar
    // "set ? {objeto}, Opcional un CALLBACK"
    con.query('INSERT INTO data SET ?',
    //{data:message},(error,rs)=>{ // data es una columna de la tabla, donde almacenamos el mensaje
    {data:insertarPropiedad},(error,rs)=>{ // data es una columna de la tabla, donve almaceno el topic
        if (error) {
            console.error("Problemas con la base de datos.\nComprobar que esté inicializado el servidor.")
        }else{
        // Mensaje de confirmación e identificador de número de registro en la tabla
        console.log(`Registro correcto: ${rs.insertId.toString()}`) // insertId es un método que nos da el id en la tabla
        }
    })
  })
})
//====================================
// Almacenar datos en MySQL
//====================================
const mysql = require('mysql')
const con = mysql.createConnection({
    host:'127.0.0.1',
    port:3306,
    user:'root',
    password:'',
    database:'mqttPrueba'
})
con.connect(()=>{
    console.log('Conexión establecida')
})
*/