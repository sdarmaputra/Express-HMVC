var path = require('path');
var fs = require('fs');

/* Declaration of global variables */
config = [];
config.site_name = 'ExpressHMVC-ORM';
config.app_modules_dirname = path.join(__dirname, '../app_modules');
config.base_views_dirname = path.join(__dirname, '../base_views');
config.base_partial_views_dirname = path.join(__dirname, '../base_views');
config.base_layout_dirname = '../base_views/layouts';


/* Loader Functions */
loadModel = function (moduleName) {
  var model;
  fs.readdirSync(path.join(config.app_modules_dirname, moduleName, 'model')).forEach(function(file){
    model = require(path.join(config.app_modules_dirname, moduleName, 'model', file));
  });
  return model;
}

loadConfig = function (configName) {
  var config;
  config = require(path.join(__dirname, configName));
  return config;
}
