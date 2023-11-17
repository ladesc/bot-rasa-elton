'use client'

import { useState } from "react"

export default function Home(){

  const [hide, setHide] = useState(true)

  return (
    <main className="flex h-screen justify-center items-center bg-black">

      <button onClick={() => setHide(false)} className={`absolute bottom-0 right-0 m-4 p-2 bg-emerald-500 rounded-md ${hide ? "delay-500" : "scale-0 translate-x-1/2 translate-y-1/2"} transition-transform ease-in-out duration-500`}>

        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" ><path d="M14 9a2 2 0 0 1-2 2H6l-4 4V4c0-1.1.9-2 2-2h8a2 2 0 0 1 2 2v5Z"/><path d="M18 9h2a2 2 0 0 1 2 2v11l-4-4h-6a2 2 0 0 1-2-2v-1"/></svg>

      </button>
      <div className={`absolute bottom-0 right-0 m-4 h-1/2 m-1/4 ${hide ? "scale-0 translate-x-1/2 translate-y-1/2" : "delay-500"} transition-transform ease-in-out duration-500`}>

        <button onClick={() => setHide(true)} className="absolute top-0 right-0 m-4 p-2 rounded-full bg-red-600"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className=" "><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg></button>

        <iframe src="http://localhost:3000/" className="overscroll-none rounded-md h-full m-full"/>

      </div>
    </main>
  )
}
