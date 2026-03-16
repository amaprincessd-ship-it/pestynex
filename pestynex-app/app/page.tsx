"use client"

import { useEffect, useState } from "react"
import { supabase } from "../lib/supabaseClient"

export default function Home() {

  const [name, setName] = useState("")
  const [customers, setCustomers] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadCustomers()
  }, [])

  async function loadCustomers() {

    const { data, error } = await supabase
      .from("customers")
      .select("*")
      .order("created_at", { ascending: false })

    if (!error && data) {
      setCustomers(data)
    }

    setLoading(false)
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
      <h2>Customers Module</h2>

      <div style={{ marginTop: "20px" }}>
        <input
          placeholder="Customer name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ padding: "8px" }}
        />

        <button
          onClick={addCustomer}
          style={{
            marginLeft: "10px",
            padding: "8px 14px",
            cursor: "pointer"
          }}
        >
          Add Customer
        </button>
      </div>

      <h3 style={{ marginTop: "40px" }}>Customer List</h3>

      {loading ? (
        <p>Loading customers...</p>
      ) : customers.length === 0 ? (
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