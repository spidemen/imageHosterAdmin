  
import React from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import Icon from '@ant-design/icons';
class ImageBlock extends React.Component {
    constructor() {
        super();
        this.state = {
        };
     
      }
      
      handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
        });
      };
    
      render() {
        const { getFieldDecorator } = this.props.form;
    
        return (
          
          <div >
            <Form onSubmit={this.handleSubmit} className="login-form">
              <Form.Item>
                {getFieldDecorator('username', {
                  rules: [{ required: true, message: 'Please input your username!' }],
                })(
                  <Input
                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    placeholder="Username"
                  />,
                )}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator('password', {
                  rules: [{ required: true, message: 'Please input your Password!' }],
                })(
                  <Input
                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    type="password"
                    placeholder="Password"
                  />,
                )}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator('remember', {
                  valuePropName: 'checked',
                  initialValue: true,
                })(<Checkbox>Remember me</Checkbox>)}
                <Button type="primary" htmlType="submit" className="login-form-button">
                  submit
                </Button>
              </Form.Item>
            </Form>
          </div>
        );
      }
}

const WrappedImageBlock = Form.create({ name: 'image_block' })(ImageBlock);

export default WrappedImageBlock;