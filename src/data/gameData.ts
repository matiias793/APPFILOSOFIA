export interface GamePair {
  id: number;
  phrase: string;
  author: string;
}

export const gamePairs: GamePair[] = [
  {
    id: 1,
    phrase: "Aprender no es repetir, sino reflexionar",
    author: "Sócrates"
  },
  {
    id: 2,
    phrase: "La educación debe ser para todos",
    author: "Juan Amos Comenio"
  },
  {
    id: 3,
    phrase: "El niño aprende de forma natural",
    author: "Jean-Jacques Rousseau"
  },
  {
    id: 4,
    phrase: "La educación debe basarse en la experiencia",
    author: "Johann Pestalozzi"
  },
  {
    id: 5,
    phrase: "Los niños aprenden mejor haciendo",
    author: "Maria Montessori"
  }
];
