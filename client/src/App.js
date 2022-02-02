import React from 'react';
import './App.css';
import Dropdown from './components/Dropdown';
import { themeOptions, languageOptions } from './options';
import AceEditor from 'react-ace';
import Workspace from './components/Workspace';
import axios from "axios";


// import the languages
import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/mode-csharp";
import "ace-builds/src-noconflict/mode-golang";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/mode-perl";
import "ace-builds/src-noconflict/mode-php";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/mode-ruby";

// import the themes
import "ace-builds/src-noconflict/theme-dracula";
import "ace-builds/src-noconflict/theme-eclipse";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/theme-one_dark";
import "ace-builds/src-noconflict/theme-terminal";
import "ace-builds/src-noconflict/theme-solarized_dark";




/**
 * class App
 */

class App extends React.Component {

  constructor() {
    super();
    this.editor = null;
    
    // set the initial state
    this.state = {
      language: 'cpp',
      theme: 'dracula',
      content: '',
      output: 'NULLS',
    };
    this.onRunButtonClicked = this.onRunButtonClicked.bind(this);
  }

  onLanguageChanged = (language) => {
    this.setState({ language: language });
  }

  onThemeChanged = (theme) => {
    this.setState({ theme: theme });
  }

  
  async onRunButtonClicked() {

    alert(this.state.content);
    let language = this.state.language;
    let code = this.state.content;
    const payload = {
      language,
      code,
    };
    
    try {
      const { data } = await axios.post("http://localhost:5001/run", payload);
      if (data.jobId){}
      this.setState({output: data});
      console.log(this.state.output);
    }
    catch ({ response }) {
      if (response) {
        const errMsg = response.data.err.stderr;
        alert(errMsg);
      }
      else {
        
      }
    }
  }

  

  setContent(value) {
    this.setState({ content: value })
  }



  createEditor() {
    this.editor = (
      <AceEditor  mode={this.state.language} theme={this.state.theme}
                        height='100%' fontSize={15} width="75vw"
                        onChange={value => {this.setContent(value);}}
                        setOptions={{
                        enableBasicAutocompletion: true,
                        enableLiveAutocompletion: true,
                        enableSnippets: true, showPrintMargin: true,
                        showLineNumbers: true,
                        tabSize: 4, showGutter: true
                        }}/>
    )
  }



  /**
   * Render client
   * @returns Components
   */
  render() {

    this.createEditor();

    return (
      <div id="App">
        
        {/*Header bar on top of the screen*/}
        <div id="headerBar">

          <div id="logo">
            <label>CodeBlaze</label>
            <label id="description">An online collorative IDE</label>
          </div>

          <div id="buttonsContainer">

            <div id="dropdownContainer">
              <Dropdown id="themeDropdown" width="155px" label="Theme" 
                  options={themeOptions} onSelect={this.onThemeChanged} />
              <Dropdown id="langDropdown" width="125px" label="Language"
                  options={languageOptions} onSelect={this.onLanguageChanged} />
            </div>

            <button id="runButton" onClick={this.onRunButtonClicked}>
              Run Code
            </button>

          </div>

        </div>

        <Workspace id="workspace" editor={this.editor} output = {this.state.output}/>

      </div>
    );
  }
}


export default App;