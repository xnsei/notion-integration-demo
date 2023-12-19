'use client';

import {useEffect, useState} from "react";
import Link from "next/link";

interface User {
    id: string;
    name: string;
    email: string;
}
export default function Users() {
    const [users, setusers] = useState([] as User[]);
    const [loading, setLoading] = useState(true);

    const getUsersFromNotion = async (access_token: string, database_id: string) => {
        const response = await fetch("api/entry/readAll", {method: "GET", headers: { access_token, database_id }});
        const data = await response.json();
        setusers(data.users);
        setLoading(false);
    }

    useEffect(() => {
        const data = localStorage.getItem("authenticationData");
        const database_id = localStorage.getItem("database_id");
        const page_id = localStorage.getItem("page_id");
        if(data && database_id && page_id) {
            const { access_token } = JSON.parse(data);
            getUsersFromNotion(access_token, database_id);
        }
    }, []);

    return (
        <main className="flex flex-col justify-center h-screen">
            <section className="w-1/5 mx-auto justify-center text-center">
                <h1 className="text-3xl mb-4">Users</h1>
                {
                    loading
                        ?
                        <p className="text-xl">Loading...</p>
                        :
                        users.length > 0
                            ?
                            users.map((user) => {
                                return (
                                    <div key={user.id} className="bg-gray-100 p-4 rounded-md mb-4">
                                        <p className="text-lg font-semibold mb-2">Name: {user.name}</p>
                                        <p className="text-sm text-gray-600">Email: {user.email}</p>
                                    </div>
                                )
                            })
                            :
                            <p className="text-xl">No users found</p>
                }
            </section>
            <Link className="mx-auto bg-black text-white px-4 py-2 rounded my-2" href={"/"} >Back to Home page</Link>
        </main>
    );
}