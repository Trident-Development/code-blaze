import React from 'react';
import './App.css';
import Dropdown from './components/Dropdown';
import ResizableBox from './components/OutputPanel';
import { themeOptions, languageOptions } from './options';
import AceEditor from 'react-ace';

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




class App extends React.Component {


  constructor() {
    super();
    this.state = {
      language: 'c_cpp',
      theme: 'dracula',
      editorWidth: '65vw',
      outputWidth: '35vw',
    };
  }



  onLanguageChanged = (language) => {
    this.setState({ language: language });
  }



  onThemeChanged = (theme) => {
    this.setState({ theme: theme });
  }



  async onRunButtonClicked() {
    try {
      
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



  render() {

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


        {/*Containing the code editor and the output panel*/}
        <div id="workspace">
          
          <AceEditor  mode={this.state.language} theme={this.state.theme}
                      width={this.state.editorWidth} height='100%' fontSize={15}
                      setOptions={{
                        enableBasicAutocompletion: true,
                        enableLiveAutocompletion: true,
                        enableSnippets: true, showPrintMargin: true,
                        showLineNumbers: true,
                        tabSize: 4, showGutter: true
                      }}/>
          
          <ResizableBox id="outputPanel" width={this.state.outputWidth}>
            <div id="output">Output:</div>
          </ResizableBox>

        </div>

      </div>
    );
  }
}



export default App;