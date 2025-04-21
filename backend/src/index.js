const express = require("express");
const prisma = require("./config/prisma");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());


// teste servidor no ar!
app.get("/ping", (req, res) => {
    res.send("pong");
});

// exibir todas as notas
app.get("/annotations", async (req, res) => {
    try {
        const annotationsList = await prisma.annotations.findMany();
        res.json(annotationsList);
    } catch (error) {
        res.status(400).json({ error: "Ero ao exbir as Notas" });
    }
});

// criar nota
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


// deletar nota
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


// editar nota
app.put("/annotations/:id", async (req, res) => {
    //console.log(req.params.id);
    //console.log(req.body);
    const { id } = req.params;
    const { notes } = req.body;

    try {
        const annotation = await prisma.annotations.findUnique({
            where: {
                id: parseInt(id),
            },
        });
        //console.log(annotation);

        if (!annotation) {
            return res.status(404).json({ error: "Anotação não encontrada"});
        };

        if (notes) {
            const updateAnnotation = await prisma.annotations.update({
                where: {
                    id: parseInt(id),
                },
                data: {
                    notes,
                },
            });
            res.status(200).json(updateAnnotation);
        };

    } catch (error) {
        res.status(404).json({ error: "Erro ao exibir a anotação" }); 
    }
});



app.get("/priorities", async (req, res) => {
    //console.log(req.query);
    const { priority } = req.query
    //console.log(priority);

    const priorityFilter = 
        priority === "true" ? true : priority === "false" ? false : undefined;
    //console.log(priorityFilter);

    if (priorityFilter === undefined) {
        return res
            .status(404)
            .json({ error: "Necessário informar se a prioridade é true ou false!"})
    };

    try {
        const priorityNotes = await prisma.annotations.findMany({
            where: {
                priority: priorityFilter,
            },
        });
        res.json(priorityNotes);
    } catch (error) {
        res.status(404).json({ error: "Erro ao buscar as notas!"})
    }

});



app.put("/priorities/:id", async (req, res) => {
    const { id } = req.params;

    try {
       const annotation = await prisma.annotations.findUnique({
            where: {
                id: parseInt(id),
            },
        });
        
        //console.log(annotation);

        if (!annotation) {
            return res.status(404).json({ error: "Anotação não encontrada"});
        };

        const updateAnnotation = await prisma.annotations.update({
            where: {
                id: parseInt(id),
            },
            data: {
                priority:!annotation.priority,
            },
        });

        res.json(updateAnnotation);

    } catch (error) {
       res.status(404).json({ error: "Erro ao atualizar a prioridade da nota!"}); 
    }
});




app.put("/contents/:id", async (req, res) => {
    const { id } = req.params;
    const { notes } = req.body;

    try {
        const annotation = await prisma.annotations.findUnique({
            where: {
                id: parseInt(id),
            },
        });

        if (!annotation) {
            return res.status(404).json({ error: "Anotação não encontrada"});
        };

        if (notes) {
            const updateAnnotation = await prisma.annotations.update({
                where: {
                    id: parseInt(id),
                },
                data: {
                    notes,
                },
            });
            res.status(200).json(updateAnnotation);
        }

        
    } catch (error) {
        res.status(404).json({ error: "Erro ao atualizar o conteúdo da nota!"});
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
