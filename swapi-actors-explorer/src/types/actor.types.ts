export interface Actor {
    name: string;
    height: string;
    mass: string;
    hair_color: string;
    skin_color: string;
    eye_color: string;
    birth_year: string;
    gender: string;
    homeworld: string;
    films: string[];
    species: [];
    vehicles: string[];
    starships: string[];
    created: string;
    edited: string;
    url: string;
    [key: string]: any
  }
  export interface ActorApiReponse {
    count: number;
    next: string |null;
    previous: string | null;
    results: Actor[];
  }