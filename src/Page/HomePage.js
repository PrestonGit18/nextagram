import React , {useState, useEffect}from 'react';
import axios from 'axios';
import UserImages from '../container/UserImages.js'
import LoadingIndicator from '../container/LoadingIndicator'
import {Link} from 'react-router-dom'
const HomePage = () => {
  const [isLoading,setLoading] = useState(true)
  const [users, setUser] = useState([])
  useEffect(() => {
    axios.get('https://insta.nextacademy.com/api/v1/users')
    .then(response => {
      setLoading(false)
     setUser(response.data)
      console.log(response.data)
    })
    .catch(error => {
      console.log('ERROR', error)
    })
  },[])
    return (
        <div>
        <ul style={{backgroundColor:'#efefef'}}>
          {isLoading ? 
          <LoadingIndicator width={500} height={500}/>:
          users.map((user) => (
            <li style={{listStyleType: 'none', marginBottom: '50px'}}>
              <h5>{user.id}: {user.username}</h5>
              <br/>
              <div className='divStyle' style={{display:'flex'}}>
              <img src={user.profileImage} style={{width: '200px', height: '200px', borderRadius: '360%'}}/>
              <br />
              <UserImages userId={user.id} />
              </div>
              <button className="linkBtn"><Link to={`/users/${user.id}`} style={{color: 'white', textDecoration: 'none', fontSize: '20px'}}>See more</Link></button>
              <hr className="hrStyle"/>
            </li>
          ))}
        </ul>
        </div>
    )
}
export default HomePage