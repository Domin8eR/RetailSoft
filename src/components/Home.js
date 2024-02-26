import React from 'react';
import { Link } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import { Fab } from '@mui/material';
import './home.css';

const Home = () => {
    return (
        <div className="home">
            <h1>Welcome to Rete'Soft </h1>
            <div className="homeButton">
                <Link to="/appointment">
                    <Fab color="primary" aria-label="add">
                        <AddIcon />
                    </Fab>
                </Link>
            </div>
            
        </div>
    );
}

export default Home;


