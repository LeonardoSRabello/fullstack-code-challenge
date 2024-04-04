import React from "react";

import { Box, CircularProgress } from "@mui/material";
import useIntersectionObserver from "src/modules/useIntersectionObserver";

interface LoadMoreProps {
  onLoad: () => void;
  isLoading: boolean;
}

export const LoadMore = ({ onLoad, isLoading }: LoadMoreProps) => {
  const ref = React.useRef<HTMLDivElement>(null);
  useIntersectionObserver({
    target: ref,
    onIntersect: () => {
      if (!isLoading) {
        onLoad();
      }
    }
  });

  return (
    <Box
      ref={ref}
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        visibility: isLoading ? "visible" : "hidden",
        height: "30px",
        marginBottom: "0.5rem"
      }}
    >
      <CircularProgress sx={{ color: "primary.main" }} size="30px" />
    </Box>
  );
};
