
import React, { useState, useEffect } from 'react';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';
import { motion } from 'framer-motion';

import { AppWrap, MotionWrap } from '../../Wrapper'
import { urlFor, client } from '../../client';
import './Testimonial.scss';

const Testimonial = () => {

  const [currentIndex, setCurrentIndex] = useState(0);
  const [testimonials, setTestimonials] = useState([]);
  const [brands, setBrands] = useState([]);

  const handleCilck = (index) => {
    setCurrentIndex(index)
  }

  //fetch the testimonils and brands from the sanity store
  useEffect(() => {
    const query = '*[_type == "testimonials"]';
    const brandsQuery = '*[_type == "brands"]';

    client.fetch(query).then((data) => {
      setTestimonials(data);
    });

    client.fetch(brandsQuery).then((data) => {
      setBrands(data);
    });
  }, []);

  // just to avoid repetition and to display only one user at a time.
  const test = testimonials[currentIndex]

  return (
    <>
      {testimonials.length && (
        <>
          <div className='app__testimonial-item app__flex'>

            {/* user image, test is mention above */}
            <img  src= {urlFor(test.imageurl)} alt = "testimonial"/>

            {/* their feedback and company */}
            <div className='app__testimonial-content'>

              <p className='p-text'>{test.feedback}</p>
              <div>
                <h4 className='bold-text'>{test.name}</h4>
                <h5 className='p-text'>{test.company}</h5>
              </div>

            </div>
          </div>

          {/* buttons */}
          <div className='app__testimonial-btns app__flex'>
            <div className='app__flex' onClick ={() => handleCilck(currentIndex === 0? testimonials.length - 1 : currentIndex - 1)}>
              <HiChevronLeft/>
            </div>
            <div className='app__flex' onClick ={() => handleCilck(currentIndex === testimonials.length - 1? 0: currentIndex + 1)}>
              <HiChevronRight/>
            </div>
          </div>

        </>
      )}
      <div className='app__testimonial-brands app__flex'>
        {
          brands.map((brand) => (
            <motion.div
              whileInView={{ opacity: [0,1]}}
              transition = {{ duration: 0.5, type: 'tween'}}
              kwy = { brand._id }
            >
              <img src= {urlFor(brand.imgUrl)} alt = {brand.name} />
            </motion.div>
          ))
        }
      </div>
    </>
  )
}

// passing through the two high order function
export default AppWrap(
  MotionWrap(Testimonial, 'app__testimonial'),
  'testimonial',
  'app__primarybg',
);
