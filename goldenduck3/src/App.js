import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom'
import Main from './components/Main';
import AddWord from './components/AddWord';
import Edit from './components/Edit'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/add' element={<AddWord />} />
        <Route path='/:id/edit' element={<Edit />} />
      </Routes>
    </div>
  );
}

export default App;