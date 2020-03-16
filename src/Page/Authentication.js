import React, {useState, useRef} from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

function Authentication() {
    const [modal1, modal1Change] = useState(false)
    const [isLogin, changeForm] = useState(true)
    const Username = useRef('')
    const Password= useRef('')
    const Email = useRef('')
    const ConfirmPasswords= useRef('')
    const [disabled, setEnabled] = useState(true)

    const [delay, setDelay] = useState(null);
    const [usernameValid, setUsernameValid] = useState(true);
    const [username, setUsername] = useState("") 
    
    const checkUsername = newUsername => {
      console.log("Making API call to check username!");
      axios
        .get(
          `https://insta.nextacademy.com/api/v1/users/check_name?username=${newUsername}`
        )
        .then(response => {
          console.log(response.data);
          if (response.data.valid) {
            setUsernameValid(true);
            toast.success('The username is available')
          } else {
            setUsernameValid(false)
            toast.warning('This user name is not available')
          }
        });
    };
  const handleChange = (e) => {
    if(Username.current.value.length < 6 ||
      Email.current.value.length < 6 ||
      Password.current.value.length <6 ||
      ConfirmPasswords.current.value <6 ||
      Password.current.value !== ConfirmPasswords.current.value
    ){
      setEnabled(true)
    }else {
      setEnabled(false)
    }
    clearTimeout(delay);
    const newUsername = e.target.value;
    setUsername(newUsername);
    const newDelay = setTimeout(() => {
      checkUsername(newUsername);
    }, 500);
    setDelay(newDelay);
  }
  const Modal1Style = {
    display: modal1? 'block': 'none',
    width: '100vw',
    height: '100vh'
  }
  const BtnClick = () => {
    modal1Change(!modal1)
  }

  const toSignUp = () => {
    changeForm(false)
  }
  const toLoginIn = () => {
    changeForm(true)
  }
  const LgnBtn = () => {
    axios({
        header: {
            'Content-Type' : 'application/json'
        },
        method: 'POST',
        url: 'https://insta.nextacademy.com/api/v1/login',
        data: {
           username: Username.current.value,
           password: Password.current.value,
        }
    })
    .then(result=> {
        console.log(result)
        localStorage.setItem('jwt', result.data.auth_token)
        toast.success("Signed up successfully!", {
           position: "top-right",
           autoClose: 5000,
           hideProgressBar: false,
           closeOnClick: true,
           pauseOnHover: true,
           draggable: true
        })
    })
  }
  const SubBtn = () => {
    console.log(Username.current.value)
    console.log(Email.current.value)
    console.log(Password.current.value)      
    console.log(ConfirmPasswords.current.value)
      axios({
        method:'POST',
        url: 'https://insta.nextacademy.com/api/v1/users/',
        headers: {
          'Content-Type': 'application/json'
        },
          data: {
            username: Username.current.value,
            email: Email.current.value,
            password: Password.current.value
          }
      })
      .then(response => {
        console.log(response)
        toast.success("Signed up successfully!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true
        });
      })
      .then(error => {
        console.log(error)
      })
  }
  const closeModal = () => {
    modal1Change(false)
  }
  return (
    <div>
      <ToastContainer />
      <nav>
        <input className= 'inputStyle'  style={{position:'relative', left:'820px', bottom:'20px'}}/>
        <button className="ipBtn" style={{position:'relative', left:'820px', bottom:'20px'}}>Search</button>
        <a href="" className='users' style={{textDecoration: 'none',position:'relative', left:'830px', bottom:'20px'}}>Users</a>
        <button onClick={BtnClick} className='users' style={{position:'relative', left:'840px', bottom:'20px'}}>Login</button>
        <div classname='Modal'>
        <div style={Modal1Style} className='ModalStyle'>
        {
          isLogin ?
          <div className='LoginStyle'>
            <span className='formTitle'>Login</span><button className='closeBtn' onClick={closeModal}>X</button>
            <hr />
            <h6>Username</h6>
            <input type='text' className ='InputStyle' ref={Username}/>   
            <h6>Password</h6>
            <input type='password' className ='InputStyle' ref={Password}/><br />
            <span className='newSpan'>New member?</span><button onClick={toSignUp} className='SUHStyle'>Sign up here</button>
            <br />
            <button onClick={LgnBtn} >Login</button>
          </div>:
          <div>
            <span className='formTitle'>Sign Up</span>
            <button className='closeBtn' onClick={closeModal}>X</button>
            <hr />
            <h6>Username</h6>
            <input type='text' className ='InputStyle' ref={Username} onChange={handleChange}/>
            <h6>Email</h6>
            <input type='text' className ='InputStyle' ref={Email} onChange={handleChange}/>
            <h6>Password</h6>
            <input type='password' className ='InputStyle' ref={Password} onChange={handleChange}/>
            <h6> Confirm Password</h6>
            <input type='password' className ='InputStyle' ref={ConfirmPasswords} onChange={handleChange}/><br />
            <span className='newSpan'>Already a member?</span><button onClick={toLoginIn} className='SUHStyle'>Log in here</button><br />
            <button onClick={SubBtn} disabled={disabled}>Submit</button>
          </div>
        }
        </div>
        </div>
        </nav>
    </div>
  );
}

export default Authentication;