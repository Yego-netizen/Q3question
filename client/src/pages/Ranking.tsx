import { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Container,
  Paper,
  Typography,
} from "@mui/material";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import MilitaryTechIcon from "@mui/icons-material/MilitaryTech";
import { getStats } from "../services/stats.service.js";

type Player = {
  _id: string;
  nome: string;
  pontuacao: number;
};

export default function RankingPage({ onBack }: { onBack: () => void }) {
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRanking = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getStats();

        if (!data) {
          throw new Error("Não foi possível carregar o ranking.");
        }

        setPlayers(data);
      } catch (err) {
        console.error(err);
        setError("Não foi possível carregar o ranking.");
      } finally {
        setLoading(false);
      }
    };

    fetchRanking();
  }, []);

  const getInitial = (nome: string) => {
    return nome?.charAt(0)?.toUpperCase() || "?";
  };

  const getPositionColor = (position: number) => {
    if (position === 1) return "#FFD700";
    if (position === 2) return "#C0C0C0";
    if (position === 3) return "#CD7F32";

    return "text.secondary";
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#f5f7fb",
        py: { xs: 3, sm: 5 },
      }}
    >
      <Container
        maxWidth="sm"
        sx={{
          px: { xs: 2, sm: 3 },
        }}
      >
        {/* Cabeçalho */}
        <Box
          sx={{
            textAlign: "center",
            mb: { xs: 3, sm: 5 },
          }}
        >
          <EmojiEventsIcon
            sx={{
              fontSize: { xs: 48, sm: 60 },
              color: "#f5b301",
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
              },
            }}
          >
            Ranking
          </Typography>

          <Typography
            color="text.secondary"
            sx={{
              mt: 0.5,
              fontSize: { xs: "0.9rem", sm: "1rem" },
            }}
          >
            Confira quem está no topo!
          </Typography>
        </Box>

        {/* Loading */}
        {loading && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              py: 8,
            }}
          >
            <CircularProgress />
          </Box>
        )}

        {/* Erro */}
        {!loading && error && (
          <Paper
            elevation={0}
            sx={{
              p: 3,
              borderRadius: 3,
              textAlign: "center",
              border: "1px solid",
              borderColor: "error.light",
            }}
          >
            <Typography
              color="error"
              sx={{
                fontWeight: 500,
              }}
            >
              {error}
            </Typography>
          </Paper>
        )}

        {/* Sem jogadores */}
        {!loading && !error && players.length === 0 && (
          <Paper
            elevation={0}
            sx={{
              p: 4,
              borderRadius: 3,
              textAlign: "center",
            }}
          >
            <Typography
              color="text.secondary"
              sx={{
                fontWeight: 500,
              }}
            >
              Ainda não existem pontuações no ranking.
            </Typography>
            <Button variant="contained" onClick={() => onBack()}>← Voltar</Button>
          </Paper>
        )}

        {/* Ranking */}
        {!loading && !error && players.length > 0 && (
          <>
            {/* Pódio */}
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "1fr 1.15fr 1fr",
                alignItems: "end",
                gap: { xs: 0.8, sm: 1.5 },
                mb: 3,
              }}
            >
              {players[1] ? (
                <PodiumPlayer
                  player={players[1]}
                  position={2}
                  getInitial={getInitial}
                  getPositionColor={getPositionColor}
                />
              ) : (
                <Box />
              )}

              {players[0] ? (
                <PodiumPlayer
                  player={players[0]}
                  position={1}
                  getInitial={getInitial}
                  getPositionColor={getPositionColor}
                />
              ) : (
                <Box />
              )}

              {players[2] ? (
                <PodiumPlayer
                  player={players[2]}
                  position={3}
                  getInitial={getInitial}
                  getPositionColor={getPositionColor}
                />
              ) : (
                <Box />
              )}
            </Box>

            {/* Demais posições */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 1,
              }}
            >
              {players.slice(3).map((player, index) => {
                const position = index + 4;

                return (
                  <RankingItem
                    key={player._id}
                    player={player}
                    position={position}
                    getInitial={getInitial}
                  />
                );
              })}
            </Box>
            <Button variant="contained"  onClick={() => onBack()}>← Voltar</Button>
          </>
        )}
      </Container>
    </Box>
  );
}

/* -------------------------------------------------------
   PODIUM
------------------------------------------------------- */

