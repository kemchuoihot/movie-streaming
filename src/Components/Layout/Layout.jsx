import React from 'react'
import Navbar from './Navbar/NavBar';
import Main from './Main/Main';
import Hoathinh from './Hoathinh/Hoathinh';
import Footer from './Footer/Footer';
function Layout() {
  return (
    <>
      <Navbar/>
      <Main/>
      <Hoathinh/>
      {/* <Footer/> */}
    </>
  )
}

export default Layout