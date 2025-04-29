import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "./src/lib/prisma";

export const createTask = async (req: NextApiRequest, res: NextApiResponse) => {
  const { title, description, status } = req.body;

  try {
    const newTask = await prisma.task.create({
      data: {
        title,
        description,
        status
      }
    });
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ error: "Erro ao criar tarefa." });
  }
};

export const listTasks = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const tasks = await prisma.task.findMany();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: "Erro ao listar tarefas." });
  }
};

export const deleteTask = async (req: NextApiRequest, res: NextApiResponse) => {
  const id = req.query.id;

  try {
    const deletedTask = await prisma.task.delete({
      where: { id: Number(id) }
    });
    res.status(200).json(deletedTask);
  } catch (error) {
    res.status(500).json({ error: "Erro ao deletar tarefa." });
  }
};
