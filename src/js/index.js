import _ from 'lodash';
// Import our custom CSS
import '../scss/styles.scss'

// Import all of Bootstrap's JS
import * as bootstrap from 'bootstrap'



//Images
import Cat from '../assets/images/cat.jpg'

//Data
import Data1 from "../data/data.csv"

import Data2 from "../data/data.xml"
// ?? Support for JSON is actually built-in, similar to NodeJS, meaning import Data from './data.json' will work by default.

import Data3 from '../data/data.json'
// ?? It's possible to import any toml, yaml or json5 files as a JSON module by using a custom parser instead of a specific webpack loader.
import toml from '../data/data.toml';
import yaml from '../data/data.yaml';
import json from '../data/data.json5';

console.log(toml.title); // output `TOML Example`
console.log(toml.owner.name); // output `Tom Preston-Werner`

console.log(yaml.title); // output `YAML Example`
console.log(yaml.owner.name); // output `Tom Preston-Werner`

console.log(json.title); // output `JSON5 Example`
console.log(json.owner.name); // output `Tom Preston-Werner`

function component() {
    const element = document.createElement('div');
    
    // Lodash, now imported by this script
    element.innerHTML = _.join(['Hello', 'webpack'], ' ');
    element.classList.add("main-title");
    
    const myCat = new Image(300,300);
    myCat.src = Cat;
    
    element.appendChild(myCat);
    
    console.log(Data1);
    console.log(Data2);
    console.log(Data3);
    
    const btn = document.createElement('button');
    btn.innerHTML = 'Click me and check the console!';
    btn.onclick = printMe;
  
    element.appendChild(btn);
  
    return element;
  }
  
