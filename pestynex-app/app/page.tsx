"use client"

import { useState, useEffect } from "react"
import { supabase } from "../lib/supabaseClient"

export default function Home() {

  const [name, setName] = useState("")
  const [customers, setCustomers] = useState<any[]>([])

  useEffect(() => {
    fetchCustomers()
  }, [])

  async function fetchCustomers() {
    const { data } = await supabase.from("customers").select("*")
    if (data) setCustomers(data)
  }

  async function addCustomer() {

    if (!name) return

    await supabase.from("customers").insert([
      { name }
    ])

    setName("")
    fetchCustomers()
  }

  return (
    <main style={{ padding: "40px", fontFamily: "Arial" }}>

      <h1>Pestynex ERP</h1>

      <h2>Add Customer</h2>

      <input
        placeholder="Customer name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <button onClick={addCustomer} style={{ marginLeft: "10px" }}>
        Add
      </button>

      <h2 style={{ marginTop: "40px" }}>Customers</h2>

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