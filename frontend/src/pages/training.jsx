import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import '../styles.css';
import Uebungen from './Uebungen';
import EditPopup from '../component/addPlanPopup';
import axios from 'axios';
import AddPlanPopup from '../component/addPlanPopup';

function Training() {

    const [auth, setAuth] = useState(false); // hier false
    const [userID, setUserID] = useState('');
    const [plans, setPlans] = useState([]);
    const [visible, setVisible] = useState(false);
    const [showAddPlanPopup, setShowAddPlanPopup] = useState(false);
    const [Ubung, setUbung] = useState([]);

    const navigate = useNavigate();

    axios.defaults.withCredentials = true;

    useEffect(() => {
        axios.get('http://localhost:8081/logged')
            .then(res => {
                if (res.data.loginValue) {
                    setAuth(true)
                    setUserID(res.data.userID)
                    getPlanData(res.data.userID)
                }
                else {
                    setAuth(false) // hier false
                }
            })
            .catch(err => console.log(err));
    }, [])



    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8081/Ubung');
                setUbung(response.data);
            } catch (error) {
                console.error('Error fetching the data', error);
            }
        };
        fetchData();
    }, []);



    const getPlanData = (userID) => {
        axios.get(`http://localhost:8081/plan/${userID}`)
            .then(res => {
                setPlans(res.data);

            })
            .catch(err => console.log(err));
    };


    const handleclickstartTraining = () => {

    };

    const addPlan = () => {
        setShowAddPlanPopup(true);
    };

    const handleClosePopup = () => {
        setShowAddPlanPopup(false);
    };


    const Exercise = ({ exercise }) => {
        return <li>{exercise.UbungBezeichnung}</li>;
    };


    const Plan = ({ plan }) => {
        // Filtere die Übungen für den aktuellen Plan
        const exercises = plans.filter(p => p.PlanID === plan.PlanID);

        return (
            <div className='Plan'>
                <h3>{plan.PlanBezeichnung}</h3>
                <ul>
                    {exercises.map((exercise, index) => (
                        <Exercise key={index} exercise={exercise} />
                    ))}
                </ul>
                <div>
                    <button type="button" className='Button' onClick={handleclickstartTraining}>start</button>
                    <button className='icon-button'><FontAwesomeIcon icon={faTrashCan} className="icon"/></button>
                    </div>
            </div>
        );
    };



    const PlanList = ({ plans }) => {
        // Erstelle eine Liste von eindeutigen Plänen
        const uniquePlans = Array.from(new Set(plans.map(p => p.PlanID))).map(planID => {
            return plans.find(p => p.PlanID === planID);
        });

        return (
            <div className='Trainingsplan-list'>
                {uniquePlans.map((plan, index) => (
                    <Plan key={index} plan={plan} />
                ))}
            </div>
        );
    };


    return (
        auth ? (
            <div className='headPosition'>
                <div className='container'>
                    The Trainingpage.<br /><br />

                    <button onClick={() => setVisible(true)} className="icon-button">
                        <span className="text">Add</span>
                        <FontAwesomeIcon icon={faPlus} className="icon" />
                    </button>

                    <button onClick={addPlan} className='icon-button'><span className="text">add new plan</span>
                        <FontAwesomeIcon icon={faPlus} className="icon" />
                    </button>


                    <div className="table-container">
                        <h1>Alle Übungen</h1>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Bezeichnung</th>
                                    <th>Muskelgruppe</th>
                                    <th>Beschreibung</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Ubung.map((ubung) => (
                                    <tr key={ubung.bezeichnung}>
                                        <td>{ubung.bezeichnung}</td>
                                        <td>{ubung.muskelgruppe}</td>
                                        <td>{ubung.beschreibung}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <br />
                    

                    <Modal
                        isOpen={visible}
                        onRequestClose={() => setVisible(false)}
                        className="modal-content"
                        overlayClassName="modal-overlay"
                    >
                        <Uebungen />
                        <button onClick={() => setVisible(false)} className="close-button" > </button>
                    </Modal>

                    <div className='Plan-Wrapper'>
                        <h2>My training plans</h2>
                        <PlanList plans={plans} />

                    </div>

                    <AddPlanPopup
                        show={showAddPlanPopup}
                    />
                    <br />
                    <br />
                    <br />
                    <br />
                </div>
            </div>

        ) : (
            <div className='headPosition'>
                <div className='container'>
                    The Trainingpage.<br /><br />

                </div>
            </div>
        )
    )
};

export default Training;

