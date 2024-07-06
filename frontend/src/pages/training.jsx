import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import '../styles.css';
import Uebungen from './Uebungen';
import axios from 'axios';

function Training() {

    const [auth, setAuth] = useState(false); // hier false
    const [message, setMessage] = useState('');
    const [userID, setUserID] = useState('');
    const [planData, setPlanData] = useState([]);
    const [plans, setPlans] = useState([]);
    const [visible, setVisible] = useState(false);
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
                    setMessage(res.data.Error)
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

    const handleclickuebungen = () => {
        navigate('/uebungen');
    };

    const Exercise = ({ exerciseName }) => {
        return <li>{exerciseName}</li>
    }

    const Plan = ({ planName, exercises = [] }) => {
        return (
            <div className='Plan'>
                <h3>{planName}</h3>
                <ul>
                    {exercises.map((exercise, index) => (
                        <Exercise key={index} exerciseName={exercise} />
                    ))}
                </ul>
            </div>
        );
    };

    const getPlanData = (userID) => {
        axios.get(`http://localhost:8081/plan/${userID}`)
            .then(res => {
                setMessage(res.data.message);
                setPlanData(res.data.plan);
                console.log(res.data.plan)

            })
            .catch(err => console.log(err));
    };

    /* const getExercisesForPlan = (planID) => {
         axios.get(`http://localhost:8081/exercises/${planID}`)
             .then(res => {
             })
     }*/


    return (
        auth ? (
            <div className='headPosition'>
                <div className='container'>
                    The Trainingpage.<br /><br />

                    <button onClick={() => setVisible(true)} className="icon-button">
                    <span className="text">Add</span>
                    <FontAwesomeIcon icon={faPlus} className="icon" />
                </button>

                <button className='icon-button'><span className="text">Trainnigsplan Erstellen</span>
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
                </div>
                <br />
                <br />
                <br />
                <br />
                <br />
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

                <br />
                <br />
                <div className='Trainnigsplan'>
                    <div className='Plan-Wrapper'>
                        {/*plans.map((plan, index) => (
                                <Plan key={index} planName={plan.name} exercises={plan.exercises} />
                            ))*/}
                    </div>
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

