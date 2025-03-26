import React from 'react';
import { motion } from 'framer-motion';
import { FaEnvelope, FaWhatsapp } from 'react-icons/fa';

const AdminInfo = () => {
  return (
    <div className='py-12 min-h-screen flex flex-col items-center text-gray-900 overflow-hidden'>
      <motion.h1 
        initial={{ opacity: 0, y: -20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 1 }}
        className='text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-red-500 px-6 py-2 border-b-4 border-gray-800 shadow-lg rounded-lg'>
        Meet the Creator 
      </motion.h1>
      
      <div className='mt-12 flex flex-col lg:flex-row items-center gap-12 w-full px-6 md:px-20'>
        {/* Image Section */}
        <motion.div 
  initial={{ rotateY: 0 }}
  animate={{ rotateY: 180 }}
  transition={{ 
    duration: 3,  
    repeat: Infinity, 
    repeatDelay: 2, 
    ease: "easeInOut"
  }}
  className='relative w-72 h-72 md:w-80 md:h-80 rounded-full overflow-hidden shadow-xl'
>
  <img 
    src='/image/abdulsamad.jpg' 
    alt='Admin' 
    className='w-full h-full object-cover hover:scale-110 transition-transform duration-700' 
  />
</motion.div>



        {/* Info Section */}
        <motion.div 
          initial={{ x: 50, opacity: 0 }} 
          animate={{ x: 0, opacity: 1 }} 
          transition={{ duration: 1 }}
          className='max-w-2xl text-center md:text-left bg-white/60 backdrop-blur-lg p-6 md:p-8 rounded-xl shadow-lg'>
          <h2 className='text-3xl font-bold text-gray-900 border-b-2 border-gray-700 pb-2'>About Me</h2>
          <p className='text-lg mt-4 leading-relaxed text-gray-800'>
            Hi! I'm <span className='font-semibold text-purple-700'>Advocate Abdul Samad Nizamani</span>, a professional Full Stack Developer 💻. My expertise includes 
            <span className='text-red-500 font-semibold'> React.js</span>, <span className='text-green-600 font-semibold'>Node.js</span>, Redux Toolkit, Cloudinary, MongoDB, and more. 🚀
          </p>
          <p className='text-lg mt-4 leading-relaxed text-gray-800'>
            This platform is designed to provide educational resources 📚 and enhance learning experiences. It utilizes <span className='font-semibold text-blue-500'>React.js + Vite</span> on the frontend and <span className='font-semibold text-green-500'>Node.js</span> on the backend for efficiency and speed. ⚡
          </p>
          
          <div className='flex justify-center md:justify-start gap-4 mt-6'>
            <motion.a 
            target='_blank'
              whileHover={{ scale: 1.1 }} 
              href='https://porfolio-lilac-alpha.vercel.app/' 
              className='flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-lg shadow-lg'>
              <FaEnvelope /> Portfolio
            </motion.a>
            <motion.a 
            target='_blank'
              whileHover={{ scale: 1.1 }} 
              href='https://wa.me/03113397680' 
              className='flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg'>
              <FaWhatsapp /> WhatsApp
            </motion.a>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminInfo;