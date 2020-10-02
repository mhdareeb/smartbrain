import React from  'react';

const Rank = ({name, entries}) => {
    return (
        <div className='f2 bg-redi'>
            <p className='ma0 bg-greeni' >Hi {name}, your rank is #{entries}</p>
        </div>
    )    
}

export default Rank;