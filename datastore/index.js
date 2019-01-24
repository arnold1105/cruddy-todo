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
    // slice through the file to exclude .txt
    // push the object in the empty array
    // utilize the callback to return an object
   
  fs.readdir(this.dataDir, (err, file) => {
    var data = [] 
    for(var i =0; i < file.length; i++){
      var obj = {};
      var id = file[i].slice(0,5);
      obj['id'] = id;
      obj['text'] = id;
      data.push(obj)
    }
      if (err) {
        throw ('error');
      } else {
        callback(null, data);
      }
  });
};

exports.readOne = (id, callback) => {
  // set a variable for the file path (id)
  //
  var filePath = `${this.dataDir}/${id}.txt` 
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (!data) {
      callback(new Error(`No item with id: ${id}`));
    } else {
      callback(null, { id, text: data});
    }
  })
};

exports.update = (id, text, callback) => {
  //given id, read the file to retrieve the dat 
  //replace the data to the given text
  //writefile
  var fileName = `${this.dataDir}/${id}.txt`
  //if fileName exist??
  if(fs.existsSync(fileName)){
  fs.writeFile(fileName, text, (err) => {
    if (err) {
      callback(new Error(`No item with id: ${id}`))
    } else {
      callback(null, { id, text });
    }
  })
} else {
  callback(err)
}
  
 

  // var item = items[id];
  // if (!item) {
  //   // callback(new Error(`No item with id: ${id}`));
  // } else {
  //   items[id] = text;
  //   callback(null, { id, text });
  
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
