import Image from 'next/image'
import Wetr from './Wetr'
import { Suspense, useState } from "react";
import {getData} from './api/pressure/route'
import { InferGetServerSidePropsType, GetServerSideProps } from 'next';


export default async function Page() {
  const data = await getData({q:'Prague'})
  return (
    <div className='h-full w-full'>
        <Wetr data={data}/>
    </div>
  )
}
