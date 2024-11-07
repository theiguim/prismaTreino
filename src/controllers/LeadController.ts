import { Handler } from "express";
import { prisma } from "../database";
import { CreateLeadRequestSchema, UpdateLeadRequestSchema } from "./schemas/LeadRequestSchema";

export class LeadController {
    index: Handler = async(req, res, next)=> {
        try {
            const leads = await prisma.lead.findMany({});
            res.json(leads)
        } catch (error) {
            res.json(error)
        }
    }
    create: Handler = async(req, res, next)=> {
        try {
            const body = CreateLeadRequestSchema.parse(req.body);
            const createLead = await prisma.lead.create({
                data: body
            });
            res.json(createLead);
        } catch (error) {
            res.json(error)
        }
    }
    find: Handler = async(req, res, next)=> {
        try {
            const lead = await prisma.lead.findUnique({
                where: {id: +req.params.id}
            });
            res.json(lead);
        } catch (error) {
            res.json(error)
        }
    }
    update: Handler = async(req, res, next)=> {
        try {
            const body = UpdateLeadRequestSchema.parse(req.body);
            const updatedLead = await prisma.lead.update({
                where:{id: +req.params.id},
                data: body
            });
            res.json(updatedLead)
        } catch (error) {
            res.json(error)
        }
    }
    delete: Handler = async(req, res, next)=> {
        try {
            const deletedLead = await prisma.lead.delete({
                where: {id: +req.params.id}
            });
            res.json({message: "Deletado com sucesso!"})
        } catch (error) {
            res.json(error)
        }
    }
}