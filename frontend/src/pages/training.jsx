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
                        The Trainingpage.<br /><br />
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias at ex mollitia voluptas suscipit repellendus itaque nesciunt dicta quae laborum, fugit velit atque? Explicabo cum nostrum facere animi ea temporibus eveniet dolor deserunt assumenda quod fugit aliquid voluptates quae fuga soluta, nisi maxime inventore eos necessitatibus cupiditate quos? Magnam, rerum?
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
