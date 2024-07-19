import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import '../styles.css';
import axios from 'axios';
import AddPlanPopup from '../component/addPlanPopup';
import ImportPlanPopup from '../component/importPlanPopup'; // Importiere das neue Popup
import CurrentPlanPopup from '../component/currentplan';

function Home() {

    const [auth, setAuth] = useState(false); // hier false
    const [userID, setUserID] = useState('');
    const [plans, setPlans] = useState([]);
    const [CurrentBezeichnung, setCurrentBezeichnung] = useState('');
    const [Currentplan, setcurrentplan] = useState([]);
    const [PlanID, setPlanID] = useState('');
    const [allExercises, setAllExercises] = useState([]);
    const [showAddPlanPopup, setShowAddPlanPopup] = useState(false);
    const [showImportPlanPopup, setShowImportPlanPopup] = useState(false); // Zustand für Import Plan Popup
    const [showCurrentPlanPopup, setShowCurrentPlanPopup] = useState(false);

    axios.defaults.withCredentials = true;

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

    const importPlan = () => {
        setShowImportPlanPopup(true); // Öffne das Import Plan Popup
    };

    const currentPlan = (planID, planBezeichnung) => {
        setShowCurrentPlanPopup(true);
        setCurrentBezeichnung(planBezeichnung);
        setPlanID(planID);
        setcurrentplan(plans.filter(item => item.PlanID === planID));
    };

    const handleCloseAddPlanPopup = () => {
        setShowAddPlanPopup(false);
        window.location.reload();
    };

    const handleCloseImportPlanPopup = () => {
        setShowImportPlanPopup(false);
        window.location.reload();
    };

    const handleCloseCurrentPlanPopup = () => {
        setShowCurrentPlanPopup(false);
        window.location.reload();
    };

    const handleclickDelete = (planID) => {
        axios.get(`${process.env.REACT_APP_API_URL}/deletePlan/${planID}`)
            .then(res => {
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
                
                <div className='Plan-Description'>
                </div>
               <div> 
                    <button type="button" className='Button' onClick={() => currentPlan(plan.PlanID, plan.PlanBezeichnung)}>Show</button> 
                
                </div >
                
                    {plan.PlanBeschreibung}
                
                <div>
                    <button className='icon-button' onClick={() => handleclickDelete(plan.PlanID)}>
                        <span className="text">Delete</span>
                        <FontAwesomeIcon icon={faTrashCan} className="icon" />
                        </button>
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
                <div className='next'>
                <button onClick={addPlan} className='icon-button'>
                    <span className="text">Add New Plan</span>
                    <FontAwesomeIcon icon={faPlus} className="icon" />
                </button>
                <button onClick={importPlan} className='icon-button'>
                    <span className="text">Import Plan</span>
                    <FontAwesomeIcon icon={faPlus} className="icon" />
                </button>
                </div>
                
                <div className='Plan-Wrapper'>
                    <h2>My training plans</h2>
                    <br />
                    <PlanList plans={plans} />
                </div>

                <AddPlanPopup
                    show={showAddPlanPopup}
                    handleClose={handleCloseAddPlanPopup}
                    allExercises={allExercises}
                    userID={userID}
                />
                <ImportPlanPopup
                    show={showImportPlanPopup} // Hinzufügen des ImportPlanPopup
                    handleClose={handleCloseImportPlanPopup}
                    userID={userID}
                />
                <CurrentPlanPopup
                    show={showCurrentPlanPopup}
                    handleClose={handleCloseCurrentPlanPopup}
                    currentplan={Currentplan}
                    userID={userID}
                    planID={PlanID}
                    planBezeichnung={CurrentBezeichnung}
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