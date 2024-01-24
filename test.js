const Wifi = require('./src/wifi-connection.js');

const wifi = new Wifi({iface:'wlp0s20f3', debug:true});

async function test() {
    console.log('test()');
    return Promise.all([
        // getStatus(),
        scan()
    ]).then(results => {
        console.log('results=%o', results);
    });

}

test();

async function getStatus() {
    console.log('getStatus()')
    const status = await wifi.getStatus();
    console.log('getStatus: status=%o', status);
    return status;
}

async function scan() {
    console.log('scan()')
    const networks = await wifi.scan();
    console.log('scan: networks=%o', networks);
    return networks;
}




function switchNetworks() {

    Promise.resolve().then(() => {
        return wifi.connect({ssid:'Julia', psk:'potatismos'});
    })
    .then(() => {
        return wifi.getStatus();
    })
    .then((status) => {
        console.log('Current status:', status);
        console.log('Switching to another network...')
        return wifi.connect({ssid:'Magnus iPhone', psk:'potatismos'});
    })
    .then(() => {
        return wifi.getStatus();
    })
    .then((status) => {
        console.log('Current status:', status);
    })
    .catch((error) => {
        console.log(error);
    });

}

function switchToInvalidNetwork() {

    Promise.resolve().then(() => {
        return wifi.connect({ssid:'Julia', psk:'potatismos'});
    })
    .then(() => {
        return wifi.getStatus();
    })
    .then((status) => {
        console.log('Current status:', status);
        return wifi.connect({ssid:'Magnus iPhone', psk:'wrong-password'});
    })
    .then(() => {
        console.log('Should never get here!');
    })

    .catch((error) => {
        console.log(error);
    })
    .then(() => {
        return wifi.getStatus();
    })
    .then((status) => {
        console.log('Current status:', status);
    })

}




// switchToInvalidNetwork();
