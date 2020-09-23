import React from  'react';
import face from './logo.svg';
import Tilt from 'react-tilt';

const Logo = () => {
    return (
        <Tilt className="Tilt bg-red flex items-center" options={{ max : 40 }} style={{ height : 120, width: 120 }} >
            {/* <div className="bg-red Tilt-inner flex"> */}
                <img className='bg-yellow' src={face} alt='face recognition' />
            {/* </div> */}
        </Tilt>
    )
}

export default Logo;