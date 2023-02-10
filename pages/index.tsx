import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { getSession } from 'next-auth/react'
import LeftSideBar from '../components/LeftSideBar.js'
import Player from '../components/Player.js'
import Center from '../components/Center.js'

const Home: NextPage = () => {
  return (
    <div className='bg-black h-screen overflow-hidden'>
      
     <main className='flex'>
      <LeftSideBar />
      <Center/>
      {/* right side */}
     </main>

     <div className='sticky bottom-0'>
      <Player/>
     </div>

      
    </div>
  )
}

export default Home


export async function getServerSideProps(context:any){
  const session = await getSession(context);

  return {
    props: {
      session,
    }
  }

}