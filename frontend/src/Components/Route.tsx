import { HomePage } from "./home/HomePage";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { LoginRedirect } from "./login/LoginRedirect";
import { LoggedInPage } from "./login/LoggedInPage";
import { Navigator } from './NavigationRow/Navigator';
import { SiteProvider } from "./SiteContext";


function SiteContainer({children}: {children: React.ReactNode[]}){
  return <div style={{
    width: '100%',
    height: '100%'
  }}>
    <Router>
    <SiteProvider>
    {children}
    </SiteProvider>
    </Router>
  </div>
}
export const BaseRoute = () => {
  return (
    <SiteContainer>
      <Navigator />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginRedirect />} />
        <Route path="/user" element={<LoggedInPage />} />
      </Routes>
      </SiteContainer>
  );
};
