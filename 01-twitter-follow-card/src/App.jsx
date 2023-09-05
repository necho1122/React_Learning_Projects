import { TwtFollowCard } from "./components/TwtFollowCard";
import "./App.css";

export function App() {
  return (
    <>
      <TwtFollowCard
        profilePhoto="https://pbs.twimg.com/profile_images/1256954200296247298/7f7OPjiX_400x400.jpg"
        profileName="Perfil ejemplo"
        username="ejemplo"
      />
      <TwtFollowCard
        profilePhoto="https://pbs.twimg.com/profile_images/1613612257015128065/oA0Is67J_400x400.jpg"
        profileName="Perfil ejemplo"
        username="ejemplo"
      />
    </>
  );
}
