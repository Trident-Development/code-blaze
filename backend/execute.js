import { languageToExtension, languageToExecutable } from './languageMap';


// general purpose execution of files
const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");


const outputPath = path.join(__dirname, "outputs");



if (!fs.existsSync(outputPath)) {
    fs.mkdirSync(outputPath, { recursive: true });
}



/*004545af-372e-4b4d-91d0-69ba76e25dd0.cpp*/
const getFileExtension = (filepath) => {
    let reg = new RegExp('\.[^.\\/:*?"<>|\r\n]+$')
    return filepath.match(reg)[0]
}



const executeIt = (filepath) => {
    const jobId = path.basename(filepath).split(".")[0];
    const outPath = path.join(outputPath, `${jobId}.out`);
    const language = getFileExtension(filepath);
    
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
    
    // if (tellMeLang == '.cpp'){
    //     return new Promise((resolve, reject) => {
    //         exec(
    //             `${languageToExecutable[tellMeLang]} ${filepath} -o ${outPath} && cd ${outputPath} && ./${jobId}.out`,
    //             (error, stdout, stderr) => {
    //             error && reject({ error, stderr });    
    //             stderr && reject(stderr);
    //             resolve(stdout);
    //             }
    //         );    
    //     });    
    // } else if (tellMeLang == '.py'){

    // }
};    

module.exports = {
    executeCpp,
};