import {Router} from "express";
import { GroupController } from "./controllers/GroupController";
import { group } from "console";
import { LeadController } from "./controllers/LeadController";
import { CampaignController } from "./controllers/CampaignController";
import { GroupLeadsController } from "./controllers/groupLeadsController";
import { LeadsCampaignController } from "./controllers/LeadsCampaignController";

export const router = Router();

const groupController = new GroupController();
const leadController = new LeadController();
const campaignController = new CampaignController();
const groupLeadsController = new GroupLeadsController();
const leadCampaignController = new LeadsCampaignController();

router.get("/groups", groupController.index);
router.post("/groups", groupController.create);
router.get("/groups/:id", groupController.find);
router.put("/groups/:id", groupController.update);
router.delete("/groups/:id", groupController.delete);

router.get("/leads", leadController.index);
router.post("/leads", leadController.create);
router.get("/leads/:id", leadController.find);
router.put("/leads/:id", leadController.update);
router.delete("/leads/:id", leadController.delete);

router.get("/campaings", campaignController.index);
router.post("/campaings", campaignController.create);
router.get("/campaings/:id", campaignController.find);
router.put("/campaings/:id", campaignController.update);
router.delete("/campaings/:id", campaignController.delete);

router.get("/groups/:groupId/leads", groupLeadsController.getLeads);
router.post("/groups/:groupId/leads", groupLeadsController.addLeads);
router.delete("/groups/:groupId/leads/:leadId", groupLeadsController.removeLeads);

router.get("/campaigns/:campaignId/leads", leadCampaignController.getLead);
router.post("/campaigns/:campaignId/leads", leadCampaignController.addLead);
router.put("/campaigns/:campaignId/leads/:leadId", leadCampaignController.updateLead);
router.delete("/campaigns/:campaignId/leads/:leadId", leadCampaignController.removeLead);