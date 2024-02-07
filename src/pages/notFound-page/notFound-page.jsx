import LeagueService from "../../services/LeagueService";
import Header from "../../components/header/header";
import Footer from "../../components/footer/footer";
import { useState, useEffect } from "react";
import { useGetScreenSize } from "../../hooks/use-get-screen-size";
import "./notFoundPage-styles.css";

export const NotFoundPage = () => {
  const [matches, setMatches] = useState([]);

  const [leaderboard, setLeaderboard] = useState([]);
  const { size } = useGetScreenSize();

  useEffect(() => {
    const leagueService = new LeagueService();
    leagueService.fetchData().then(() => {
      setMatches(leagueService.getMatches());
      setLeaderboard(leagueService.getLeaderboard());
    });
  }, []);
  console.log(leaderboard);

  return (
    <div className="main">
      <Header />
      <div className="error main">
        <img src="Images/404.png" />
      </div>
      <Footer />
    </div>
  );
};
