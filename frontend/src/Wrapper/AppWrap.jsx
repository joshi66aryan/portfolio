import React from 'react';
import { NavigationDots, SocialMedia } from '../components'

// Higher Order Component is a function that takes a component and 
// returns a new component with added or enhanced functionality.

const AppWrap = (Component, idName, classNames) => function HOC(){ //pass the other components ,idname as parameter.
  return (

    // id = { idName } because when each component pass through the higher order component, it will add id to that component, and <a> tag can jump to that section.
    <div id= {idName} className={`app__container ${classNames}`}> 

        <SocialMedia/>

        {/* display the socialmedia icon above and all the components that is passed in this fuction displayed below.*/}
        <div className='app__wrapper app__flex'>
          <Component/> 
          <div className='copyright'> 
            <p className='p-text'>@2020 ARYAN</p>
            <p className='p-text'>All rights reserved</p>
          </div>
        </div>
        
        {/* the idname which is passed in this function is passed to the children */}
        <NavigationDots active={idName}/> 

    </div>
  )
}

export default AppWrap

//wrapping the all the components with all this codes.
