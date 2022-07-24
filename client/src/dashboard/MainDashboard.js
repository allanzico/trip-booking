import React from 'react'
import { HashRouter, } from 'react-router-dom'
import SideBar from '../components/navigation/SideBar/SideBar'
import  MiddleContent  from './MiddleContent'
import Widgets from './Widgets'

const MainDashboard = () => {
  return (
   <>
    <div className='lg:max-full'>
    <main className='grid grid-cols-9 bg-slate-50'>
    <HashRouter>
    <SideBar />
    <MiddleContent />
    </HashRouter>
    <Widgets />
    </main>
</div>
   </>

  )
}

export default MainDashboard