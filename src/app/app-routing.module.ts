import { HudComponent } from './hud/hud.component';
import { MonoComponent } from './mono/mono.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';


const routes: Routes = [
  {
    path: '',
    component: MonoComponent
  },
  {
    path: 'mono',
    component: MonoComponent
  },
  {
    path: 'hud',
    component: HudComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
