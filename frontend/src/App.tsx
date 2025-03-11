import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './components/theme-provider';
import { Toaster } from './components/ui/toaster';
import { ThemePlaceholder } from './components/theme-placeholder';
import Dashboard from './pages/dashboard';
import CharacterPage from './pages/character';
import ChallengesPage from './pages/challenges';
import SettingsPage from './pages/settings';
import LoginPage from './pages/login';
import SignupPage from './pages/signup';
import Layout from './components/layout';

function App() {
  return (
    <ThemeProvider defaultTheme="default">
      <ThemePlaceholder />
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="character" element={<CharacterPage />} />
            <Route path="challenges" element={<ChallengesPage />} />
            {/* <Route path="world" element={<WorldPage />} /> Add this route */}
            <Route path="settings" element={<SettingsPage />} />
          </Route>
        </Routes>
      </Router>
      <Toaster />
    </ThemeProvider>
  );
}

export default App;
