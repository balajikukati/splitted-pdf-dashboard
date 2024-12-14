import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormConfiguratorComponent } from './form-configurator/form-configurator.component';

import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard'; // Import the Auth Guard



import { EditComponent } from './edit/edit.component';

import { DataStatusComponent } from './data-status/data-status.component';
import { DataDashboardComponent } from './data-dashboard/data-dashboard.component';
import { ViewDocumentDetailsComponent } from './view-document-details/view-document-details.component';

import { UserQueueComponent } from './user-queue/user-queue.component';
import { SupervisorQueueComponent } from './supervisor-queue/supervisor-queue.component';



export const routes: Routes = [
  // Define your routes here
  { path: 'login', component: LoginComponent },

  { path: 'data-status/:id', component: DataStatusComponent,canActivate: [AuthGuard]  },
  { path: 'data-dashboard', component: DataDashboardComponent,canActivate: [AuthGuard]  },

  { path: 'edit', component: EditComponent,canActivate: [AuthGuard]  },

  { path: 'form-configurator', component: FormConfiguratorComponent,canActivate: [AuthGuard]  },

  { path: 'user-queue', component: UserQueueComponent,canActivate: [AuthGuard]  },

  { path: 'supervisor-queue', component: SupervisorQueueComponent,canActivate: [AuthGuard]  },

  { path: '', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'view-document-details/:title1/:title2/:selectid/:uniqueid', component: ViewDocumentDetailsComponent,canActivate: [AuthGuard] },
  { path: 'view-document-details/:title', component: ViewDocumentDetailsComponent,canActivate: [AuthGuard] },
  { path: '**', redirectTo: '' } // Redirect any unknown paths to the home page
  

  //{ path: 'path2', component: Component2 },
  // Add more routes as needed
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
