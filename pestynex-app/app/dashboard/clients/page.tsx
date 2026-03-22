"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabaseClient"

export default function ClientsPage() {

  const [customers, setCustomers] =
    useState<any[]>([])

  const [name, setName] =
    useState("")

  const [ready, setReady] =
    useState(false)

  useEffect(() => {

    if (!supabase) return

    setReady(true)

    loadCustomers()

  }, [])

  async function loadCustomers() {

    const { data } =
      await supabase!
        .from("customers")
        .select("*")

    if (data)
      setCustomers(data)

  }

  async function addCustomer() {

    if (!name || !supabase)
      return

    await supabase
      .from("customers")
      .insert([{ name }])

    setName("")

    loadCustomers()

  }

  return (

    <main style={{ padding:40 }}>

      <h1>Pestynex ERP</h1>

      <h2>Customers Module</h2>

      {!ready && (
        <p>Connecting to database...</p>
      )}

      {ready && (

        <>

          <input
            placeholder="Customer name"
            value={name}
            onChange={(e)=>
              setName(e.target.value)
            }
          />

          <button
            onClick={addCustomer}
          >
            Add Customer
          </button>

          <h3>Customer List</h3>

          <ul>

            {customers.map(c=>(
              <li key={c.id}>
                {c.name}
              </li>
            ))}

          </ul>

        </>

      )}

    </main>

  )

}