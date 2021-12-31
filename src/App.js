import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import ProductCard from "./components/ProductCard";
import Navbar from "./components/Navbar";
import About from "./components/About";
import HomePage from "./components/HomePage";

function App() {
  return (
    <Router>
      <Navbar></Navbar>
      <Switch>
        <Route exact path="/" component={(props) => <HomePage />} />
        <Route
          path="/detalle/:id"
          component={(props) => <ProductCard {...props} />}
        />
        <Route path="/about" component={(props) => <About />}></Route>
        <Route>404 Page </Route>
      </Switch>
    </Router>
  );
  // <div className="App"></div>;
}

export default App;
