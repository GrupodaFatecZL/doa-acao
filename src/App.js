//import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Home } from "./pages/Home";
import { Welcome } from "./pages/Welcome";
//import { AuthContextProvider } from "./contexts/AuthContext";


function App() {
  return (
    // <BrowserRouter>
    //   <Switch>
    //     <Route path="/" exact component={Home} />
    //     <Route path="/welcome" component={Welcome} />
    //   </Switch>
    // </BrowserRouter>
    <Home/>
  );
}

export default App;