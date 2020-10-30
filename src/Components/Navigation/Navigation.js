import React from  'react';

const Navigation = ({text, onRouteChange, newroute}) => {
    return (
        <div>
            <p onClick={()=>onRouteChange(newroute)} className='f4 pointer color-black ma0 pa1 link dim black underline-hover'>{text}</p>
        </div>
    )
}

export default Navigation;