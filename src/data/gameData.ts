export interface GamePair {
  id: number;
  phrase: string;
  author: string;
  image: string;
  funFact: string;
  details: string;
  color: string;
  hint: string;
}

export const gamePairs: GamePair[] = [
  {
    id: 1,
    phrase: "Aprender no es repetir, sino reflexionar",
    author: "Sócrates",
    image: "/authors/socrates.png",
    funFact: "¿Sabías que?",
    details: "Su método la 'Mayéutica' se basaba en el diálogo para que el alumno descubriera la verdad por sí mismo.",
    color: "bg-blue-100",
    hint: "Este pensador griego no escribía libros; prefería hacer preguntas incómodas para que los demás sacaran la verdad de su propio interior."
  },
  {
    id: 2,
    phrase: "La educación debe ser para todos",
    author: "Juan Amos Comenio",
    image: "/authors/comenio.png",
    funFact: "¿Sabías que?",
    details: "Es el 'Padre de la Pedagogía Moderna'. Propuso un sistema educativo universal basado en la naturaleza.",
    color: "bg-green-100",
    hint: "Considerado el 'Padre de la Pedagogía', fue el primero en decir que el conocimiento es un derecho universal, sin importar clase social o género."
  },
  {
    id: 3,
    phrase: "El niño aprende de forma natural",
    author: "Jean-Jacques Rousseau",
    image: "/authors/rousseau.png",
    funFact: "¿Sabías que?",
    details: "Defendió que la educación debe respetar el desarrollo natural del niño sin interferencias sociales.",
    color: "bg-orange-100",
    hint: "Él creía que la sociedad corrompe al ser humano. Decía que hay que dejar que los niños crezcan en libertad y en contacto directo con la naturaleza."
  },
  {
    id: 4,
    phrase: "La educación debe basarse en la experiencia",
    author: "Johann Pestalozzi",
    image: "/authors/pestalozzi.png",
    funFact: "¿Sabías que?",
    details: "Enfatizó aprender con 'la mano, el corazón y la mente', a través de la observación y la práctica.",
    color: "bg-teal-100",
    hint: "Su lema era 'Cabeza, Corazón y Mano'. Creía que no basta con leer; hay que usar los sentidos y el afecto para aprender."
  },
  {
    id: 5,
    phrase: "Los niños aprenden mejor haciendo",
    author: "Maria Montessori",
    image: "/authors/montessori.png",
    funFact: "¿Sabías que?",
    details: "Revolucionó el aula con materiales táctiles para que los niños aprendieran de forma autónoma.",
    color: "bg-purple-100",
    hint: "Fue médica y científica. Diseñó materiales táctiles para que los niños descubran el mundo por sí mismos, sin que el maestro dirija cada paso."
  }
];
