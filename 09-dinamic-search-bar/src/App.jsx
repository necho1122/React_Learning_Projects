import './App.css'
import searchIcon from './assets/search-icon.svg'
import { useState, useEffect } from 'react'

function App() {
  const [data, setData] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const filteredData = searchTerm ? data?.filter(user => user.name.toLowerCase().includes(searchTerm.toLowerCase())) : [];

  const handleUserClick = (user) => {
    setSelectedUser(user);
  }

  return (
    <>
      <h1>Search Bar</h1>
      <div className='search-container'>
      <div className="search">
      <input type="text" placeholder="Search..." onChange={e => setSearchTerm(e.target.value)} />
      <button>
      <img src={searchIcon} alt="search icon" style={{width: "30px", height: "30x"}} />
      </button>
      </div>
      <div className="results">
        {filteredData.map((user, index) => (
          <div key={index} className="result">
            <h3>{user.name}</h3>
            <button onClick={() => handleUserClick(user)}>Show Details</button>
          </div>
        ))}
      </div>
      {selectedUser && (
  <div className="user-details">
    <div className="user-details-content">
      <h2>{selectedUser.name}</h2>
      <p>{'E-mail: ' + selectedUser.email}</p>
      <p>{'Phone: ' + selectedUser.phone}</p>
      <p>{'Address: ' + selectedUser.address.street + ', ' + selectedUser.address.suite + ', ' + selectedUser.address.city + ', ' + selectedUser.address.zipcode}</p>
      <button onClick={() => setSelectedUser(null)}>Close</button>
    </div>
  </div>
)}
      </div>
    </>
  )
}

export default App