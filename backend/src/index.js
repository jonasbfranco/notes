const express = require('express');
const prisma = require('./config/prisma');

const app = express();

app.use(express.json());

// Porta configurada para o servidor
const port = 3333;



app.get('/ping', (req, res) => {
  res.send('pong');
})


app.get("/annotations", async (req, res) => {
  try {
    const annotationsList = await prisma.annotations.findMany();
    res.json(annotationsList);
  } catch (error) {
    res.status(400).json({ error: "Ero ao exbir as Notas"});
  }
  
});




// Configuração da porta do servidor
const server = app.listen(port, () => {
  console.log(`Server running on port ${port} (http://localhost:${port})`);
})

// Função para fechar os serviços do servidor
const close = () => {
  server.close(async () => {
    console.log("");
    console.log("===============================");
    console.log("Parando o serviço...");
    console.log("===============================");
  });
};

process.on("SIGINT", close);