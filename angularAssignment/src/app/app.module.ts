import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PlayerComponent } from './player/player.component';
import { ControlsComponent } from './controls/controls.component';
import { PlaylistComponent } from './playlist/playlist.component';
import { ControlsService } from './controls/controls.service';
import { HttpClientModule } from '@angular/common/http';
import { AddPlayComponent } from './addplay/addplay.component';


@NgModule({
  declarations: [
    AppComponent,
    PlayerComponent,
    ControlsComponent,
    PlaylistComponent,
    AddPlayComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [ControlsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
