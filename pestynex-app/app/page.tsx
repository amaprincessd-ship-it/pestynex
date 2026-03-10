"use client"

import { useEffect, useState } from "react"
import { supabase } from "../lib/supabaseClient"

export default function Home() {

  const [customers, setCustomers] = useState<any[]>([])

  useEffect(() => {
    fetchCustomers()
  }, [])

  async function fetchCustomers() {
    const { data } = await supabase.from("customers").select("*")
    if (data) setCustomers(data)
  }

  return (
    <main style={{ padding: "40px", fontFamily: "Arial" }}>
      <h1>Pestynex ERP</h1>

      <h2>Customers</h2>

      {customers.length === 0 ? (
        <p>No customers yet</p>
      ) : (
        <ul>
          {customers.map((c) => (
            <li key={c.id}>{c.name}</li>
          ))}
        </ul>
      )}
    </main>
  )
}