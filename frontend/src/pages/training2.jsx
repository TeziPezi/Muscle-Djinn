import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles.css';
import axios from 'axios'

function Training() {

    const [auth, setAuth] = useState(false); // hier false
    const [message, setMessage] = useState('');
    const [userID, setUserID] = useState('');
    const [planData, setPlanData] = useState([]);
    const [plans, setPlans] = useState([]);

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
            .then(res =>  { 
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

                    <button onClick={handleclickuebungen}>Übungen erstellen</button>
                    <button type='button' className='Button'>Trainingsplan erstellen</button>
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

