import { RecentsearchesComponent } from './recentsearches/recentsearches.component';
import { AuthGuard } from './auth.guard';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {"path":"",
    "component":LoginComponent
   },
   {"path":"home",
    "component":HomeComponent,
    canActivate:[AuthGuard]
   },
   {"path":"recentsearches",
   "component":RecentsearchesComponent,
   canActivate:[AuthGuard]
  },
   { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
