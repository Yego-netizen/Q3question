import { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  LinearProgress,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { sendFeedback } from "../services/stats.service";

type Question = {
  id: number;
  question: string;
  description?: string;
  placeholder?: string;
};

const questions: Question[] = [
  {
    id: 1,
    question:
      "Ao utilizar o site, quais elementos, recursos ou características da interface mais chamaram a sua atenção? Explique o que você percebeu.",
    description:
      "Considere elementos visuais, funcionalidades, interações, recompensas, indicadores de progresso ou outros recursos que tenham se destacado durante o uso.",
    placeholder:
      "Descreva os elementos ou recursos que mais chamaram sua atenção...",
  },
  {
    id: 2,
    question:
      "Como você interpretou o propósito dos elementos e recursos apresentados pelo site durante a sua experiência de uso?",
    description:
      "Explique o que você entendeu sobre a função desses elementos e como eles influenciaram sua percepção sobre o site.",
    placeholder:
      "Conte o que você entendeu sobre os recursos e elementos do site...",
  },
  {
    id: 3,
    question:
      "De que maneira os recursos presentes no site influenciaram sua motivação, interesse ou vontade de continuar utilizando-o?",
    description:
      "Você pode mencionar situações em que esses recursos aumentaram, diminuíram ou não alteraram seu interesse em continuar utilizando o site.",
    placeholder: "Descreva como sua motivação ou interesse foi afetado...",
  },
  {
    id: 4,
    question:
      "De que maneira a experiência proporcionada pelo site influenciou a forma como você realizou suas atividades ou interagiu com o sistema?",
    description:
      "Considere mudanças no seu comportamento, na frequência de uso, no esforço empregado, na exploração das funcionalidades ou na forma como você realizou as atividades.",
    placeholder:
      "Descreva alguma mudança no seu comportamento ou na forma de utilização...",
  },
  {
    id: 5,
    question:
      "Gostaria de deixar algum comentário ou feedback sobre sua experiência com o site?",
    description:
      "Escreva livremente qualquer opinião, sugestão, crítica ou observação que considere relevante.",
    placeholder: "Digite seu feedback...",
  },
];

export default function UserExperienceForm({ nome }: { nome: string }) {
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<number, boolean>>({});

  const answeredQuestions = questions.filter((question) =>
    answers[question.id]?.trim(),
  ).length;

  const progress = (answeredQuestions / questions.length) * 100;

  const handleChange = (questionId: number, value: string) => {
    setAnswers((previous) => ({
      ...previous,
      [questionId]: value,
    }));

    if (value.trim()) {
      setErrors((previous) => ({
        ...previous,
        [questionId]: false,
      }));
    }
  };

  if (submitted) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          bgcolor: "#f5f7fb",
          py: {
            xs: 3,
            sm: 5,
            md: 8,
          },
        }}
      >
        <Container
          maxWidth="md"
          sx={{
            px: {
              xs: 1.5,
              sm: 3,
            },
          }}
        >
          <Card
            elevation={4}
            sx={{
              width: "100%",
              borderRadius: {
                xs: 2,
                sm: 2,
              },
              borderTop: "6px solid",
              borderColor: "primary.main",
            }}
          >
            <CardContent
              sx={{
                p: {
                  xs: 3,
                  sm: 5,
                  md: 6,
                },
                textAlign: "center",
              }}
            >
              <Typography
                variant="h5"
                component="h1"
                sx={{ fontWeight: 600 }}
                gutterBottom
              >
                Obrigado pela sua participação!
              </Typography>

              <Typography
                variant="body1"
                color="text.secondary"
                sx={{
                  mt: 1,
                  lineHeight: 1.7,
                }}
              >
                Suas respostas foram registradas e contribuirão para a avaliação
                da experiência de uso do site.
              </Typography>
            </CardContent>
          </Card>
        </Container>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#f5f7fb",
        py: {
          xs: 2,
          sm: 4,
          md: 6,
        },
      }}
    >
      <Container
        maxWidth="md"
        sx={{
          px: {
            xs: 1.25,
            sm: 3,
          },
        }}
      >
        <form
          onSubmit={async (event) => {
            event.preventDefault();

            const newErrors: Record<number, boolean> = {};

            questions.forEach((question) => {
              if (!answers[question.id]?.trim()) {
                newErrors[question.id] = true;
              }
            });

            setErrors(newErrors);

            if (Object.keys(newErrors).length > 0) {
              const firstError = questions.find(
                (question) => newErrors[question.id],
              );

              if (firstError) {
                document
                  .getElementById(`question-${firstError.id}`)
                  ?.scrollIntoView({
                    behavior: "smooth",
                    block: "center",
                  });
              }

              return;
            }
            const feedback = {
              nome,
              percepcao: answers[1],
              interpretacao: answers[2],
              efeitoPsicologico: answers[3],
              efeitoComportamental: answers[4],
              feedbackLivre: answers[5],
            };

            await sendFeedback(feedback);

            

            setSubmitted(true);
          }}
        >
          {/* Cabeçalho */}
          <Card
            elevation={4}
            sx={{
              mb: {
                xs: 1.5,
                sm: 2,
              },
              borderRadius: {
                xs: 2,
                sm: 2,
              },
              borderTop: "7px solid",
              borderColor: "primary.main",
            }}
          >
            <CardContent
              sx={{
                p: {
                  xs: 2.5,
                  sm: 3,
                  md: 4,
                },
                "&:last-child": {
                  pb: {
                    xs: 2.5,
                    sm: 3,
                    md: 4,
                  },
                },
              }}
            >
              <Typography
                component="h1"
                variant="h4"
                sx={{
                  fontSize: {
                    xs: "1.45rem",
                    sm: "1.75rem",
                    md: "2.125rem",
                  },
                  fontWeight: 600,
                  mb: 1.5,
                  overflowWrap: "anywhere",
                }}
              >
                Avaliação da experiência de uso
              </Typography>

              <Typography
                variant="body1"
                color="text.secondary"
                sx={{
                  fontSize: {
                    xs: "0.9rem",
                    sm: "1rem",
                  },
                  lineHeight: 1.7,
                }}
              >
                Queremos conhecer sua experiência durante a utilização do site.
                Responda às perguntas com suas próprias palavras. Não existem
                respostas certas ou erradas.
              </Typography>

              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  mt: 2,
                  fontSize: {
                    xs: "0.8rem",
                    sm: "0.875rem",
                  },
                }}
              >
                Todas as perguntas são abertas e levam em consideração sua
                percepção e experiência durante o uso.
              </Typography>
            </CardContent>
          </Card>

          {/* Barra de progresso */}
          <Card
            elevation={2}
            sx={{
              mb: {
                xs: 1.5,
                sm: 2,
              },
              borderRadius: 2,
            }}
          >
            <CardContent
              sx={{
                p: {
                  xs: 2,
                  sm: 2.5,
                },
                "&:last-child": {
                  pb: {
                    xs: 2,
                    sm: 2.5,
                  },
                },
              }}
            >
              <Stack
                direction="row"
                sx={{
                  mb: 1,
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ fontWeight: 500 }}
                >
                  Progresso
                </Typography>

                <Typography variant="body2" color="text.secondary">
                  {answeredQuestions} de {questions.length}
                </Typography>
              </Stack>

              <LinearProgress
                variant="determinate"
                value={progress}
                sx={{
                  height: 7,
                  borderRadius: 5,
                }}
              />
            </CardContent>
          </Card>

          {/* Perguntas */}
          <Stack
            spacing={{
              xs: 1.5,
              sm: 2,
            }}
          >
            {questions.map((question, index) => {
              const hasError = errors[question.id];

              return (
                <Card
                  key={question.id}
                  id={`question-${question.id}`}
                  elevation={3}
                  sx={{
                    width: "100%",
                    borderRadius: {
                      xs: 2,
                      sm: 2,
                    },
                    border: hasError ? "1px solid" : "1px solid transparent",
                    borderColor: hasError ? "error.main" : "transparent",
                    transition: "border-color 0.2s ease",
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
                    {/* Número da pergunta */}
                    <Typography
                      variant="body2"
                      color="primary.main"
                      sx={{
                        fontWeight: 600,
                        mb: {
                          xs: 1,
                          sm: 1.25,
                        },
                        fontSize: {
                          xs: "0.75rem",
                          sm: "0.875rem",
                        },
                      }}
                    >
                      Pergunta {index + 1} de {questions.length}
                    </Typography>

                    {/* Texto da pergunta */}
                    <Box
                      sx={{
                        mb: {
                          xs: 1.5,
                          sm: 2,
                        },

                        overflowWrap: "anywhere",
                        wordBreak: "break-word",
                      }}
                    >
                      <Typography
                        component="h2"
                        variant="h6"
                        sx={{
                          fontSize: {
                            xs: "1rem",
                            sm: "1.15rem",
                          },
                          lineHeight: 1.5,
                          fontWeight: 500,
                        }}
                      >
                        {question.question}
                      </Typography>
                    </Box>

                    {/* Descrição da pergunta */}
                    {question.description && (
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                          mb: {
                            xs: 2,
                            sm: 2.5,
                          },
                          lineHeight: 1.6,
                          fontSize: {
                            xs: "0.8rem",
                            sm: "0.875rem",
                          },
                        }}
                      >
                        {question.description}
                      </Typography>
                    )}

                    {/* Resposta aberta */}
                    <TextField
                      fullWidth
                      multiline
                      minRows={5}
                      maxRows={12}
                      variant="outlined"
                      label="Sua resposta"
                      placeholder={question.placeholder}
                      value={answers[question.id] ?? ""}
                      onChange={(event) =>
                        handleChange(question.id, event.target.value)
                      }
                      error={hasError}
                      helperText={
                        hasError
                          ? "Por favor, escreva uma resposta antes de continuar."
                          : `${answers[question.id]?.length ?? 0} caracteres`
                      }
                      slotProps={{
                        input: {
                          sx: {
                            fontSize: {
                              xs: "0.9rem",
                              sm: "1rem",
                            },
                            lineHeight: 1.6,
                          },
                        },
                        inputLabel: {
                          sx: {
                            fontSize: {
                              xs: "0.9rem",
                              sm: "1rem",
                            },
                          },
                        },
                      }}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: 2,
                          alignItems: "flex-start",
                        },
                        "& textarea": {
                          overflowWrap: "anywhere",
                          wordBreak: "break-word",
                        },
                      }}
                    />
                  </CardContent>
                </Card>
              );
            })}
          </Stack>

          {/* Área de envio */}
          <Card
            elevation={2}
            sx={{
              mt: {
                xs: 1.5,
                sm: 2,
              },
              borderRadius: 2,
            }}
          >
            <CardContent
              sx={{
                p: {
                  xs: 2,
                  sm: 3,
                },
                "&:last-child": {
                  pb: {
                    xs: 2,
                    sm: 3,
                  },
                },
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: {
                    xs: "column",
                    sm: "row",
                  },
                  justifyContent: "space-between",
                  alignItems: {
                    xs: "stretch",
                    sm: "center",
                  },
                  gap: 2,
                }}
              >
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    lineHeight: 1.5,
                  }}
                >
                  Ao enviar, suas respostas serão registradas para análise da
                  experiência de uso.
                </Typography>

                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  sx={{
                    minHeight: {
                      xs: 50,
                      sm: 52,
                    },
                    minWidth: {
                      xs: "100%",
                      sm: 150,
                    },
                    borderRadius: 2,
                    textTransform: "none",
                    fontSize: {
                      xs: "0.95rem",
                      sm: "1rem",
                    },
                    flexShrink: 0,
                  }}
                >
                  Enviar respostas
                </Button>
              </Box>
            </CardContent>
          </Card>
        </form>
      </Container>
    </Box>
  );
}
