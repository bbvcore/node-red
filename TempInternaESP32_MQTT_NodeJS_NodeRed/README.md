<h2>Indicaciones<h2>
<h3>Ejecución APP</h3>
<p>La estructura básica permite conectarse con un ESP32 a un Broker en Node-Red o a un Broker en NodeJS a través del protocolo MQTT.</p>
<ul>
<li>
<b>Opción NodeJS</b>:<em>Se dispone de un broker que se lanza ejecutando el script "ServerNodeSoloMqttUsoConESP32.js", que inicializa
el servidor Broker, el cual a su vez está configurado en el script "Broker.js" dentro del directorio "/services". Además se dispone de 
los scripts "pub.js" y "sub.js" para poder realizar comprobaciones como cliente y subscriptor. El ESP32 se configura con el fichero 
"temperatureESP32.cpp", el cual requiere instalar las librerías que declara en la cabecera, y añadir el SSID de la red inalámbrica además
del password de la misma y por supuesto indicar la IP del servidor Broker (si estamos en entorno local, la IP de nuestro equipo, eso sí, 
usar la IP del equipo, no usar 127.0.0.1 o localhost, ya que el ESP32 interpretará que es la IP del dispositivo IoT y no la del servidor
Broker).<em>
</li>
<li>
<b>Opción Node Red</b>:<em>Solo hace falta lanzar el servidor Node Red e incorporar un flujo nuevo, que está contenido en el fichero
"FlujoNode-Red_Broker_Aedes.txt". Una vez esté el flujo cargado en Node Red, en el puerto del "Broker" y del módulo "Mqtt in" comprobar
que este asociado al 1883, porque como en este proyecto hay 2 servidores que trabajan en el mismo puerto, pues en el de Node Red
está solo configurado como 188 para que se añada el 3 u otro puerto que interese.</em>
</li>
</ul>
<h3> Configuración de Broker en Node Red </h3>
<p>En node-red hace falta cambiar en broker y en mqttin el puerto del servidor de 188 a 1883.</p>
<p>Se quitó el 3, por las pruebas con el servidor realizado en NodeJS, ya que ambos, tanto en Node-Red
como en Node-JS estaban configurados en el puerto estandar del protocolo Mqtt</p>
<h3>Flashear ESP32</h3>
<p>En función del dispositivo ESP32 con el que se esté trabajando a veces hay problemas a la hora de actualizar su contenido, por ello
es conveniente tener las ESPTools instaladas (requieren tener instalado en el sistema Python). El fichero "ReseteaESP32" ofrece
los pasos para llevar a cabo el proceso.</p>
