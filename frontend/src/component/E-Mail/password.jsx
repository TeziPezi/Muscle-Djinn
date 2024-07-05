import React from 'react';

function Password() {
    return <React.Fragment>
        <div className="passwordreset">
            <form>
                <span style={{ color: 'white' }}><h4>Neues Password</h4></span>
                <input type="password" name="password" placeholder="Password" /><br/>
                <input type="password" name="passwordr" placeholder="Password wiederholen" /><br/>
            </form>
            <button type="submit">Zurücksetzen</button>
        </div>
    </React.Fragment>
}

export default Password;