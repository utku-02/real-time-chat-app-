import React from 'react';
import { Link } from 'react-router-dom';
import '../style/home.css'; 

const Home = () => {
  return (
    <div className="home-container">
      <h1>Velkommen til Vores App</h1>
      <p>Dette er en app, der hjælper dig med at gre XYZ. Udforsk funktionerne og se, hvordan det kan gavne dig!</p>
      <img src={`${process.env.PUBLIC_URL}/images/texting.jpeg`} alt="Texting"/>
      <Link to="/login">
        <button>Log ind</button>
      </Link>
    </div>
  );
};


export default Home;