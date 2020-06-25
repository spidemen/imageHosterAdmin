import React, { Component } from 'react'
import { Input, Button, Checkbox } from 'antd';
import { Form, FormControl } from 'react-bootstrap';
import { Typography } from "antd";
import { URL } from 'url'
import * as multihash from 'multihashes'
var config = require('./config');
const { Title } = Typography;
const Slogan = (
    <Title className="slogan">imagehoster block system.</Title>
);


class HomePage extends Component {

    constructor() {
        super();
        this.state = {
            image_url: '',
            image_key: '',
            msg: '',
            error_flag: false,
            success_flag: false,
            base58_url: ''
        };

    }

    componentDidMount() {
        sessionStorage.setItem('loginStatus', 'false');
        sessionStorage.setItem('username', 'defalut');
    }

handleSubmit = e => {
    e.preventDefault();
    if (this.state.image_url.length == 0 ) {
        this.setState({ error_flag: true, msg: 'please input image url ' })
        return;
    }
    if (this.state.image_url.includes('/p/')) {
        let base58Key = this.state.image_url
        if (this.state.image_url.lastIndexOf('?')!=-1) {
            base58Key = base58Key.substring(base58Key.indexOf('/p/') + 3, base58Key.lastIndexOf('?'))
        } else {
            base58Key = base58Key.substring(base58Key.indexOf('/p/') + 3)
        }
        // try {
        //     let url = this.parseUrl(base58Key)
        //     this.setState({ base58_url: url.toString() })
        //     console.log(url.toString())
        // } catch (err) {
        //     this.setState({ base58_url: 'invalid proxy url , cannot decode into base58' })
        // }
    }
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: this.state.image_url })
    };
    let url = config.enpoint + '?apikey=' + config.apikey + "&&syn=false"
    fetch(url, requestOptions)
        .then(async response => {
            console.log(response)
            const data = await response.json();
            // check for error response
            if (!response.ok) {
                // get error message from body or default to response status
                // console.log(data)
                return Promise.reject(data);
            } else {
                console.log(data)
                this.setState({ success_flag: true, error_flag: false, msg: data.message ,
                base58_url:data.base58_url});
            }
        })
        .catch(error => {
            this.setState({ error_flag: true, success_flag: false, msg: JSON.stringify(error) });
            console.error('There was an error!', JSON.stringify(error));
        });


}
render() {

    return (
        <div className='homepage-container'>
            <div className='homepage-leftContainer'>
                <Button type="primary" size="large" >
                    post block
                   </Button>
                <br></br>
                <br></br>
                <Button type="primary" size="large" >
                    image block
                  </Button>
                <br></br>
                <br></br>
                <Button type="primary" size="large" >
                    account block
                      </Button>
            </div>
            <div className='homepage-rightContainer'>
                <Form>
                    <Form.Group>
                        <Form.Label>Image url</Form.Label>
                        <Input placeholder="please input image url"
                            value={this.state.image_url}
                            onChange={e => {
                                this.setState({ error_flag: false, success_flag: false, image_url: e.target.value })
                            }}
                        />
                    </Form.Group>

                    {/* <Form.Group>
                        <Form.Label>Image Key</Form.Label>
                        <Input placeholder="please input image key"
                            value={this.state.image_key}
                            onChange={e => {
                                this.setState({ error_flag: false, image_key: e.target.value })
                            }}
                        />
                    </Form.Group> */}
                    <br />
                    <Button variant="primary" type="submit" onClick={this.handleSubmit} >
                        Submit
                        </Button>
                    {this.state.error_flag &&
                        <div>
                            <text style={{ color: 'red' }}>{this.state.msg}</text>
                        </div>}

                    {this.state.success_flag &&
                        <div>
                            <text style={{ color: 'green' }}>{this.state.msg}</text>
                        </div>}
                </Form>
                <div>
                    <br />
                    <p> proxy base58: {this.state.base58_url}
                    </p>
                </div>
            </div>
        </div>
    );
}
}

export default HomePage;