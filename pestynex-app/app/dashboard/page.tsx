"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabaseClient"

export default function ClientsPage() {
  const [customers, setCustomers] = useState<any[]>([])
  const [name, setName] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!supabase) return

    fetchCustomers()
  }, [])

  async function fetchCustomers() {
    if (!supabase) return

    const { data, error } =
      await supabase.from("customers").select("*")

    if (!error && data) setCustomers(data)

    setLoading(false)
  }

  async function addCustomer() {
    if (!name || !supabase) return

    await supabase.from("customers").insert([{ name }])

    setName("")
    fetchCustomers()
  }

  return (
    <main style={{ padding: 40 }}>
      <h1>Pestynex ERP</h1>

      <h2>Customer Management</h2>

      {!supabase && (
        <p>Connecting to database...</p>
      )}

      {supabase && (
        <>
          <input
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            placeholder="Customer name"
          />

          <button onClick={addCustomer}>
            Add Customer
          </button>

          <h3>Customer List</h3>

          {loading && <p>Loading...</p>}

          <ul>
            {customers.map((c) => (
              <li key={c.id}>{c.name}</li>
            ))}
          </ul>
        </>
      )}
    </main>
  )
}