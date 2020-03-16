import React from 'react'
import {Route} from 'react-router-dom'
import HomePage from './Page/HomePage.js'
import UserProfilePage from './Page/UserProfilePage'
import Authentication from './Page/Authentication'
// import ProfilePage from './Page/ProfilePage'
import './App.css'
import LoadingIndicator from './container/LoadingIndicator.js'

function App() {
  return (
    <div>
      <nav>
        <img src="https://www.pinclipart.com/picdir/middle/158-1580825_instagram-icon-free-instagram-logo-black-clipart.png"style={{width: '50px', height: '50px', position:'relative',top:'15px'}}/>
        <a href="" style={{color: 'black', textDecoration: 'none', fontSize: '30px'}}>Nextagram</a>
        <Authentication />
        </nav>
      <Route exact path="/" component={HomePage} />
      <Route path="/users/:id" component={UserProfilePage} /> 
      {/* <Route path="/profilepage" component={ProfilePage}/> */}
    </div>
  );
}
/*The word exact before path is to make sure it is exactly only /, no other things
if there is no switch reserved word then it will show evrything thing if the url is matching with the path
*/
export default App