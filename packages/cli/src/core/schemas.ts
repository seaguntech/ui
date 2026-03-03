import { z } from 'zod';

export const builtFileSchema = z.object({
  path: z.string().min(1),
  type: z.string().min(1),
  target: z.string().optional(),
  content: z.string(),
});

export const registryItemSchema = z.object({
  $schema: z.string().optional(),
  name: z.string().min(1),
  type: z.string().min(1),
  description: z.string().optional(),
  dependencies: z.array(z.string()).optional(),
  registryDependencies: z.array(z.string()).optional(),
  files: z.array(builtFileSchema),
});

export const registryIndexSchema = z.object({
  name: z.string().min(1),
  homepage: z.string().optional(),
  items: z.array(
    z.object({
      name: z.string().min(1),
      type: z.string().min(1),
      description: z.string().optional(),
      dependencies: z.array(z.string()).optional(),
      registryDependencies: z.array(z.string()).optional(),
      files: z.array(
        z.object({
          path: z.string().min(1),
          type: z.string().min(1),
          target: z.string().optional(),
        }),
      ),
    }),
  ),
});

export const registriesIndexSchema = z.record(z.string(), z.string().min(1));

export const seagunConfigSchema = z.object({
  registry: z.string().url(),
});
