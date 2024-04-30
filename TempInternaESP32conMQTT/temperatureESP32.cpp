//*******************************************
//      MODIFICADO PARA NODE-RED
//*******************************************
// LIBRERIAS
//*******************************************
#include <Arduino.h> // Librería que indica que se usa C++ adaptado a Arduino
#include <WiFi.h> // Librería para WiFi
#include <Adafruit_Sensor.h> // Librería para sensores
#include <PubSubClient.h> // Librería para usar protocolo MQTT
#include <esp32-hal.h>    // Librería para leer la temperatura

//*******************************************
// CONFIGURACIÓN DE RED Y BROKER
//*******************************************
//const char *ssid = *******"; // Rellenar los datos del SSID de la red, la contraseña de la Red y la IP del Broker que actua como servidor MQTT
//const char *password = "******";
const char *mqtt_server = "*.*.*.*"; // IP DEL HOST LOCAL DONDE SE EJECUTA EL BROKER (NO USAR NUNCA LOCALHOST, PORQUE EL ESP32 LA INTERPRETA COMO LA PROPIA DEL ESP32)

//*******************************************
//  OBJETOS: WIFI Y CLIENT
//*******************************************
WiFiClient espClient;
PubSubClient client(espClient);

//*******************************************
// FUNCIÓN CONEXIÓN WIFI
//*******************************************
void init_wifi()
{
    delay(10);
    WiFi.begin(ssid, password);
    while (WiFi.status() != WL_CONNECTED)
    {
        delay(500);
        Serial.println("Intentando establecer la conexión WiFi...");
    }
    Serial.println("Establecida la conexión WiFi");
}

//*******************************************
// FUNCIÓN TIPO ERROR
//*******************************************
void type_error()
{
    switch (client.state())
    {
    case -4:
        Serial.println(" : MQTT_CONNECTION_TIMEOUT - El servidor NO responde dentro del tiempo de mantenimiento");
        break;
    case -3:
        Serial.println(" : MQTT_CONNECTION_LOST - La conexión de red está caída");
        break;
    case -2:
        Serial.println(" : MQTT_CONNECT_FAILED - La conexión de red está fallando");
        break;
    case -1:
        Serial.println(" : MQTT_DISCONNECTED - El cliente se ha desconectado de forma limpia");
        break;
    case 1:
        Serial.println(" : MQTT_CONNECT_BAD_PROTOCOL - El servidor NO soporta la versión requerida del protocolo MQTT");
        break;
    case 2:
        Serial.println(" : MQTT_CONNECT_BAD_CLIENT_ID - El servidor rechaza el ID del cliente");
        break;
    case 3:
        Serial.println(" : MQTT_CONNECT_UNAVAILABLE - El servidor no es capaz de aceptar la conexión");
        break;
    case 4:
        Serial.println(" : MQTT_CONNECT_BAD_CREDENTIALS - El usuario o la contraseña son erróneas ya que se rechaza la conexión");
        break;
    case 5:
        Serial.println(" : MQTT_CONNECT_UNAUTHORIZED - El cliente NO dispone de autoización para conectarse");
        break;
    }
}

//*******************************************
// FUNCIÓN CONEXIÓN MQTT
//*******************************************
void conect_broker()
{
    while (!client.connected())
    {
        Serial.print("Conectando al BROKER MQTT...");
        if (client.connect("ESP32Client"))
        {
            Serial.println("WORKS! Establecida conexión con el BROKER");
            client.subscribe("/temperature"); // Subcribirse al TOPIC
        }
        else
        {
            Serial.print("ERROR!, rc= ");
            Serial.print(client.state());
            type_error();
            Serial.println("Reintentanto establecer la conexión tras 1 segundo...");
            delay(1000);
        }
    }
}

//*******************************************
// FUNCIÓN LEER TEMPERATURA
//*******************************************
void set_temperature()
{
    float temp = temperatureRead(); // Función para leer la temperatura, alojar valor como un float
    Serial.print("Temperatura");
    Serial.print(temp);
    Serial.println("º C");
    client.publish("/temperature", String(temp).c_str()); // Publicar el valor como una cadena
}

//***********************************************************************************************
//                  FUNCIONES COMUNES A TODOS LOS PROGRAMAS EN ARDUINO
//***********************************************************************************************
//*******************************************
//       FUNCIÓN SETUP EN ARDUINO
//*******************************************
void setup()
{
    Serial.begin(115200);
    init_wifi(); // Llamada a función
    client.setServer(mqtt_server, 1883);
}

//*******************************************
//       FUNCIÓN LOOP EN ARDUINO
//*******************************************
void loop()
{
    if (!client.connected())
    {                    // Si NO se estableció la conexión
        conect_broker(); // Conexión al BROKER, llamada a función
    }
    client.loop(); // Conexión en BUCLE
    set_temperature(); // Mostrar la temperatura
    delay(1000);
}