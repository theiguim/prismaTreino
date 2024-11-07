import { Handler, query } from "express";
import { prisma } from "../database";
import { AddLeadGroupRequestSchema } from "./schemas/GroupRequestSchema";
import { LeadStatus, Prisma } from "@prisma/client";

export class GroupLeadsController {

    getLeads: Handler = async (req, res, next) => {
        try {
        const query = req.query;
        const {page = "1", pageSize="10", name, status, sortBy = "name", order= "asc"} = query;
        const pageNumber = +page
        const pageSizeNumber = +pageSize;

        // quero que FINDMANY apenas dos Leads que estejam dentro do GroupID
        const where: Prisma.LeadWhereInput ={
            groups :{
              some: {id: +req.params.groupId}
            }
        };

        if(name) where.name = {contains: name as string, mode: "insensitive"};
        if(status) where.status = status as LeadStatus

            const getLeads = await prisma.lead.findMany({
                where,
                orderBy: {[sortBy as string]: order === "asc"? "asc":"desc"},
                skip: (pageNumber -1) *pageSizeNumber,
                take: pageSizeNumber,
                include: {
                    groups:true
                }
            });

            res.json(getLeads);

        } catch (error) {
            res.json(error)
        }

    }

    addLeads: Handler = async (req, res, next) => {
        try {
            const body = AddLeadGroupRequestSchema.parse(req.body);

            const addLead = await prisma.group.update({
                where: {
                    id: +req.params.groupId
                },
                data: {
                    leads: {
                        connect: {id: body.leadId}
                    }
                },
                include: {
                    leads: true
                }
            })

            res.json(addLead)
    
        } catch (error) {
            res.json(error)
        }
    }

    removeLeads: Handler = async (req, res, next) => {
       try {
        const removeLead = await prisma.group.update({
            where: {
                id: +req.params.groupId
            },
            data: {
                leads: {
                    disconnect: {id: +req.params.leadId}
                }
            }
        })

        res.json(removeLead)
       } catch (error) {
        res.json(error)
       }
    }

}