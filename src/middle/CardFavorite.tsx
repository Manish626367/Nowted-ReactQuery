import Link from "next/link";
import { Card, CardContent, Typography, Box } from "@mui/material";

interface CardProps {
  title: string;
  text: string;
  lastdate: string;
  id: string;
  type: string |null;
}

function CardFavorite({ title, text, lastdate, id, type }: CardProps) {
  return (
    <Link href={`/${type}/note/${id}`} passHref>
      <Card
        sx={{
          bgcolor: "#1e293b",
          p: 3,
          borderRadius: 2,
          boxShadow: 3,
          color: "#fff",
          cursor: "pointer",
          transition: "background 0.3s",
          '&:hover': { bgcolor: "#334155" },
        }}
      >
        <CardContent>
          <Typography variant="h6" gutterBottom>
            {title}
          </Typography>

          <Box display="flex" justifyContent="space-between" color="gray">
            <Typography variant="body2">{lastdate.slice(0, 10)}</Typography>
            <Typography
              variant="body2"
              noWrap
              sx={{ textOverflow: "ellipsis", overflow: "hidden", ml: 2, flex: 1 }}
            >
              {text}
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Link>
  );
}

export default CardFavorite;
