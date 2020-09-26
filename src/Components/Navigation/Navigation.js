import React from  'react';

const Navigation = ({text, onRouteChange, newroute}) => {
    return (
        <div className='bg-redi'>
            <p onClick={()=>onRouteChange(newroute)} className='f4 bg-greeni pointer color-black ma0 pa1 link dim black underline-hover'>{text}</p>
        </div>
    )
}

export default Navigation;