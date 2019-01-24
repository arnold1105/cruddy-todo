const fs = require('fs');
const path = require('path');
const _ = require('underscore');
const counter = require('./counter');

var items = {};

// Public API - Fix these CRUD functions ///////////////////////////////////////

exports.create = (text, callback) => {
  counter.getNextUniqueId((err, id) => {
    var fileName = `${this.dataDir}/${id}.txt`;
    fs.writeFile(fileName, text, (err) => {
      if (err) {
        throw ('error not creating');
      } else {
        callback(null, { id, text });
      }
    });
  });
};

exports.readAll = (callback) => {
  // look through data path
    // parse through the file to exclude .txt
    // utilize the callback to return an object
    // push the object in the empty array
  fs.readdir(this.dataDir, (err, file) => {
    var data = [] 
    
    for(var i =0; i < file.length; i++){
      var obj = {};
      var id = file[i].slice(0,5); //00001
      obj['id'] = id;
      // console.log(id);
      obj['text'] = id;
      data.push(obj)
    }
      if (err) {
        throw ('error');
      } else {
        //  console.log(data);
        callback(null, data);
      }
    

  });




  // var data = _.map(items, (text, id) => {
  //   return { id, text };
  // });
  // callback(null, data);
};

exports.readOne = (id, callback) => {
  var text = items[id];
  if (!text) {
    callback(new Error(`No item with id: ${id}`));
  } else {
    callback(null, { id, text });
  }
};

exports.update = (id, text, callback) => {
  var item = items[id];
  if (!item) {
    callback(new Error(`No item with id: ${id}`));
  } else {
    items[id] = text;
    callback(null, { id, text });
  }
};

exports.delete = (id, callback) => {
  var item = items[id];
  delete items[id];
  if (!item) {
    // report an error if item not found
    callback(new Error(`No item with id: ${id}`));
  } else {
    callback();
  }
};

// Config+Initialization code -- DO NOT MODIFY /////////////////////////////////

exports.dataDir = path.join(__dirname, 'data');

exports.initialize = () => {
  if (!fs.existsSync(exports.dataDir)) {
    fs.mkdirSync(exports.dataDir);
  }
};
