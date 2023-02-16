import MyApp from './../_app';
import Global from '../global';

import {inspect} from "util";

let intervalToken1;
let index1 = 0;


class TemperatureSensor {
    constructor() {
      this.currTemp = 1 + (Math.random() * 90);
      this.maxTemp = this.currTemp;
      this.minTemp = this.currTemp;
      this.cumulativeTemperature = this.currTemp;
      this.startTime = (new Date(Date.now())).toISOString();
      this.numberOfTemperatureReadings = 1;
    }
    getCurrentTemperatureObject() {
      return { temperature: this.currTemp };
    }
    updateSensor() {
      this.currTemp = 1 + (Math.random() * 90);
      this.cumulativeTemperature += this.currTemp;
      this.numberOfTemperatureReadings++;
      if (this.currTemp > this.maxTemp) {
        this.maxTemp = this.currTemp;
      }
      if (this.currTemp < this.minTemp) {
        this.minTemp = this.currTemp;
      }
      return this;
    }
    getMaxMinReportObject() {
      return {
        maxTemp: this.maxTemp,
        minTemp: this.minTemp,
        avgTemp: this.cumulativeTemperature / this.numberOfTemperatureReadings,
        endTime: (new Date(Date.now())).toISOString(),
        startTime: this.startTime
      };
    }
    getMaxTemperatureValue() {
      return this.maxTemp;
    }
  }


global.azurepnpdevice = {}
//   const thermostat1 = new TemperatureSensor();
global.azurepnpdevice.thermostat1 = new TemperatureSensor();
//   const thermostat2 = new TemperatureSensor();
  
//   const commandNameGetMaxMinReport1 = thermostat1ComponentName + commandComponentCommandNameSeparator + 'getMaxMinReport';
//   const commandNameGetMaxMinReport2 = thermostat2ComponentName + commandComponentCommandNameSeparator + 'getMaxMinReport';
//   const commandNameReboot = 'reboot';
  const serialNumber = 'alwinexlepaho8329a';




const Message = require('azure-iot-device').Message;



const helperCreateReportedPropertiesPatch = (propertiesToReport, componentName) => {
    let patch;
    if (!!(componentName)) {
      patch = { };
      propertiesToReport.__t = 'c';
      patch[componentName] = propertiesToReport;
    } else {
      patch = { };
      patch = propertiesToReport;
    }
    if (!!(componentName)) {
      console.log('The following properties will be updated for component: ' + componentName);
    } else {
      console.log('The following properties will be updated for root interface.');
    }
    console.log(patch);
    return patch;
  };



const updateComponentReportedProperties = (deviceTwin, patch, componentName) => {
    let logLine;
    if (!!(componentName)) {
      logLine = 'Properties have been reported for component: ' + componentName;
    } else {
      logLine = 'Properties have been reported for root interface.';
    }
    deviceTwin.properties.reported.update(patch, function (err) {
      if (err) throw err;
      console.log(logLine);
    });
  };


  const desiredPropertyPatchListener = (deviceTwin, componentNames) => {
    deviceTwin.on('properties.desired', (delta) => {
      console.log('Received an update for device with value: ' + JSON.stringify(delta));
      Object.entries(delta).forEach(([key, values]) => {
        const version = delta.$version;
        if (!!(componentNames) && componentNames.includes(key)) { // then it is a component we are expecting
          const componentName = key;
          const patchForComponents = { [componentName]: {} };
          Object.entries(values).forEach(([propertyName, propertyValue]) => {
            if (propertyName !== '__t' && propertyName !== '$version') {
              console.log('Will update property: ' + propertyName + ' to value: ' + propertyValue + ' of component: ' + componentName);
              const propertyContent = { value: propertyValue };
              propertyContent.ac = 200;
              propertyContent.ad = 'Successfully executed patch';
              propertyContent.av = version;
              patchForComponents[componentName][propertyName] = propertyContent;
            }
          });
          updateComponentReportedProperties(deviceTwin, patchForComponents, componentName);
        }
        else if  (key !== '$version') { // individual property for root
          const patchForRoot = { };
          console.log('Will update property: ' + key + ' to value: ' + values + ' for root');
          const propertyContent = { value: values };
          propertyContent.ac = 200;
          propertyContent.ad = 'Successfully executed patch';
          propertyContent.av = version;
          patchForRoot[key] = propertyContent;
          updateComponentReportedProperties(deviceTwin, patchForRoot, null);
        }
      });
    });
  };


  
  async function sendTelemetry(deviceClient, data, index, componentName) {
    // if (!!(componentName)) {
    if (componentName) {
      console.log('Sending telemetry message %d from component: %s ', index, componentName);
    } else {
      console.log('Sending telemetry message %d from root interface', index);
    }
    const msg = new Message(data);
    // if (!!(componentName)) { 
    if (componentName) { // This seems to be the original source code
      const messageSubjectProperty = '$.sub';
      msg.properties.add(messageSubjectProperty, componentName);
    }
    msg.contentType = 'application/json';
    msg.contentEncoding = 'utf-8';
    await deviceClient.sendEvent(msg);
  }

