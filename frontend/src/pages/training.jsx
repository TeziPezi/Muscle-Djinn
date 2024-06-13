import React, { Component } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles.css';

class Training extends Component {
    state = {};

    handleclickuebungen = () => {
        this.props.navigate('/uebungen');
    };

    render() {
        return (
            <React.Fragment>
                <div className="headPosition">
                    <div className="container">
                        The Trainingpage.<br/><br/>
                    </div>
                </div>
                <button onClick={this.handleclickuebungen}>Übungen erstellen</button>
            </React.Fragment>
        );
    }
}

function withNavigate(Component) {
    return function(props) {
        const navigate = useNavigate();
        return <Component {...props} navigate={navigate} />;
    }
}

export default withNavigate(Training);
