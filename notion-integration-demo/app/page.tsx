"use client"

import React, {useState} from "react";

export default function Home() {
  const [name, setName] = useState("");
  const [email, setEmail] =  useState("");

  const SubmitEvent = (e: any) => {
    e.preventDefault();
    console.log(name, email);
  };
  return (
    <div className="flex justify-center items-center h-screen bg-gray-600">
      <div className="max-w-md m-auto my-10 text-center">
        <h1 className="text-3xl mb-4">Enter Your Details</h1>
        <form onSubmit={SubmitEvent} className="space-y-4">
          <div>
            <input className="my-2 w-full border rounded p-2 text-black" onChange={(e) => setName(e.target.value)} type='text'></input>
            <input className="my-2 w-full border rounded p-2 text-black" onChange={(e) => setEmail(e.target.value)} type='email'></input>
          </div>
          <button className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500">Submit</button>
        </form>
      </div>
    </div>
  )
}
