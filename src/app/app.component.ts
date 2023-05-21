import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./navbar/navbar.component";
import { MatSidenav, MatSidenavModule } from "@angular/material/sidenav";
import { NavsideComponent } from "./navside/navside.component";
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { takeUntil } from 'rxjs';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    imports: [CommonModule, RouterOutlet, NavbarComponent, MatSidenavModule, NavsideComponent]
})
export class AppComponent {
  title = 'Vehicles';
  isSmallDevice = false;

  @ViewChild(MatSidenav, { static: false })
  sidenav!: MatSidenav;
  
  constructor(private router: Router,

    private breakpointObserver: BreakpointObserver){
      this.breakpointObserver
      .observe([Breakpoints.Handset])
      .pipe(
        // takeUntil(this._onDestroy)
        )
      .subscribe(result => {
        if (result.matches) {
          this.isSmallDevice = true;
        } else {
          this.isSmallDevice = false;
        }
      });
  }
}
