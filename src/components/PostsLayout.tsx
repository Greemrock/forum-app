import React, { ReactNode } from "react";
import { Box, Typography, Card, CardContent } from "@mui/material";

interface PostsLayoutProps {
  title: string;
  children: ReactNode;
  headerActions?: ReactNode;
}

export const PostsLayout: React.FC<PostsLayoutProps> = ({
  title,
  children,
  headerActions,
}) => {
  return (
    <Box sx={{ p: 3 }}>
      <Card>
        <CardContent>
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
            <Typography variant="h4">{title}</Typography>
            {headerActions}
          </Box>
          {children}
        </CardContent>
      </Card>
    </Box>
  );
};
