import React from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import toast from 'react-hot-toast'
import {  motion } from "framer-motion";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import Postsend from './Postsend'
import Videopost from './Videopost'
import UserTable from './UserTable'
import EntireNotes from './EntireNotes'
const Manager = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const checkManagerRole = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_NODE_BACKEND_URL}/manager/managerrole`, {
          withCredentials: true
        });
  
        console.log("Server Response:", res.data); // Debugging
  
        if (res?.status === 200) {
          if (res.data.role === 'Admin' || res.data.role === 'Manager') {
            console.log('Admin and Manager have access to this page');
          } else {
            toast.error('You are not allowed to access this page');
            navigate('/');
          }
        }
      } catch (error) {
        console.error("Error fetching role:", error);
        toast.error('You are not allowed to access this page');
        navigate('/');
      }
    };
  
    checkManagerRole();
  }, [navigate]);
  const [postOpen,setPostOpen] = useState(false)
    const [videoOpen,setVideoOpen] = useState(false)
    const [entireNotes,setEntireNotes] = useState(false)
  
  return (
    <div className='flex flex-col'>
      <div className='flex justify-center items-center'>
      <h1 className='bg-gradient-to-tr from-purple-600 to-pink-500 bg-clip-text text-transparent text-clip text-center text-4xl md:text-5xl font-extrabold border-b-4 border-green-600 leading-normal antialiased inline-block'>Manager Page</h1>
      </div>
      <div className='flex flex-col md:flex-row justify-around items-center gap-8 md:gap-0 py-6 md:py-4'>
      <button className=' rounded-4xl' onClick={()=>setPostOpen(true)}>
        <Card sx={{ maxWidth: 345 }} className='rounded-2xl'>
      <CardActionArea>
        <motion.img src='/public/image/postimage2.avif' alt='img' animate={{y:[0,-14,0]}} transition={{repeat:Infinity,duration:2,ease:'easeInOut'}}/>
          
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Post Panel
          </Typography>
          <Typography variant="body2"  className=' leading-relaxed text-yellow-500'>
          This panel serves as a dynamic control hub for managing all posts, including exciting events, passionate discussions, and enthusiastic engagements.
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
        </button>
      <button className=' rounded-4xl' onClick={()=>setEntireNotes(true)}>
        <Card sx={{ maxWidth: 345 }} className='rounded-2xl'>
      <CardActionArea>
        <motion.img src='/public/image/notesadmin4.avif' alt='img' animate={{y:[0,-14,0]}} transition={{repeat:Infinity,duration:2,ease:'easeInOut'}}/>
          
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Notes Administrative Panel
          </Typography>
          <Typography variant="body2"  className=' leading-relaxed text-yellow-500'>
          This panel is equipped with essential controls to manage website notes efficiently, ensuring that only accurate and valuable information is delivered
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
        </button>
        
      </div>
      <div className='flex flex-col md:flex-row justify-around items-center gap-8 md:gap-0 py-6 md:py-4'>
        <button className=' rounded-4xl'onClick={()=>setVideoOpen(true)}>
        <Card sx={{ maxWidth: 345 }} className='rounded-2xl'>
      <CardActionArea>
        <motion.img src='/public/image/video.avif' alt='img' animate={{y:[0,-14,0]}} transition={{repeat:Infinity,duration:2,ease:'easeInOut'}}/>
          
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Video Panel
          </Typography>
          <Typography variant="body2"  className=' leading-relaxed text-yellow-500'>
          "This panel is designed to showcase inspiring event and activity videos, motivating aspiring students to grow, excel, and shine!"
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
        </button>
        
        
        {
          postOpen &&
        <Postsend onClose={()=>setPostOpen(false)}/>
        }
        {
          videoOpen && 
          <Videopost onClose={()=>setVideoOpen(false)}/>
        }
        {
          entireNotes &&
          <EntireNotes onClose={()=>setEntireNotes(false)}/>
        }
        
      </div>
    </div>
  )
}

export default Manager


// import React, { useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import toast from 'react-hot-toast';

// const Manager = () => {
//   const navigate = useNavigate();

//   const checkManagerRole = async () => {
//     try {
//       const res = await axios.get('http://localhost:3000/manager/managerrole', {
//         withCredentials: true
//       });

//       if (res.status === 200) {
//         if (res.data.role === 'Admin' || res.data.role === 'Manager') {
//           console.log('Admin and Manager have access to this page');
//         } else {
//           toast.error('You are not allowed to access this page');
//           navigate('/');
//         }
//       }
//     } catch (error) {
//       console.error(error);
//       toast.error('You are not allowed to access this page');
//       navigate('/');
//     }
//   };

//   useEffect(() => {
//     checkManagerRole();
//   }, [navigate]);

//   return (
//     <div>
//       Manager
//     </div>
//   );
// };

// export default Manager;
