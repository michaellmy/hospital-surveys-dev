import React, { Component } from 'react';
import { Result, Button } from 'antd';
import Header from '../layout/Header';

export class NotFound extends Component {
    render() {
        return (
            <div>
                <Header/>
                <Result
                    status="404"
                    title="404 Not Found"
                    subTitle="Sorry, the page you visited does not exist."
                    extra={<Button type="primary" onClick={() => window.location = "/"}>Back Home</Button>}
                />
            </div>
        )
    }
}

export default NotFound
