import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaSearch } from 'react-icons/fa';  
import './';
const App = () => {
  const [dogs, setDogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    axios.get('https://api.thedogapi.com/v1/breeds')
      .then(response => {
        setDogs(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error al obtener las razas de perros:', error);
        setLoading(false);
      });
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredDogs = dogs.filter((dog) =>
    dog.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <p className="loading">Cargando...</p>;

  return (
    <div className="app-container">
      <div className="search-container">
        <input
          type="text"
          placeholder="Buscar una raza..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="search-bar"
        />
        <FaSearch className="search-icon" />
      </div>

      <div className="results-container">
        {filteredDogs.length > 0 ? (
          <ul className="dog-list">
            {filteredDogs.map((dog) => (
              <li key={dog.id} className="dog-card">
                <h2>{dog.name}</h2>
                <p><strong>Grupo de Raza:</strong> {dog.breed_group || 'No disponible'}</p>
                <p><strong>Criado Para:</strong> {dog.bred_for || 'N/A'}</p>
                <p><strong>Origen:</strong> {dog.origin || 'Desconocido'}</p>
                <p><strong>Esperanza de Vida:</strong> {dog.life_span}</p>
                <p><strong>Temperamento:</strong> {dog.temperament}</p>
                <p><strong>Peso:</strong> {dog.weight.metric} kg</p>
                <p><strong>Altura:</strong> {dog.height.metric} cm</p>
                {dog.image && (
                  <img src={dog.image.url} alt={dog.name} className="dog-image" />
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p className="no-results">No se encontraron resultados</p>
        )}
      </div>
    </div>
  );
};

export default App;
