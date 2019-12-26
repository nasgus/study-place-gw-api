const fs = require('fs');
const path = require('path');
const basename = path.basename(__filename);

let services = {};

let folders = fs.readdirSync(__dirname).filter((file) => {
  return file !== basename
});

folders.forEach((folder) => {

  services[folder] = {};

  fs.readdirSync(path.join(__dirname, folder)).forEach(service => {

    let serviceModule = require(path.join(__dirname, folder, service));
    let serviceName = service.split('.js')[0];

    services[folder][serviceName] = serviceModule
  })
});
module.exports = services;
