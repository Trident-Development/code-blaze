import axios from "axios";
import "./App.css";
import React, { useState, useEffect } from "react";
import stubs from "./defaultStubs";
import moment from "moment";
import "./components/style.css";
// import ace from "ace";
import * as ace from 'ace-builds/src-noconflict/ace';

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
    <div className="App" id="header">
      <div id="logo">Code with Me</div>
      <div>
        <label>Language:</label>
        <select
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
          <option value="cpp">C++</option>
          <option value="py">Python</option>
        </select>
      </div>
      <br />
      <div>
        <button onClick={setDefaultLanguage}>Set Default</button>
      </div>
      <br />
      <textarea
        rows="20"
        cols="75"
        value={code}
        onChange={(e) => {
          setCode(e.target.value);
        }}
      ></textarea>
      <br />
      <div id="button-containers">
        <button onClick={handleSubmit} id="run-button">Submit</button>
      </div>
      <p>{status}</p>
      <p>{jobId ? `\nJob ID: ${jobId}` : ""}</p>
      <p>{renderTimeDetails()}</p>
      <div id="workspace">

        <div id="editor"></div>

        <div id="output-panel">
          <div id="resizer"></div>
          <div id="output">{output}</div>
        </div>
      </div>
    </div>
  );
}

export default App;