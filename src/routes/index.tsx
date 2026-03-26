import {createFileRoute} from "@tanstack/react-router";
import {redirect} from "@tanstack/router-core";

export const Route = createFileRoute("/")({
	component: App,
    beforeLoad: async () => {
    throw redirect({ to: "/homepage" });
  }
});

function App() {
  return (
    <div className="p-4">
      <header>
        <h1 className="text-4xl font-bold">Homepage</h1>
      </header>
      <main>
        <p>Benvenuto nella homepage dell'app!</p>
      </main>
    </div>
  );
}

export default App;