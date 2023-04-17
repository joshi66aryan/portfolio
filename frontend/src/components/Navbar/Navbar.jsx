import React,{useState} from 'react'
import { HiMenuAlt4, HiX } from 'react-icons/hi'
import { motion } from 'framer-motion'
import './Navbar.scss'


const Navbar = () => {
  const [toggle, setToggle] = useState(false)

  return (
    // classname->Bem methodology for styling css name.
    <nav className='app__navbar'>

      {/* logo */} 
      <div className='app__navbar-logo app__flex'>
        <span>👨</span>
        <p>ARYAN</p>
      </div>

      {/* looping the menu and using <a> tag to jump on that section. */}
      <ul className='app__navbar-links'>
        {['home', 'about','work','skills','contact'].map((item) => (
          <li key={`link-${item}`} className='app__flex p-text'>
            <div/>
            <a href = {`#${item}`}>{item}</a>
          </li>
        ))}
      </ul>

      {/* this for small devices only */}
      <div className='app__navbar-menu'>

          <HiMenuAlt4 onClick = {() => setToggle(true)}/>
          { toggle && (
              <motion.div
                whileInView = {{ x:[300,0] }}
                transition = {{ duration: 0.85, ease: "easeOut"}}
              >
                {/* looping the menu and using <a> tag to jump on that section. */}
                <HiX onClick = {() => setToggle(false)}/>
                <ul>
                  {['home', 'about','work','skills','contact'].map((item) => (
                    <li key={item}>
                      <a href = {`#${item}`} onClick ={()=>setToggle(false)}>{item}</a>
                    </li>
                  ))}
                </ul>
              </motion.div>
          )}
      </div>
    </nav>
  )
}

export default Navbar




















//<nav> tag is used to define a section of a webpage that contains links to other pages or sections within the same page, used for navigation menu. 
//<a> tag is used to create a hyperlink to another webpage or to a specific location within the same page. 
//<link> tag is used to link an external resource to an HTML document.