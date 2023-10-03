
import * as React from 'react'

const DisplayContent = (props) => {
    return (
        <div className="container content">
            {props.children}
        </div>
    )
}

export default DisplayContent;