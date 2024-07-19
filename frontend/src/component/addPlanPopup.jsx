import React, { useState } from "react";
import axios from 'axios';
import '../styles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

const AddPlanPopup = ({ show, handleClose, allExercises, userID }) => {
    const [exercises, setExercises] = useState([{ id: 1, exerciseID: '' }]);
    const [planName, setPlanName] = useState("");
    const [description, setDescription] = useState("");

    // Neue Dropdown-Liste hinzufügen
    const handleAddExercise = () => {
        setExercises([...exercises, { id: exercises.length + 1, exerciseID: '' }]);
    }

    const handleExerciseChange = (index, value) => {
        const newExercises = [...exercises];
        newExercises[index].exerciseID = value;
        setExercises(newExercises);
    }

    const handleCreatePlan = async (event) => {
        event.preventDefault();
        try {
            // Plan erstellen
            const planResponse = await axios.post(`${process.env.REACT_APP_API_URL}/createPlan`, {
                bezeichnung: planName,
                beschreibung: description,
                userID: userID
            });
            const newPlanID = planResponse.data.planID;

            // Neuer Eintrag in Plan_Ubung
            await Promise.all(exercises.map(async (exercise) => {
                if (exercise.exerciseID) {
                    await axios.post(`${process.env.REACT_APP_API_URL}/plan_ubung`, {
                        planID: newPlanID,
                        ubungID: exercise.exerciseID,
                        userID: userID
                    })
                    handleClose();
                }
            }))
        } catch (error) {
            console.error("Error creating plan:", error);
        }
    }

    return (
        <div className={`popup ${show ? 'show' : ''}`}>
            <div className="popup-inner">
                <div className="popup-head">
                    <div></div>
                    <button type="button" className="Close-Button" onClick={handleClose}><FontAwesomeIcon icon={faXmark} /></button>
                </div>
                <h2>Create Plan</h2>
                <form onSubmit={handleCreatePlan}>
                    <label>Plan Name</label>
                    <input type="text" value={planName} onChange={(e) => setPlanName(e.target.value)} required />
                    <label>description</label>
                    <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} required />
                    {exercises.map((SelectedExercise, index) => (
                        <div key={index} className="dropdown">
                            <select
                                value={SelectedExercise.exerciseID}
                                onChange={(e) => handleExerciseChange(index, e.target.value)}
                                required>
                                <option value="">Select an exercise</option>
                                {allExercises.map((exercise) => (
                                    <option key={exercise.ubungID} value={exercise.ubungID}>{exercise.bezeichnung}</option>
                                ))}
                            </select>
                        </div>
                    ))}

                    <div>
                        <button type="button" className="Button" onClick={handleAddExercise}>add exercise</button>
                        <button type="submit" className="Button" >Create Plan</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddPlanPopup