import { z } from 'zod';
import { getMissingLengthString } from '~/lib/dict';

const signUpValidationSchema = z
  .object({
    username: z.string({
      required_error: 'Username is required',
    }),
    password: z.string().superRefine((value, ctx) => {
      const length = getMissingLengthString(value.length);
      if (
        value.length < 8 &&
        value.toLowerCase() == value &&
        !/\d/.test(value)
      ) {
        ctx.addIssue({
          code: z.ZodIssueCode.too_small,
          minimum: 8,
          type: 'string',
          inclusive: true,
          message: `Weak password: add ${length}, including an uppercase letter and at least one digit`,
        });
      }
      if (
        value.length < 8 &&
        value.toLowerCase() == value &&
        /\d/.test(value)
      ) {
        ctx.addIssue({
          code: z.ZodIssueCode.too_small,
          minimum: 8,
          type: 'string',
          inclusive: true,
          message: `Weak password: add ${length}, including an uppercase letter`,
        });
      }
      if (
        value.length < 8 &&
        value.toLowerCase() !== value &&
        !/\d/.test(value)
      ) {
        ctx.addIssue({
          code: z.ZodIssueCode.too_small,
          minimum: 8,
          type: 'string',
          inclusive: true,
          message: `Weak password: add ${length}, including at least one digit`,
        });
      }
      if (
        value.length < 8 &&
        value.toLowerCase() !== value &&
        /\d/.test(value)
      ) {
        ctx.addIssue({
          code: z.ZodIssueCode.too_small,
          minimum: 8,
          type: 'string',
          inclusive: true,
          message: `Weak password: add ${length}`,
        });
      }
      if (
        value.length >= 8 &&
        value.toLowerCase() == value &&
        !/\d/.test(value)
      ) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message:
            'Weak password: add an uppercase letter and at least one digit',
        });
      }
      if (value.length >= 8 && value.toLowerCase() == value) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Weak password: add an uppercase letter',
        });
      }
      if (value.length >= 8 && !/\d/.test(value)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Weak password: add a digit',
        });
      }
    }),
    confirm_password: z.string().min(1, {
      message: 'Required',
    }),
  })
  .superRefine((value, ctx) => {
    if (value.password != value.confirm_password) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Passwords do not match',
        path: ['confirm_password'],
      });
    }
  });

export { signUpValidationSchema };
