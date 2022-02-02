import React from 'react'
import './OutputPanel.css'



class OutputPanel extends React.Component {

    constructor(props) {
        super();
        this.props = props
        this.state = {
            x: 0,
            width: props.width,
            output: props.output
        };
    }
    


    render() {
        return (
            <div id="outputPanel" style={{ width: `${this.props.width}vw` }}>
                <div id="resizer" onMouseDown={this.props.dragHandler}></div>
                <div id="output">Output: {this.state.output}</div>
            </div>
        );
    }
}


export default OutputPanel;