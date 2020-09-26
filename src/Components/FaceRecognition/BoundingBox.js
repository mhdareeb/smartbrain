import React from  'react';

const BoundingBox = ({box, display}) => {
    return (
        <div className='absolute ba bw1 b--blue f4' style={{top:box.top, right:box.right, bottom:box.bottom, left:box.left, display:display}} >
            {box.id}
        </div>
    )    
}

export default BoundingBox;