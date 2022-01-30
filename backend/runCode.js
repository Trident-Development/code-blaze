import exec from "child_process";
import fs from "fs";
import path from "path";
import { languageToExecutable, languageToExtension } from "./languageMap";



const OUT_DIR = path.join(__dirname, "outputs");



/**
 * @param {*} language the programming language chosen
 * @param {*} content  the code to run
 * @param {*} userId   the id of the user
 */
const runCode = (language, content, userId) => {

    let extension = languageToExtension[language];
    let filepath = `${OUT_DIR}/${userId}/${language}.${extension}`;

    if (!fs.existsSync(filepath)) {                     // create the file if not exist
        fs.mkdirSync(filepath, { recursive: true });
    }

    fs.writeFileSync(filepath, content);                // paste the code to the file

    // execute the code //
    
    let exe = languageToExecutable[language];
    let command = `${exe} ${filepath}`;

    if (language == "c_cpp") {
        let oPath = `${OUT_DIR}/${userId}/c_cpp.exe`
        command = `${exe} ${filepath} -o ${oPath} && ./${oPath}`;
    }
    else if (language == "csharp") {
        
    }
    else if (language == "golang") {
        command = `go run ${filepath}`;
    }
    else {
        command = `${exe} ${filepath}`;
    }

    return new Promise((resolve, reject) => {
        exec (command,
            (error, stdout, stderr) => {
                error && reject({ error, stderr });
                stderr && reject(stderr);
                resolve(stdout);
            }
        );
    });
};



module.exports = { runCode }