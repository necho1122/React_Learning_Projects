import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const [initialUsers, setInitialUsers] = useState([]);

  useEffect(() => {
    fetch('https://randomuser.me/api/?results=100')
      .then(response => response.json())
      .then(data => {
        setUsers(data.results);
        setInitialUsers(data.results);
      });
  }
  , []);

  const filterUsers = users.filter(user => user.location.country.toLowerCase().includes(searchTerm.toLowerCase()));

  const handleColor = () => {
    setIsButtonClicked(!isButtonClicked);
  }

  const deleteUser = (email) => {
    setUsers(users.filter(user => user.email !== email));
  }

  const usersAmount = filterUsers.length;

  const resetState = () => {
    setUsers(initialUsers);
  }

  const handleSortCountry = () => {
    const sortedUsers = [...users].sort((a, b) => {
      const nameA = a.location.country.toUpperCase();
      const nameB = b.location.country.toUpperCase();
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
    
      return 0;
    });
  
    setUsers(sortedUsers);
  }

  const handleSortName = () => {
    const sortedUsers = [...users].sort((a, b) => {
      const nameA = a.name.first.toUpperCase();
      const nameB = b.name.first.toUpperCase();
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
    
      return 0;
    });
  
    setUsers(sortedUsers);
  }

  const handleSortLastName = () => {
    const sortedUsers = [...users].sort((a, b) => {
      const nameA = a.name.last.toUpperCase();
      const nameB = b.name.last.toUpperCase();
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
    
      return 0;
    });
  
    setUsers(sortedUsers);
  }

	return (
    <>
      <h1>hello world</h1>
      <div className="handles">
      <span>{`Users: ${usersAmount}`}</span>
        <button onClick={handleColor} >Cambiar color</button>
        <button onClick={handleSortCountry}>Ordenar por pais</button>
        <button onClick={resetState}>Reset</button>
        <input type="text" placeholder="Search..." onChange={e => setSearchTerm(e.target.value)} />
      </div>
      <table>
        <thead>
          <tr>
            <th>Foto</th>
            <th onClick={handleSortName}>Nombre</th>
            <th onClick={handleSortLastName}>Apellido</th>
            <th onClick={handleSortCountry} >Pais</th>
            <th>Accion</th>
          </tr>
        </thead>
        <tbody>
          {filterUsers.map((user, index) => {
            return (
              <tr key={ user.email } style={{backgroundColor: index % 2 !== 0 && isButtonClicked ? "#f0f0f0" : "#fff"}}>
                <td data-label="Foto"><img src={user.picture.thumbnail} alt="profile picture" /></td>
                <td data-label="Nombre">{user.name.first}</td>
                <td data-label="Apellido">{user.name.last}</td>
                <td data-label="Pais">{user.location.country}</td>
                <td data-label="Accion"><button onClick={()=>deleteUser(user.email)}>Borrar</button></td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </>
  );
}

export default App;
