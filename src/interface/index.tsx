interface IFAuth {
  username: string;
  password: string;
  remember: boolean;
}

interface IFRegister {
  username: string;
  password: string;
  email: string;
}
export type { IFAuth, IFRegister };
