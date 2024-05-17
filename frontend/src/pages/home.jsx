import React, { Component } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles.css';

class Home extends Component {
    handleLoginClick = () => {
        this.props.navigate('/loginForm');
    };

    render() {
        return (
            <React.Fragment>
                <div className="headPosition">
                    <div className="container">
                        The Homepage.<br/><br/>
                        <button type="button" className="Button" onClick={this.handleLoginClick}>
                            Login
                        </button>
                        <br/><br/>
                        <button type="button" className="Button">Register</button>
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
