export type TextId = "intro"
  | "company_info_template"
  | "privacy_policy";

interface TextDefinition {
  text?: string
  path?: string
}

export const textDefinitions: { [id in TextId]: TextDefinition } = {
  "intro": { path : "/intro.md"},
  "company_info_template": { path : "/company_info_template.md"},
  "privacy_policy": { path : "/privacy_policy.md"}
}