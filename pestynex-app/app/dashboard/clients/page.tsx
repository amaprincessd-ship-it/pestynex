"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabaseClient"

export default function ClientsPage() {

  const [result, setResult] = useState<any>(null)

  useEffect(() => {

    async function test() {

      if (!supabase) {
        setResult("Supabase not initialized")
        return
      }

      const { data, error } =
        await supabase
          .from("customers")
          .select("*")

      setResult({
        data,
        error
      })

    }

    test()

  }, [])

  return (

    <main style={{ padding:40 }}>

      <h1>Pestynex ERP</h1>

      <h2>Database Test</h2>

      <pre>

        {JSON.stringify(result, null, 2)}

      </pre>

    </main>

  )

}