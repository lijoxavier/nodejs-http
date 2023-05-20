import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from "axios"
// import {userList} from '../../userList'

function App() {
  const [userList,setUserList]=useState([])
  const [input,setInput]=useState('')
  const fetchUser = async (name) => {
    const options = {
      method: "post",
      // url:"user",
      mode: "cors",
      data: {
        name
      }
    }
    const user = await axios.get("http://127.0.0.1:3305/user")
    console.log(user);
    
    setUserList(user?.data)


    
  }
  const handleChange=(event)=>{
     setInput(event.target.value)
  }
  console.log(input);
  const sendUserData=async()=>{
    const options={
      // url:"http://127.0.0.1:3305/user",
      method:"post",
      mode:"cors",
      data:{
        name:input.trim()
      }
    }
    if(input.trim().length>0){
      const user =await axios("http://127.0.0.1:3305/user",options)
      console.log(user);
      fetchUser()
      console.log(userList);
    }

  }

  useEffect(() => {
    fetchUser()
  }, [])

  return (
    <>
    {userList.map((user,key)=><h3 key={key}>{user.name}</h3>)}
    <input type="text" name="" id="" onChange={handleChange}/>
    <button type='submit' onClick={sendUserData}>submit</button>
    </>
  )
}

export default App
