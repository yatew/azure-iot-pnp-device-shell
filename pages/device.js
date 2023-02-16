import Link from 'next/link';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Global from './global';

// Reference: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/iot/iot-modelsrepository/samples/v1/typescript/src/modelResolutionSample.ts
import { ModelsRepositoryClient } from "@azure/iot-modelsrepository";

const repositoryEndpoint = "https://devicemodels.azure.com";
const dtmi = "dtmi:azure:DeviceManagement:DeviceInformation;1";

const deviceMode = {
  "@context": "dtmi:dtdl:context;2",
  "@id": "dtmi:com:example:TemperatureController;1",
  "@type": "Interface",
  "displayName": "Temperature Controller",
  "description": "Device with two thermostats and remote reboot.",
  "contents": [
    {
      "@type": [
        "Telemetry",
        "DataSize"
      ],
      "name": "workingSet",
      "displayName": "Working Set",
      "description": "Current working set of the device memory in KiB.",
      "schema": "double",
      "unit": "kibibyte"
    },
    {
      "@type": "Property",
      "name": "serialNumber",
      "displayName": "Serial Number",
      "description": "Serial number of the device.",
      "schema": "string", 

      "writable": true
    },
    {
      "@type": "Command",
      "name": "reboot",
      "displayName": "Reboot",
      "description": "Reboots the device after waiting the number of seconds specified.",
      "request": {
        "name": "delay",
        "displayName": "Delay",
        "description": "Number of seconds to wait before rebooting the device.",
        "schema": "integer"
      }
    },
    {
      "@type": "Component",
      "schema": "dtmi:com:example:Thermostat;1",
      "name": "thermostat1",
      "displayName": "Thermostat One",
      "description": "Thermostat One of Two."
    },
    {
      "@type": "Component",
      "schema": "dtmi:com:example:Thermostat;1",
      "name": "thermostat2",
      "displayName": "Thermostat Two",
      "description": "Thermostat Two of Two."
    },
    {
      "@type": "Component",
      "schema": "dtmi:azure:DeviceManagement:DeviceInformation;1",
      "name": "deviceInformation",
      "displayName": "Device Information interface",
      "description": "Optional interface with basic device hardware information."
    }
  ]
}

// Header1 is a test component
function Header1({ text }) {
  return <h1>{ text }</h1>
}

// Header2 is a test component
function Header2({ text }) {
  return <h1>{ text }</h1>
}


// function WritableLabel(w) {
//   return (
//     // <div><b>Writable:</b> </div>
//     <div><b>Writable:</b> <div>{ w }</div></div>
//   )
// }

