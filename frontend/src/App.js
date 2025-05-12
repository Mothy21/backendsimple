import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [mahasiswa, setMahasiswa] = useState([]);
  const [newMahasiswa, setNewMahasiswa] = useState({ nama: '', umur: '' });
  const [editMahasiswa, setEditMahasiswa] = useState({ id: '', nama: '', umur: '' });

  useEffect(() => {
    axios.get('http://localhost:3001/mahasiswa')
      .then(response => setMahasiswa(response.data))
      .catch(error => console.log(error));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewMahasiswa({ ...newMahasiswa, [name]: value });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditMahasiswa({ ...editMahasiswa, [name]: value });
  };

  const handleAddMahasiswa = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3001/mahasiswa', newMahasiswa)
      .then(response => {
        setMahasiswa([...mahasiswa, response.data]);
        setNewMahasiswa({ nama: '', umur: '' });
      })
      .catch(error => console.log(error));
  };

  const handleEditMahasiswa = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:3001/mahasiswa/${editMahasiswa.id}`, editMahasiswa)
      .then(response => {
        const updatedMahasiswa = mahasiswa.map(mhs =>
          mhs.id === editMahasiswa.id ? response.data : mhs
        );
        setMahasiswa(updatedMahasiswa);
        setEditMahasiswa({ id: '', nama: '', umur: '' });
      })
      .catch(error => console.log(error));
  };

  const handleDeleteMahasiswa = (id) => {
    axios.delete(`http://localhost:3001/mahasiswa/${id}`)
      .then(() => {
        const updatedMahasiswa = mahasiswa.filter(mhs => mhs.id !== id);
        setMahasiswa(updatedMahasiswa);
      })
      .catch(error => console.log(error));
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">CRUD Data Mahasiswa</h1>

      <form onSubmit={handleAddMahasiswa} className="mb-4">
        <div className="mb-3">
          <input
            type="text"
            name="nama"
            value={newMahasiswa.nama}
            onChange={handleInputChange}
            placeholder="Nama Mahasiswa"
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <input
            type="number"
            name="umur"
            value={newMahasiswa.umur}
            onChange={handleInputChange}
            placeholder="Umur Mahasiswa"
            className="form-control"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Tambah Mahasiswa</button>
      </form>

      <h2>Daftar Mahasiswa</h2>
      <ul className="list-group mb-4">
        {mahasiswa.map((mhs) => (
          <li key={mhs.id} className="list-group-item d-flex justify-content-between align-items-center">
            <span>{mhs.nama} - {mhs.umur} tahun</span>
            <div>
              <button
                className="btn btn-warning btn-sm me-2"
                onClick={() => setEditMahasiswa({ id: mhs.id, nama: mhs.nama, umur: mhs.umur })}
              >
                Edit
              </button>
              <button className="btn btn-danger btn-sm" onClick={() => handleDeleteMahasiswa(mhs.id)}>
                Hapus
              </button>
            </div>
          </li>
        ))}
      </ul>

      {editMahasiswa.id && (
        <form onSubmit={handleEditMahasiswa}>
          <div className="mb-3">
            <input
              type="text"
              name="nama"
              value={editMahasiswa.nama}
              onChange={handleEditChange}
              className="form-control"
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="number"
              name="umur"
              value={editMahasiswa.umur}
              onChange={handleEditChange}
              className="form-control"
              required
            />
          </div>
          <button type="submit" className="btn btn-success">Update Mahasiswa</button>
        </form>
      )}
    </div>
  );
}

export default App;
