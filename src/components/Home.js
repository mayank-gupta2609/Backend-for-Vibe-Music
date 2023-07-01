import React from 'react'
import { Navigate } from "react-router-dom";
import MainContents from './MainContents';
import { useSelector } from "react-redux";
function Home() {



  if (!localStorage.getItem('authtoken')) {
    return <Navigate to="/login" />
  } else

    return (
      <div>
        <MainContents />
      </div>
    )
}

export default Home
