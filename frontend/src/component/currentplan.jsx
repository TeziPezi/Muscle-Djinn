import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons'; // Importiere das Check-Icon
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import '../styles.css';
import axios from 'axios';

const CurrentPlanPopup = ({ show, handleClose, currentplan, userID, planID, planBezeichnung }) => {
    const [selectedUbungID, setSelectedUbungID] = useState(null);
    const [selectedUbungBezeichnung, setSelectedUbungBezeichnung] = useState("");
    const [sätze, setSätze] = useState(Array(3).fill({ Gewicht: "", Wiederholung: "" }));
    const [startTime, setStartTime] = useState(null); 
    const [timerRunning, setTimerRunning] = useState(false);
    const [timerStarted, setTimerStarted] = useState(false);

    const handleStartTimer = () => {
        setStartTime(new Date().toISOString());
        setTimerRunning(true);
        setTimerStarted(true);
    };

    const handleFinish = async (e) => {
        e.preventDefault();
        setTimerRunning(false);
        try {
            await axios.post(`${process.env.REACT_APP_API_URL}/KalenderAdd`, {
                PlanID: planID,
                Start: startTime,
                UserID: userID
            });
        } catch (error) {
            console.error(error);
        }
        handleClose();
    };

    const handleSubmit = async (e, index) => {
        e.preventDefault();
        const set = sätze[index];
        try {
            await axios.post(`${process.env.REACT_APP_API_URL}/VerlaufAdd`, {
                PlanID: planID,
                UserID: userID,
                UbungID: selectedUbungID,
                Gewicht: set.Gewicht,
                Wiederholung: set.Wiederholung
            });
        } catch (error) {
            console.error("Fehler beim Senden der Daten:", error);
        }
    };

    const handleInputChange = (e, index, type) => {
        const value = e.target.value;
        setSätze(prev => {
            const newValues = [...prev];
            newValues[index] = {
                ...newValues[index],
                [type]: value
            };
            return newValues;
        });
    };

    const Navigation = () => (
        <div style={{ display: "flex", overflowX: "auto", whiteSpace: "nowrap", justifyContent: 'center'}}>
            {currentplan.map((item, index) => (
                <div key={index}>
                    <button
                        style={{ fontSize: "16px", background: "transparent", color: "white", width: "150px" }}
                        onClick={() => { setSelectedUbungID(item.UbungID); setSelectedUbungBezeichnung(item.UbungBezeichnung); }}
                    >
                        {item.UbungBezeichnung}
                    </button>
                </div>
            ))}
        </div>
    );

    const MainContent = React.memo(({ ubungID, ubungBezeichnung }) => {
        return (
            <div>
                <h1>{ubungBezeichnung}</h1>
                {ubungID !== null ? (
                    sätze.map((set, index) => (
                        <div key={index}>
                            <form onSubmit={(e) => handleSubmit(e, index)}>
                                <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                                    <input
                                        style={{ width: "100px" }}
                                        type="number"
                                        value={set.Wiederholung}
                                        onChange={(e) => handleInputChange(e, index, 'Wiederholung')}
                                        placeholder="Reps"
                                        required
                                        disabled={!timerStarted} // Eingabefeld nur bearbeiten, wenn der Timer gestartet wurde
                                    />
                                    <span style={{ marginRight: "25px" }}>Reps</span>
                                    <input
                                        style={{ width: "100px" }}
                                        type="number"
                                        value={set.Gewicht}
                                        onChange={(e) => handleInputChange(e, index, 'Gewicht')}
                                        placeholder="Weight"
                                        required
                                        disabled={!timerStarted} // Eingabefeld nur bearbeiten, wenn der Timer gestartet wurde
                                    />
                                    <span style={{ marginRight: "25px" }}>Kg</span>
                                    {timerRunning && <button style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "40px", height: "40px" }} type="submit">
                                        <FontAwesomeIcon icon={faCheck} color="green" />
                                    </button> }
                                </div>
                            </form>
                        </div>
                    ))
                ) : (
                    <p>No Übung selected</p>
                )}
            </div>
        );
    });

    return (
        <div className={`popup ${show ? 'show' : ''}`}>
            <div style={{ backgroundColor: "#272727", maxWidth: 400, width: "100%", borderRadius: 8, height: 450 }}>
                <div className="popup-head">
                    <div style={{width: "40px", marginLeft: 5}}></div>
                    <div><h2>{planBezeichnung}</h2></div>
                    <button style={{width: "40px", marginTop: 5, marginBottom: 5, marginRight: 5 }} type="button" className="Close-Button" onClick={ !timerRunning && handleClose || timerRunning && handleFinish }><FontAwesomeIcon icon={faXmark} /></button>
                </div>
                <div style={{ height: "75px" }}>
                    <Navigation />
                </div>

                <div style={{ height: "260px", overflowX: "hidden", whiteSpace: "nowrap" }} className='Reps'>
                    <MainContent ubungID={selectedUbungID} ubungBezeichnung={selectedUbungBezeichnung} />
                    {timerRunning && <button style={{ marginTop: "10px", marginRight: "20px" }} type="button" className="Button" onClick={() => setSätze(sätze.slice(0, -1))}>Del Set</button>}
                    {timerRunning && <button style={{ marginTop: "10px" }} type="button" className="Button" onClick={() => setSätze([...sätze, { Gewicht: "", Wiederholung: "" }])}>Add Set</button>}
                </div>

                <footer style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <div style={{ background: '#fff', borderRadius: '10px', textAlign: 'center', color: 'black', display: "flex", alignItems: "center", justifyContent: "center", marginRight: "20px" }}>
                    </div>
                    {!timerRunning && <button style={{ marginRight: "25px" }} type="button" className="Button" onClick={handleStartTimer}>Start</button>}
                    {timerRunning && <button type="button" className="Button" onClick={handleFinish}>Finish</button>}
                </footer>
            </div>
        </div>
    );
}

export default CurrentPlanPopup;
