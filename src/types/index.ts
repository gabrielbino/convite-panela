export interface Guest {
  name: string;
}

export interface Gift {
  id: number;
  name: string;
  taken: boolean;
  chosenBy?: string;
}
