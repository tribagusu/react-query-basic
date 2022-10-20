import { useQuery } from "@tanstack/react-query"
import Person from "./Person"

const fetchPeople = async () => {
  const res = await fetch("http://swapi.dev/api/people/")
  return res.json()
}

const People = () => {
  const { data, status } = useQuery(["people"], fetchPeople)
  console.log(data)

  return (
    <div className="people">
      <h2>People</h2>

      {status === "loading" && <div>Loading data...</div>}

      {status === "error" && <div>Error fetching data</div>}

      {status === "success" &&
        data.results.map((person) => (
          <Person key={person.name} person={person} />
        ))}
    </div>
  )
}

export default People
