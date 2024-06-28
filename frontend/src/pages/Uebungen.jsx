import React, { useState } from 'react';
import axios from 'axios';

const Uebungen = () => {
    const [bezeichnung, setBezeichnung] = useState("");
    const [muskelgruppe, setMuskelgruppe] = useState("");
    const [beschreibung, setBeschreibung] = useState("");

    const uebungErstellen = () => {
        axios.post("http://localhost:8081/uebung_erstellen", {
            bezeichnung,
            muskelgruppe,
            beschreibung
        }).then((response) => {
            console.log(response);
        }).catch(err => console.log(err));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'bezeichnung') setBezeichnung(value);
        if (name === 'muskelgruppe') setMuskelgruppe(value);
        if (name === 'beschreibung') setBeschreibung(value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        uebungErstellen();
    };

    return (
        <React.Fragment>
            <div className='con' style={{ display: 'flex', justifyContent: 'space-around' }}>
                <div className='wrapp'>
                    <form onSubmit={handleSubmit}>
                        <h1><span style={{ color: "white" }}>Übung erstellen</span></h1>

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


