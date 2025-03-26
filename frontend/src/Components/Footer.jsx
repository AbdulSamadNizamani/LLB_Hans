import React from 'react'
import { Link } from 'react-router-dom'
import { FaFacebook } from "react-icons/fa";
import { MdMarkEmailRead } from "react-icons/md";
import { FaTwitter } from "react-icons/fa";
import { FaTiktok } from "react-icons/fa";

const Footer = () => {
  return (
    <div className='w-full h-full bg-gray-50 py-8 rounded-lg overflow-hidden'>
      <div>
        <div className="flex justify-center items-center gap-4 mt-6">
  <Link
    className="bg-white p-3 rounded-full shadow-md transition-all duration-300 ease-in hover:scale-110 hover:shadow-lg"
    to="#"
  >
    <FaFacebook size={40} className="text-[#1877F2] hover:text-[#165DB0]" />
  </Link>
  <Link
    className="bg-white p-3 rounded-full shadow-md transition-all duration-300 ease-in hover:scale-110 hover:shadow-lg"
    to="#"
  >
    <MdMarkEmailRead size={40} className="text-[#D14836] hover:text-[#B13A2E]" />
  </Link>
  <Link
    className="bg-white p-3 rounded-full shadow-md transition-all duration-300 ease-in hover:scale-110 hover:shadow-lg"
    to="#"
  >
    <FaTwitter size={40} className="text-[#1DA1F2] hover:text-[#0d8ddb]" />
  </Link>
  <Link
    className="bg-white p-3 rounded-full shadow-md transition-all duration-300 ease-in hover:scale-110 hover:shadow-lg"
    to="#"
  >
    <FaTiktok size={40} className="text-black hover:text-[#FF0050]" />
  </Link>
</div>

            <h2 className="text-center font-bold text-2xl md:text-3xl text-gray-800 mt-6 p-4 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-lg shadow-lg">
  Copyright © 2025 | Department of <span className="text-yellow-300">LLB</span> ⚖️
</h2>
      </div>
    </div>
  )
}

export default Footer
