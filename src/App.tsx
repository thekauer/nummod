import { AppShell, Grid, MantineProvider } from "@mantine/core";
import React from "react";
import { Main } from "./components/Main";
import "./App.css";
import { Left } from "./components/Left";
import { Right } from "./components/Right";
import { EventsProvider } from "./hooks/useEvents";

function App() {
  return (
    <MantineProvider theme={{ colorScheme: "dark" }}>
      <EventsProvider>
        <AppShell>
          <Grid>
            <Grid.Col span={2}>
              <Left />
            </Grid.Col>
            <Grid.Col span={8}>
              <Main />
            </Grid.Col>
            <Grid.Col span={2}>
              <Right />
            </Grid.Col>
          </Grid>
        </AppShell>
      </EventsProvider>
    </MantineProvider>
  );
}

export default App;
