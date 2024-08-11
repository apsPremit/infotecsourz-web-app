import { z } from 'zod';

export const customSubscriptionValidationSchema = z.object({
  email: z.string().min(1, 'email is required'),
  credit: z.number().min(0, 'credit must be a positive number'),
  billType: z.enum(
    ['monthly', 'yearly'],
    'billType must be either weekly, monthly or yearly'
  ),
  description: z.string().optional(),
});
