import Links from "./components/Links";
import LinksContext from "./context/LinksContext";

const App = () => {
  return (
    <LinksContext>
      <div className="app">
        <Links />
      </div>
    </LinksContext>
  );
};

export default App;
