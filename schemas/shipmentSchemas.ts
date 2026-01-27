import z from "zod";

// const forbiddenCodeRegex =
//   /(<\?php|<script|function\s*\(|SELECT\s+|INSERT\s+|UPDATE\s+|DELETE\s+|DROP\s+|CREATE\s+|EXEC\s+|system\(|eval\(|require\(|import\s+|export\s+)/i;


export const formSchema = z.object({
  dateRange: z.object({
    from: z.date(),
    to: z.date(),
  }),
  courier_id: z.string().min(1, "Courier is required"),
  status_type: z.enum(["1", "2"], {
    message: "Status type is required",
  }),
});


export type FormValueType = z.infer<typeof formSchema>;

