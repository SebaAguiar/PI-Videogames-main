export type TGenre = {
  id: string;
  name: string;
};

export type TPlatform = TGenre;

export type TVideogame = {
  id: string;
  name: string;
  description: string;
  released: string;
  rating: number;
  image: string;
  createdInDb: boolean;
};
