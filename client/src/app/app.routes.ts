import { Routes } from '@angular/router';
import { ShrinkInput } from './url/shrink.input/shrink.input.component';
import { Login } from './auth/login/login.component';
import { Logup } from './auth/logup/logup.component';
import { Logout } from './auth/logout/logout.component';
import { Page404 } from './shared/404/404.component';
import { OdoOverview } from './user/ododash/partials/overview/overview.component';
import { OdoStats } from './user/ododash/partials/stats/stats.component';
import { OdoSetting } from './user/ododash/partials/setting/setting.component';
import { Shrinker } from './url/shrink/shrink.component';
import { UserService } from './services/user.service';
import { IfisLogged } from './guards/ifisLogged.guard';
import { NotLogged } from './guards/notLogged.guard';
import { Forget } from './auth/forget.pass/forget.component';

export const routes: Routes = [
    {
        path:"dashboard",
        canActivate: [IfisLogged],
        title: "OdoDash - Angular v1.0",
        children:[
            {path:"stats", component: OdoStats},
            {path:"setting", component: OdoSetting},
            {path:"", component: OdoOverview},
            {path:"**", component: Page404},

        ]
    },
    {path:"deconnection", component: Logout},
    {path:"inscription", component: Logup,canActivate: [NotLogged]},
    {path:"connection", component: Login,canActivate: [NotLogged]},
    {path:"mot-de-passe-oublie", component: Forget,canActivate: [NotLogged]},
    {path:"creer", component: Shrinker},
    {path:"", component: Shrinker},
    {path:"**", component: Page404},

];
