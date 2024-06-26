import "./App.css";
import { Layout } from "./components/Layout/Layout";
import { MarkdownPreviewer } from "./pages/MarkdownPreviewer/MarkdownPreviewer";

function App() {
  return (
    <Layout>
      <MarkdownPreviewer />
    </Layout>
  );
}

export default App;
