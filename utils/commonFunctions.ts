import fs from "fs";

export const readFile = async (filePath: string): Promise<any> => {

  return new Promise((resolve, reject) => {

    fs.readFile(filePath, (err, data) => {
      
      if(err) return reject("File not found");

      return resolve(data.toString());
    });

  });
}

