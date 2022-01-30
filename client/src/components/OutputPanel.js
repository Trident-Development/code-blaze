import React from 'react'
import './OutputPanel.css'



class ResizableBox extends React.Component {

    constructor(props) {
        super();
        this.state = {
            x: 0,
            width: props.width
        };
        this.dragHandler = this.dragHandler.bind(this);
        this.mouseMoveHandler = this.mouseMoveHandler.bind(this);
        this.mouseUpHandler = this.mouseUpHandler.bind(this);
    }

    

    dragHandler(e) {
        // get mouse x position
        this.setState({ x: e.clientX });
    
        // attach the listenser to document
        document.addEventListener('mousemove', this.mouseMoveHandler);
        document.addEventListener('mouseup', this.mouseUpHandler);
    }
    
    
    
    mouseMoveHandler(e) {
        let dx = e.clientX - this.x;                // distance the mouse has moved
        let width = `${this.state.width - dx}vw`;   // calculate the new width
        this.setState({ width: width });            // adjust the width of the element
    }
    
    
    
    mouseUpHandler() {
        // remove the handler of 'mousemove' and 'mouseup'
        document.removeEventListener('mousemove', this.mouseMoveHandler);
        document.removeEventListener('mouseup', this.mouseUpHandler);
    }
    


    render() {
        return (
            <div id="outputPanel" style={{ width: this.state.width }}>
                <div id="resizer" onMouseDown={this.dragHandler}></div>
                <div id="output">Output:</div>
            </div>
        );
    }
}


export default ResizableBox;