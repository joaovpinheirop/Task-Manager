const express = require('express');
const path = require('path')
const app = express();

app.use(express.static(path.join(__dirname, 'main')));

app.listen(8080, () => {
  console.log("Servidor rodando em: http://locaslhost:8080")
})