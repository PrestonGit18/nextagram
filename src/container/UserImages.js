import React , {useState, useEffect} from 'react'
import axios from 'axios'
import LoadingIndicator from './LoadingIndicator'
const UserImages = (props) => {
    const {userId} = props
    const [images, setImages] = useState([])
    const [isLoading, setLoading] = useState(true)
    useEffect(() => {
      axios.get(`https://insta.nextacademy.com/api/v2/images?userId=${userId}`)
      .then(response => {
          setLoading(false)
       setImages(response.data)
        console.log(response.data)
      })
      .catch(error => {
        console.log('ERROR', error)
      })
    },[])
    return (
            <div>
                { isLoading ? 
                <LoadingIndicator style={{width: '50px', height: '50px'}}/>:
                images.map(image => (
                    <img src={image.url} style={{width: '200px', height: '200px', padding: '10px'}}/>
                ))
                }
            </div>
    )
}
export default UserImages