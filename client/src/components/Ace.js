import React from 'react';

// Import Brace and the AceEditor Component
import brace from 'brace';

import {split as SplitEditor} from 'react-ace';

// Import a Mode (language)
import 'brace/mode/java';

// Import a Theme (okadia, github, xcode etc)
import 'brace/theme/github';

export default class App extends React.Component {

    constructor(props, context) {
        super(props, context);
        
        this.onChange = this.onChange.bind(this);
    }

    onChange(newValue) {
        console.log('change', newValue);
    }

    render() {
        return (
            <div>
                <SplitEditor
                    mode="java"
                    theme="github"
                    splits={2}
                    orientation="beside"
                    value={['hi', 'hello']}
                    name="UNIQUE_ID_OF_DIV"
                    editorProps={{$blockScrolling: true}}
                />
            </div>
        );
    }
}
