import fs from "fs/promises";

async function readFileData(filePath) {
  try {
    let data = await fs.readFile(filePath);
    return data.toString().trim();
  } catch (error) {
    await writeToFile(filePath, "");
    let newData = await fs.readFile(filePath);
    return newData.toString().trim();
  }
}

async function writeToFile(filePath, data) {
  try {
    await fs.writeFile(filePath, data);
  } catch (error) {
    throw new Error("An error occured while writing to file");
  }
}

export { readFileData, writeToFile };
