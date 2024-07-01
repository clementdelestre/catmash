import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadChildren: () => import('./modules/vote/vote.module').then(m => m.VoteModule)
    },
    {
        path: 'scoreboard',
        loadChildren: () => import('./modules/score/score.module').then(m => m.ScoreModule)
    },
];
