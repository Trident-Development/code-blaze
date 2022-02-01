import React from 'react'
import OutputPanel from './OutputPanel';



class Workspace extends React.Component {

    constructor(props) {
        super();
        this.props = props
        this.outputPanelWidth = 35;
        this.output = props.output;
    }
    


    render() {
        return (
            <div id="workspace">

                { this.props.editor }

                <OutputPanel id="outputPanel" width={`${this.outputPanelWidth}vw`}>
                    <div id="output">Output: {this.output}</div>
                </OutputPanel>

            </div>
        );
    }
}


export default Workspace;