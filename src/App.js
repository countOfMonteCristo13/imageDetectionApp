import React, {Component} from 'react';
import './App.css';
// import Clarifai from 'clarifai';

import Logo from './Components/Logo/Logo';
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm'
import ParticlesBG from './Components/ParticlesBG/ParticlesBG';
import FaceRecognition from './Components/FaceRecognition/FaceRecognition';
import Choices from './Components/Choices/Choices';


// const apps = new Clarifai.App({
//  apiKey: '751f318ed8c840158b574f1b5071d686'
// });

    const returnClarifaiRequestOptions = (imageUrl) =>{

          // Your PAT (Personal Access Token) can be found in the portal under Authentification
    const PAT = '8c8512418a0d4376ae4fb83cd1319328'; // dodat PAT!
    // Specify the correct user_id/app_id pairings
    // Since you're making inferences outside your app's scope
    const USER_ID = 'elpadre13';     // dodat USER_ID  
    const APP_ID = 'faceRecognition'; // dodat APP_ID -> description app-a
    // Change these to whatever model and image URL you want to use
    const MODEL_ID = 'face-detection'; // dodat MODEL_ID naziv modela koji koristis
    // const MODEL_VERSION_ID = 'aa7f35c01e0642fda5cf400f543e7c40'; on je opcionalan i ne moras da ga koristis
    // koristi sam po sebi najnoviju verziju!   
    // const IMAGE_URL = 'https://samples.clarifai.com/metro-north.jpg'; koristimo ovo ispod
    const IMAGE_URL = imageUrl;

    const raw = JSON.stringify({
        "user_app_id": {
            "user_id": USER_ID,
            "app_id": APP_ID
        },
        "inputs": [
            {
                "data": {
                    "image": {
                        "url": IMAGE_URL
                    }
                }
            }
        ]
      });

      const requestOptions = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Key ' + PAT
        },
        body: raw
    };

      return requestOptions;

    }

    const initialState = {
        input: '',
        imageUrl:'',
        boxes:[],// vrednosti koje dobijamo kao povratnu informaciju za detektovanje slika!
        logoNames:[],
        route:'home',
    }


class App extends Component  {
  constructor(){
    super();
    this.state = initialState;
    }
    // stanja koja postoje na sajtu i koja ce se menjati tokom interakcije sa sajtom
      // input - menja se sa svakim unosom novog url-a, a tako se menja i imageUrl
      // box - menja se svaki put kad stisnemo dugme detect

    // componentDidMount() { // NIJE ARROW FUNKCIJA JER DOLAZI SA REACTOM!
    //   fetch('http://localhost:3001')
    //     .then(response => response.json())
    //     .then(console.log) //isto je kao i da sam napisao data => console.log(data)
    // } Ova metoda vise ne treba, samo pogledaj sta radi!!!

    // loadUser = (data) =>{
    //   this.setState({user: {
    //     id: data.id,
    //     name: data.name,
    //     email: data.email,
    //     entries: data.entries, 
    //     joined: data.joined
    //   }})
    // }

  calculateBoxLocation = (data) =>{ // izracuvana lokaciju face na slici

        const facesList = data.outputs[0].data.regions;
  
        const faces = [];
  
        const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box; // posto objekat sadrzi kordinate
        // kao sto su top bottom right i left, ovo iznad je samo putanja do tih informacija!!! IZRAZENO JE U PROCENTIMA
  
  
        const image = document.getElementById('inputimage'); //povezivanje sa slikom iz FaceRecognition.js
        const width = Number(image.width); // uzimamo sirinu slike!
        const height = Number(image.height); // uzimamo visinu slike!
  
        console.log(facesList);
  
        for(let i = 0; i < facesList.length; i++){
          let faceObject = JSON.parse(JSON.stringify(facesList[i].region_info.bounding_box));
          faceObject.top_row *= height;
          faceObject.left_col *= width;
          faceObject.right_col = (width - (faceObject.right_col * width))-5;
          faceObject.bottom_row = (height - (faceObject.bottom_row * height)) -5;
  
          faceObject.top_row -= 5;
          faceObject.left_col -= 5;


          faces.push(faceObject);
        }
  
        // console.log(faces);
        console.log(data.outputs[0].data.regions);
        // console.log(data.outputs[0].data.regions[0].data.concepts[0].name)
        // console.log(data.outputs[0].data.regions);
  
        return faces;
  
      
  }

