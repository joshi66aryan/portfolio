import React, { useState } from 'react';

import { AppWrap, MotionWrap } from '../../Wrapper'
import { images } from '../../constants';
import { client } from '../../client';
import './Footer.scss';

const Footer = () => {

  const [formData, setFormData] = useState({ name:'', email:'', message:'' });
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const { name, email, message } = formData;        // destructuring the sate formData.

  const handleChangeInput = (e) => {
    const { name, value } = e.target;           // destructuring the event
    setFormData({...formData, [name]: value }) //it takes the current form data, creates a copy of it, and then updates the specific form field
  };                                          //(specified by the 'name' variable) with the new value that was just entered by the user. 
                                             //This allows the React component to dynamically update the form as the user types.


  const handleSubmit = () => {

    setLoading(true)

    const contact = {                // creating certain format for storing in sanity store.
      _type: 'contact',
      name: name,
      email: email,
      message: message,
    };

    client.create(contact)
      .then(() => {
        setLoading(false)
        setIsFormSubmitted(true)
      })
  };

  return (
    <>
      <h2 className='head-text'> Take a <span> coffee </span> & chat <span>with</span> me </h2>
      <div className="app__footer-cards">

        <div className="app__footer-card">
          <img src={images.email} alt="email"/>
          <a href="mailto:joshiryan8@gmail.com" className='p-text'>joshiryan8@gmail.com</a>
        </div>

        <div className="app__footer-card">
          <img src={images.mobile} alt="mobile"/>
          <a href="tel: +977 9845969105" className='p-text'>+977 9845969105</a>
        </div>
      </div>

      { /* form input  */ }

     { !isFormSubmitted ?
        <div className="app__footer-form app__flex">
          
          <div className="app__flex">
            <input 
              type="text" 
              className="p-text" 
              placeholder="Your Name"
              name= "name"
              value = { name }
              onChange = {handleChangeInput}
            />
          </div>

          <div className="app__flex">
            <input 
              type="email" 
              className="p-text" 
              placeholder="Your Email"
              name= "email"
              value = { email }
              onChange = {handleChangeInput}
            />
          </div>

          <div>
            <textarea
              className='p-text'
              placeholder='Your Message'
              value = {message}
              name = "message"
              onChange = {handleChangeInput}
            />
          </div>

          <button 
            type="button" 
            className='p-text' 
            onClick = {handleSubmit}
          > 
            {loading ? 'Sending':'Send'}
          </button>

        </div> 
      :
        <div className='p-text'>
          Thank you for getting in touch.
        </div>

      }
    </>
  )
}

export default AppWrap(
  MotionWrap(Footer, 'app__footer'), // passing the app__footer classname to MotionWrap, which is styled in Footer.scss
  'contact',                        // id
  'app__whitebg'                   // classname
)
