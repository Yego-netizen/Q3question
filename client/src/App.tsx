import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Stack,
  LinearProgress,
} from "@mui/material";

import CenteredContainer from "./components/CenteredContainer.tsx";
import { sendStats } from "./services/stats.service.ts";
import InfoName from "./pages/InfoName.tsx";
import LandingPage from "./pages/LandingPage.tsx";
import QuestionText from "./components/QuestionText.tsx";
import RankingPage from "./pages/Ranking.tsx";
import AboutPage from "./pages/About.tsx";

type Question = {
  id: number;
  question: string;
  options: string[];
  answer: number;
  hints: string[];
};

const questions: Question[] = [
  {
    id: 1,
    question: "O que é um algoritmo?",
    options: [
      "Um tipo de variável.",
      "Uma sequência de passos para resolver um problema.",
      "Um tipo de lista.",
      "Um comando de repetição.",
    ],
    answer: 1,
    hints: [
      "Um algoritmo descreve como realizar uma tarefa.",
      "Ele é formado por uma sequência organizada de passos.",
      "Pense em uma receita de bolo: ela possui passos para chegar a um resultado.",
    ],
  },
  {
    id: 2,
    question: `Qual será o resultado do código abaixo?

\`python
for i in range(4):
    print(i)
\``,
    options: ["1, 2, 3, 4.", "0, 1, 2, 3.", "0, 1, 2, 3, 4.", "1, 2, 3."],
    answer: 1,
    hints: [
      "A função range(4) começa a contar a partir de zero.",
      "O valor 4 não faz parte da sequência gerada por range(4).",
      "range(4) produz os valores: 0, 1, 2 e 3.",
    ],
  },
  {
    id: 3,
    question:
      "Qual estrutura de repetição é utilizada para repetir um código enquanto uma condição for verdadeira?",
    options: ["if.", "for.", "while.", "return."],
    answer: 2,
    hints: [
      "A estrutura utilizada possui uma condição que é verificada repetidamente.",
      "Ela continua executando enquanto a condição for verdadeira.",
      "Seu nome em inglês significa 'enquanto'.",
    ],
  },
  {
    id: 4,
    question:
      'Considere a lista lista = ["A", "B", "C", "D"]. Qual comando acessa o elemento “C”?',
    options: ["lista[3]", "lista[2]", "lista[1]", "lista[4]"],
    answer: 1,
    hints: [
      "Em Python, os índices começam em zero.",
      'O elemento "A" está no índice 0.',
      'Assim, "C" está no índice 2.',
    ],
  },
  {
    id: 5,
    question: "Para que serve o comando append()?",
    options: [
      "Remove um elemento da lista.",
      "Ordena a lista.",
      "Adiciona um elemento ao final da lista.",
      "Inverte a lista.",
    ],
    answer: 2,
    hints: [
      "append() é um método utilizado em listas.",
      "Ele modifica a lista adicionando um novo elemento.",
      "O elemento é adicionado ao final da lista.",
    ],
  },
  {
    id: 6,
    question: "Qual será o resultado de len([10, 20, 30])?",
    options: ["2.", "3.", "30.", "60."],
    answer: 1,
    hints: [
      "A função len() retorna o tamanho de uma coleção.",
      "Conte quantos elementos existem dentro da lista.",
      "A lista possui três elementos.",
    ],
  },
  {
    id: 7,
    question: "O que é uma matriz em Python?",
    options: [
      "Uma lista que só pode armazenar números.",
      "Uma estrutura formada por listas dentro de listas.",
      "Uma lista sem índices.",
      "Uma estrutura que possui apenas uma coluna.",
    ],
    answer: 1,
    hints: [
      "Uma matriz pode representar linhas e colunas.",
      "Em Python, podemos representar uma matriz utilizando listas.",
      "Uma forma comum é ter uma lista contendo outras listas.",
    ],
  },
  {
    id: 8,
    question:
      "Considere a matriz matriz = [[1, 2, 3], [4, 5, 6]]. Qual comando acessa o número 6?",
    options: ["matriz[0][2]", "matriz[1][2]", "matriz[2][1]", "matriz[1][3]"],
    answer: 1,
    hints: [
      "O número 6 está na segunda linha da matriz.",
      "Lembre-se de que os índices começam em zero.",
      "A segunda linha está no índice 1 e o terceiro elemento está no índice 2.",
    ],
  },
  {
    id: 9,
    question: "O que o comando break faz dentro de uma estrutura de repetição?",
    options: [
      "Reinicia o loop.",
      "Pula para a próxima repetição.",
      "Interrompe completamente o loop.",
      "Cria uma nova lista.",
    ],
    answer: 2,
    hints: [
      "break altera imediatamente o fluxo de um loop.",
      "Quando ele é executado, o loop deixa de continuar.",
      "Ele interrompe completamente a estrutura de repetição.",
    ],
  },
  {
    id: 10,
    question: "O que o comando continue faz?",
    options: [
      "Encerra o programa.",
      "Pula a repetição atual e passa para a próxima.",
      "Remove um elemento da lista.",
      "Cria uma função.",
    ],
    answer: 1,
    hints: [
      "continue também é utilizado dentro de loops.",
      "Ele não encerra completamente o loop.",
      "Ele faz o programa ignorar o restante da repetição atual.",
    ],
  },
  {
    id: 11,
    question: `Qual será o resultado do código?

\`python
numero = 1
while numero <= 3:
    print(numero)
    numero += 1
\``,
    options: [
      "0, 1, 2.",
      "1, 2, 3.",
      "1, 2, 3, 4.",
      "O código entra em loop infinito.",
    ],
    answer: 1,
    hints: [
      "A variável começa com o valor 1.",
      "A cada repetição, numero recebe mais 1.",
      "O loop continua enquanto numero for menor ou igual a 3.",
    ],
  },
  {
    id: 12,
    question: "Qual alternativa cria corretamente uma função em Python?",
    options: [
      "function soma():",
      "def soma():",
      "func soma():",
      "create soma():",
    ],
    answer: 1,
    hints: [
      "Python possui uma palavra-chave específica para declarar funções.",
      "Essa palavra-chave possui apenas três letras.",
      "A declaração começa com a palavra-chave def.",
    ],
  },
  {
    id: 13,
    question: "Para que serve o return em uma função?",
    options: [
      "Para repetir um código.",
      "Para criar uma lista.",
      "Para retornar um valor produzido pela função.",
      "Para iniciar um loop.",
    ],
    answer: 2,
    hints: [
      "return está relacionado ao resultado produzido por uma função.",
      "Ele pode enviar um valor de volta para quem chamou a função.",
      "Uma função pode utilizar return para devolver seu resultado.",
    ],
  },
  {
    id: 14,
    question: `Observe o código:

\`python
numeros = [2, 4, 6, 8]

for numero in numeros:
    if numero > 5:
        print(numero)
\`

Qual será o resultado?`,
    options: ["2, 4.", "4, 6.", "6, 8.", "2, 4, 6, 8."],
    answer: 2,
    hints: [
      "O código só imprime números que satisfazem uma condição.",
      "A condição exige que o número seja maior que 5.",
      "Na lista, os números maiores que 5 são 6 e 8.",
    ],
  },
  {
    id: 15,
    question: `Observe a função:

\`python
def calcular(lista):   
    total = 0    
    for numero in lista:       
        total += numero    
    return total
\`

Se executarmos calcular([2, 3, 5]), qual será o resultado?`,
    options: ["5.", "8.", "10.", "15."],
    answer: 2,
    hints: [
      "A variável total começa com o valor zero.",
      "A função percorre todos os números da lista e os soma.",
      "Calcule 2 + 3 + 5.",
    ],
  },

  {
    id: 16,
    question: `Considere a matriz:
\`python
matriz = [
    [2, 4, 6],
    [8, 10, 12],
    [14, 16, 18]
]
\`
Qual será o resultado de matriz[2][1]?`,
    options: ["8.", "10.", "14.", "16."],
    answer: 3,
    hints: [
      "O primeiro índice indica a linha e o segundo indica a coluna.",
      "Os índices começam em zero, então a terceira linha possui índice 2.",
      "Na terceira linha [14, 16, 18], o índice 1 corresponde ao número 16.",
    ],
  },

  {
    id: 17,
    question: `Observe o código:
\`python
matriz = [
    [1, 2, 3],
    [4, 5, 6]
]

soma = 0

for linha in matriz:
    for valor in linha:
        soma += valor

print(soma)
\`
Qual será o resultado?`,
    options: ["15.", "18.", "21.", "24."],
    answer: 2,
    hints: [
      "Existe um loop externo para percorrer as linhas e outro interno para percorrer os elementos.",
      "Todos os elementos da matriz são adicionados à variável soma.",
      "Calcule 1 + 2 + 3 + 4 + 5 + 6.",
    ],
  },

  {
    id: 18,
    question: `Considere a matriz:
\`python
matriz = [
    [3, 7, 2],
    [9, 4, 6],
    [5, 8, 1]
]
\`
Qual será o resultado do código?
\`python
soma = 0

for i in range(3):
    soma += matriz[i][0]

print(soma)
\``,
    options: ["12.", "17.", "19.", "25."],
    answer: 1,
    hints: [
      "O segundo índice é sempre 0, portanto o código acessa a primeira coluna.",
      "Os valores da primeira coluna são 3, 9 e 5.",
      "Some 3 + 9 + 5.",
    ],
  },

  {
    id: 19,
    question: `Observe a matriz:
\`python
matriz = [
    [2, 4, 6],
    [1, 3, 5],
    [7, 9, 11]
]
\`
Qual será o resultado do código?
\`python
soma = 0

for i in range(3):
    soma += matriz[1][i]

print(soma)
\``,
    options: ["6.", "9.", "12.", "15."],
    answer: 2,
    hints: [
      "O primeiro índice permanece sempre igual a 1.",
      "Isso significa que apenas a segunda linha está sendo percorrida.",
      "A segunda linha é [1, 3, 5].",
    ],
  },

  {
    id: 20,
    question: `Considere a matriz:
\`python
matriz = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
]
\`
Qual será o resultado do código?
\`python
soma = 0

for i in range(3):
    soma += matriz[i][i]

print(soma)
\``,
    options: ["12.", "15.", "18.", "21."],
    answer: 1,
    hints: [
      "O mesmo índice é utilizado para linha e coluna.",
      "Isso faz com que sejam acessados os elementos da diagonal principal.",
      "Os elementos são 1, 5 e 9. Some esses valores.",
    ],
  },

  {
    id: 21,
    question: `Considere a matriz:
\`python
matriz = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
]
\`
Qual será o resultado do código?
\`python
soma = 0

for i in range(3):
    soma += matriz[i][2 - i]

print(soma)
\``,
    options: ["9.", "12.", "15.", "18."],
    answer: 2,
    hints: [
      "O índice da coluna diminui enquanto o índice da linha aumenta.",
      "Os acessos são matriz[0][2], matriz[1][1] e matriz[2][0].",
      "Os valores acessados são 3, 5 e 7.",
    ],
  },

  {
    id: 22,
    question: `Qual será o resultado do código?
\`python
matriz = [
    [1, 2],
    [3, 4],
    [5, 6]
]

for i in range(3):
    print(matriz[i][1])
\``,
    options: ["1, 3, 5.", "2, 4, 6.", "1, 2, 3.", "3, 4, 5."],
    answer: 1,
    hints: [
      "O índice da coluna permanece sempre igual a 1.",
      "O código percorre as três linhas da matriz.",
      "O segundo elemento de cada linha é 2, 4 e 6.",
    ],
  },

  {
    id: 23,
    question: `Observe o código:
\`python
matriz = [
    [2, 4, 6],
    [1, 3, 5]
]

for i in range(2):
    for j in range(3):
        if matriz[i][j] % 2 == 0:
            print(matriz[i][j])
\`
Quais valores serão impressos?`,
    options: ["1, 3, 5.", "2, 4, 6.", "2, 6.", "4, 6."],
    answer: 1,
    hints: [
      "O operador % retorna o resto da divisão.",
      "Um número par possui resto 0 quando dividido por 2.",
      "Na matriz, os números pares são 2, 4 e 6.",
    ],
  },

  {
    id: 24,
    question: `Considere a matriz:
\`python
matriz = [
    [5, 2, 8],
    [1, 9, 3],
    [4, 6, 7]
]
\`
Qual será o valor armazenado em \`maior\` após a execução?
\`python
maior = matriz[0][0]

for linha in matriz:
    for valor in linha:
        if valor > maior:
            maior = valor
\``,
    options: ["5.", "8.", "9.", "7."],
    answer: 2,
    hints: [
      "A variável maior começa com o primeiro elemento da matriz.",
      "Sempre que um valor maior for encontrado, ele substitui o valor atual.",
      "O maior valor presente na matriz é 9.",
    ],
  },

  {
    id: 25,
    question: `Observe o código:
\`python
matriz = [
    [1, 2, 3],
    [4, 5, 6]
]

for i in range(2):
    for j in range(3):
        if matriz[i][j] > 3:
            matriz[i][j] = 0

print(matriz)
\`
Qual será o resultado?`,
    options: [
      "[[1, 2, 3], [0, 0, 0]].",
      "[[0, 0, 0], [4, 5, 6]].",
      "[[1, 2, 0], [0, 0, 0]].",
      "[[1, 2, 3], [4, 5, 0]].",
    ],
    answer: 0,
    hints: [
      "O código percorre todos os elementos da matriz.",
      "Todo valor maior que 3 é substituído por 0.",
      "Os valores 4, 5 e 6 serão substituídos por zero.",
    ],
  },

  {
    id: 26,
    question: `Considere:
\`python
matriz = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
]
\`
Qual será o resultado?
\`python
for i in range(3):
    for j in range(3):
        if i == j:
            print(matriz[i][j])
\``,
    options: ["1, 2, 3.", "3, 5, 7.", "1, 5, 9.", "7, 8, 9."],
    answer: 2,
    hints: [
      "A condição exige que o índice da linha seja igual ao índice da coluna.",
      "Isso identifica os elementos da diagonal principal.",
      "Os elementos da diagonal principal são 1, 5 e 9.",
    ],
  },

  {
    id: 27,
    question: `Observe o código:
\`python
matriz = [
    [1, 2],
    [3, 4]
]

for i in range(2):
    for j in range(2):
        matriz[i][j] *= 2

print(matriz)
\`
Qual será o resultado?`,
    options: [
      "[[1, 2], [3, 4]].",
      "[[2, 4], [6, 8]].",
      "[[2, 3], [4, 5]].",
      "[[1, 4], [9, 16]].",
    ],
    answer: 1,
    hints: [
      "O operador *= 2 multiplica cada elemento por 2.",
      "O loop percorre todas as posições da matriz.",
      "Cada valor deve ser multiplicado individualmente por 2.",
    ],
  },

  {
    id: 28,
    question: `Considere:
\`python
matriz = [
    [1, 2, 3],
    [4, 5, 6]
]

transposta = []

for j in range(3):
    linha = []
    for i in range(2):
        linha.append(matriz[i][j])
    transposta.append(linha)

print(transposta)
\`
Qual será o resultado?`,
    options: [
      "[[1, 2], [3, 4], [5, 6]].",
      "[[1, 4], [2, 5], [3, 6]].",
      "[[1, 2, 3], [4, 5, 6]].",
      "[[4, 1], [5, 2], [6, 3]].",
    ],
    answer: 1,
    hints: [
      "O código troca a forma como linhas e colunas são percorridas.",
      "A primeira coluna da matriz original se torna a primeira linha da nova matriz.",
      "As colunas [1, 4], [2, 5] e [3, 6] formam a matriz transposta.",
    ],
  },

  {
    id: 29,
    question: `Considere a matriz:
\`python
matriz = [
    [2, 5, 1],
    [7, 3, 4],
    [6, 8, 9]
]
\`
Qual será o resultado do código?
\`python
resultado = 0

for i in range(3):
    if matriz[i][i] % 2 == 1:
        resultado += matriz[i][i]

print(resultado)
\``,
    options: ["5.", "9.", "14.", "17."],
    answer: 1,
    hints: [
      "Primeiro, observe apenas os elementos da diagonal principal.",
      "A diagonal principal contém 2, 3 e 9.",
      "Apenas os valores ímpares são somados: 3 + 9.",
    ],
  },

  {
    id: 30,
    question: `Observe o código:
\`python
matriz = [
    [2, 4, 6],
    [1, 3, 5],
    [7, 9, 11]
]

contador = 0

for i in range(3):
    for j in range(3):
        if matriz[i][j] > 5 and matriz[i][j] % 2 == 1:
            contador += 1

print(contador)
\`
Qual será o resultado?`,
    options: ["2.", "3.", "4.", "5."],
    answer: 2,
    hints: [
      "O elemento precisa satisfazer duas condições ao mesmo tempo.",
      "Ele deve ser maior que 5 e também ser ímpar.",
      "Os valores que satisfazem as duas condições são 7, 9 e 11.",
    ],
  },
];

