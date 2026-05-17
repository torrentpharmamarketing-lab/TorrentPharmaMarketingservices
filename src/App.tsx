import { SpeedInsights } from '@vercel/speed-insights/react';
import LandingPage from "./components/LandingPage";

export default function App() {
  return (
    <>
      <LandingPage />
      <SpeedInsights />
    </>
  );
}
