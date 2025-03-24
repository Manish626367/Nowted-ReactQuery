

"use client";

import "./globals.css"
import LeftPannel from "@/left/LeftPannel";
import MiddlePannel from "@/middle/MiddlePannel"; 
import { Box } from "@mui/material";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";


export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <html lang="en">
      <body >
        <QueryClientProvider client={queryClient}>
          <Box display="flex" width="100%" height="100vh">
            
            {/* --------------Left Panel-------------- */}
            <Box width="21.4%" height="100vh">
              <LeftPannel />
            </Box>

            {/*-------------- Middle Panel------------- */}
            <Box
              width="25%"
              bgcolor="#1c1c1c"
              height="100vh"
              px={2}
              py={2}
              sx={{
                overflowY: "auto",
                scrollbarWidth: "none",
                "&::-webkit-scrollbar": { display: "none" },
              }}
            >
              <MiddlePannel />
            </Box>

            {/* --- right pannel---- */}
            <Box  flexGrow={1}
              width="53.6%"
              height="100vh"
              bgcolor="#000000"
              sx={{
                overflowY: "auto",
                scrollbarWidth: "none",
                "&::-webkit-scrollbar": { display: "none" },
              }}>
              {children}
            </Box>
          </Box>
        </QueryClientProvider>
      </body>
    </html>
  );
}
