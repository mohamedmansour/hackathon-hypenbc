
var pkgcloud = require('pkgcloud-bluemix-objectstorage');
//bluemix object storage init

// Create a config object
var config = {};

// Specify Openstack as the provider 
config.provider = "openstack";

// Authentication url
config.authUrl = 'https://identity.open.softlayer.com/';

// Use the service catalog
config.useServiceCatalog = true;

// true for applications running inside Bluemix, otherwise false
config.useInternal = true;

// projectId as provided in your Service Credentials
config.tenantId = 'aab9143de40f417ca83865cfd33cee34'; 

// userId as provided in your Service Credentials
config.userId = 'd0b13ab3b63c4afc91f0a0892128876c';

config.username = 'Admin_67a2477f30162d92cdcfdba6071deea61eb015c3';

// password as provided in your Service Credentials
config.password = 'cPI[4]EP!^#8F#g^';

// region as provided in your Service Credentials
config.region = 'dallas';


config.auth = {
    forceUri  : "https://identity.open.softlayer.com/v3/auth/tokens", //force uri to v3 
    interfaceName : "public",
    "identity": {
        "methods": [
            "password"
        ],
        "password": {
            "user": {
                "id": "d0b13ab3b63c4afc91f0a0892128876c", //userId
                "password": "cPI[4]EP!^#8F#g^" //userPassword
            }
        }
    },
    "scope": {
        "project": {
            "id": "aab9143de40f417ca83865cfd33cee34" //projectId
        }
    }
}


// Create a pkgcloud storage client
var storageClient = pkgcloud.storage.createClient(config);


module.exports = storageClient;