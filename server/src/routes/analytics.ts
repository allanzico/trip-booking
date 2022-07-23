import express from 'express'
import { AnalyticsClass } from '../controllers/Analytics'

const analytics = new AnalyticsClass

 const router = express.Router()
 

 router.get(
    "/analytics",
    analytics.getAnalytics
  );


module.exports = router