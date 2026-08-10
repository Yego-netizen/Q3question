import { Box, Container } from "@mui/material";

function CenteredContainer({
  children,
  maxWidth = "sm",
}: {
  children: React.ReactNode;
  maxWidth?: "sm" | "md" | "lg" | "xl";
}) {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Container maxWidth={maxWidth}>
        {children}
      </Container>
    </Box>
  );
}

export default CenteredContainer