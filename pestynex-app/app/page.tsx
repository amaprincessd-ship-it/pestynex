import Link from "next/link"

export default function Home() {

  return (

    <main style={{ padding: 40 }}>

      <h1>Pestynex ERP</h1>

      <p>System deployment successful</p>

      <Link href="/dashboard/clients">

        <button
          style={{
            padding: "10px 20px",
            marginTop: "20px",
            cursor: "pointer"
          }}
        >
          Go to Customer Module
        </button>

      </Link>

    </main>

  )

}