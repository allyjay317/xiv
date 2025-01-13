import { HomePage } from "./home/HomePage";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { LoginRedirect } from "./login/LoginRedirect";
import { LoggedInPage } from "./login/LoggedInPage";
import { Navigator } from './NavigationRow/Navigator';
import { SiteProvider } from "./SiteContext";



export const BaseRoute = () => {
  return (
    <Router>
      <SiteProvider>
      <Navigator />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginRedirect />} />
        <Route path="/user" element={<LoggedInPage />} />
      </Routes>
      </SiteProvider>
    </Router>
  );
};
