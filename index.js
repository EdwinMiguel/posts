const express = require('express');
const { getLinkPreview, getPreviewFromContent } = require('link-preview-js');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use(cors());

app.use(express.static('public'));

app.post('/', (req, res) => {
  const { url } = req.body;

  getLinkPreview(url)
  .then((data) => res.json(data))
  .catch(error => {
    console.error('Error', error);
    res.status(500);json({error: "error al obtener la vista previa"});
  });
})

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});

