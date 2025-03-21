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
          backgroundColor: "#1E293B",
          padding: 2,
          borderRadius: 2,
          boxShadow: 3,
          color: "#FFFFFF",
          cursor: "pointer",
          transition: "background 0.3s",
          '&:hover': { backgroundColor: "#2D3748" },
        }}
      >
        <CardContent>
          <Typography variant="h6" component="p" fontWeight="600">
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
