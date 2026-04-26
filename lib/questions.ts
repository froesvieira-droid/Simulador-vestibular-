export interface Question {
  id: number;
  category: string;
  text: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export const questions: Question[] = [
  {
    id: 1,
    category: "Matemática",
    text: "Considerando o gráfico do Envelhecimento da População Brasileira e as informações relativas a ele, assinale a opção correta.\n(Sendo o IE a razão entre população idosa (65+) e jovem (0-14))",
    options: [
      "No período que se estende de 1970 a 1990, a taxa de crescimento do IE manteve-se constante.",
      "O intervalo entre 1990 e 2000 foi aquele em que o Brasil registrou o maior aumento em seu IE.",
      "Entre os anos de 2000 e 2010, o IE apresentou o menor crescimento em relação aos demais intervalos.",
      "De 2010 a 2022, o IE indica que a população idosa aumentou, ao contrário da população jovem, que diminuiu.",
      "Se a taxa de crescimento da última década (2010-2022) for mantida, estima-se que, até 2034, o IE ultrapasse o valor de 60%."
    ],
    correctIndex: 4,
    explanation: "O aumento entre 2010 (30,7) e 2022 (55,2) foi de 24,5 pontos. Se mantermos esse crescimento para os próximos 12 anos (até 2034), o índice chegaria a 79,7, ultrapassando os 60%."
  },
  {
    id: 2,
    category: "Matemática",
    text: "No período de 10 anos, contados a partir de 1985, o IE indica que, para cada grupo de 1000 jovens no Brasil, o número de idosos existentes estava compreendido entre:",
    options: [
      "75,0 e 90,0",
      "90,0 e 122,0",
      "105,0 e 139,5",
      "122,0 e 168,5",
      "130,0 e 190,5"
    ],
    correctIndex: 2,
    explanation: "Em 1985 (meio do caminho entre 1980 e 1990), o valor estaria entre 10,5 e 13,9. Para 1000 jovens, isso equivale a valores entre 105 e 139 idosos."
  },
  {
    id: 3,
    category: "Matemática",
    text: "Sobre os índices referentes aos anos que vão de 1970 a 1980, tomados ano a ano, é correto afirmar que eles formam uma:",
    options: [
      "Progressão Aritmética de razão igual a 7/5",
      "Progressão Geométrica de razão igual a 7/5",
      "Progressão Aritmética de razão igual a 5/2",
      "Progressão Geométrica de razão igual a 3/10",
      "Progressão Aritmética de razão igual a 3/10"
    ],
    correctIndex: 4,
    explanation: "Em 1970 o IE era 7,5 e em 1980 era 10,5. O aumento total em 10 anos foi de 3,0 (10,5 - 7,5). Dividindo pelo número de anos, temos 3/10 ao ano, caracterizando uma PA se o crescimento for linear."
  },
  {
    id: 4,
    category: "Física/Logística",
    text: "Um motoboy realiza entregas para seis lojas. Contudo, no baú da moto cabem apenas 8 pacotes. Supondo que ele realize 16 entregas completas (carregando o baú em cada uma), qual a quantidade máxima de pacotes transportados?",
    options: [
      "122",
      "124",
      "126",
      "128",
      "130"
    ],
    correctIndex: 3,
    explanation: "Basta multiplicar a capacidade do baú pelo número de entregas: 8 pacotes x 16 entregas = 128 pacotes totais."
  },
  {
    id: 5,
    category: "Matemática/Porcentagem",
    text: "A respeito da promoção 'leve 5 unidades do mesmo produto e pague apenas 4', qual outra promoção oferece o mesmo desconto percentual?",
    options: [
      "A segunda unidade tem 66% de desconto ao levar 2.",
      "A segunda unidade tem 40% de desconto ao levar 2.",
      "Você recebe 33% de desconto ao levar 1 unidade.",
      "Você recebe 80% de desconto ao levar 1 unidade.",
      "Pague apenas 5 ao levar 6 unidades."
    ],
    correctIndex: 1,
    explanation: "'Leve 5 pague 4' significa 1 item grátis em 5, ou 20% de desconto. 'Segunda com 40% de desconto' significa que em 2 itens você economiza 40% de um deles, totalizando 20% de desconto no valor total (40/200 = 0.2)."
  },
  {
    id: 6,
    category: "Lógica/Conjuntos",
    text: "Em um levantamento de produtos, existem 1730 mercadorias veganas e 2650 itens de higiene pessoal. No total, 4000 produtos são veganos OU de higiene pessoal. Quantos participam de apenas uma categoria?",
    options: [
      "380",
      "910",
      "1350",
      "2270",
      "3620"
    ],
    correctIndex: 4,
    explanation: "Pelo diagrama de Venn: n(A U B) = n(A) + n(B) - n(A ∩ B). 4000 = 1730 + 2650 - X. X = 380 (interseção). Apenas A: 1730 - 380 = 1350. Apenas B: 2650 - 380 = 2270. Somando: 1350 + 2270 = 3620."
  },
  {
    id: 7,
    category: "Português/Literatura",
    text: "No fragmento que descreve as correntes estéticas após 1922, qual alternativa melhor representa a temática da 'ficção regionalista' e do 'romance introspectivo'?",
    options: [
      "Fragmento de 'Vidas Secas' (Graciliano Ramos) tratando da seca e miséria.",
      "Poema barroco de Gregório de Matos sobre a natureza.",
      "Fragmento romântico de 'Úrsula' focado no sentimentalismo.",
      "Poema simbolista sobre o crepúsculo.",
      "Fragmento focado em Humanitas e a conservação da vida."
    ],
    correctIndex: 0,
    explanation: "A ficção regionalista de 30 (como 'Vidas Secas') foca no Nordeste decadente e na luta contra a miséria, exatamente como descrito no texto de Alfredo Bosi."
  },
  {
    id: 8,
    category: "Português",
    text: "Analisando o texto 'Acotirene e Aqualtune', sobre a liderança feminina em Palmares, pode-se concluir corretamente que o texto é um:",
    options: [
      "Versículo: numera subdivisões de um artigo.",
      "Poema: narrativa construída em versos e rimas.",
      "Artigo de opinião: defendendo um posicionamento.",
      "Editorial: evidenciando a opinião de uma revista.",
      "Verbete: expõe informações sobre termos usando dissertação."
    ],
    correctIndex: 4,
    explanation: "O texto tem caráter informativo e enciclopédico (extraído da 'Enciclopédia Negra'), definindo termos e figuras históricas, o que caracteriza um verbete."
  },
  {
    id: 9,
    category: "Linguística",
    text: "No cartum com a frase 'You tested positive for being negative', a oposição entre as palavras configura qual figura de linguagem?",
    options: [
      "Metáfora",
      "Metonímia",
      "Personificação",
      "Paronomásia",
      "Antítese"
    ],
    correctIndex: 4,
    explanation: "Antítese é a aproximação de palavras com sentidos opostos (positivo vs negativo) para enfatizar o contraste."
  },
  {
    id: 10,
    category: "História",
    text: "A frase 'Fale macio e use um porrete' de Theodore Roosevelt Jr. sintetizou qual política dos EUA?",
    options: [
      "Guerra às Drogas na América Latina.",
      "Declaração de Direitos e posse de armas.",
      "Política do Apaziguamento na Europa.",
      "Política do Big Stick (negociações amistosas com uso latente da força).",
      "Tratado de Versalhes após a 1ª Guerra Mundial."
    ],
    correctIndex: 3,
    explanation: "A política do 'Big Stick' consistia no exercício do poder diplomático americano apoiado por uma forte presença militar ('o porrete')."
  }
];
