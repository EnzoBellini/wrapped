export const relationshipStart = {
  /** Data em formato livre pra exibir no slide */
  dateLabel: "07/02/2025",
  milestones: [
    { id: "first-date", label: "Primeira mensagem", detail: "E desde aquele dia nós não paramos de conversar." },
    { id: "first-kiss", label: "Primeiro rolê", detail: "Só Deus sabe o quanto eu tava nervoso." },
    { id: "first-trip", label: "Primeiro Beijo", detail: "Esse não da pra esquecer." },
  ],
} as const;

export const top3Moments = [
  { id: "m1", emoji: "💫", title: "Pós Klan", blurb: "Quando eu realmente percebi que te amava mais do que eu poderia expressar." },
  { id: "m2", emoji: "🤣", title: "Nossas Risadas e Idiotices", blurb: "Os vídeos que a gente tem salvo fazendo um monte de tonteira." },
  { id: "m3", emoji: "🏠❤️", title: "Primeira visita ao nosso apartamento", blurb: "O começo de um sonho." },
] as const;

export const stats = [
  { id: "days", label: "Dias juntos", value: 365, max: 365 },
  { id: "kisses", label: "Beijos (estimativa por que são muitos)", value: 9999, max: 10000 },
  { id: "messages", label: "Eu te amo falados", value: 1000000, max: 1000000 },
  { id: "hangouts", label: "Rolês", value: 42, max: 60 },
  { id: "movies", label: "Filmes/séries vistos (os melhores por que você nunca viu nada)", value: 28, max: 50 },
] as const;
''
export const places = [
  { id: "cafe", name: "Seus Pulinhos quando se empolga" },
  { id: "park", name: "Parque de domingo" },
  { id: "mall", name: "Shopping de risadas" },
  { id: "beach", name: "Praia do pôr do sol" },
  { id: "pizza", name: "Mesa da pizza favorita" },
  { id: "cinema", name: "Poltrona do cinema" },
] as const;

export const vibeTracks = [
  { id: "v1", title: "Como um Anjo", artist: "Cesar Menotti & Fabiano", duration: "2:57" },
  { id: "v2", title: "Esperando na Janela", artist: "Cesar Menotti & Fabiano", duration: "2:53" },
  { id: "v3", title: "Amo Noite e Dia", artist: "Jorge & Mateus", duration: "3:03" },
] as const;

export const romanticMessage = {
  lines: [
    "E, aos poucos nós viramos uma mesma estrada.",
    "Um ano juntos,",
    "aprendendo a ter paciência nos dias difíceis,",
    "aprendendo a melhor forma de cuidar um do outro,",
    "e descobrindo o amor nos detalhes mais simples.",
    "Hoje eu entendo melhor:",
    "Nosso amor não é só sentimento —",
    "é um acolhimento, em meio ao mundo.",

  ],
  /** Caminho opcional para uma foto de fundo; se vazio, usamos apenas shapes/gradiente. */
  imageUrl: "",
} as const;

export const partnershipStats = [
  { id: "partnership", label: "Nível de parceria", value: 100, unit: "%" },
  { id: "laughs", label: "Taxa de risadas por conversa", value: 100, unit: "%" },
  { id: "missing", label: "Taxa de saudade", value: "altíssima (nível perigoso)", unit: "" },
] as const;


