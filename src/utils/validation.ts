import { z } from 'zod';

const baseSchema = {
  width: z
    .number()
    .min(300, 'Minimum width is 300px')
    .max(800, 'Maximum width is 800px'),
  height: z
    .number()
    .min(200, 'Minimum height is 200px')
    .max(800, 'Maximum height is 800px'),
  preventScroll: z.boolean(),
};

const positionSchema = z.enum(['Left', 'Right']);

const modalSchema = z.object({
  type: z.literal('Modal'),
  ...baseSchema,
});

const sidebarSchema = z.object({
  type: z.literal('Sidebar'),
  position: positionSchema,
  ...baseSchema,
});

const popoverSchema = z.object({
  type: z.literal('Popover'),
  position: positionSchema,
  offset: z
    .number()
    .min(0, 'Minimum offset is 0px')
    .max(100, 'Maximum offset is 100px'),
  ...baseSchema,
});

const embedSchema = z.object({
  type: z.literal('Embed'),
  ...baseSchema,
});
