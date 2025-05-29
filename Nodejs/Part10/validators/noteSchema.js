const { z } = require('zod');


const CreateNoteSchema = z.object({
  text: z.string().min(1, 'Note text is required'),
  tags: z.array(z.string()).optional()
});



const UpdateNoteSchema = z.object({
  text: z.string().min(1, 'Updated text must not be empty')
});


const QueryParamsSchema = z.object({
  search: z.string().optional(),
  page: z.string().regex(/^\d+$/).optional(),
  limit: z.string().regex(/^\d+$/).optional(),
  sortBy: z.enum(['createdAt', 'updatedAt']).optional(),
  order: z.enum(['asc', 'desc']).optional()
});


module.exports = {
  CreateNoteSchema,
  UpdateNoteSchema,
  QueryParamsSchema
};
