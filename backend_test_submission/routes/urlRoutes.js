import express from 'express';
import { createShortUrl, redirectUrl,getUrlStats } from '../controllers/urlController.js';

const router = express.Router();

router.post('/shortUrls', createShortUrl);
router.get('/shortUrls/:id', getUrlStats); 
router.get('/:shortId', redirectUrl);

export default router;