  displayFaceBox = (boks) =>{
    this.setState({boxes:boks});
  } // boks treba da bude return od funkcije calculateFaceLocation!!!

  displayLogoNames = (data) =>{
    const logoNames = [];
    const logosList = data.outputs[0].data.regions;

    for(let i = 0; i < logosList.length; i++){
      const logoName = JSON.parse(JSON.stringify(logosList[i].data.concepts[0].name));
      let capitalizeLogoName = logoName.charAt(0).toUpperCase() + logoName.slice(1);
      if(capitalizeLogoName === 'IPhone-1'){
        capitalizeLogoName = 'Apple'
      }
      logoNames.push(capitalizeLogoName);
    }

    const filterLogoNames = [...new Set(logoNames)];
    this.setState({logoNames:filterLogoNames});
    console.log(logoNames);
    console.log(filterLogoNames);

  } 


  onInputChange = (event) =>{
    console.log(event.target.value); 
    this.setState({input:event.target.value});
  }

  onSubmit = (choice) => {
    this.setState({imageUrl:this.state.input});

    // fetch("https://api.clarifai.com/v2/models/" + MODEL_ID + "/outputs", requestOptions)
    // .then(response => response.text())
    // .then(result => console.log(result))
    // .catch(error => console.log('error', error));

    // fetch("https://api.clarifai.com/v2/models/" + 'face-detection' + "/outputs", returnClarifaiRequestOptions(this.state.input))
    // .then(response => response.json())
    // .then(result => console.log(result))
    // .catch(error => console.log('error', error));

    let detection = 'face-detection'
    // const detection = 'logos-yolov5'
    
    if (choice === 'logo'){
      detection = 'logos-yolov5'
    }


    fetch("https://api.clarifai.com/v2/models/" + detection + "/outputs", returnClarifaiRequestOptions(this.state.input))
    .then(response => response.json())
      .then(response => {
        console.log('hi', response)
        if (response) {
          fetch('https://magicbrainbackend.onrender.com/image', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              id: this.state.user.id
            })
          })
            .then(response => response.json())
            .then(count => {
              this.setState(Object.assign(this.state.user, { entries: count}))
            })
            .catch(err =>{
              console.log(err);
            })

        }
        this.displayFaceBox(this.calculateBoxLocation(response))
        if(choice === 'logo'){
          this.displayLogoNames(response)
        }
      })
      .catch(err => console.log(`mrtvii erorr!!! ${err}`));


  }

  onRouteChange = (rout) =>{
    if(rout === 'home'){
      this.setState({boxes:[],imageUrl:'',logoNames:[]});
    }
    this.setState({route:rout});
  }

  render(){
    const {route, boxes, imageUrl,logoNames} = this.state;
    return (
      <div className="App">
          <ParticlesBG />
          {
        route === 'home' ? (
          <div>
            <Choices onRouteChange={this.onRouteChange} />
          </div>
        ) :  (
              route === 'face' ? (
                <>
                  <Logo/>
                  <ImageLinkForm 
                    onInputChange={this.onInputChange} 
                    onSubmit={this.onSubmit}
                    choice='face'
                  />
                  <FaceRecognition boxes = {boxes} imageUrl = {imageUrl} logoArray={logoNames} onRouteChange={this.onRouteChange}/>
                </>
              ) : route === 'items' ? (
                <>
                  <Logo/>
                  <ImageLinkForm 
                    onInputChange={this.onInputChange} 
                    onSubmit={this.onSubmit}
                    choice='logo'
                  />
                  <FaceRecognition boxes = {boxes} imageUrl = {imageUrl} logoArray={logoNames} onRouteChange={this.onRouteChange}/>
                </>
              ) : null
            )
      }
      </div>
    );
  }
}

export default App;

// Prvo dizajn sajta
// Zatim pogledas od cega ti se sajt sastoji tj koliko i koje komponente zahteva
// Zatim dodajes komponente u glavnu klasu App!!!

// <ImageLinkForm onInputChange={this.onInputChange}/> prvo onInputChange je ime koje mora da bude isto
// kao ime props-a/argumenta kod fajla ImageLinkForm.js
// this.onInputChange - this se koristi jer pokazuje na funckiju onInputChange iz klase!
// Ta linija koda zapravo pretstavlja da on poziva taj fajl i daje mu kao argument svoju funkciju
// koja se poziva u trenutku kada se input menja (onChange = {onInputChange}) onInputChange je argument!


// Kreces polako svaku komponentu da pravis !

