export interface Guest {
  name: string;
  email: string;
}

export interface Gift {
  id: number;
  name: string;
  taken: boolean;
  chosenBy?: string;
  email?: string;
}
