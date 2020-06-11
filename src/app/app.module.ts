import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { TrendModule } from 'ngx-trend';
import { MatTableModule } from '@angular/material/table';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WmapComponent } from './wmap/wmap.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './widgets/header/header.component';
import { SidebarComponent } from './widgets/sidebar/sidebar.component';
import { OverlaypanelComponent } from './widgets/overlaypanel/overlaypanel.component';
import { HudComponent } from './hud/hud.component';
import { MonoComponent } from './mono/mono.component';
import { IselectorComponent } from './widgets/iselector/iselector.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    WmapComponent,
    HomeComponent,
    HeaderComponent,
    SidebarComponent,
    OverlaypanelComponent,
    HudComponent,
    MonoComponent,
    IselectorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    TrendModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
