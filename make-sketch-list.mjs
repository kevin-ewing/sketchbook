/*
This is a simple script that looks in the `sketches` directory and builds a list of all of the sketches that it finds in there.
*/


import {readdirSync, statSync} from "node:fs";
import { open } from 'node:fs/promises';
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const root = path.join(__dirname,"sketches");

const contents = readdirSync(root, {withFileTypes:true});
const sketcheDirs = contents.filter((f)=>f.isDirectory());
const sketches = [];

for (let sketch of sketcheDirs){
  const stat = statSync(path.join(root, sketch.name));

  sketches.push({
    name:sketch.name,
    date:stat.birthtime
  })

}

const json = JSON.stringify(sketches);
let filehandle = null;
try{
  filehandle = await open("sketches.json", "w");
  await filehandle.write(json);
}finally{
  await filehandle?.close();
}




