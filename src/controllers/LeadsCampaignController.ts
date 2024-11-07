import { Handler } from "express";
import { prisma } from "../database";
import { addLeadChampaignRequestSchema, UpdateChampaignRequestSchema, UpdateLeadCampaignRequestSchema } from "./schemas/ChampaignRequestSchema";
import { LeadCampaignStatus, LeadStatus, Prisma } from "@prisma/client";


export class LeadsCampaignController {
    getLead: Handler = async (req, res, nest) => {
        try {

            const query = req.query;
            const { page = "1", pageSize = "10", name, status, sortBy = "name", order = "asc" } = query;

            const pageNumber = +page;
            const pageSizeNumber = +pageSize;

            const where: Prisma.LeadWhereInput = {
                campaings: {
                    some: {
                        campaignId: +req.params.campaignId,
                    }
                }
            };

            if (name) where.name = { contains: String(name), mode: "insensitive" }
            if (status) where.campaings = { some: { campaignId: +req.params.campaignId, status: status as LeadCampaignStatus } }


            const getLead = await prisma.lead.findMany({
                where,
                orderBy: { [sortBy as string]: order === "asc" ? "asc" : "desc" },
                skip: (pageNumber - 1) * pageSizeNumber,
                take: pageSizeNumber,
                include: {
                    campaings: true
                }
            });

            res.json(getLead)

        } catch (error) {
            res.json(error)
        }
    }
    addLead: Handler = async (req, res, nest) => {
        try {
            const body = addLeadChampaignRequestSchema.parse(req.body)
            const addLead = await prisma.leadsCampaign.create({
                data: {
                    campaignId: body.campaignId,
                    leadId: body.leadId,
                    status: body.status
                }
            });

            res.json(addLead);
        } catch (error) {
            res.json(error)
        }
    }
    updateLead: Handler = async (req, res, nest) => {
        try {
            const body = UpdateLeadCampaignRequestSchema.parse(req.body);
            const updateLead = await prisma.leadsCampaign.update({
                where: {
                    leadId_campaignId: {
                        campaignId: +req.params.campaignId,
                        leadId: +req.params.leadId
                    }
                },
                data: {
                    status: body.status
                }
            });
            res.json(updateLead)
        } catch (error) {
            res.json(error)
        }
    }
    removeLead: Handler = async (req, res, nest) => {
        try {
            const removeLead = await prisma.leadsCampaign.delete({
                where: {
                    leadId_campaignId: {
                        campaignId: +req.params.campaignId,
                        leadId: +req.params.leadId
                    }
                }
            });
            res.json({ message: "Deletado com sucesso" })

        } catch (error) {
            res.json(error)
        }
    }
}