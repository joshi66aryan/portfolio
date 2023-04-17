import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { AppWrap, MotionWrap } from '../../Wrapper'
import { urlFor, client } from '../../client';
import './Skills.scss';

const Skills = () => {

  const [experiences, setExperiences] = useState([]);
  const [skills, setSkills] = useState([]);

  // fetching the data from sanity 
  useEffect(() => {
    const query = '*[_type == "experiences"]';
    const skillsQuery = '*[_type == "skills"]';

    client.fetch(query).then((data) => {
      setExperiences(data);
    });

    client.fetch(skillsQuery).then((data) => {
      setSkills(data);
    }); 
  }, [])

  return (
    <>
      <h2 className='head-text'>Skills <span>&</span> Experience</h2>

      {/* main container */}
      <div className='app__skills-container'>  

        {/*  outer container */}
        <motion.div className='app__skills-list'>
          
          {/* container that contain  the img and skill name for each object in sanity */}
          { skills?.map((skill) => (
              <motion.div
                whileInView={{opacity: [0,1]}}
                transition={{duration: 0.5}}
                className='app__skills-item app__flex'
                key={skill.name}
              >

                <div className="app__flex" style={{ backgroundColor: skill.bgColor }}>
                  <img src={ urlFor(skill.icon)} alt="icon" />
                </div>

                <p className='p-text'>{skill.name}</p>
              </motion.div>  
          ))}
        </motion.div>

        {/*  another outer container, year && experience */}
        <motion.div className='app__skills-exp'>
          
                {/*  looping through all array's multiple objects */}
                { experiences?.map((experience) => (
                  <motion.div
                    className='app__skills-exp-item'
                    key = { experience.year }
                  >
                    <div className='app__skills-exp-year'> {/*  contain year */}
                      <p className='bold-text'>{ experience.year }</p>
                    </div>

                    {/* looping through multiple work experience in particular array */}
                    <motion.div className='app__skills-exp-works'>

                      { experience.works.map((work) =>(
                        <>
                          <motion.div
                            whileInView={{opacity: [0,1]}}
                            transition={{duration: 0.5}}
                            className='app__skills-exp-work '
                            data-tip
                            data-for = {work.name}
                            key = {work.name}
                          >
                            <h4 className='bold-text'>{work.name}</h4>
                            <p className='p-text'>{work.company}</p>

                          </motion.div>

                          <motion.div>
                            <p className='p-text'>{work.desc}</p>
                          </motion.div>

                        </>
                      ))}

                    </motion.div>
                  </motion.div>
                ))}  
        </motion.div> 

      </div>
    </>
  )
}

// passing through the two high order function
export default AppWrap(
  MotionWrap(Skills, 'app__skills'),
  'skills',
  'app__whitebg',
);