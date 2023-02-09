// import MyApp from './../_app';
import Global from '../global';

export default function handler(req, res) {
    // res is https://nodejs.org/api/http.html#http_class_http_serverresponse
    
    console.log("disconnect called")
    
    if (global.iothubcli) {
        global.iothubcli.close()
        console.log("disconnected")
    } else {
        console.log("not disconnected")
    }
    
    
    
    // res.status(200).json({ text: 'Call Azure DPS' });

    // todo: connect to dps

    

    // console.log('Global = ' + JSON.stringify(Global))
    // Global.key = Global.key + 1
    // Global.key = Global.key == null ? 1 : Global.key + 1

    console.log('Global = ' + global.abckey)    
    global.abckey = global.abckey == null ? 1 : global.abckey + 1



    // todo: read submitted params
    // Device cert
    // Device ID
    // Device model definition
    // DPS ID Scope

/*
    // const body = JSON.parse(req.body)
    // console.log('connect request body = ' + JSON.stringify(body))
    console.log('connect request body = ' + JSON.stringify(req.body))



    // Connect to Azure IoT Hub
    // /Users/wongyate/dev/iot-azure-1/device-1/azure-iot-sdk-node/device/samples/javascript/pnp_temperature_controller.js
    {
        const Protocol = require('azure-iot-device-mqtt').Mqtt;
        const ProvProtocol = require('azure-iot-provisioning-device-mqtt').Mqtt;

        const Client = require('azure-iot-device').Client;
        const Message = require('azure-iot-device').Message;
        const ConnectionString = require('azure-iot-common').ConnectionString;
        const SymmetricKeySecurityClient = require('azure-iot-security-symmetric-key').SymmetricKeySecurityClient;
        const ProvisioningDeviceClient = require('azure-iot-provisioning-device').ProvisioningDeviceClient;

        // String containing Hostname, Device Id & Device Key in the following formats:
        //  'HostName=<iothub_host_name>;DeviceId=<device_id>;SharedAccessKey=<device_key>'
        let deviceConnectionString = process.env.IOTHUB_DEVICE_CONNECTION_STRING;

        // DPS connection information
        const provisioningHost = process.env.IOTHUB_DEVICE_DPS_ENDPOINT ||'global.azure-devices-provisioning.net';
        const idScope = process.env.IOTHUB_DEVICE_DPS_ID_SCOPE;
        const registrationId = process.env.IOTHUB_DEVICE_DPS_DEVICE_ID;
        const symmetricKey = process.env.IOTHUB_DEVICE_DPS_DEVICE_KEY;
        const useDps = process.env.IOTHUB_DEVICE_SECURITY_TYPE || "connectionString";

        const modelIdObject = { modelId: 'dtmi:com:example:TemperatureController;1' };
        // const modelIdObject = { modelId: 'dtmi:com:example:TemperatureController;2' };
        // const modelIdObject = { modelId: 'dtmi:com:example:TemperatureController;3' };
        const messageSubjectProperty = '$.sub';
        const thermostat1ComponentName = 'thermostat1';
        const thermostat2ComponentName = 'thermostat2';
        const deviceInfoComponentName = 'deviceInformation';
        const commandComponentCommandNameSeparator = '*';
        let intervalToken1;
        let intervalToken2;
        let intervalToken3;

        // async function main() {
        // If the user include a provision host then use DPS
        if (useDps === 'DPS') {
            // await provisionDevice(modelIdObject);
            provisionDevice(modelIdObject);
        } else if (useDps === 'connectionString') {
            try {
                if (!(deviceConnectionString && ConnectionString.parse(deviceConnectionString,['HostName','DeviceId']))) {
                    console.error('Connection string was not specified.');
                    process.exit(1);
                }
            } catch (err) {
                console.error('Invalid connection string specified.');
                process.exit(1);
            }
        } else {
            console.error('No proper SECURITY TYPE provided.');
            process.exit(1);
        }

        console.log('All good 1.');

        // fromConnectionString must specify a transport, coming from any transport package.
        const client = Client.fromConnectionString(deviceConnectionString, Protocol);
        console.log('Connecting using connection string: ' + deviceConnectionString);

        try {
            // Add the modelId here
            // await client.setOptions(modelIdObject);
            client.setOptions(modelIdObject);
            // await client.open();
            // client.open();
            // console.log('device connected');
            // client.close();
            // console.log('device disconnected');
        } catch (err) {
            console.error('could not connect Plug and Play client or could not attach interval function for telemetry\n' + err.toString());
        }
    }

*/


    // res.writeHead(301, { Location: "http://" + req.headers["host"] + "/page-b.html" });
    // res.writeHead(301, { Location: "https://www.google.com" });
    res.writeHead(301, { Location: "/" });
    // res.writeHead(301, { Location: "https://www.yahoo.com" });
    return res.end();
}
