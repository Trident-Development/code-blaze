import axios from "axios";
import "./App.css";
import React, { useState, useEffect } from "react";
import stubs from "./defaultStubs";
import moment from "moment";
import "./components/style.css";
import "./components/Ace";

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
          <option value="ambiance">Ambiance</option>
          <option value="chaos">Chaos</option>
          <option value="chrome">Chrome</option>
          <option value="clouds">Clouds</option>
          <option value="clouds_midnight">Clouds Midnight</option>
          <option value="cobalt">Cobalt</option>
          <option value="crimson_editor">Crimson Editor</option>
          <option value="dawn">Dawn</option>
          <option value="dracula">Dracula</option>
          <option value="dreamweaver">Dreamweaver</option>
          <option value="eclipse">Eclipse</option>
          <option value="github">Github</option>
          <option value="gob">Gob</option>
          <option value="gruvbox">Gruvbox</option>
          <option value="idle_fingers">IDLE Fingers</option>
          <option value="iplastic">Iplastic</option>
          <option value="katzenmilch">Katzenmilch</option>
          <option value="kr_theme">Kr Theme</option>
          <option value="kuroir">Kuroir</option>
          <option value="merbivore">Merbivore</option>
          <option value="merbivore_soft">Merbivore Soft</option>
          <option value="mono_industrial">Mono Industrial</option>
          <option value="monokai">Monokai</option>
          <option value="nord_dark">Nord Dark</option>
          <option value="one_dark" selected>One Dark</option>
          <option value="pastel_on_dark">Pastel On Dark</option>
          <option value="solarized_dark">Solarized Dark</option>
          <option value="solarized_light">Solarized Light</option>
          <option value="sqlserver">SQL Server</option>
          <option value="terminal">Terminal</option>
          <option value="textmate">Textmate</option>
          <option value="tomorrow">Tomorrow</option>
          <option value="tomorrow_night">Tomorrow Night</option>
          <option value="twilight">Twilight</option>
          <option value="vibrant_ink">Vibrant Ink</option>
          <option value="xcode">XCode</option>
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
          <option value="cpp">C++</option>
          <option value="py">Python</option>
          <option value="csharp">C#</option>
          <option value="golang">Golang</option>
          <option value="java">Java</option>
          <option value="javascript">Javascript</option>
          <option value="julia">Julia</option>
          <option value="lua">Lua</option>
          <option value="pascal">Pascal</option>
          <option value="perl">Perl</option>
          <option value="php">PHP</option>
        </select>
        <div>
          <button onClick={setDefaultLanguage}>Set Default</button>
        </div>
      </div>



      <div id="workspace">

        <div id="editor"></div>

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
  );
}

export default App;