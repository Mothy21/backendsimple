const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3001;

// Middleware untuk parse JSON request body
app.use(cors());
app.use(bodyParser.json());

let mahasiswa = [
  { id: 1, nama: 'Andi', umur: 20 },
  { id: 2, nama: 'Budi', umur: 22 },
];

// Create (POST) - Menambahkan data mahasiswa baru
app.post('/mahasiswa', (req, res) => {
  const { nama, umur } = req.body;
  const newMahasiswa = { id: mahasiswa.length + 1, nama, umur };
  mahasiswa.push(newMahasiswa);
  res.status(201).json(newMahasiswa);
});

// Read (GET) - Mengambil semua data mahasiswa
app.get('/mahasiswa', (req, res) => {
  res.json(mahasiswa);
});

// Update (PUT) - Memperbarui data mahasiswa berdasarkan ID
app.put('/mahasiswa/:id', (req, res) => {
  const { id } = req.params;
  const { nama, umur } = req.body;
  const mahasiswaIndex = mahasiswa.findIndex((mhs) => mhs.id === parseInt(id));

  if (mahasiswaIndex !== -1) {
    mahasiswa[mahasiswaIndex] = { id: parseInt(id), nama, umur };
    res.json(mahasiswa[mahasiswaIndex]);
  } else {
    res.status(404).json({ message: 'Mahasiswa tidak ditemukan' });
  }
});

// Delete (DELETE) - Menghapus data mahasiswa berdasarkan ID
app.delete('/mahasiswa/:id', (req, res) => {
  const { id } = req.params;
  const mahasiswaIndex = mahasiswa.findIndex((mhs) => mhs.id === parseInt(id));

  if (mahasiswaIndex !== -1) {
    const deletedMahasiswa = mahasiswa.splice(mahasiswaIndex, 1);
    res.json(deletedMahasiswa);
  } else {
    res.status(404).json({ message: 'Mahasiswa tidak ditemukan' });
  }
});

// Menjalankan server
app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});
