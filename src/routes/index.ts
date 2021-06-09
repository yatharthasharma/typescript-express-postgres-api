import express, { Request, Response, Router } from 'express';
import { kafkaProducer } from '../../kafka/producer';

const router: Router = express.Router();

router.get('/health', (req: Request, res: Response) => {
  return res.send('OK!');
});

router.get('/producer', (req: Request, res: Response) => {
  const arr = ['NANA', 'lol', 'bahahha', 'nopsi', 'ellie', 'hyogyung', 'kafka'];
  kafkaProducer('teststream', arr[Math.floor(Math.random() * arr.length)]);
  return res.send('OK!');
});


router.get('*', (req: Request, res: Response) => {
  return res.status(404).send('BAD PATH!');
});


module.exports = router;