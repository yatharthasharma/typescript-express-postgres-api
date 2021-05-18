import express, { Request, Response, Router } from 'express';

const router: Router = express.Router();

router.get('/health', (req: Request, res: Response) => {
  return res.send('OK!');
});

router.get('*', (req: Request, res: Response) => {
  return res.status(404).send('BAD PATH!');
});


module.exports = router;