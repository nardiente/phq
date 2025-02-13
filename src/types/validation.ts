import { z } from 'zod';
import { WidgetConfig } from './widget';

export const widgetFormSchema = z.discriminatedUnion('type', [
  // Widget form validation here
]);

export type WidgetFormData = z.infer<typeof widgetFormSchema>;

export function validateWidgetForm(data: Partial<WidgetFormData>) {
  // Widget validation logic
}
