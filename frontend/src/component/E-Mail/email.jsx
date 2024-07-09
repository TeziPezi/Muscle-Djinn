import React from 'react';

function EMail() {
    const navigate = () => {
        window.location.href = "/Code";
    }
    return <React.Fragment>
        <div style={{ height: "300px", width: "400px", border: "2px solid white", margin: "0 auto", marginTop: "200px", textAlign: "center"}}>
            <span style={{ color: "white" }}><h3>Password zurücksetzen</h3></span>
            <span style={{ color: "white" }}>Bitte geben sie ihre E-Mail eine,</span><br/>
            <span style={{ color: "white" }}>um ihr Password zurücksetzen</span>
            <div style={{ margin: "20px" }}>
                <form>
                    <input type="email" name="email" placeholder="E-Mail" />
                </form>
                <button onClick={navigate} style={{ margin: "20px", height: "50px", width: "200px"}}>Suchen</button><br/>
            </div>
        </div>
    </React.Fragment>
}

export default EMail;