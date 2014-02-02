var mycroft = require('./mycroft.js');
var client = mycroft.Mycroft('app.json', 'localhost', 1847);
var logs = [];

client.on('APP_MANIFEST_OK', function(data){
  client.appManifestOk();
});

client.on('APP_MANIFEST_FAIL', function(data){
  client.appManifestFail();
});

client.on('MSG_GENERAL_FAILURE', function(data){
  client.msgGeneralFailure(data);
});

client.on('APP_DEPENDENCY', function(data){
  client.up();
});

client.on('MSG_QUERY', function(data){
  if(data.action == 'log'){
    logs.push(data.data);
  }
});


client.connect();
client.sendManifest();
