import { Handler } from "express";
import { prisma } from "../database";
import { CreateGroupRequestSchema, UpdateGroupRequestSchema } from "./schemas/GroupRequestSchema";

export class GroupController {
    index: Handler = async(req, res, next)=>{
        try {
            const groups = await prisma.group.findMany({})
            res.json(groups)
        } catch (error) {
            res.json(error)
        }
    }

    create: Handler = async(req, res, next)=>{
        try {
            const body = CreateGroupRequestSchema.parse(req.body);
            const createGroup = await prisma.group.create({
                data: body
            });
            res.json(createGroup)
        } catch (error) {
            res.json(error)
        }
    }

    find: Handler = async(req, res, next)=>{
        try {
            const group = await prisma.group.findUnique({
                where: {id: +req.params.id}
            });

            res.json(group)
        } catch (error) {
            res.json(error)
        }
    }

    update: Handler = async(req, res, next)=>{
        try {
            const body = UpdateGroupRequestSchema.parse(req.body);
            const updatedGroup = await prisma.group.update({
                where: {id: +req.params.id},
                data: body
            });
            res.json(updatedGroup)
        } catch (error) {
            res.json(error)
        }
    }

    delete: Handler = async(req, res, next)=>{
        try {
            const deletedGroup = await prisma.group.delete({
                where: {id: +req.params.id}
            });
            res.json("Grupo deletado");
        } catch (error) {
            res.json(error)
        }
    }


}