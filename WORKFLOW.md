# AI Workflow Comparison

This assignment compared two different AI-assisted development workflows while implementing the same React settings form.

## Round One

For the first round, I used a single vague prompt: "Build a React settings form with validation." The AI immediately generated the code without explaining its approach or planning the implementation. The generated component worked correctly and included React Hook Form and Zod validation, but I had to review the code myself to understand how it met the requirements.

## Round Two

For the second round, I used a much more detailed prompt. The AI first created an implementation plan before generating any code. It explained which files would be updated, described the validation strategy, and listed accessibility requirements. After implementing the component, it reviewed its own work, identified edge cases, suggested future improvements, and generated a test file using Vitest and React Testing Library.

## Comparison

The biggest difference between the two rounds was the workflow rather than the final functionality. Both implementations satisfied the core requirements, but the second workflow was much more structured. It included planning, verification, accessibility improvements such as `fieldset`, `aria-invalid`, `aria-describedby`, and `role="alert"`, and testing guidance. This reduced the amount of manual review required.

## AI Mistake I Caught

During Round Two, the AI initially refused to update the component because it did not have access to my existing `SettingsForm.jsx`. I realized that a fresh AI session has no knowledge of my project files, so I provided the current component. After that, the AI successfully updated only the existing file as requested.

## Reflection

This exercise showed that detailed prompts lead to a better development workflow. While Round Two took longer initially because of the planning step, it saved time during review and verification. I also learned that AI-generated code should always be reviewed and tested before being accepted.