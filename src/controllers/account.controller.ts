// src/controllers/account.controller.ts
import { Request, Response } from "express";
import prisma from "../config/db";

/**
 * Crear una cuenta
 */
export const createAccount = async (req: Request, res: Response) => {
  try {
    const { name, money, userId, categoryId } = req.body;

    if (!userId || !categoryId) {
      return res.status(400).json({ error: "Faltan userId o categoryId" });
    }

    const account = await prisma.account.create({
      data: {
        name,
        money: money ?? 0,
        userId,
        categoryId,
      },
    });

    res.status(201).json({ message: "Cuenta creada exitosamente", account });
  } catch (error) {
    console.error("Error creando cuenta:", error);
    res.status(500).json({ error: "Error al crear cuenta" });
  }
};

/**
 * Obtener todas las cuentas de un usuario
 */
export const getAccountsByUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const accounts = await prisma.account.findMany({
      where: { userId: Number(userId) },
      include: { category: true, tags: true },
    });

    res.json(accounts);
  } catch (error) {
    console.error("Error obteniendo cuentas:", error);
    res.status(500).json({ error: "Error al obtener cuentas" });
  }
};

/**
 * Actualizar una cuenta
 */
export const updateAccount = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { name, money, categoryId } = req.body;
  
      // Buscar la cuenta actual
      const existing = await prisma.account.findUnique({
        where: { id: Number(id) },
      });
  
      if (!existing) {
        return res.status(404).json({ error: "Cuenta no encontrada" });
      }
  
      const updated = await prisma.account.update({
        where: { id: Number(id) },
        data: {
          name: name ?? existing.name,
          money: money !== undefined ? money : existing.money,
          categoryId: categoryId ?? existing.categoryId,
        },
      });
  
      res.json({ message: "Cuenta actualizada", account: updated });
    } catch (error) {
      console.error("Error actualizando cuenta:", error);
      res.status(500).json({ error: "Error al actualizar cuenta" });
    }
  };
  
/**
 * Eliminar una cuenta
 */
export const deleteAccount = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    await prisma.account.delete({ where: { id: Number(id) } });
    res.json({ message: "Cuenta eliminada" });
  } catch (error) {
    console.error("Error eliminando cuenta:", error);
    res.status(500).json({ error: "Error al eliminar cuenta" });
  }
};
