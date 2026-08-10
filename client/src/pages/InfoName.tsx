import { useState } from "react";
import CenteredContainer from "../components/CenteredContainer";
import {
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";

function InfoName({
  handleOnClick,
}: {
  handleOnClick: (nome: string) => void;
}) {
  const [inputNome, setInputNome] = useState("");
  return (
    <CenteredContainer maxWidth="sm">
      <Card elevation={4}>
        <CardContent sx={{ textAlign: "center", py: 5 }}>
          <Typography variant="h5" color="primary" gutterBottom>
            Bem-vindo ao Quiz!
          </Typography>

          <Typography sx={{ mb: 3 }}>Digite seu nome para começar.</Typography>

          <TextField
           
            fullWidth
            label="Nome do jogador"
            value={inputNome}
            onChange={(e) => setInputNome(e.target.value)}
          />

          <Button
            variant="contained"
            sx={{ mt: 3 }}
            disabled={!inputNome.trim()}
            onClick={() => handleOnClick(inputNome)}
          >
            Começar
          </Button>
        </CardContent>
      </Card>
    </CenteredContainer>
  );
}

export default InfoName;
