// jsonToTsv.js
// the script creates a tab separated file from a json file
// author: Bo Ericsson, bo@boe.net, 2016, public domain
'use strict';

// dependencies
var fs = require("fs");
var util = require("util");

// check arguments
if (process.argv.length < 4) {
  console.log("usage: node jsonToTsv input-json-file output-tsv-file");
  console.log("example: node jsonToTsv input.json output.txt\n");
  return;
}

// get file names
var inputFile = process.argv[2];
var outputFile = process.argv[3];

// read the input file
var input;
try {
  input = fs.readFileSync(inputFile, 'utf8');
  input = JSON.parse(input);
} catch(e) {
  console.log("could not open or parse input file " + inputFile + ", reason: " + e);
  return;
}

// create output array
var out = [];

// get columns from props of first array item
var columns = Object.keys(input[0])

// output column header with tab separator
out.push(columns.join("\t"))

// output data rows
input.forEach(function(row) {
  var items = [];
  
  // get the data elements and add to items array
  columns.forEach(function(column) { items.push(row[column]) })
  
  // create output string with data items separated by a tab, then add the string
  items = items.join("\t"); 
  out.push(items)
})

// join output array items with newline, then redefine output
out = out.join("\n");

// write the file
try {
  fs.writeFileSync(outputFile, out, "utf8");
  console.log("wrote file: " + outputFile);
} catch(e) {
  console.log("could not write file " + outputFile + ", reason: " + e)
}

