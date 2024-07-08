import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import '../styles.css';
import axios from 'axios';
import AddPlanPopup from '../component/addPlanPopup';



function Home() {

    const [auth, setAuth] = useState(false); // hier false
    const [userID, setUserID] = useState('');
    const [username, setUsername] = useState('');
    const [plans, setPlans] = useState([]);
    const [allExercises, setAllExercises] = useState([]);
    const [showAddPlanPopup, setShowAddPlanPopup] = useState(false);

    axios.defaults.withCredentials = true;

    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/logged`)
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

    const getPlanData = (userID) => {
        axios.get(`${process.env.REACT_APP_API_URL}/plan/${userID}`)
            .then(res => {
                setPlans(res.data.plans);
                setAllExercises(res.data.allExercises);

            })
            .catch(err => console.log(err));
    };

    const addPlan = () => {
        setShowAddPlanPopup(true);
    };

    const handleClosePopup = () => {
        setShowAddPlanPopup(false);
        window.location.reload();
    };

    const handleclickStartTraining = () => {

    };

    const handleclickDelete= (planID) => {
        axios.get(`${process.env.REACT_APP_API_URL}/deletePlan/${planID}`)
            .then(res =>{
                window.location.reload();
            }       
            )
            .catch(err => {
                console.error("Error deleting plan:", err);
            });
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
                    <button type="button" className='Button' onClick={handleclickStartTraining}>start</button>
                    <button className='icon-button' onClick={() => handleclickDelete(plan.PlanID)}><FontAwesomeIcon icon={faTrashCan} className="icon" /></button>
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
        <div className='headPosition'>
            <div className='container'>
            <button onClick={addPlan} className='icon-button'><span className="text">add new plan</span>
                        <FontAwesomeIcon icon={faPlus} className="icon" />
                    </button>
                <div className='Plan-Wrapper'>
                    <h2>My training plans</h2>
                    <PlanList plans={plans} />

                </div>

                <AddPlanPopup
                    show={showAddPlanPopup}
                    handleClose={handleClosePopup}
                    allExercises={allExercises}
                    userID={userID}
                />
                <br />
                <br />
                <br />
                <br />

            </div>
        </div>
    )
} 

export default Home;