function App() {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [nome, setNome] = useState("");
  const [startGame, setStartGame] = useState(false);
  const [timeLeft, setTimeLeft] = useState(5 * 60);
  const [ranking, setRanking] = useState(false);
  const [about,setAbout] = useState(false)
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const [gameFinished, setGameFinished] = useState(false);
  const finishingGameRef = useRef(false);
  const formattedTime = `${String(minutes).padStart(2, "0")}:${String(
    seconds,
  ).padStart(2, "0")}`;
  const finishGame = useCallback(
    async (finalScore: number) => {
      // Impede que o jogo seja finalizado mais de uma vez.
      if (finishingGameRef.current) {
        return;
      }

      // A trava acontece imediatamente.
      finishingGameRef.current = true;

      setGameFinished(true);

      try {
        await sendStats({
          nome: nome || "Anônimo",
          pontuacao: finalScore,
        });
      } catch (error) {
        console.error(error);
      }

      setCurrent(questions.length);
    },
    [nome],
  );

  // Quantas dicas foram utilizadas na pergunta atual
  const [hintsUsed, setHintsUsed] = useState(0);
  useEffect(() => {
    if (!startGame || !nome || nome.length < 3) {
      return;
    }

    if (current >= questions.length || gameFinished) {
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);

          finishGame(score);

          return 0;
        }

        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [startGame, nome, current, gameFinished, score, finishGame]);

  const question = questions[current];
  const nextQuestion = async () => {
    const isLastQuestion = current === questions.length - 1;

    // Verifica se a resposta atual está correta
    const isCurrentAnswerCorrect = selected === question.answer;

    // Como setScore é assíncrono, calculamos explicitamente
    // a pontuação que deverá ser enviada.
    const finalScore = isCurrentAnswerCorrect ? score + questionValue : score;

    if (isLastQuestion) {
      await finishGame(finalScore);
      return;
    }

    setSelected(null);
    setHintsUsed(0);
    setCurrent((prev) => prev + 1);
  };

  const progress = useMemo(
    () => ((current + 1) / questions.length) * 100,
    [current],
  );

  /**
   * Cada dica reduz pela metade o valor da pergunta.
   *
   * 0 dicas = 1 ponto
   * 1 dica  = 0.5 ponto
   * 2 dicas = 0.25 ponto
   * 3 dicas = 0.125 ponto
   */
  const questionValue = 1 / Math.pow(2, hintsUsed);

  const handleHint = () => {
    // Não permite mais de 3 dicas
    if (hintsUsed >= 3) return;

    // Não permite pedir dica depois de responder
    if (selected !== null) return;

    setHintsUsed((prev) => prev + 1);
  };

  const handleSelect = (index: number) => {
    if (selected !== null) return;

    setSelected(index);

    if (index === question.answer) {
      setScore((prev) => prev + questionValue);
    }
  };
  if(about) return <AboutPage onBack={() => setAbout(false)}/>
  if (ranking) return <RankingPage onBack={() => setRanking(false)} />;
  if (!startGame)
    return (
      <LandingPage
        handleOnClick={() => setStartGame(true)}
        handleOnClickRanking={() => setRanking(true)}
        handleOnClickAbout={() => setAbout(true)}
      />
    );

  if (!nome || nome.length < 3)
    return (
      <InfoName
        handleOnClick={(nomeDigitado) => setNome(nomeDigitado.trim())}
      />
    );

  if (current >= questions.length) {
    return (
      <CenteredContainer maxWidth="sm">
        <Card elevation={4}>
          <CardContent sx={{ textAlign: "center", py: 5 }}>
            <Typography variant="h5" color="primary" gutterBottom>
              Parabéns, {nome}!
            </Typography>

            <Typography sx={{mb:2}} variant="h6">
              Você fez {score.toFixed(3)} de {questions.length.toFixed(3)}{" "}
              pontos
            </Typography>
            <Button variant="contained" onClick={() => setRanking(true)}>Ver Ranking</Button>
          </CardContent>
        </Card>
      </CenteredContainer>
    );
  }
  return (
    <CenteredContainer maxWidth="md">
      <Box
        sx={{
          width: "100%",
          px: {
            xs: 1,
            sm: 2,
            md: 0,
          },
          py: {
            xs: 1,
            sm: 2,
          },
        }}
      >
        {/* Barra de progresso */}
        <LinearProgress
          variant="determinate"
          value={progress}
          sx={{
            mb: {
              xs: 2,
              sm: 3,
              md: 4,
            },
            height: {
              xs: 7,
              sm: 9,
              md: 10,
            },
            borderRadius: 5,
          }}
        />
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            mb: {
              xs: 1.5,
              sm: 2,
            },
          }}
        >
          <Typography
            variant="h6"
            color={timeLeft <= 60 ? "error" : "secondary"}
            sx={{
              fontWeight: 700,
              fontVariantNumeric: "tabular-nums",
              fontSize: {
                xs: "1.1rem",
                sm: "1.25rem",
              },
            }}
          >
            ⏱ {formattedTime}
          </Typography>
        </Box>

        {/* Dica atual */}
        {hintsUsed > 0 && (
          <Card
            elevation={2}
            sx={{
              width: "100%",
              mb: {
                xs: 2,
                sm: 3,
              },
              borderLeft: {
                xs: "4px solid",
                sm: "5px solid",
              },
              borderColor: "warning.main",
              backgroundColor: "warning.50",
              borderRadius: 2,
            }}
          >
            <CardContent
              sx={{
                py: {
                  xs: 1.5,
                  sm: 2,
                },
                px: {
                  xs: 1.75,
                  sm: 2,
                },
                "&:last-child": {
                  pb: {
                    xs: 1.5,
                    sm: 2,
                  },
                },
              }}
            >
              <Typography
                variant="subtitle2"
                color="warning.dark"
                sx={{
                  mb: 0.5,
                  fontSize: {
                    xs: "0.8rem",
                    sm: "0.875rem",
                  },
                }}
              >
                Dica {hintsUsed} de 3
              </Typography>

              <Typography
                variant="body1"
                sx={{
                  fontSize: {
                    xs: "0.9rem",
                    sm: "1rem",
                  },
                  lineHeight: 1.5,
                  overflowWrap: "anywhere",
                }}
              >
                {question.hints[hintsUsed - 1]}
              </Typography>
            </CardContent>
          </Card>
        )}

        {/* Botão de dica */}
        {selected === null && hintsUsed < 3 && (
          <Box
            sx={{
              mb: {
                xs: 2,
                sm: 3,
              },
            }}
          >
            <Button
              variant="outlined"
              color="warning"
              onClick={handleHint}
              fullWidth
              size="large"
              sx={{
                minHeight: {
                  xs: 48,
                  sm: 52,
                },
                fontSize: {
                  xs: "0.9rem",
                  sm: "1rem",
                },
                borderRadius: 2,
              }}
            >
              💡 Usar dica ({3 - hintsUsed} restantes)
            </Button>

            <Typography
              variant="caption"
              color="text.secondary"
              sx={{
                display: "block",
                textAlign: "center",
                mt: 0.75,
                px: 1,
                fontSize: {
                  xs: "0.7rem",
                  sm: "0.75rem",
                },
              }}
            >
              Cada dica reduz o valor desta pergunta pela metade.
            </Typography>
          </Box>
        )}

        {/* Card da pergunta */}
        <Card
          elevation={4}
          sx={{
            width: "100%",
            borderRadius: {
              xs: 2,
              sm: 2,
            },
          }}
        >
          <CardContent
            sx={{
              p: {
                xs: 2,
                sm: 3,
                md: 4,
              },
              "&:last-child": {
                pb: {
                  xs: 2,
                  sm: 3,
                  md: 4,
                },
              },
            }}
          >
            {/* Valor da pergunta */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                mb: {
                  xs: 1.5,
                  sm: 2,
                },
              }}
            >
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  fontSize: {
                    xs: "0.75rem",
                    sm: "0.875rem",
                  },
                  textAlign: "right",
                }}
              >
                Valor:{" "}
                <strong>
                  {questionValue.toFixed(3)}{" "}
                  {questionValue === 1 ? "ponto" : "pontos"}
                </strong>
              </Typography>
            </Box>

            {/* Texto da pergunta */}
            <Box
              sx={{
                mb: {
                  xs: 2.5,
                  sm: 3,
                },

                // Evita que código ou palavras muito grandes
                // estourem a largura do celular.
                overflowWrap: "anywhere",
                wordBreak: "break-word",

                "& pre": {
                  maxWidth: "100%",
                  overflowX: "auto",
                  WebkitOverflowScrolling: "touch",
                  borderRadius: 1,
                },

                "& code": {
                  overflowWrap: "break-word",
                },
              }}
            >
              <QuestionText text={question.question} />
            </Box>

            {/* Alternativas */}
            <Stack
              spacing={{
                xs: 1.25,
                sm: 1.5,
                md: 2,
              }}
            >
              {question.options.map((option, index) => {
                const isCorrect = index === question.answer;
                const isSelected = selected === index;

                let color: "primary" | "success" | "error" | "inherit" =
                  "primary";

                if (selected !== null) {
                  if (isCorrect) color = "success";
                  else if (isSelected) color = "error";
                }

                return (
                  <Button
                    key={option}
                    fullWidth
                    size="large"
                    variant={isSelected ? "contained" : "outlined"}
                    color={color}
                    onClick={() => handleSelect(index)}
                    sx={{
                      justifyContent: "flex-start",
                      alignItems: "center",

                      // Área mínima confortável para toque.
                      minHeight: {
                        xs: 54,
                        sm: 56,
                      },

                      px: {
                        xs: 1.5,
                        sm: 2,
                      },

                      py: {
                        xs: 1.25,
                        sm: 1.5,
                      },

                      fontSize: {
                        xs: "0.9rem",
                        sm: "1rem",
                      },

                      lineHeight: 1.4,
                      textAlign: "left",
                      textTransform: "none",

                      borderRadius: 2,

                      // Permite que textos longos quebrem
                      // corretamente no celular.
                      whiteSpace: "normal",
                      overflowWrap: "anywhere",
                      wordBreak: "break-word",
                    }}
                  >
                    {option}
                  </Button>
                );
              })}
            </Stack>

            {/* Botão próxima pergunta */}
            {selected !== null && (
              <Box
                sx={{
                  mt: {
                    xs: 2.5,
                    sm: 3,
                    md: 4,
                  },
                  display: "flex",

                  // No celular ocupa toda a largura.
                  justifyContent: {
                    xs: "stretch",
                    sm: "flex-end",
                  },
                }}
              >
                <Button
                  variant="contained"
                  onClick={nextQuestion}
                  size="large"
                  fullWidth
                  sx={{
                    minHeight: {
                      xs: 50,
                      sm: 52,
                    },
                    fontSize: {
                      xs: "0.95rem",
                      sm: "1rem",
                    },
                    borderRadius: 2,
                  }}
                >
                  {current === questions.length - 1
                    ? "Finalizar"
                    : "Próxima pergunta"}
                </Button>
              </Box>
            )}
          </CardContent>
        </Card>
      </Box>
    </CenteredContainer>
  );
}

export default App;
