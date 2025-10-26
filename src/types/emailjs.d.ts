declare module "@emailjs/browser" {
  interface EmailJSResponseStatus {
    status: number;
    text: string;
  }

  export function sendForm(
    serviceID: string,
    templateID: string,
    form: HTMLFormElement | string,
    publicKey?: string
  ): Promise<EmailJSResponseStatus>;

  export function send(
    serviceID: string,
    templateID: string,
    templateParams: Record<string, unknown>,
    publicKey?: string
  ): Promise<EmailJSResponseStatus>;

  export function init(publicKey: string): void;
}
