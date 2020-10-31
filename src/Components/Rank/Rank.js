import React from  'react';

const Rank = ({name, entries}) => {
    return (
        <div className='f2'>
            <p className='ma0' >Hi {name}, you have {entries} submissions</p>
        </div>
    )    
}

export default Rank;