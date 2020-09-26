import React from  'react';

const ImageLinkForm = ({onSearchChange, onDetect}) => {
    return (
        <div className='bg-bluei f5 flex justify-center pa2'>
            <div className='bg-orangei mt2'>
                <input className='pv1 mh2' onChange={onSearchChange} placeholder='Enter image URL'/>
                <button className='pv1' onClick={onDetect} >Detect</button>
            </div>
        </div>
    )
}

export default ImageLinkForm;