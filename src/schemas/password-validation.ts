import { z } from "zod";
import { getMissingLength } from "~/lib/dict";

const passwordValidationSchema = z
  .object({
    pwd: z.string(),
    repeat: z.string(),
  })
  .superRefine((value, ctx) => {
    const length = getMissingLength(value.pwd.length);
    if (
      value.pwd.length < 8 &&
      value.pwd.toLowerCase() == value.pwd &&
      !/\d/.test(value.pwd)
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.too_small,
        minimum: 8,
        type: "string",
        inclusive: true,
        message: `Weak password: add ${length}, including an uppercase letter and at least one digit`,
        path: ["pwd"],
      });
    }
    if (
      value.pwd.length < 8 &&
      value.pwd.toLowerCase() == value.pwd &&
      /\d/.test(value.pwd)
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.too_small,
        minimum: 8,
        type: "string",
        inclusive: true,
        message: `Weak password: add ${length}, including an uppercase letter`,
        path: ["pwd"],
      });
    }
    if (
      value.pwd.length < 8 &&
      value.pwd.toLowerCase() !== value.pwd &&
      !/\d/.test(value.pwd)
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.too_small,
        minimum: 8,
        type: "string",
        inclusive: true,
        message: `Weak password: add ${length}, including at least one digit`,
        path: ["pwd"],
      });
    }
    if (
      value.pwd.length < 8 &&
      value.pwd.toLowerCase() !== value.pwd &&
      /\d/.test(value.pwd)
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.too_small,
        minimum: 8,
        type: "string",
        inclusive: true,
        message: `Weak password: add ${length},`,
        path: ["pwd"],
      });
    }
    if (
      value.pwd.length >= 8 &&
      value.pwd.toLowerCase() == value.pwd &&
      !/\d/.test(value.pwd)
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.too_small,
        minimum: 8,
        type: "string",
        inclusive: true,
        message:
          "Weak password: add an uppercase letter and at least one digit",
        path: ["pwd"],
      });
    }
    if (value.pwd.length >= 8 && value.pwd.toLowerCase() == value.pwd) {
      ctx.addIssue({
        code: z.ZodIssueCode.too_small,
        minimum: 8,
        type: "string",
        inclusive: true,
        message: "Weak password: add an uppercase letter",
        path: ["pwd"],
      });
    }
    if (value.pwd.length >= 8 && !/\d/.test(value.pwd)) {
      ctx.addIssue({
        code: z.ZodIssueCode.too_small,
        minimum: 8,
        type: "string",
        inclusive: true,
        message: "Weak password: add at least one digit",
        path: ["pwd"],
      });
    }
    if (value.pwd != value.repeat) {
      ctx.addIssue({
        code: z.ZodIssueCode.too_small,
        minimum: 8,
        type: "string",
        inclusive: true,
        message: "Passwords do not match",
        path: ["repeat"],
      });
    }
  });

export { passwordValidationSchema };
