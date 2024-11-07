import { z } from "zod";

export const CreateChampaignRequestSchema = z.object({
    name: z.string(),
    description: z.string(),
    startDate: z.coerce.date(),
    endDate: z.coerce.date().optional()
});

export const UpdateChampaignRequestSchema = z.object({
    name: z.string().optional(),
    description: z.string().optional(),
    startDate: z.coerce.date().optional(),
    endDate: z.coerce.date().optional()
});

export const addLeadChampaignRequestSchema = z.object({
    campaignId: z.number(),
    leadId: z.number(),
    status: z.enum([
        'New',
        'Engaged',
        'FollowUp_Scheduled',
        'Contacted',
        'Qualified',
        'Converted',
        'Unresponsive',
        'Disqualified',
        'Re_Engaged',
        'Opted_out'
    ]).optional()
});

export const UpdateLeadCampaignRequestSchema = z.object({
    status: z.enum([
        'New',
        'Engaged',
        'FollowUp_Scheduled',
        'Contacted',
        'Qualified',
        'Converted',
        'Unresponsive',
        'Disqualified',
        'Re_Engaged',
        'Opted_out'
    ]).optional()
})