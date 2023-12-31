export interface IRegister {
  name: string;
  birth: string;
  drive: string;
  goal: string;
}

export interface IList extends IRegister {
  id: string;
  file: string;
  createdAt: string;
}
