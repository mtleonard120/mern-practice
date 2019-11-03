import React from "react";

// packages
import { Typography, Toolbar, AppBar } from "@material-ui/core";

export const App: React.FC = () => {
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography component="h1" variant="h6">
            MERN Practice
          </Typography>
        </Toolbar>
      </AppBar>
    </>
  );
};
