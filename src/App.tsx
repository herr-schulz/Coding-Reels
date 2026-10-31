import { BrowserRouter, Route, Routes } from "react-router-dom";
import { EpisodePage } from "./ui/EpisodePage";
import { HtmlTablePage } from "./ui/HtmlTablePage";
import { LibraryPage } from "./ui/LibraryPage";

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LibraryPage />} />
        <Route path="/lessons/:episodeId" element={<EpisodePage />} />
        <Route path="/table/html" element={<HtmlTablePage />} />
      </Routes>
    </BrowserRouter>
  );
}
