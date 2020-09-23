import React,{Component} from 'react';
import Navigation from './Components/Navigation/Navigation';
import Logo from './Components/Logo/Logo';
import Rank from './Components/Rank/Rank';
// import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm';
// import FaceRecognition from './Components/FaceRecognition/FaceRecognition';
import './App.css';

class App extends Component {
  constructor()
  {
    super();
    this.state={
      onPage : 'home',
      url: ''
    }
  }
  render(){
    let {onPage, url} = this.state;
    return (
      <div className="App">
        <div className='flex items-start justify-between pa3 bg-blue'>
          <Logo />
          {/* <Rank /> */}
          <Navigation />
        </div>
        <Rank />
        {/* 
        
        <ImageLinkForm/>
        <FaceRecognition/> */}
      </div>
    );
    }
}

export default App;
