// src/global.d.ts
// allowing ts for importing css
declare module "*.css" {
  const content: { [className: string]: string };
  export default content;
}
