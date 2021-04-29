'use strict';

import { existsSync, readFileSync } from 'fs';
import { CONSTRAINT, ERR_MSG } from "./src/index.js";

function findKey(obj, target) {
  const fnd = obj => {
    for (const [k, v] of Object.entries(obj)) {
      if (v === target) return k;
      if (typeof v === 'object') {
        const f = fnd(v);
        if (f) return f;
      }
    }
  }
  return fnd(obj);
}

function funcToExec(passedVal) {
  if (typeof passedVal === 'number' && passedVal > 0) {
    console.log(`${passedVal} az nagyobb, mint 0 kölyök, na kezdjél vele valamit`)
  }
}

function findValues(obj, key) {
  return Object.entries(obj)
    .reduce((acc, [k, v]) => (k === key)
      ? acc.concat(v)
      : (typeof v === 'object' && v)
        ? acc.concat(findValues(v, key))
        : acc
      , []) || [];
}

function findVals(obj, key) {
  return Object.entries(obj)
    .reduce((acc, [k, v]) => {
        if (k === key) {
          funcToExec(v);
          return acc.concat(v);
        } else {
          if (typeof v === 'object' && v) {
            return acc.concat(findVals(v, key));
          } else {
            return acc;
          }
        }
      }, []) || [];
}

const noOfArgs = process.argv.length;
if (noOfArgs !== CONSTRAINT.NO_OF_ARGS) {
  console.log(ERR_MSG.NO_OF_ARGS_MUST_BE_THREE)
  process.exit(1);
}

const filename = process.argv[2];
if (!existsSync(filename)) {
  console.log(ERR_MSG.CANNOT_FIND_FILE)
  process.exit(1);
}

const bufferedData = readFileSync(filename, {encoding: "utf-8"});

const loadedJson = JSON.parse(bufferedData);
// console.log(findKey(loadedJson, 2));
console.log(findVals(loadedJson, "mittommilyen"));
console.log(findVals(loadedJson, "trim"));