// A component
function DeviceCapabilities() {
  var selection = 2

  // todo: render ui based on dtdl
  // todo: figure out how to get the dtdl here.






  // https://github.com/Azure/azure-sdk-for-js/tree/@azure/iot-modelsrepository_1.0.0-beta.2/sdk/iot/iot-modelsrepository

  // Global endpoint client
  // const rclient = new ModelsRepositoryClient();

  // The output of getModels() will include at least the definition for the target dtmi.
  // If the model dependency resolution configuration is not disabled, then models in which the
  // target dtmi depends on will also be included in the returned object (mapping dtmis to model objects).
  // const dtmi = "dtmi:com:example:TemperatureController;1";
  // const models = await client.getModels(dtmi, {dependencyResolution: 'tryFromExpanded'});
  // const models = client.getModels(dtmi, {dependencyResolution: 'tryFromExpanded'});

  // In this case the above dtmi has 2 model dependencies.
  // dtmi:com:example:Thermostat;1 and dtmi:azure:DeviceManagement:DeviceInformation;1
  // console.log(`${dtmi} resolved in ${models.keys().length} interfaces.`);


  // When no URI is provided for instantiation, the Azure IoT Models Repository global endpoint
  // https://devicemodels.azure.com/ is used and the model dependency resolution
  // configuration is set to TryFromExpanded.
  const client = new ModelsRepositoryClient({ repositoryLocation: repositoryEndpoint });
/*
  const result = client.getModels(dtmi, { dependencyResolution: "tryFromExpanded" });
  // Object.keys(result).forEach((fetchedDtmi) => {
  //   // const currentDtdl = result[fetchedDtmi] as any;
  //   const currentDtdl = result[fetchedDtmi];
  //   console.log("------------------------------------------------");
  //   console.log(`DTMI is: ${fetchedDtmi}`);
  //   console.log(`DTDL Display Name is: ${currentDtdl.displayName}`);
  //   console.log(`DTDL Description is: ${currentDtdl.description}`);
  //   console.log("------------------------------------------------");
  //   console.log(JSON.stringify(result[fetchedDtmi]));
  //   console.log("------------------------------------------------");
  // });

  var resolvedResult = Promise.resolve(result)

  console.log('fetch dtdl result = ' + result)
  console.log('fetch dtdl resolvedResult = ' + resolvedResult)
*/

  
  // client.getModels(dtmi, { dependencyResolution: "tryFromExpanded" })
  client.getModels('dtmi:com:example:TemperatureController;2', { dependencyResolution: "tryFromExpanded" })
    .then(res => {
      console.log(res)
      console.log('dtmi fetch result = ' + res)
      console.log('dtmi fetch result string = ' + JSON.stringify(res))
    })
    .catch(err => {
      console.log(err)
    })



  // if (selection == '1') {
  //   return <Header1 text="msg 1"></Header1>
  // }
  // return <Header2 text="msg 2"></Header2>


  return (
    <div>
      <Header1 text="Capabilities"></Header1>
      {/* <ul> */}

      <div>
      {deviceMode.contents.map((obj) => (
        <div key={obj.name}>
          <hr></hr>

          <div><b>Type:</b> {obj['@type']}</div>

          <div key={obj.name}><b>Display Name:</b> {obj.displayName}</div>
          <div><b>Name:</b> {obj.name}</div>
          <div><b>Description:</b> {obj.description}</div>
          <div><b>Schema:</b> {obj.schema}</div>

          {/* if (true) {
            <div><b>Writable:</b> {new Boolean(obj.writable).toString()}</div>  
          } */}
          {/* <WritableLabel w="{obj.writable}}"></WritableLabel> */}

          
        </div>
      ))}
      </div>

      <hr></hr>

      {/* </ul> */}
    </div>
  );

}



export default function FirstPost() {
  const router = useRouter()

  const handleDisconnect = (e) => {
    // setLikes(likes + 1);
    // Pass data to a backend api to connect to IoT Hub
    // Navigate to a different page
    console.log('hello')

    console.log('Global = ' + JSON.stringify(Global))

    e.preventDefault()
    router.push('/')
  }

  return (
    <>
      {/* A test component */}


      {/* <Header1 text="custom mgs 1">
      </Header1>

      <Header1 text="custom mgs 2">
      </Header1>
      
      <Header2></Header2> */}


      



      <Head>
        <title>Device</title>
      </Head>
      <h1>Device</h1>

      <label>Connected!</label>


      {/* client side disconnect cannot get to the server conn obj <button type="button" onClick={handleDisconnect}>Disconnect</button> */}
      <form method="post" action="/api/disconnect">
        {/* <hr></hr>
        <label>Device Certificate: </label>
        <input></input>
        <button type="button">...</button>

        <hr></hr>
        <label>Device ID: </label>
        <input type="text" id="deviceId" name="deviceId"></input>

        <hr></hr>
        <label>DPS ID Scope: </label>
        <input type="text" id="dpsIdScope" name="dpsIdScope"></input>

        <hr></hr>
        <label>Device Model Definition: </label>
        <input></input> */}

        <hr></hr>
        <input type="submit" value="Disconnect"></input>

        <hr></hr>
      </form>

      <button type="checkbox">Ghost Mode</button>

      <hr></hr>
      <label>DTMI: </label>
      <label>Digital Twin Model ID (DTDL)</label>

      {/* todo: somehow loop the device model and generate these html elements on the fly */}
      {/* todo: support read only property */}
      {/* todo: support read + write property first */}

      <hr></hr>
      <label>Property Name: </label>
      <label>Property Type: </label>
      <label>Property Value: </label>

      <hr></hr>
      <label>Property Name: </label>
      <label>Property Type: </label>
      <label>Property Value: </label>

      <hr></hr>

      <DeviceCapabilities></DeviceCapabilities>

      {/* <hr></hr> */}

      {/* <h2>
        <Link href="/">Back to homes</Link>
      </h2> */}
      
      {/* <h2>
        <a href="https://www.google.com">Go to google</a>
      </h2> */}
    </>
  );
}

