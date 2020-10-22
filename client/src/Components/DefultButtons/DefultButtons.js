import React from 'react'

import "./defultButtons.css"

function DefultButtons({lable, handelClick, type}) {
    return (
        <div className="defaultButtonsContainer">
            <button type={type} onClick={handelClick? handelClick : null}>{lable}</button>           
        </div>
    )
}

export default DefultButtons
