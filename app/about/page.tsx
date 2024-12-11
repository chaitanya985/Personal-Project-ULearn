import React from 'react'
import { FaLinkedin, FaTwitter, FaInstagram, FaFacebook } from 'react-icons/fa'
import Link from 'next/link'

function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-900 mb-8">
          About ULearn
        </h1>
        
        <div className="prose prose-lg mx-auto">
          <p className="text-xl text-purple-600 mb-6 text-center">
            Welcome to ULearn, where learning meets innovation. We're passionate about transforming education 
            and making quality learning accessible to everyone, everywhere.
          </p>
          <br/>
          <br/>
          <br/>
          <br/>
          <div className="text-center mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Join Our Learning Community</h2>
            <p className="text-gray-600 mb-6">
              Connect with us on social media to stay updated with the latest courses, 
              learning tips, and success stories.
            </p>
            
            <div className="flex justify-center space-x-6">
              <Link href="https://linkedin.com" className="text-gray-600 hover:text-blue-600 transition-colors">
                <FaLinkedin className="w-8 h-8" />
              </Link>
              <Link href="https://twitter.com" className="text-gray-600 hover:text-blue-400 transition-colors">
                <FaTwitter className="w-8 h-8" />
              </Link>
              <Link href="https://instagram.com" className="text-gray-600 hover:text-pink-600 transition-colors">
                <FaInstagram className="w-8 h-8" />
              </Link>
              <Link href="https://facebook.com" className="text-gray-600 hover:text-blue-800 transition-colors">
                <FaFacebook className="w-8 h-8" />
              </Link>
            </div>
          </div>

          <div className="text-center">
            <Link 
              href="/" 
              className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Explore Our Courses
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AboutPage