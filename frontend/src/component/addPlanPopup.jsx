import React, { useState, useEffect } from "react";
import axios from 'axios';
import '../styles.css';

const AddPlanPopup = ({ show, handleClose, allExercises }) => {


    return (
        <div className={`popup ${show ? 'show' : ''}`}>
            <div className="popup-inner">
                <select name="" id="">
                <option value="">Select an option</option>
                    {allExercises.map((exercise) => (
                        <option style={{color:"black"}} key={exercise.UbungID} value="">{exercise.Bezeichnung}</option>
                    ))}
                </select>
                <div>
                    <button type="button" className="Button" onClick={handleClose}>Create Plan</button>
                    <button type="button" className="Button" onClick={handleClose}>Close</button>
                </div>
            </div>
        </div>
    )
}

export default AddPlanPopup