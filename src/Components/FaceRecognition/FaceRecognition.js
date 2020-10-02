import React from  'react';
import BoundingBox from './BoundingBox';
import './FaceRecognition.css';

const round = (num) => Math.round(num*100)/100

const FaceRecognition = ({url, boxes, display}) => {
    if(url==='')
    {
        return <div className='dn'></div>
    }
    else
    {
        const bounding_boxes = boxes.map(box=> <BoundingBox key={box.id} box={box} display={display} />)
        const detections = boxes.map(box=>{
           return (
                <tr key={box.id}>
                    <td>{round(box.id)}</td>
                    <td>{round(box.top)}</td>
                    <td>{round(box.right)}</td>
                    <td>{round(box.bottom)}</td>
                    <td>{round(box.left)}</td>
                </tr>
           ) 
        });
        return (
            <div id='parent' className='flex flex-column justify-center items-center'>
                <div className='relative'>
                    <img id='face' src={url} alt='face'/>
                    {bounding_boxes};                    
                </div>
                <div className='f4 tl mt2' style={{display:display}}>
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Top</th>
                                <th>Right</th>
                                <th>Bottom</th>
                                <th>Left</th>
                            </tr>
                        </thead>
                        <tbody>
                            {detections}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default FaceRecognition;