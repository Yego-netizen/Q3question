import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Divider,
  Stack,
  Typography,
} from "@mui/material";

import ArticleIcon from "@mui/icons-material/Article";
import SchoolIcon from "@mui/icons-material/School";
import PsychologyIcon from "@mui/icons-material/Psychology";
import ScienceIcon from "@mui/icons-material/Science";
import InsightsIcon from "@mui/icons-material/Insights";

export default function AboutPage({onBack}: {onBack: () => void }) {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "background.default",
        py: { xs: 3, sm: 5, md: 7 },
      }}
    >
      <Container
        maxWidth="md"
        sx={{
          px: { xs: 2, sm: 3 },
        }}
      >
        {/* Cabeçalho */}
        <Box
          sx={{
            textAlign: "center",
            mb: { xs: 4, sm: 6 },
          }}
        >
          <ArticleIcon
            color="primary"
            sx={{
              fontSize: { xs: 48, sm: 60 },
              mb: 1,
            }}
          />

          <Typography
            variant="h4"
            color="primary"
            sx={{
              fontWeight: 800,
              fontSize: {
                xs: "1.8rem",
                sm: "2.2rem",
                md: "2.5rem",
              },
              lineHeight: 1.2,
            }}
          >
            Sobre a Pesquisa
          </Typography>

          <Typography
            color="text.secondary"
            sx={{
              mt: 1,
              fontSize: {
                xs: "0.95rem",
                sm: "1.05rem",
              },
              lineHeight: 1.5,
            }}
          >
            Conheça a pesquisa científica que serviu como base para o
            desenvolvimento do quiz.
          </Typography>
        </Box>

        <Stack spacing={{ xs: 2, sm: 3 }}>
          {/* Artigo */}
          <ResearchSection
            icon={<ArticleIcon />}
            title="Sobre a pesquisa base do quiz"
          >
            <Typography
              color="text.primary"
              sx={{
                fontWeight: 700,
                fontSize: { xs: "1rem", sm: "1.1rem" },
                lineHeight: 1.5,
              }}
            >
              DE JULI, M. C.; OLIVEIRA, W.; NASCIMENTO, I. M. do; ISOTANI, S.
              Eles Percebem o que Queremos? Um Estudo Sobre a Percepção dos
              Estudantes em um Sistema Educacional Gamificado. Revista
              Brasileira de Informática na Educação, [S. l.], v. 31, p. 529–552,
              2023. DOI: 10.5753/rbie.2023.3118. Disponível em:
              https://journals-sol.sbc.org.br/index.php/rbie/article/view/3118.
              Acesso em: 9 ago. 2026.
            </Typography>
          </ResearchSection>

          {/* Autores */}
          <ResearchSection icon={<SchoolIcon />} title="Autores e instituições">
            <ResearchText>
              O artigo foi escrito pelos pesquisadores Marcelo Camargo de Juli,
              Wilk Oliveira, Isabelle Melo do Nascimento e Seiji Isotani.
            </ResearchText>

            <ResearchText>
              Os autores são vinculados, respectivamente, ao Centro Universitário Internacional, Tampere University, UFPB e Harvard Graduate School of Education 
            </ResearchText>
          </ResearchSection>

          {/* Publicação */}
          <ResearchSection
            icon={<ArticleIcon />}
            title="Data e local de publicação"
          >
            <ResearchText>
              O trabalho foi publicado no ano de 2023 na Revista Brasileira de
              Informática na Educação (RBIE), volume 31, páginas 529 a 552.
            </ResearchText>

            <ResearchText>
              A RBIE é o principal periódico científico do Brasil voltado para o
              estudo de tecnologias aplicadas ao ensino, mantido pela Sociedade
              Brasileira de Computação (SBC).
            </ResearchText>
          </ResearchSection>

          {/* Introdução */}
          <ResearchSection
            icon={<PsychologyIcon />}
            title="Introdução e contextualização"
          >
            <ResearchText>
              A utilização de elementos de jogos na educação (gamificação) tem
              sido amplamente adotada para aumentar o engajamento e o interesse
              dos estudantes.
            </ResearchText>

            <ResearchText>
              No entanto, grande parte das aplicações assume que todos os alunos
              reagem da mesma forma aos elementos implementados. O artigo parte
              do problema de que nem sempre a intenção pedagógica do professor
              ou do designer do sistema corresponde à forma como o estudante
              realmente percebe e vivencia essa experiência digital.
            </ResearchText>
          </ResearchSection>

          {/* Objetivos */}
          <ResearchSection
            icon={<InsightsIcon />}
            title="Objetivos do trabalho"
          >
            <ResearchText>
              O principal objetivo da pesquisa foi investigar e compreender a
              percepção real dos estudantes em um ambiente educacional
              gamificado ao longo do tempo.
            </ResearchText>

            <ResearchText>
              O estudo buscou identificar como os alunos interpretam os
              elementos de jogos presentes na plataforma e quais são os efeitos
              psicológicos e comportamentais gerados por essa dinâmica no
              processo de aprendizagem.
            </ResearchText>
          </ResearchSection>

          {/* Metodologia */}
          <ResearchSection
            icon={<ScienceIcon />}
            title="Metodologia e caminho da pesquisa"
          >
            <ResearchText>
              Para responder a essas questões, os pesquisadores realizaram um
              estudo empírico e longitudinal acompanhando estudantes durante um
              período de 23 meses.
            </ResearchText>

            <ResearchText>
              A investigação utilizou uma abordagem mista, qualitativa e
              quantitativa, combinando a coleta de dados de acesso e interação
              na plataforma virtual com questionários e análises detalhadas da
              experiência e das opiniões relatadas pelos próprios alunos ao
              longo dos semestres.
            </ResearchText>
          </ResearchSection>

          {/* Fundamentação */}
          <ResearchSection
            icon={<PsychologyIcon />}
            title="Fundamentação teórica"
          >
            <ResearchText>
              A base teórica do artigo fundamenta-se na distinção crucial entre{" "}
              <Box
                component="span"
                sx={{
                  fontWeight: 700,
                  color: "primary.main",
                }}
              >
                Gamificação Implementada
              </Box>{" "}
              — os elementos e regras de jogos configurados no software — e{" "}
              <Box
                component="span"
                sx={{
                  fontWeight: 700,
                  color: "primary.main",
                }}
              >
                Gamificação Percebida
              </Box>{" "}
              — a interpretação, o valor e o significado que o aluno atribui a
              esses elementos.
            </ResearchText>

            <ResearchText>
              O referencial teórico também aborda teorias da motivação e do
              design instrucional, destacando que a motivação humana varia
              conforme o perfil do usuário.
            </ResearchText>

            <ResearchText>
              Dessa forma, torna-se essencial analisar os impactos psicológicos,
              como satisfação e percepção de progresso, e comportamentais, como
              frequência de estudo e cumprimento de prazos.
            </ResearchText>
          </ResearchSection>

          {/* Resultados */}
          <ResearchSection
            icon={<InsightsIcon />}
            title="Resultados alcançados e considerações finais"
          >
            <ResearchText>
              Os resultados do estudo demonstraram que a percepção dos alunos
              sobre a gamificação é altamente heterogênea. Ou seja, diferentes
              estudantes reagem de formas distintas aos mesmos elementos de
              jogos.
            </ResearchText>

            <ResearchText>
              Por outro lado, a pesquisa comprovou que uma gamificação bem
              percebida gera efeitos psicológicos altamente positivos,
              aumentando a sensação de evolução no curso, e melhora o
              comportamento acadêmico, resultando em maior constância de
              estudos.
            </ResearchText>

            <ResearchText>
              Como consideração final, os autores concluem que os ecossistemas
              educacionais não devem adotar modelos padronizados, mas sim focar
              na personalização e no acompanhamento contínuo da percepção dos
              estudantes para garantir o sucesso pedagógico.
            </ResearchText>
          </ResearchSection>

          {/* Relação com o projeto */}
          <Card
            elevation={0}
            sx={{
              borderRadius: { xs: 2, sm: 3 },
              border: "1px solid",
              borderColor: "primary.light",
              bgcolor: "primary.50",
            }}
          >
            <CardContent
              sx={{
                p: { xs: 2, sm: 3 },
                "&:last-child": {
                  pb: { xs: 2, sm: 3 },
                },
              }}
            >
              <Typography
                color="primary"
                sx={{
                  fontWeight: 800,
                  fontSize: {
                    xs: "1rem",
                    sm: "1.1rem",
                  },
                  mb: 1,
                }}
              >
                Por que essa pesquisa é importante para o quiz?
              </Typography>

              <Typography
                color="text.secondary"
                sx={{
                  fontSize: {
                    xs: "0.9rem",
                    sm: "0.98rem",
                  },
                  lineHeight: 1.6,
                }}
              >
                A pesquisa reforça a importância de compreender como os
                estudantes percebem os elementos de gamificação, e não apenas
                como eles são planejados ou implementados. O quiz utiliza essa
                perspectiva como base para criar uma experiência de aprendizagem
                que valoriza progresso, interação e acompanhamento da
                experiência dos estudantes.
              </Typography>
            </CardContent>
          </Card>

          {/* Referência */}
          <Box
            sx={{
              pt: 1,
              pb: 2,
            }}
          >
            <Divider sx={{ mb: 2 }} />

            <Typography
              color="text.secondary"
              align="center"
              sx={{
                mb: 2,
                fontSize: {
                  xs: "0.75rem",
                  sm: "0.85rem",
                },
                lineHeight: 1.5,
              }}
            >
              Pesquisa utilizada como referência para a concepção da experiência
              gamificada deste projeto.
            </Typography>
            <Button variant="contained" onClick={() => onBack()}>← Voltar</Button>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}

