import React from 'react'
import './Dropdown.css';



class Dropdown extends React.Component {
    
    constructor(props) {
        super();
        this.val = null;
        this.props = props;
        this.onChangeEvent = this.onChangeEvent.bind(this);
    }


    onChangeEvent(e) {
        let val = e.target.value;
        this.props.onSelect(val);
    }


    render() {
        return (
            <div id="container">

                <label id="label"> {this.props.label} </label>

                <select id="dropdown" onChange={this.onChangeEvent} 
                        style={{width:this.props.width}} >

                        {this.props.options.map(({ value, label }) => 
                            <option value={value}>{label}</option>)}

                </select>

            </div>
        );
    }
}


export default Dropdown;