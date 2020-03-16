import React, {useState, useEffect} from 'react'
import axios from 'axios';
import { useParams } from 'react-router-dom';
const UserProfilePage = () => {
    const [users, setUser] = useState([])
    const [images, setImages] = useState([])
    const {id} = useParams()
    useEffect(() => {
        axios.get(`https://insta.nextacademy.com/api/v1/users/${id}`)
        .then(response => {
         setUser(response.data)
          console.log(response.data)
        })
        .catch(error => {
          console.log('ERROR', error)
        })
        axios.get(`https://insta.nextacademy.com/api/v2/images?userId=${id}`)
        .then(response => {
         setImages(response.data)
          console.log(response.data)
        })
        .catch(error => {
          console.log('ERROR', error)
        })
      },[])
    return (
        <div>
             <h3>{users.username}</h3>
             <img src={users.profileImage} width='200px' height='200px'/>
             <div>
                 {
                     images.map(image => {
                         return <img src={image.url} style={{width: "150px", height: '150px', padding: '10px'}}/>
                     })
                 }
             </div>
        </div>
    )
}
export default UserProfilePage