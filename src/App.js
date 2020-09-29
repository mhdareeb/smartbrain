import React,{Component} from 'react';
import Navigation from './Components/Navigation/Navigation';
import Logo from './Components/Logo/Logo';
import Rank from './Components/Rank/Rank';
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './Components/FaceRecognition/FaceRecognition';
import './App.css';
import SignIn from './Components/SignIn/SignIn';
import Register from './Components/Register/Register';
import Particles from 'react-particles-js';
import params from './ParticlesParams';

import Clarifai from 'clarifai';

const app = new Clarifai.App({
 apiKey: 'abc9a218c21a479894812cabb1bc3752'
});

class App extends Component {
  constructor()
  {
    super();
    this.state={
      route : 'signin',
      url: '',
      boxes:[],
      display:'none'
    }
  }

  calculateFaceBox = (normalized) => {
    const image = document.getElementById('face');
    const width = image.width;
    const height = image.height;
    const top = normalized.top_row*height;
    const right = (1-normalized.right_col)*width;
    const bottom = (1-normalized.bottom_row)*height;
    const left = normalized.left_col*width;
    return {top,right,bottom,left};
  }

  onSearchChange = (event) => {
    this.setState({url:event.target.value, box:{}, display:'none'});
  }

  onDetect = () => {
    console.log('hello');
    app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.url)
    .then(response => {
      const normalized_boxes = response.outputs[0].data.regions.map(face=>face.region_info.bounding_box).splice(0,5);
      const bounding_boxes = normalized_boxes.map(box=>this.calculateFaceBox(box));
      bounding_boxes.forEach((box,i)=>box.id=i+1);
      this.setState({boxes:bounding_boxes, display:'block'});
      console.log(this.state.boxes, this.state.display);
    })
    console.log('bye');
  }

  onRouteChange = (route) => this.setState({route:route})

  render(){
    let {route, url, boxes, display}= this.state;
    console.log(route);
    return (
      <div className="App flex flex-column">
        <Particles params={params} className='particles'/>
        {
          (route==='signin')
          ? 
          <div className='ontop'>
            <div className='flex items-start justify-end pa3'>
              <Navigation text='Register' onRouteChange={this.onRouteChange} newroute='register'/>
            </div>
            <SignIn onRouteChange={this.onRouteChange}/>
          </div>
          :
          (
            route==='register'
            ?
            <div className='ontop'>
              <div className='flex items-start justify-end pa3'>
                <Navigation text='Sign In' onRouteChange={this.onRouteChange} newroute='signin'/>
              </div>
              <Register onRouteChange={this.onRouteChange}/>
            </div>
            :
            <div className='ontop'>
              <div className='flex items-start justify-between pa3 bg-bluei'>
                <Logo id='logo'/>
                <Navigation text='Sign Out' onRouteChange={this.onRouteChange} newroute='signin'/>
              </div>
              <div className=''>
                <Rank />
                <ImageLinkForm onSearchChange={this.onSearchChange} onDetect={this.onDetect} />
                <FaceRecognition url={url} boxes={boxes} display={display}/>
              </div>
            </div>
          )
        }
      </div>
    )
  }
}

export default App;