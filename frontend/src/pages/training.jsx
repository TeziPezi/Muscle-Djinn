import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import '../styles.css';
import Uebungen from './Uebungen';

const Training = () => {
    const navigate = useNavigate();
    const [visible, setVisible] = useState(false);

    const handleClickUebungen = () => {
        navigate('/uebungen');
    };

    return (
        <React.Fragment>
            <div className="headPosition">
                <div className="container">
                    The Trainingpage.<br/><br/>
                </div>
            </div>

            <button onClick={() => setVisible(true)} className="icon-button">
                <span className="text">Add</span>
                <FontAwesomeIcon icon={faPlus} className="icon" />
            </button>

            <Modal 
                isOpen={visible} 
                onRequestClose={() => setVisible(false)}
                className="modal-content"
                overlayClassName="modal-overlay"
            >
                <Uebungen />
            </Modal>
        </React.Fragment>
    );
};

export default Training;
