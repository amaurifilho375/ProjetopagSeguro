import React from "react";
import { useState, useEffect } from "react";

type User = {
  name: string;
  picture: string;
  location: string;
};

const Search = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState("");
  const [newListUsers, setNewListUsers] = useState<User[]>([]);

  const filterData = (result: any) => {
    return result.map((user: any) => ({
      name: `${user.name.first} ${user.name.last}`,
      location: `${user.location.city} ${user.location.country}`,
      picture: user.picture.thumbnail,
    }));
  };

  const UpdateListUserSelect = (e: string) => {
    setSearch(e);
    setNewListUsers(
      users.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())||
        item.location.toLowerCase().includes(search.toLowerCase())
      )
    );
  };

  useEffect(() => {
    async function getSearch() {
      try {
        const response = await fetch(
          "https://randomuser.me/api?results=50&nat=br,us,mx,gb,nz,nl,ca"
        );
        if (response.ok == true) {
          let data = await response.json();          
          let result = data.results;
          let resultSearch = filterData(result);          
          setUsers(resultSearch);
        } else {
          throw new Error("tente mais tarde, Algo deu errado!");
        }
      } catch (e) {
        console.log(e);
      }
    }

    getSearch();
  }, []);

  return (
    <>
      <p> busca</p>
      <input
        type="search"
        value={search}
        onChange={(e) => UpdateListUserSelect(e.target.value)}
      />
      <ul>
        {newListUsers.map((userSearch, index) => {
          return <li key={index}> {userSearch.name}</li>;
        })}
      </ul>
    </>
  );
};

export default Search;
