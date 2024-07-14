import type { ZodTypeAny, z } from 'zod';

export default function<T extends ZodTypeAny>(schema: T, data: MaybeRefOrGetter<Record<string, unknown>>) {
  const isValid = ref(true);
  const errors = ref<Record<string, string> | null>(null);

  function clearErrors() {
    errors.value = null;
  };

  function validate() {
    clearErrors();

    const result = schema.safeParse(data);

    if (!result.success) {
      const issues = result.error.errors;

      errors.value = groupErrors(issues);
    }

    return result.success;
  };

  function groupErrors(issues: z.ZodIssue[]) {
    const errors: Record<string, string> = {};

    for (const issue of issues) {
      const path = issue.path[0];

      errors[path] = issue.message;
    }

    return errors;
  }

  function onInput() {
    const result = validate();

    isValid.value = result;
  }

  return { validate, onInput, isValid, errors };
}
