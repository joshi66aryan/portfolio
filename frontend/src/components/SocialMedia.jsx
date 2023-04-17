import React from 'react'
import { BsTwitter, BsInstagram, BsLinkedin, BsGithub} from 'react-icons/bs'
import { FaFacebookF} from 'react-icons/fa'

const SocialMedia = () => {
  return (
    <div className='app__social'>
        <div>
            <a href="https://twitter.com/AryanJo02511370" target="_blank"><BsTwitter/></a>
        </div>
        <div>
            <a href="https://www.instagram.com/joshi.aryan1____/?igshid=YmMyMTA2M2Y%3D" target="_blank"><BsInstagram/></a>
        </div>
        <div>
            <a href="https://github.com/joshi66aryan" target="_blank"><BsGithub/></a>
        </div>
        <div>
           <a href="https://www.linkedin.com/in/aryan-joshi-3190a11b7/" target="_blank"><BsLinkedin/></a> 
        </div>
    </div>
  )
}

export default SocialMedia