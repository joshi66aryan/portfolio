import React from 'react'

const NavigationDots = ({ active }) => {
  return (

    // active( idname like home, abouts ) which is passed through header, about -> AppWrap -> navigationdots.
    <div className='app__navigation'>

        {['home', 'about','work','skills','testimonials','contact'].map((item, index) => (

            <a 
                href = {`#${item}`} 
                key ={ item + index }
                className='app__navigation-dot'
                style={active === item ? {backgroundColor: '#313BAC'}:{ }}// coloring if active(idname matches with the item.)
            />
         ))}

    </div>
  )
}

export default NavigationDots