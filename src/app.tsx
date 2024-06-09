// Remove if react-quill is not used
import "react-quill/dist/quill.snow.css";
// Remove if react-draft-wysiwyg is not used
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
// Remove if simplebar is not used
import "simplebar-react/dist/simplebar.min.css";
// Remove if mapbox is not used
import "mapbox-gl/dist/mapbox-gl.css";

import type { FC } from "react";
import { useRoutes } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

import { RTL } from "src/components/rtl";
import { SplashScreen } from "src/components/splash-screen";
import { Toaster } from "src/components/toaster";
import { SettingsConsumer, SettingsProvider } from "src/contexts/settings";
import { gtmConfig } from "src/config";
import { useNprogress } from "src/hooks/use-nprogress";
import { useAnalytics } from "src/hooks/use-analytics";
// import { routes } from "src/routes";
import { createTheme } from "src/theme";
// Remove if locales are not used
import "src/locales/i18n";
import { Provider } from "react-redux";
import { persistor, store } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { routes } from "./routes";
export const App: FC = () => {
  useAnalytics(gtmConfig);
  useNprogress();

  const element = useRoutes(routes);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <SettingsConsumer>
            {(settings) => {
              const theme = createTheme({
                colorPreset: settings.colorPreset,
                contrast: settings.contrast,
                direction: settings.direction,
                paletteMode: settings.paletteMode,
                responsiveFontSizes: settings.responsiveFontSizes,
              });

              const showSlashScreen = false;

              return (
                <ThemeProvider theme={theme}>
                  <RTL direction={settings.direction}>
                    <CssBaseline />
                    {showSlashScreen ? <SplashScreen /> : <>{element}</>}
                    <Toaster />
                  </RTL>
                </ThemeProvider>
              );
            }}
          </SettingsConsumer>
        </PersistGate>
      </Provider>
    </LocalizationProvider>
  );
};
