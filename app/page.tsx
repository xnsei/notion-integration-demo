"use client"

import React, {useEffect, useState} from "react";
import Link from "next/link";
import {useSearchParams} from "next/navigation";


export default function Home() {
  const [name, setName] = useState("");
  const [email, setEmail] =  useState("");

  const NOTION_AUTH_URL = "https://api.notion.com/v1/oauth/authorize?client_id=166dcda3-f0de-4629-807e-8ecd3f50778c&response_type=code&owner=user&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2F";

  const params = useSearchParams();

  const getAccessToken = async (code: string) => {
    const response = await fetch("api/", {method: "GET", headers: { code }});
    const data = await response.json();
    localStorage.setItem("authenticationData", JSON.stringify(data));
  }

  useEffect(() => {
    const data = localStorage.getItem("authenticationData");
    if(!data && params.get("code")) {
      console.log(params.get("code"));

      getAccessToken(params.get("code") as string);
    }
    else if(!data && params.get("error")) {
      console.error(params.get("error"));
    }
  }, [params]);

  const SubmitEvent = async (e: any) => {
    e.preventDefault();
    const database_id = localStorage.getItem("database_id") ?? "";
    const authenticationData = localStorage.getItem("authenticationData");
    const { access_token, workspace_id } = JSON.parse(authenticationData as string);
    const response = await fetch("api/entry", {
      method: "POST",
      headers: {
        name,
        email,
        database_id,
        access_token,
        workspace_id
      }
    });
    const data = await response?.json();
    if(!localStorage.getItem("database_id"))localStorage.setItem("database_id", data?.database_id);
    if(!localStorage.getItem("page_id"))localStorage.setItem("page_id", data?.page_id);
    setName("");
    setEmail("");
    console.log("data successfully added to notion");
  };

  return (
    <main className="flex flex-col justify-center items-center h-screen">
      <section className="max-w-md mx-auto justify-center text-center">
        <h1 className="text-3xl mb-4">Enter Your Details</h1>
        <form onSubmit={SubmitEvent} className="space-y-4">
          <div>
            <input
                placeholder="name"
                className="my-2 w-full border rounded p-2 text-black"
                onChange={(e) => setName(e.target.value)}
                type='text'
                value={name}
            />
            <input
                placeholder="email"
                className="my-2 w-full border rounded p-2 text-black"
                onChange={(e) => setEmail(e.target.value)}
                type='email'
                value={email}
            />
          </div>
          <button className="bg-black text-white px-4 py-2 rounded">Submit</button>
        </form>
      </section>
      <section className="flex">
        <Link className="bg-black text-white px-4 py-2 rounded m-2" href={"/users"}>Users Page</Link>
        <Link className="bg-black text-white px-4 py-2 rounded m-2" href={NOTION_AUTH_URL}>Add to Notion</Link>
      </section>
    </main>
  )
}
