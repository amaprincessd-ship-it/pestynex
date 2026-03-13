"use client"

import { useState, useEffect } from "react"
import { supabase } from "../lib/supabaseClient"

export default function Home() {

  const [name, setName] = useState("")
  const [customers, setCustomers] = useState<any[]>([])

  useEffect(() => {
    loadCustomers()
  }, [])

  async function loadCustomers() {

    const { data } = await supabase
      .from("customers")
      .select("*")
      .order("created_at", { ascending: false })

    if (data) {
      setCustomers(data)
    }
  }

  async function addCustomer() {

    if (!name) return

    const { error } = await supabase
      .from("customers")
      .insert([{ name }])

    if (!error) {
      setName("")
      loadCustomers()
    }
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

      <button
        onClick={addCustomer}
        style={{ marginLeft: "10px" }}
      >
        Add
      </button>

      <h2 style={{ marginTop: "40px" }}>Customers</h2>

      {customers.length === 0 ? (
        <p>No customers yet</p>
      ) : (
        <ul>
          {customers.map((customer) => (
            <li key={customer.id}>
              {customer.name}
            </li>
          ))}
        </ul>
      )}

    </main>
  )
}