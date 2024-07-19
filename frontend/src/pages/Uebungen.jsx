import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Uebungen = () => {
    const [bezeichnung, setBezeichnung] = useState("");
    const [muskelgruppe, setMuskelgruppe] = useState("");
    const [beschreibung, setBeschreibung] = useState("");
    const [Weight, setWeight] = useState("");
    const [auth, setAuth] = useState(false);
    const [userID, setUserID] = useState('');

    axios.defaults.withCredentials = true;

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/logged`)
            .then(res => {
                if (res.data.loginValue) {
                    setAuth(true);
                    setUserID(res.data.userID);
                    console.log("User ID set:", res.data.userID); // Log userID
                } else {
                    setAuth(false);
                }
            })
            .catch(err => console.log(err));
    }, []);

    const uebungErstellen = () => {
        console.log("Sending User ID:", userID); // Log userID during post request
        axios.post(`${process.env.REACT_APP_API_URL}/uebung_erstellen`, {
            bezeichnung,
            muskelgruppe,
            beschreibung,
            userID
        }).then((response) => {
            window.location.reload();
            console.log(response);
        }).catch(err => console.log(err));
    };

    const cacheUebung = () => {
        const cachedExercises = JSON.parse(localStorage.getItem('cachedExercises')) || [];
        const newExercise = { bezeichnung, muskelgruppe, beschreibung ,Weight};
        cachedExercises.push(newExercise);
        localStorage.setItem('cachedExercises', JSON.stringify(cachedExercises));
        window.location.reload();
        console.log("Exercise cached:", newExercise);//t
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'bezeichnung') setBezeichnung(value);
        if (name === 'muskelgruppe') setMuskelgruppe(value);
        if (name === 'beschreibung') setBeschreibung(value);
        if (name === 'Weight') setWeight(value);
        
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        switch(auth) {
            case true:
                uebungErstellen();
                break;
            default:
                cacheUebung();
                break;
        }
    };

    return (
        <React.Fragment>
            <div className='con' style={{ display: 'flex', justifyContent: 'space-around' }}>
                <div className='wrapp'>
                    <form onSubmit={handleSubmit}>
                        <h1><span style={{ color: "white" }}>Add Exercise</span></h1>

                        <div className='eingabe-box'>
                            <div className='eingabe-icon'>
                                <input 
                                    type="text"
                                    name="bezeichnung"
                                    placeholder='Enter exercise name'
                                    className='eingang'
                                    value={bezeichnung}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div className='eingabe-box'>
                            <div className='eingabe-icon'>
                                <input
                                    type="text"
                                    name="muskelgruppe"
                                    placeholder='Enter muscle group'
                                    className='eingang'
                                    value={muskelgruppe}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        
                        <div className='eingabe-box'>
                            <div className='eingabe-icon'>
                                <input
                                    type="text"
                                    name="beschreibung"
                                    placeholder='Enter description'
                                    className='eingang'
                                    value={beschreibung}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        
                        <button className="knopf" type="submit">Erstellen</button>
                    </form>
                </div>
            </div>
        </React.Fragment>
    );
};

export default Uebungen;
