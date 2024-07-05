import React from 'react';


function Code() {
    return <React.Fragment>
        <div className="code">
            <form>
                <input type="text" name="code" placeholder="Code" /><br/>
            </form>
            <button type="sumbit">Suchen</button><br/>
        </div>
    </React.Fragment>
}

export default Code;