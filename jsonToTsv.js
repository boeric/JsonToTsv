// csvToJson.js
// the script creates a json file from a csv or tsv file
// auto detects row end character(s), auto detects column separator (comma or tab)
// author: Bo Ericsson, bo@boe.net, 2016, public domain
// uses code by Curran Kelleher (see attrib below)
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
}
catch(e) {
  console.log("could not open input file " + inputFile + ", reason: " + e);
  return;
}

// get columns
var columns = Object.keys(input[0])

var out = [];
// output column header
out.push(columns.join("\t"))

input.forEach(function(row) {
  //console.log("--", row)
  var items = [];
  columns.forEach(function(column) {
    items.push(row[column])
  })
  items = items.join("\t");
  out.push(items)
})

out = out.join("\n");

try {
  fs.writeFileSync(outputFile, out, "utf8");
  console.log("wrote file: " + outputFile);
} catch(e) {
  console.log("could not write to file " + outputFile + ", reason: " + e)
}

