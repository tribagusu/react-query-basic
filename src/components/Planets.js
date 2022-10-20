import { useQuery } from "@tanstack/react-query"
import { useState } from "react"
import Planet from "./Planet"

const fetchPlanets = async (page) => {
  const res = await fetch(`http://swapi.dev/api/planets/?page=${page}`)
  return res.json()
}

const Planets = () => {
  const [page, setPage] = useState(1)
  const { data, status } = useQuery(
    ["planets", page],
    () => fetchPlanets(page),
    {
      keepPreviousData: true,
    }
  )
  //   console.log(data)

  return (
    <div>
      <h2>Planets</h2>
      {/* <p>{status}</p> */}
      <button onClick={() => setPage((prev) => Math.max(prev - 1, 1))}>
        &lt;&lt;
      </button>
      {page}
      <button
        onClick={() =>
          setPage((prev) => (!data || !data.next ? prev : prev + 1))
        }
      >
        &gt;&gt;
      </button>

      {status === "loading" && <div>Loading data...</div>}
      {status === "error" && <div>Error fetching data</div>}
      {status === "success" && (
        <div>
          {data.results.map((planet) => (
            <Planet key={planet.name} planet={planet} />
          ))}
        </div>
      )}
    </div>
  )
}

export default Planets
