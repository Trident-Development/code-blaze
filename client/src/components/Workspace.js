import React from 'react'
import OutputPanel from './OutputPanel';


// class Workspace extends React.Component {

//     constructor(props) {
// console.log(props);

//         super();
//         this.props = props
//         this.outputPanelWidth = 35;
//     }
    


//     render() {
//         return (
//             <div id="workspace">

//                 { this.props.editor }

//                 <OutputPanel id="outputPanel" width={`${this.outputPanelWidth}vw`}>
//                     <div id="output">Output: {this.props.output}</div>
//                 </OutputPanel>

//             </div>
//         );
//     }
// }

const Workspace = (props) => {
    console.log(props);
    const output = props.output;
    const {editor} = props;
    console.log(output, 'ayo');
    return (
        <div id="workspace">
            { editor }
            <OutputPanel id="outputPanel" width='35vw' output={output}/>

        </div>
    );
}
export default Workspace;