export interface GamePair {
  id: number;
  phrase: string;
  author: string;
  image: string;
  funFact: string;
  details: string;
  color: string;
}

export const gamePairs: GamePair[] = [
  {
    id: 1,
    phrase: "Aprender no es repetir, sino reflexionar",
    author: "Sócrates",
    image: "/authors/socrates.png",
    funFact: "¿Sabías que?",
    details: "Su método la 'Mayéutica' se basaba en el diálogo para que el alumno descubriera la verdad por sí mismo.",
    color: "bg-blue-100"
  },
  {
    id: 2,
    phrase: "La educación debe ser para todos",
    author: "Juan Amos Comenio",
    image: "/authors/comenio.png",
    funFact: "¿Sabías que?",
    details: "Es el 'Padre de la Pedagogía Moderna'. Propuso un sistema educativo universal basado en la naturaleza.",
    color: "bg-green-100"
  },
  {
    id: 3,
    phrase: "El niño aprende de forma natural",
    author: "Jean-Jacques Rousseau",
    image: "/authors/rousseau.png",
    funFact: "¿Sabías que?",
    details: "Defendió que la educación debe respetar el desarrollo natural del niño sin interferencias sociales.",
    color: "bg-orange-100"
  },
  {
    id: 4,
    phrase: "La educación debe basarse en la experiencia",
    author: "Johann Pestalozzi",
    image: "/authors/pestalozzi.png",
    funFact: "¿Sabías que?",
    details: "Enfatizó aprender con 'la mano, el corazón y la mente', a través de la observación y la práctica.",
    color: "bg-teal-100"
  },
  {
    id: 5,
    phrase: "Los niños aprenden mejor haciendo",
    author: "Maria Montessori",
    image: "/authors/montessori.png",
    funFact: "¿Sabías que?",
    details: "Revolucionó el aula con materiales táctiles para que los niños aprendieran de forma autónoma.",
    color: "bg-purple-100"
  }
];
