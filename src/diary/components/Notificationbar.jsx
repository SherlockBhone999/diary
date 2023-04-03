import {useState, useContext} from 'react'
import {Context} from '../DiaryContextProvider'

export default function Notificationbar(){
  const {uploaded} = useContext(Context)
  
  
  return <div>
  {
    uploaded? <div>
    
      You have uploaded today's diary. Want to update it?
      
    </div>:<div >
      You have not uploaded today's diary, make sure to write it , because today may be one of the days you wish to go back in the future. Also don't forget to live the best out of it.
    </div>
  }
  </div>
}