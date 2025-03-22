import { memo } from "react";
import { Card as MuiCard, CardContent, Typography, Box } from "@mui/material";
import Link from "next/link";

interface CardProps {
  title: string;
  text: string;
  lastdate: string;
  id: string;
  folderId?: string;
  type?: string | null;
}

const Cards = memo(function Card({ title, text, lastdate, id, folderId, type }: CardProps) {
  const linkHref = folderId 
    ? `/folder/${folderId}/note/${id}` 
    : `/${type}/note/${id}`;

  return (
    <Link key={id} href={linkHref} style={{ textDecoration: "none" }}>
      <MuiCard
        sx={{
          backgroundColor: "#1e1e1e",
          borderRadius: "12px",
          boxShadow: "0 4px 15px rgba(0, 0, 0, 0.5)",
          color: "#FFFFFF",
          cursor: "pointer",
          transition: "transform 0.2s, background 0.3s",
          padding: 1,
          '&:hover': { 
            backgroundColor: "#2c2c2c", 
            transform: "scale(1.02)" 
          },
        }}
      >
        <CardContent>
          <Typography variant="subtitle1" component="p" fontWeight="600">
            {title}
          </Typography>

          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            color="gray"
            mt={2}
          >
            <Typography variant="body2">{lastdate.slice(0, 10)}</Typography>
            <Typography
              variant="body2"
              sx={{
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                ml: 2,
                flex: 1,
              }}
            >
              {text}
            </Typography>
          </Box>
        </CardContent>
      </MuiCard>
    </Link>
  );
});

export default Cards;
