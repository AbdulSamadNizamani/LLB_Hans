import React, { useState } from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Videos from './Videos'
import PostPanel from './PostPanel'
const Posts = () => {
  const navigate = useNavigate()
  const [videopost,setVideopost] = useState([])
  const [textpost,setTextpost] = useState([])
  useEffect(()=>{
    axios.defaults.withCredentials=true;
    const verify = async ()=>{
      try {
        const res = await axios.get(`${import.meta.env.VITE_NODE_BACKEND_URL}/auth/verify`,{
          withCredentials:true,
        });
        if(res?.status===200){
          console.log('User is loggedIn')
        }else{
          navigate('/login')
        }
      } catch (error) {
       console.log(error) 
       navigate('/login')
      } 
    }
    verify();
  },[]);
  useEffect(()=>{
    const videoposts = async ()=>{
      try {
        const res = await axios.get(`${import.meta.env.VITE_NODE_BACKEND_URL}/videos/getvideopost`)
        if(res?.status===200){
          setVideopost(Array.isArray? res.data : [res.data])
        }
      } catch (error) {
        console.log(error)
      }
    }
    videoposts();
  },[])
  useEffect(()=>{
    const textpost = async ()=>{
      try {
        const res = await axios.get(`${import.meta.env.VITE_NODE_BACKEND_URL}/posts/getpost`)
        if(res?.status===200){
          setTextpost(Array.isArray ? res.data : [res.data]);
        }
      } catch (error) {
        console.log(error)
      }
    }
    textpost();
  },[])
  
  return (
    <div className=' overflow-hidden'>
      <div className='flex justify-center items-center py-1'>
        <h1 className='text-3xl text-center py-5 pb-1 text-orange-600 font-bold border-b-3 border-green-500 inline-block antialiased'>Here are Activities of (LLB)</h1>
      </div>
      
      <Videos videopost={videopost} />
      <div className='flex justify-center items-center'>
      <h1 className=' border-b-3 bg-gradient-to-br from-purple-600 to-pink-500 text-transparent bg-clip-text border-b-green-600 text-center text-3xl font-bold inline-block antialiased mb-8'>Post Activities</h1>
      </div>
        <PostPanel textpost={textpost} />
    </div>
  )
}

export default Posts
