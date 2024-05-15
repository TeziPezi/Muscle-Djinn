import React, { Component } from 'react';

class LoginForm extends Component {
    state = {  } 
    render() { 
        return (
            <div className="wrapper">
                <form>
                    <h1>Login</h1>
                    <div className="input-box">
                        <input type="text" placeholder='Username' required/>
                    </div>
                </form>
            </div>
        );
    }
}
 
export default LoginForm;