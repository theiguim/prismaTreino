import { Handler } from "express";
import { prisma } from "../database";
import { CreateChampaignRequestSchema, UpdateChampaignRequestSchema } from "./schemas/ChampaignRequestSchema";


export class CampaignController {
    index: Handler = async(req, res, next)=>{
        try {
            const campaigns = await prisma.campaign.findMany({});
            res.json(campaigns);
        } catch (error) {
            res.json(error)
        }
    }
    create: Handler = async(req, res, next)=>{
        try {
            const body = CreateChampaignRequestSchema.parse(req.body);
            const createCampaign = await prisma.campaign.create({
                data: body
            });
            res.json(createCampaign)
        } catch (error) {
            res.json(error)
        }
    }
    find: Handler = async(req, res, next)=>{
        try {
            const campaign = await prisma.campaign.findUnique({
                where: {id: +req.params.id}
            });
            res.json(campaign);
        } catch (error) {
            res.json(error)
        }
    }
    update: Handler = async(req, res, next)=>{
        try {
            const body = UpdateChampaignRequestSchema.parse(req.body);
            const updatedCampaign = await prisma.campaign.update({
                where: {id: +req.params.id},
                data: body
            });
            res.json(updatedCampaign);
        } catch (error) {
            res.json(error)
        }
    }
    delete: Handler = async(req, res, next)=>{
        try {
            const deletedCampaign = await prisma.campaign.delete({
                where: {id: +req.params.id}
            });
        res.json({message: "Campanha excluída com sucesso!"})
        } catch (error) {
            res.json(error)
        }
    }
}