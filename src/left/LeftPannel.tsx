import { Box } from "@mui/material";
import LogoSearch from "./Logo_Search";
import Resents from "./Recents";
import Folder from "./Folder";
import More from "./More";

function Sidebar() {
  return (
    <Box display="flex" flexDirection="column" height="100vh" gap={2} overflow="hidden" py={2}>
      <LogoSearch />
      <Resents />
      <Box overflow="auto" minHeight="20vh" sx={{ "&::-webkit-scrollbar": { width: "3px", }, "&::-webkit-scrollbar-thumb": { background: "#555",  borderRadius: "10px", },}}>
        <Folder />
      </Box>
      <Box sx={{ flexShrink: 0, overflow: "hidden" }}>
        <More />
      </Box>
    </Box>
  );
}

export default Sidebar;
