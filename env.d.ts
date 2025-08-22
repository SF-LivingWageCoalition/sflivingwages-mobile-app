declare module '@env' {
  export const BASE_URL: string;
  export const SITE_KEY_V3: string;
  export const SEND_TO: string;
}

declare module "*.png" {
  const value: any;
  export default value;
}

declare module "*.json" {
  const value: any;
  export default value;
}