type PodiumPlayerProps = {
  player: Player;
  position: number;
  getInitial: (nome: string) => string;
  getPositionColor: (position: number) => string;
};

function PodiumPlayer({
  player,
  position,
  getInitial,
  getPositionColor,
}: PodiumPlayerProps) {
  const isFirst = position === 1;

  return (
    <Box
      sx={{
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {isFirst && (
        <MilitaryTechIcon
          sx={{
            color: "#FFD700",
            fontSize: { xs: 28, sm: 36 },
            mb: -0.5,
          }}
        />
      )}

      <Avatar
        sx={{
          width: {
            xs: isFirst ? 68 : 54,
            sm: isFirst ? 84 : 68,
          },
          height: {
            xs: isFirst ? 68 : 54,
            sm: isFirst ? 84 : 68,
          },
          mb: 1,
          fontSize: {
            xs: isFirst ? "1.5rem" : "1.2rem",
            sm: "1.6rem",
          },
          fontWeight: 700,
          backgroundColor: getPositionColor(position),
          color: "#fff",
          border: "3px solid #fff",
          boxShadow: 2,
        }}
      >
        {getInitial(player.nome)}
      </Avatar>

      <Typography
        noWrap
        sx={{
          maxWidth: "100%",
          fontWeight: 700,
          fontSize: {
            xs: "0.8rem",
            sm: "0.95rem",
          },
        }}
      >
        {player.nome}
      </Typography>

      <Typography
        color="primary"
        sx={{
          fontWeight: 800,
          fontSize: {
            xs: "0.9rem",
            sm: "1rem",
          },
        }}
      >
        {player.pontuacao} pts
      </Typography>

      <Box
        sx={{
          mt: 1,
          width: "100%",
          height: {
            xs: isFirst ? 70 : position === 2 ? 50 : 35,
            sm: isFirst ? 100 : position === 2 ? 75 : 55,
          },
          backgroundColor: getPositionColor(position),
          borderRadius: "12px 12px 0 0",
          opacity: 0.9,
        }}
      >
        <Typography
          sx={{
            color: "#fff",
            fontWeight: 900,
            fontSize: {
              xs: "1.2rem",
              sm: "1.5rem",
            },
            pt: 1,
          }}
        >
          {position}º
        </Typography>
      </Box>
    </Box>
  );
}

/* -------------------------------------------------------
   ITEM DO RANKING
------------------------------------------------------- */

type RankingItemProps = {
  player: Player;
  position: number;
  getInitial: (nome: string) => string;
};

function RankingItem({ player, position, getInitial }: RankingItemProps) {
  return (
    <Paper
      elevation={0}
      sx={{
        display: "flex",
        alignItems: "center",
        gap: { xs: 1.2, sm: 2 },
        p: { xs: 1.2, sm: 1.5 },
        borderRadius: 2.5,
        border: "1px solid",
        borderColor: "divider",
        backgroundColor: "#fff",
      }}
    >
      {/* Posição */}
      <Typography
        color="text.secondary"
        sx={{
          width: { xs: 28, sm: 35 },
          textAlign: "center",
          fontWeight: 800,
          fontSize: { xs: "0.9rem", sm: "1rem" },
        }}
      >
        {position}º
      </Typography>

      {/* Avatar */}
      <Avatar
        sx={{
          width: { xs: 38, sm: 44 },
          height: { xs: 38, sm: 44 },
          fontSize: { xs: "0.9rem", sm: "1rem" },
          fontWeight: 700,
          backgroundColor: "primary.main",
        }}
      >
        {getInitial(player.nome)}
      </Avatar>

      {/* Nome */}
      <Box
        sx={{
          flex: 1,
          minWidth: 0,
        }}
      >
        <Typography
          noWrap
          sx={{
            fontWeight: 600,
            fontSize: {
              xs: "0.9rem",
              sm: "1rem",
            },
          }}
        >
          {player.nome}
        </Typography>
      </Box>

      {/* Pontuação */}
      <Box
        sx={{
          textAlign: "right",
          flexShrink: 0,
        }}
      >
        <Typography
          color="primary"
          sx={{
            fontWeight: 800,
            fontSize: {
              xs: "0.9rem",
              sm: "1rem",
            },
          }}
        >
          {player.pontuacao}
        </Typography>

        <Typography
          variant="caption"
          color="text.secondary"
          sx={{
            fontSize: "0.65rem",
          }}
        >
          pontos
        </Typography>
      </Box>
    </Paper>
  );
}
