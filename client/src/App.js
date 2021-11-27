import axios from "axios";
import "./App.css";
import React, { useState, useEffect } from "react";
import stubs from "./defaultStubs";
import moment from "moment";
import "./components/style.css";
import {themeOptions, languageOptions }from "./components/options.js";
import AceEditor from 'react-ace';

function App() {
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");
  const [language, setLanguage] = useState("cpp");
  const [jobId, setJobId] = useState(null);
  const [status, setStatus] = useState(null);
  const [jobDetails, setJobDetails] = useState(null);

  useEffect(() => {
    const defaultLang = localStorage.getItem("default-language") || "cpp";
    setLanguage(defaultLang);
  }, [])
  useEffect(() => { setCode(stubs[language]) }, [language]);

  const setDefaultLanguage = () => {
    localStorage.setItem("default-language", language);
    console.log(`${language} set as default language.`);
  }
  let pollInterval;
  const renderTimeDetails = () => {
    if (!jobDetails) {
      return "";
    }
    let result = '';
    let { submittedAt, completedAt, startedAt } = jobDetails;
    submittedAt = moment(submittedAt).toString()
    result += `\nSubmitted At: ${submittedAt}`;
    if (!completedAt || !startedAt) {
      return result;
    }

    const start = moment(startedAt);
    const end = moment(completedAt);
    const executionTime = end.diff(start, 'seconds', true);
    result += ` | Execution Time: ${executionTime}s`;
    return result;
  }
  const handleSubmit = async () => {
    const payload = {
      language,
      code,
    };
    try {
      setOutput("");
      setStatus(null);
      setJobId(null);
      const { data } = await axios.post("http://localhost:5000/run", payload);
      if (data.jobId) {
        setJobId(data.jobId);
        setStatus("Submitted.");

        // poll here
        pollInterval = setInterval(async () => {
          const { data: statusRes } = await axios.get(
            `http://localhost:5000/status`,
            {
              params: {
                id: data.jobId,
              },
            }
          );
          const { success, job, error } = statusRes;
          console.log(statusRes);
          if (success) {
            const { status: jobStatus, output: jobOutput } = job;
            setStatus(jobStatus);
            setJobDetails(job);
            setStatus(jobStatus);
            if (jobStatus === "pending") return;
            setOutput(jobOutput);
            clearInterval(pollInterval);
          } else {
            console.error(error);
            setOutput(error);
            setStatus("Bad request");
            clearInterval(pollInterval);
          }
        }, 1000);
      } else {
        setOutput("Retry again.");
      }
    } catch ({ response }) {
      if (response) {
        const errMsg = response.data.err.stderr;
        setOutput(errMsg);
      } else {
        setOutput("Please retry submitting.");
      }
    }
  };

  return (
    <div className="App">
      <div id="header">
        <div id="logo">Code with Me</div>
        <div id="button-containers">
          <button onClick={handleSubmit} id="run-button">Submit</button>
        </div>
      </div>

      {/* <textarea
        rows="20"
        cols="75"
        value={code}
        onChange={(e) => { setCode(e.target.value); }}>
      </textarea> */}

      <div id="options-panel">

        Theme: &nbsp;
        <select id="themes" class="dropdown" onchange="selectTheme()">
        {themeOptions.map(({ value, label }, index) => <option value={value} >{label}</option>)}
        </select>
        <label>Language:</label>
        <select id="languages" class="dropdown"
          value={language}
          onChange={(e) => {
            let response = window.confirm(
              "WARNING: Switching the language will remove your exisisting code!"
            );
            if (response) {
              setLanguage(e.target.value);
            }
          }}
        >
                {languageOptions.map(({ value, label }, index) => <option value={value} >{label}</option>)}

        </select>
        <div>
          <button onClick={setDefaultLanguage}>Set Default</button>
        </div>
      </div>



      <div id="workspace">

      <AceEditor
          mode="plain_text"
          theme="github"
          // onChange={this.onChange}
          name="UNIQUE_ID_OF_DIV"
          showGutter={true}
          wrapEnabled={true}
          highlightActiveLine={true}
          editorProps={{ $blockScrolling: true }}
          enableBasicAutocompletion={true}
          enableLiveAutocompletion={true}
          setOptions={{
            enableSnippets: true,
            // fontFamily: "tahoma",
            fontSize: "10pt"
          }}
        />
        <div id="output-panel">
          <div id="resizer"></div>
          <div id="output"><p>{status}</p>
            <p>{jobId ? `\nJob ID: ${jobId}` : ""}</p>
            <p>{renderTimeDetails()}</p>
            {output}
          </div>
        </div>
        </div>
        
      </div>
    // </div>
  );
}

export default App;