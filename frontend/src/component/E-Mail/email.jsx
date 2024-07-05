import React from 'react';

function EMail() {
    return <React.Fragment>
        <span style={{ color: 'white' }}><h2>Password zurücksetzen</h2></span>
        <span style={{ color: 'white' }}>Bitte geben sie ihre E-Mail eine, um ihr Password zurücksetzen</span>
        <div className="emailsuche">
            <form action="/Code">
                <input type="email" name="email" placeholder="E-Mail" />
            </form>
            <button type="sumbit">Suchen</button><br/>
        </div>
    </React.Fragment>
}

export default EMail;