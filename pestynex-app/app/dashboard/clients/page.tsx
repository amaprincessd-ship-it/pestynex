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

    const { data } =
      await supabase!
        .from("customers")
        .select("*")

    if (data) setCustomers(data)

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

    <main style={{
      padding:40,
      fontFamily:"Arial",
      maxWidth:600,
      margin:"auto"
    }}>

      <h1>Pestynex ERP</h1>

      <h2>Customers Module</h2>

      <div style={{
        display:"flex",
        gap:10,
        marginBottom:20
      }}>

        <input
          placeholder="Customer name"
          value={name}
          onChange={(e)=>setName(e.target.value)}
          style={{
            flex:1,
            padding:10
          }}
        />

        <button
          onClick={addCustomer}
          style={{
            padding:"10px 20px"
          }}
        >

          Add

        </button>

      </div>

      <h3>Customer List</h3>

      {loading && <p>Loading...</p>}

      <ul style={{
        listStyle:"none",
        padding:0
      }}>

        {customers.map((c)=>(
          <li
            key={c.id}
            style={{
              padding:10,
              border:"1px solid #ddd",
              marginBottom:8,
              borderRadius:6
            }}
          >

            {c.name}

          </li>
        ))}

      </ul>

    </main>

  )

}