const express = require("express");
const prisma = require("./config/prisma");

const app = express();

app.use(express.json());

app.get("/ping", (req, res) => {
    res.send("pong");
});

app.get("/annotations", async (req, res) => {
    try {
        const annotationsList = await prisma.annotations.findMany();
        res.json(annotationsList);
    } catch (error) {
        res.status(400).json({ error: "Ero ao exbir as Notas" });
    }
});

app.post("/annotations", async (req, res) => {
    // console.log(req.body);

    const { title, notes, priority } = req.body;

    if (!title || !notes) {
        return res
            .status(400)
            .json({ error: "Os dados devem conter um títuloe uma anotação!" });
    }

    const annotationsCreated = await prisma.annotations.create({
        data: {
            title,
            notes,
            priority,
        },
    });
    return res.json(annotationsCreated);
});

app.delete("/annotations/:id", async (req, res) => {
    // console.log(req.params.id);
    const { id } = req.params;
    // console.log(id);

    try {
        const annotationsDeleted = await prisma.annotations.delete({
            where: {
                id: parseInt(id),
            },
        });
        res.json(annotationsDeleted);
    } catch (error) {
        res.status(404).json({ error: "Erro ao excluir a anotação" });
    }
});





// Porta configurada para o servidor
// const port = 3333;
const port = process.env.PORT || 3333;

// Configuração da porta do servidor
const server = app.listen(port, () => {
    console.log(`Server running on port ${port} (http://localhost:${port})`);
});

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
