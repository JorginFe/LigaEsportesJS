import { api } from "../config/axios";

class LeagueService {
  setMatches(matches) {
    this.matches = matches;
  }

  getMatches() {
    return this.matches;
  }

  getLeaderboard() {
    const teams = {};

    // iterate over matches to accumulate stats for each team
    for (const match of this.matches) {
      const homeTeam = match.homeTeam;
      const awayTeam = match.awayTeam;
      const homeTeamScore = match.homeTeamScore;
      const awayTeamScore = match.awayTeamScore;

      // update home team stats
      if (!teams[homeTeam]) {
        teams[homeTeam] = {
          teamName: homeTeam,
          matchesPlayed: 0,
          goalsFor: 0,
          goalsAgainst: 0,
          points: 0,
        };
      }
      teams[homeTeam].matchesPlayed++;
      teams[homeTeam].goalsFor += homeTeamScore;
      teams[homeTeam].goalsAgainst += awayTeamScore;
      if (homeTeamScore > awayTeamScore) {
        teams[homeTeam].points += 3;
      } else if (homeTeamScore === awayTeamScore) {
        teams[homeTeam].points += 1;
      }

      // update away team stats
      if (!teams[awayTeam]) {
        teams[awayTeam] = {
          teamName: awayTeam,
          matchesPlayed: 0,
          goalsFor: 0,
          goalsAgainst: 0,
          points: 0,
        };
      }
      teams[awayTeam].matchesPlayed++;
      teams[awayTeam].goalsFor += awayTeamScore;
      teams[awayTeam].goalsAgainst += homeTeamScore;
      if (awayTeamScore > homeTeamScore) {
        teams[awayTeam].points += 3;
      } else if (awayTeamScore === homeTeamScore) {
        teams[awayTeam].points += 1;
      }
    }

    // convert object to array and sort by points, goalsFor, and teamName
    const teamArray = Object.values(teams);
    teamArray.sort((a, b) => {
      if (a.points !== b.points) {
        return b.points - a.points;
      }
      if (a.goalsFor !== b.goalsFor) {
        return b.goalsFor - a.goalsFor;
      }
      return a.teamName.localeCompare(b.teamName);
    });
    console.log("teamArray");
    return teamArray;
  }

  async fetchData() {
    const response = await api("/getAllMatches");
    this.matches = response.data.matches;
  }
}

export default LeagueService;
