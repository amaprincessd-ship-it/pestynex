import Link from "next/link"

export default function Home() {

  return (

    <main style={{
      padding:40,
      fontFamily:"Arial",
      textAlign:"center"
    }}>

      <h1>Pestynex ERP</h1>

      <p>
        System deployment successful
      </p>

      <Link href="/dashboard/clients">

        <button style={{
          padding:"12px 24px",
          marginTop:20,
          cursor:"pointer"
        }}>

          Open Customer Module

        </button>

      </Link>

    </main>

  )

}