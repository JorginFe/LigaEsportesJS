import { BrowserRouter, Switch, Route } from "react-router-dom";
import { SchedulePage } from "../pages/schedule-page/schedule-page";
import { LeaderBoardPage } from "../pages/leaderboard-page/leaderboard-page";
import { NotFoundPage } from "../pages/notFound-page/notFound-page";

export function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={SchedulePage} />
        <Route exact path="/schedule" component={SchedulePage} />
        <Route exact path="/leaderboard" component={LeaderBoardPage} />
        <Route path="/*" component={NotFoundPage} />
      </Switch>
    </BrowserRouter>
  );
}
