"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabaseClient"

export default function ClientsPage() {

  const [customers, setCustomers] = useState<any[]>([])
  const [name, setName] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!supabase) return
    loadCustomers()
  }, [])

  async function loadCustomers() {

    const { data, error } =
      await supabase!
        .from("customers")
        .select("*")

    if (!error && data) {
      setCustomers(data)
    }

    setLoading(false)
  }

  async function addCustomer() {

    if (!name) return

    await supabase!
      .from("customers")
      .insert([{ name }])

    setName("")

    loadCustomers()
  }

  return (

    <main style={{ padding: 40 }}>

      <h1>Pestynex ERP</h1>

      <h2>Customers Module</h2>

      <input
        placeholder="Customer name"
        value={name}
        onChange={(e)=>setName(e.target.value)}
      />

      <button onClick={addCustomer}>
        Add Customer
      </button>

      <h3>Customer List</h3>

      {loading && <p>Loading...</p>}

      <ul>

        {customers.map((c)=>(
          <li key={c.id}>
            {c.name}
          </li>
        ))}

      </ul>

    </main>

  )
}