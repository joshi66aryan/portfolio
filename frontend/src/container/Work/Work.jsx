import React, { useState, useEffect } from 'react'
import { AiFillEye, AiFillGithub } from 'react-icons/ai';
import { motion } from 'framer-motion';

import { AppWrap, MotionWrap} from '../../Wrapper'
import { urlFor, client } from '../../client';
import './Work.scss'


const Work = () => {

  const [activeFilter, setactiveFilter] = useState('All')
  const [animateCard, setAnimateCard] = useState({y: 0, opacity: 1})
  const [works, setWorks] = useState([])
  const [filterWork, setFilterWork] = useState([])

  useEffect(() => {
    const query = '*[_type == "works"]';

    client.fetch(query)
      .then((data) => {
        setWorks(data)
        setFilterWork(data)
      })
  }, [])
  
  
  //happen after clicking skills list below.
  const handleWorkFilter = (item) => {
    setactiveFilter(item);
    setAnimateCard({y:100, opacity: 0}) // retrigger the shuffle animation of card, it is used in the first motion.div.

    setTimeout(() => {                 // make the card appear again after setAnimatedCard animation.
      setAnimateCard([{y:0, opacity:1}])

      if(item === 'All'){
        setFilterWork(works)
      } else {
        setFilterWork(works.filter((work) => work.tags.includes(item)))
      }
    },500)
  }

  console.log(works)
  console.log(filterWork)
  return (
    <>
      <h2 className="head-text">My Creative <span>Portfolio</span> Section</h2>

      {/*  looping through the skill  in array  ( list )*/}
      <div className="app__work-filter">
        {
          ['UI/UX', 'Next JS', 'React JS', 'All'].map((item, index) =>(
            <div 
              key={index}
              onClick={()=> handleWorkFilter(item)}
              className = {`app__work-filter-item app__flex p-text ${activeFilter === item? 'item-active':''}`}
            >
              {item}
            </div>
          ))
        }
      </div>

      <motion.div
        animate = {animateCard}
        transition = {{ duration: 0.5, delayChildren: 0.5}}
        className='app__work-portfolio'
      >
        {   // looping through the fetched data from work section in sanity database ,and stored in filterWork state.

          filterWork.map((work, index) => (

            // first div contain  image and other element.
            <div className="app__work-item app__flex" key = {index}>

              <div className="app__work-img app__flex"> {/*  this div contain image */}

                <img  src ={urlFor(work.imgUrl)} alt={work.title}/> {/* image banner */}

                {/*  this div contain logo icon */}
                <motion.div
                  whileHover={{opacity: [0,1]}}
                  transition = {{ duration: 0.25, ease: 'easeInOut', staggerChildren: 0.5 }} // staggerChildren means children appera one after another
                  className='app__work-hover app__flex'
                >

                  <a href = { work.projectLink} target='_blank' rel='noreferr'>
                    <motion.div
                      whileHover={{scale: [1,0.9]}}
                      whileInView={{scale: [0,1]}}
                      transition = {{ duration: 0.25 }}
                      className='app__flex'
                    >
                      <AiFillEye/>
                    </motion.div>
                  </a>

                  <a href = { work.codeLink } target='_blank' rel='noreferr'>
                    <motion.div
                      whileHover={{scale: [1,0.9]}}
                      whileInView={{scale: [0,1]}}
                      transition = {{ duration: 0.25 }}
                      className='app__flex'
                    >
                      <AiFillGithub/>
                    </motion.div>
                  </a>

                </motion.div>
              </div>

              {/*  this div contain other data */}
              <div className="app__work-content app__flex">

                <h4 className='bold-text'>{work.title}</h4>
                <p className='p-text' style={{marginTop: 10}}>{work.description}</p>

                <div className="app__work-tag app__flex">
                  <p className='p-text'>{work.tags[0]}</p>
                </div>

              </div>
            </div>
          ))
        }
      </motion.div>

    </>
  )
}

// passing through the two high order function
export default AppWrap(
  MotionWrap(Work, 'app__works'),
  'work',
  'app__primarybg',
);