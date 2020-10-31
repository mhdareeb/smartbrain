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

class App extends Component {
  constructor()
  {
    super();
    this.emptyUser = {id:'', name:'', email:'', entries:'', joined:''};
    this.state={
      route : 'signin',
      url: '',
      boxes:[],
      display:'none',
      displayError : 'none',
      user : {
        id : '',
        name : '',
        email : '',
        entries : '',
        joined : ''
      }
    };
  }

  setUserData = (user) => {
    Object.assign(this.state.user, user);
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
    this.setState({url:event.target.value, boxes:[], display:'none', displayError:'none'});
  }

  onDetect = () => {
    let errorNode = document.getElementById('error');
    fetch('https://agile-earth-63734.herokuapp.com/detect',{
      method : 'POST',
      headers : {'Content-Type' : 'application/json'},
      body : JSON.stringify({
          url : this.state.url
      })
    })
    .then(res=>res.json())
    .then(response => {
      if(response!=='failed')
      {
        this.showError(errorNode,"");
        const normalized_boxes = response.outputs[0].data.regions.map(face=>face.region_info.bounding_box).splice(0,5);
        const bounding_boxes = normalized_boxes.map(box=>this.calculateFaceBox(box));
        bounding_boxes.forEach((box,i)=>box.id=i+1);
        const nboxes = bounding_boxes.length;
        fetch('https://agile-earth-63734.herokuapp.com/image',{
          method : 'PUT',
          headers : {'Content-Type' : 'application/json'},
          body : JSON.stringify({
              id:this.state.user.id,
              nboxes : nboxes
          })
        })
        .then(res=>res.json())
        .then(user=>{
          this.setState({
            user:user,
            boxes:bounding_boxes,
            display:'block'
          })
        })
        .catch(console.log);
      }
      else
      {
        this.setState({displayError :'block'});
        this.showError(errorNode, 'Detection failed, check URL');
      }
    })
    .catch(console.log);
  }

  onRouteChange = (route) => {
    this.setState({route:route})
    if(route!=='home')
    {
      Object.assign(this.state.user, this.emptyUser);
      this.setState({url:'',boxes:[], display:'none'});
    }
  }

  showError = (node, message) => {
    node.innerHTML = message;
    node.style.color = 'red';
  }

  render(){
    let {route, url, boxes, display, user} = this.state;
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
            <SignIn showError={this.showError} onRouteChange={this.onRouteChange} setUserData={this.setUserData}/>
          </div>
          :
          (
            route==='register'
            ?
            <div className='ontop'>
              <div className='flex items-start justify-end pa3'>
                <Navigation text='Sign In' onRouteChange={this.onRouteChange} newroute='signin'/>
              </div>
              <Register showError={this.showError} onRouteChange={this.onRouteChange}/>
            </div>
            :
            <div className='ontop'>
              <div className='flex items-start justify-between pa3'>
                <Logo id='logo'/>
                <Navigation text='Sign Out' onRouteChange={this.onRouteChange} newroute='signin'/>
              </div>
              <div className=''>
                <Rank name={user.name} entries={user.entries}/>
                <ImageLinkForm onSearchChange={this.onSearchChange} onDetect={this.onDetect} />
                <div id='error' style={{display:this.state.displayError}} ></div>
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