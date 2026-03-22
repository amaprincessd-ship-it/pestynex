"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabaseClient"

type Customer = {
  id: string
  name: string
  created_at: string
}

export default function ClientsPage() {

  const [name, setName] = useState("")
  const [customers, setCustomers] = useState<Customer[]>([])
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

    if (!name.trim()) return

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

      <h2>Customer Management</h2>

      <div style={{ marginTop: "20px" }}>

        <input
          placeholder="Enter customer name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{
            padding: "10px",
            width: "300px"
          }}
        />

        <button
          onClick={addCustomer}
          style={{
            marginLeft: "10px",
            padding: "10px 15px"
          }}
        >
          Add Customer
        </button>

      </div>

      <h3 style={{ marginTop: "40px" }}>
        Customer List
      </h3>

      {loading ? (

        <p>Loading...</p>

      ) : customers.length === 0 ? (

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