/* -------------------------------------------------------
   COMPONENTES AUXILIARES
------------------------------------------------------- */

type ResearchSectionProps = {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
};

function ResearchSection({ icon, title, children }: ResearchSectionProps) {
  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: { xs: 2, sm: 3 },
        border: "1px solid",
        borderColor: "divider",
        bgcolor: "background.paper",
      }}
    >
      <CardContent
        sx={{
          p: { xs: 2, sm: 3 },
          "&:last-child": {
            pb: { xs: 2, sm: 3 },
          },
        }}
      >
        <Stack
          direction="row"
          spacing={1.2}
          sx={{
            alignItems: "center",
            mb: { xs: 1.5, sm: 2 },
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "primary.main",
              "& svg": {
                fontSize: { xs: 24, sm: 28 },
              },
            }}
          >
            {icon}
          </Box>

          <Typography
            color="primary"
            sx={{
              fontWeight: 800,
              fontSize: {
                xs: "1.05rem",
                sm: "1.2rem",
              },
              lineHeight: 1.3,
            }}
          >
            {title}
          </Typography>
        </Stack>

        {children}
      </CardContent>
    </Card>
  );
}

type ResearchTextProps = {
  children: React.ReactNode;
};

function ResearchText({ children }: ResearchTextProps) {
  return (
    <Typography
      color="text.secondary"
      sx={{
        fontSize: {
          xs: "0.9rem",
          sm: "0.98rem",
        },
        lineHeight: {
          xs: 1.6,
          sm: 1.7,
        },
        mb: 1.5,
        "&:last-child": {
          mb: 0,
        },
      }}
    >
      {children}
    </Typography>
  );
}
