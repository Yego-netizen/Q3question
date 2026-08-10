import {
  AppBar,
  Box,
  Button,
  Container,
  Grid,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";

import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";

export default function LandingPage({
  handleOnClick,
  handleOnClickRanking,
  handleOnClickAbout,
}: {
  handleOnClick: () => void;
  handleOnClickRanking: () => void;
  handleOnClickAbout: () => void;
}) {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "background.default",
      }}
    >
      {/* Navbar */}
      <AppBar
        elevation={0}
        position="sticky"
        sx={{
          bgcolor: "background.paper",
          color: "text.primary",
          borderBottom: "1px solid",
          borderColor: "grey.200",
        }}
      >
        <Toolbar
          sx={{
            flexDirection: {
              xs: "column",
              md: "row",
            },
            alignItems: "center",
            py: {
              xs: 2,
              md: 1,
            },
            gap: {
              xs: 1,
              md: 0,
            },
          }}
        >
          <Typography
            variant="h3"
            color="primary"
            sx={{
              fontWeight: 700,

              flex: 1,
            }}
          >
            Q???
          </Typography>

          <Stack
            direction={{
              xs: "column",
              md: "row",
            }}
            spacing={1}
            sx={{
              alignItems: "center",
            }}
          >
            <Button color="inherit" onClick={() => handleOnClickRanking()}>
              Ranking
            </Button>
          </Stack>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg">
        <Grid
          container
          spacing={8}
          sx={{
            minHeight: "80vh",
            py: {
              xs: 6,
              md: 10,
            },
            alignItems: "center",
          }}
        >
          <Grid size={{ xs: 12, md: 10 }}>
            <Typography
              variant="h4"
              color="text.primary"
              align="center"
              sx={{
                fontWeight: 400,
                fontSize: {
                  xs: "2.2rem",
                  sm: "3rem",
                  md: "2.75rem",
                },
                lineHeight: {
                  xs: 1.15,
                  md: 1.1,
                },
                letterSpacing: "-0.03em",
                mb: 4,
              }}
            >
              Aprenda brincando, evolua com quizzes.
            </Typography>

            <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
              Uma plataforma educativa gamificada onde alunos aprendem através
              de desafios, pontuam, conquistam recompensas e acompanham sua
              evolução.
            </Typography>

            <Stack
              direction={{
                xs: "column",
                sm: "row",
              }}
              spacing={2}
            >
              <Button
                variant="contained"
                color="primary"
                size="large"
                startIcon={<RocketLaunchIcon />}
                onClick={() => handleOnClick()}
              >
                Começar Agora
              </Button>

              <Button variant="outlined" color="primary" onClick={() => handleOnClickAbout()} size="large">
                Sobre o Projeto
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </Container>

      <Box
        sx={{
          bgcolor: "background.paper",
          borderTop: "1px solid",
          borderColor: "grey.200",
          py: 4,
          mt: 3,
        }}
      >
        <Container>
          <Typography align="center" color="text.secondary">
            © 2026 Q???. Todos os direitos reservados.
          </Typography>
        </Container>
      </Box>
    </Box>
  );
}