export default function handler(req, res) {
    // res is https://nodejs.org/api/http.html#http_class_http_serverresponse
    console.log("connect called")
    // res.status(200).json({ text: 'Call Azure DPS' });

    // todo: connect to dps

    

    // console.log('Global = ' + JSON.stringify(Global))    
    // Global.key = Global.key == null ? 1 : Global.key + 1

    console.log('Global = ' + global.abckey)    
    global.abckey = global.abckey == null ? 1 : global.abckey + 1


    // todo: read submitted params
    // Device cert
    // Device ID
    // Device model definition
    // DPS ID Scope


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
        // let deviceConnectionString = process.env.IOTHUB_DEVICE_CONNECTION_STRING;
        let deviceConnectionString = req.body.deviceConnectionString;

        // DPS connection information
        const provisioningHost = process.env.IOTHUB_DEVICE_DPS_ENDPOINT ||'global.azure-devices-provisioning.net';
        const idScope = process.env.IOTHUB_DEVICE_DPS_ID_SCOPE;
        const registrationId = process.env.IOTHUB_DEVICE_DPS_DEVICE_ID;
        const symmetricKey = process.env.IOTHUB_DEVICE_DPS_DEVICE_KEY;
        const useDps = process.env.IOTHUB_DEVICE_SECURITY_TYPE || "connectionString";

        // const modelIdObject = { modelId: 'dtmi:com:example:TemperatureController;1' };
        // const modelIdObject = { modelId: 'dtmi:com:example:TemperatureController;2' };
        // const modelIdObject = { modelId: 'dtmi:com:example:TemperatureController;3' };
        const modelIdObject = { modelId: req.body.dtmi };
        const messageSubjectProperty = '$.sub';
        const thermostat1ComponentName = 'thermostat1';
        const thermostat2ComponentName = 'thermostat2';
        const deviceInfoComponentName = 'deviceInformation';
        const commandComponentCommandNameSeparator = '*';
        // let intervalToken1;
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

        // console.log('All good 1.');

        // fromConnectionString must specify a transport, coming from any transport package.
        const client = Client.fromConnectionString(deviceConnectionString, Protocol);
        console.log('Connecting using connection string: ' + deviceConnectionString);


        let resultTwin;
        
        // working code: disable this for now. 
        try {


            // Add the modelId here
            // await client.setOptions(modelIdObject);
            client.setOptions(modelIdObject);
            // await client.open();
            client.open();
            global.iothubcli = client
            console.log('device connected');
            // client.close();
            // console.log('device disconnected');


            // todo: set up capabilities based on device model

            // global.azurepnpdevice = {}

            intervalToken1 = setInterval(() => {
                // const thermostat1 = new TemperatureSensor();
                // global.azurepnpdevice.thermostat1 = new TemperatureSensor(); // moved up
                // const data = JSON.stringify(thermostat1.updateSensor().getCurrentTemperatureObject());
                const data = JSON.stringify(global.azurepnpdevice.thermostat1.updateSensor().getCurrentTemperatureObject());
                // sendTelemetry(client, data, index1, thermostat1ComponentName).catch((err) => console.log('error ', err.toString()));
                sendTelemetry(client, data, index1, thermostat1ComponentName).catch((err) => console.log('error ', err.toString()));
                // console.log('hello ' + index1)
                index1 += 1;
            }, 5000);


            try {
                // resultTwin = await client.getTwin();
                
                client.getTwin()
                    .then(res => {
                        resultTwin = res
                        console.log('getTwin result = ' + resultTwin)
                        // console.log('getTwin result string = ' + JSON.stringify(resultTwin)) // get circular error with this
                        console.log('getTwin result = ' + inspect(resultTwin))



                        // Only report readable properties
                        const patchRoot = helperCreateReportedPropertiesPatch({ serialNumber: serialNumber }, null);

                        

                        const patchThermostat1Info = helperCreateReportedPropertiesPatch({
                            maxTempSinceLastReboot: global.azurepnpdevice.thermostat1.getMaxTemperatureValue(),
                            targetTemperature: 50.0,
                          }, thermostat1ComponentName);


                        // the below things can only happen once the twin is there
                        updateComponentReportedProperties(resultTwin, patchRoot, null);


                        // the below things can only happen once the twin is there
                        updateComponentReportedProperties(resultTwin, patchThermostat1Info, thermostat1ComponentName);
                        // desiredPropertyPatchListener(resultTwin, [thermostat1ComponentName, thermostat2ComponentName, deviceInfoComponentName]);
                        desiredPropertyPatchListener(resultTwin, [thermostat1ComponentName]);
                    })
                    .catch(err => {
                        console.log('getTwin error = ' + err)
                    })

                

                

            } catch (err) {
                console.error('could not retrieve twin or report twin properties\n' + err.toString());
            }


        } catch (err) {
            console.error('could not connect Plug and Play client or could not attach interval function for telemetry\n' + err.toString());
        }


        console.log('>>> done connecting and setting up properties ')

    }




    // res.writeHead(301, { Location: "http://" + req.headers["host"] + "/page-b.html" });
    // res.writeHead(301, { Location: "https://www.google.com" });
    // res.writeHead(301, { Location: "https://www.yahoo.com" });
    res.writeHead(301, { Location: "/device" });
    // todo: redirecting to another page. how to tell the next page how to render itself dynamically

    
    return res.end();
}
