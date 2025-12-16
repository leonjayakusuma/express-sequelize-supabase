// api/index.ts
import type { VercelRequest, VercelResponse } from '@vercel/node';
import app from '../src/app';
import { connectDatabase } from '../src/config/database';

let ready: Promise<void> | null = null;
const ensureReady = () => (ready ??= connectDatabase());

export default async function handler(req: VercelRequest, res: VercelResponse) {
  await ensureReady();
  return app(req as any, res as any);
}