import LeagueService from "../../services/LeagueService";
import Header from "../../components/header/header";
import Footer from "../../components/footer/footer";
import { useState, useEffect } from "react";
import { useGetScreenSize } from "../../hooks/use-get-screen-size";
import "./leaderboardPage-styles.css";

export const LeaderBoardPage = () => {
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
    <>
      <div className="main">
        <Header />
        <div className="containerLeaderboard ">
          <span className="titleLeaderboard">League Standigs</span>
          <table className="LeaderboardTable">
            <tr>
              {size.width >= 701 ? (
                <>
                  <td className="tableHeader team">Team Name</td>
                  <td className="tableHeader mp">MP</td>
                  <td className="tableHeader gf">GF</td>
                  <td className="tableHeader ga">GA</td>
                  <td className="tableHeader pt">Points</td>
                </>
              ) : (
                <>
                  <td className="tableHeader team">Team Name</td>
                  <td className="tableHeader mp">MP</td>
                  <td className="tableHeader mp">GD</td>
                  <td className="tableHeader pt">Points</td>
                </>
              )}
            </tr>

            {leaderboard.map((team) => {
              const flag =
                "https://flagsapi.codeaid.io/" + team.teamName + ".png";
              console.log(flag);

              return (
                <>
                  {size.width >= 701 ? (
                    <>
                      <tr className="lineTable">
                        <td className="show teamName">
                          <img src={flag} className="flag" />
                          {team.teamName}
                        </td>
                        <td className="show">{team.matchesPlayed}</td>
                        <td className="show">{team.goalsFor}</td>
                        <td className="show">{team.goalsAgainst}</td>
                        <td className="show points">{team.points}</td>
                      </tr>
                    </>
                  ) : (
                    <>
                      <tr className="lineTable">
                        <td className="show teamName">
                          <img src={flag} className="flag" />
                          {team.teamName}
                        </td>
                        <td className="show">{team.matchesPlayed}</td>
                        <td className="show">
                          {team.goalsFor - team.goalsAgainst}
                        </td>
                        <td className="show points">{team.points}</td>
                      </tr>
                    </>
                  )}
                </>
              );
            })}
          </table>
        </div>
      </div>
      <Footer />
    </>
  );
};
