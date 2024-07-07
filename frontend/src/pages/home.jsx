import React, { Component } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles.css';
import axios from 'axios';

axios.defaults.withCredentials = true;

class Home extends Component {

    state = {
        auth: false, 
    };

    componentDidMount() {
        axios.get(`${process.env.REACT_APP_API_URL}/logged`)
            .then(response => {
                if (response.data.loginValue) {
                    this.setState({ auth: true });
                }
            })
            .catch(error => {
                console.error("There was an error fetching the user!", error);
            });

    }

    handleLoginClick = () => {
        this.props.navigate('/loginForm');
    };

    handleRegisterClick = () => {
        this.props.navigate('/Signup');
    }

    handleGuestClick = () => {
        this.props.navigate('/');
    }

    render() {
        const { auth } = this.state;

        return (
            <React.Fragment>
                {auth ?

                    <div className="headPosition">
                        <div className="container">
                        The Homepage.<br/><br/>
                        </div>
                    </div>
                    :
                    <div className="headPosition">
                        <div className="container">
                            <br /><br />
                            <button type="button" className="Button" onClick={this.handleLoginClick}>Login</button>
                            <br /><br />
                            <button type="button" className="Button" onClick={this.handleRegisterClick}>Register</button>
                            <br /><br />
                            <button type="button" className="Button" onClick={this.handleGuestClick}>Als Gast fortfahren</button>
                        </div>
                    </div>

                }
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
