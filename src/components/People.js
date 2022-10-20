import { useQuery } from "@tanstack/react-query"
import { useState } from "react"
import Person from "./Person"

const fetchPeople = async (page = 1) => {
  const res = await fetch(`http://swapi.dev/api/people/?page=${page}`)
  return res.json()
}

const People = () => {
  const [page, setPage] = useState(1)
  const { isLoading, isError, error, data, isFetching, isPreviousData } =
    useQuery(["people", page], () => fetchPeople(page), {
      keepPreviousData: true,
    })
  console.log(page)

  return (
    <div className="people">
      <h2>People</h2>
      <button onClick={() => setPage((prev) => prev - 1)}>Previous</button>
      <button
        onClick={() => setPage((prev) => prev + 1)}
        // disabled={!data.results.length}
      >
        Next
      </button>
      {isLoading && <div>Loading data...</div>}
      {isError === "error" && <div>Error fetching data</div>}
      {data &&
        data.results.map((person) => (
          <Person key={person.name} person={person} />
        ))}
    </div>
  )
}

export default People
