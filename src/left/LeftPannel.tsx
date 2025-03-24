import { Box } from "@mui/material";
import LogoSearch from "./Logo_Search";
import Resents from "./Recents";
import Folder from "./Folder";
import More from "./More";

function Sidebar() {
  return (
    <Box display="flex" flexDirection="column" height="100vh" gap={2} overflow="hidden" py={3}>
      <LogoSearch />
      <Resents />
      <Box flexGrow={1} overflow="auto" minHeight="20vh" sx={{ "&::-webkit-scrollbar": { display: "none" } }}>
        <Folder />
      </Box>
      <Box sx={{ flexShrink: 0, overflow: "hidden" }}>
        <More />
      </Box>
    </Box>
  );
}

export default Sidebar;
