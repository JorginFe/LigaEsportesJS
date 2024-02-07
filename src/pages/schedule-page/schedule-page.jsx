import LeagueService from "../../services/LeagueService";
import { useState, useEffect } from "react";
import { useGetScreenSize } from "../../hooks/use-get-screen-size";
import Header from "../../components/header/header";
import "./schedulePage-styles.css";
import Footer from "../../components/footer/footer";

export const SchedulePage = () => {
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
  console.log(matches);

  return (
    <>
      <div className="main ">
        <Header />
        <div className="containerLeaderboard ">
          <span className="titleLeaderboard">League Schedule</span>
          <table className="LeaderboardTable">
            <tr className="">
              {size.width >= 701 ? (
                <>
                  <td className="tableHeader data">Date/Time</td>
                  <td className="tableHeader stadiumHeader">Stadium</td>
                  <td className="tableHeader null"></td>
                  <td className="tableHeader homeTeamHeader">Home Team</td>
                  <td className="tableHeader scoreboard"></td>
                  <td className="tableHeader awayTeamHeader">Away Team</td>
                </>
              ) : (
                <>
                  <td className="tableHeader team">Date/Time</td>
                  <td className="tableHeader gf">Home Team</td>
                  <td className="tableHeader scoreboard"></td>
                  <td className="tableHeader ga">Away Team</td>
                </>
              )}
            </tr>

            {matches.map((team) => {
              const date = new Date(team.matchDate);
              const day = date.getDate().toString().padStart(2, "0"); // obter o dia com dois dígitos
              const month = (date.getMonth() + 1).toString().padStart(2, "0"); // obter o mês com dois dígitos (lembre-se que os meses em JavaScript são baseados em zero)
              const year = date.getFullYear().toString(); // obter o ano com quatro dígitos
              const hours = date.getHours().toString().padStart(2, "0"); // obter as horas com dois dígitos
              const minutes = date.getMinutes().toString().padStart(2, "0"); // obter os minutos com dois dígitos
              const formattedDate = `${day}.${month}.${year} ${hours}:${minutes}`; // concatenar os valores em uma string formatada
              console.log(formattedDate); // output: "26.02.2023 10:32"

              const flagAway =
                "https://flagsapi.codeaid.io/" + team.awayTeam + ".png";
              const flagHome =
                "https://flagsapi.codeaid.io/" + team.homeTeam + ".png";

              return (
                <>
                  {size.width >= 701 ? (
                    <tr className="scheduleTable">
                      <>
                        <td className="match data">{formattedDate}</td>
                        <td className="match stadium">{team.stadium}</td>
                        <td className="match null"></td>
                        <td className="match teamHome">
                          {team.homeTeam}

                          <img src={flagHome} className="flag" />
                        </td>
                        <td className="match scoreboard">
                          {team.homeTeamScore} : {team.awayTeamScore}{" "}
                        </td>
                        <td className="match ">
                          <div className=" teamAway">
                            <img src={flagAway} className="flag" />
                            <span>{team.awayTeam}</span>
                          </div>
                        </td>
                      </>
                    </tr>
                  ) : (
                    <>
                      <tr className="scheduleTable">
                        <td className="match data">{formattedDate}</td>

                        <td className="match teamHome">
                          {team.homeTeam}

                          <img src={flagHome} className="flag" />
                        </td>
                        <td className="match scoreboard">
                          {team.homeTeamScore} : {team.awayTeamScore}{" "}
                        </td>
                        <td className="match ">
                          <div className=" teamAway">
                            <img src={flagAway} className="flag" />
                            <span>{team.awayTeam}</span>
                          </div>
                        </td>
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
