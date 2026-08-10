
import { Box, Typography } from "@mui/material";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneLight } from "react-syntax-highlighter/dist/esm/styles/prism";

type QuestionTextProps = {
  text: string;
};

export default function QuestionText({ text }: QuestionTextProps) {
  const parts = text.split(/`(\w*)\n([\s\S]*?)`/g);

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "100%",
        overflow: "hidden",
      }}
    >
      {parts.map((part, index) => {
        // Texto normal
        if (index % 3 === 0) {
          return part ? (
            <Typography
              key={index}
              variant="h6"
              color="primary"
              sx={{
                mb: { xs: 1.5, sm: 2 },
                lineHeight: { xs: 1.45, sm: 1.6 },
                fontWeight: 500,
                fontSize: {
                  xs: "1rem",
                  sm: "1.1rem",
                },
                wordBreak: "break-word",
              }}
            >
              {part.trim()}
            </Typography>
          ) : null;
        }

        // Linguagem do código
        if (index % 3 === 1) {
          return null;
        }

        const language = parts[index - 1] || "text";

        return (
          <Box
            key={index}
            sx={{
              mb: { xs: 2, sm: 3 },
              width: "100%",
              maxWidth: "100%",
              borderRadius: { xs: 1.5, sm: 2 },
              overflow: "hidden",
              border: "1px solid",
              borderColor: "divider",
              boxShadow: {
                xs: "0 1px 4px rgba(0, 0, 0, 0.08)",
                sm: 1,
              },
              backgroundColor: "#f8f9fa",
            }}
          >
            <SyntaxHighlighter
              language={language}
              style={oneLight}
              customStyle={{
                margin: 0,
                padding: "12px",
                fontSize: "0.8rem",
                lineHeight: 1.5,
                background: "#f8f9fa",
                width: "100%",
                boxSizing: "border-box",
                overflowX: "auto",
              }}
              codeTagProps={{
                style: {
                  fontFamily:
                    "'Roboto Mono', 'SFMono-Regular', Consolas, monospace",
                },
              }}
              wrapLongLines
            >
              {part.trim()}
            </SyntaxHighlighter>
          </Box>
        );
      })}
    </Box>
  );
}

