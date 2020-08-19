import { createWriteStream, createReadStream } from "fs";
import path from "path";
import { pipeline } from "stream";
import { promisify } from "util";
import { stringCSVtoJSON } from "./stringCSVtoJSON.js";
import zlib from "zlib";

const asyncPipeline = promisify(pipeline);

const initialFilePath = path.resolve(path.dirname(""), "data.csv");
const finalFilePath = path.resolve(path.dirname(""), "parsedData.json.gz");

const reader = createReadStream(initialFilePath);
const writer = createWriteStream(finalFilePath);

async function* parser(data) {
  data.setEncoding("utf8");
  for await (const chunk of data) {
    yield stringCSVtoJSON(chunk);
  }
}

await asyncPipeline(reader, parser, zlib.createGzip(), writer);
