import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";

const app = express();
const prisma = new PrismaClient();

app.use(cors()); // Permite requisições de fora (ex: do front-end)
app.use(express.json());

app.get("/tasks", async (req, res) => {
  const tasks = await prisma.task.findMany();
  res.json(tasks);
});

app.post("/tasks", async (req, res) => {
  const { title, description, status } = req.body;
  const newTask = await prisma.task.create({
    data: { title, description, status }
  });
  res.status(201).json(newTask);
});

app.put("/tasks/:id", async (req, res) => {
  const { id } = req.params;
  const { title, description, status } = req.body;

  const updatedTask = await prisma.task.update({
    where: { id: Number(id) },
    data: { title, description, status }
  });

  res.json(updatedTask);
});

app.delete("/tasks/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.task.delete({
      where: { id: Number(id) }
    });

    res.status(204).send();
  } catch (error) {
    res.status(404).json({ error: "Task not found" });
  }
});

// Inicia o servidor
app.listen(3333, () => {
  console.log("Servidor rodando na porta 3333");
});
