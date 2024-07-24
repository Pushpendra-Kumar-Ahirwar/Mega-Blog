import React, { Component } from 'react';
import myPhoto from '../assets/myphoto.jpg';
import Mycv from '../assets/My-CV.pdf'
import { Link } from 'react-router-dom';
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa6";

export default class About extends Component {
  render() {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-4xl mx-auto p-4 bg-white shadow-md rounded-lg">
          <div className="flex flex-col md:flex-row items-center md:items-start">
            <div className="w-32 h-32 md:w-48 md:h-48 flex-shrink-0">
              <img src={myPhoto} alt="" className='transition-all transtion-300 hover:scale-105' />
            </div>
            <div className="mt-4 md:mt-0 md:ml-6">
              <p className="text-lg text-gray-600">Hello There</p>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mt-2">
                I'm Pushpendra Kumar Ahirwar
              </h2>
              <pre className="whitespace-pre-line text-gray-700 mt-4 font-serif">
                {`Hello, I'm a Front-End Developer with a passion for creating interactive and dynamic user interfaces. I have extensive experience working with modern web technologies, including React.js, Redux Toolkit, and Tailwind CSS. I enjoy translating design concepts into functional and responsive web applications. My journey in front-end development has equipped me with a deep understanding of HTML, CSS, and JavaScript, and I am always eager to learn and implement new technologies and best practices in my projects.`}
              </pre>
              <a href={Mycv} className="mt-4 inline-block">
                <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300">
                  Download Resume
                </button>
              </a>
            </div>
          </div>
          <div className="flex justify-center mt-6 space-x-4">
          <h1 className="text-xl font-medium text-gray-800">Connect with me</h1>
            <Link to={'https://github.com/Pushpendra-Kumar-Ahirwar/Pushpendra-Kumar-Ahirwar'}>
            <button className="px-4 py-2 bg-black/80 text-white rounded-lg hover:bg-gray-600 transition-all transition-200 hover:scale-110">
            <FaGithub />
            </button>
            </Link>
            <Link to={'https://www.linkedin.com/in/pushpendra-kumar-ahirwar-8b25a5281/s'}>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-900 duration-300 transition-all transition-200 hover:scale-110">
            <FaLinkedin />
            </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
