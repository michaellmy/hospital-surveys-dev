import React, { Component } from 'react';
import { Result, Button } from 'antd';
import { Link } from 'react-router-dom';

import Header from '../layout/Header';

export class Completion extends Component {
    render() {
        return (
            <div>
                <Header/>
                <Result
                    status="success"
                    title="Successfully Submitted Responses!"
                    subTitle="Your answers and responses have been submitted."
                    style={{backgroundColor: "rgb(216, 229, 243)"}}
                    extra={[
                        <Link to="/"><Button type="primary">
                            Return to Home Page
                        </Button></Link>
                    ]}
                />
            </div>
        )
    }
}

export default Completion
