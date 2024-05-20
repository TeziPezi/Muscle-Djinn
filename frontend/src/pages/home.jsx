import React, { Component } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles.css';

class Home extends Component {
    handleLoginClick = () => {
        this.props.navigate('/loginForm');
    };

    handleRegisterClick = () => {
        this.props.navigate();
    }

    render() {
        return (
            <React.Fragment>
                <div className="headPosition">
                    <div className="container">
                        <br/><br/>
                        <button type="button" className="Button" onClick={this.handleLoginClick}>Login</button>
                        <br/><br/>
                        <button type="button" className="Button" onClick={this.handleRegisterClick}>Register</button>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

// Ein Wrapper, um useNavigate zu nutzen und es als Prop an die Home-Komponente weiterzugeben
const HomeWithNavigate = (props) => {
    const navigate = useNavigate();
    return <Home {...props} navigate={navigate} />;
};

export default HomeWithNavigate;
