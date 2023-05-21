import { Component, EventEmitter, Inject, Input, LOCALE_ID, OnInit, Output, VERSION as angularVersion } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { VERSION as materialVersion } from '@angular/material/core';
import { VERSION as cdkVersion } from '@angular/cdk';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from "@angular/material/icon";
import { MatMenuModule } from "@angular/material/menu";
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import {MatButtonModule} from '@angular/material/button';

@Component({
  standalone: true,
  selector: 'app-navbar',
  imports: [CommonModule,MatToolbarModule, MatIconModule, MatMenuModule,MatButtonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  materialVersion = materialVersion;
  cdkVersion = cdkVersion;
  angularVersion = angularVersion

  // isSmallScreen$: Observable<boolean>;

  public isAuthenticated!: Observable<boolean>;
  // public userName: Observable<string>;


  @Output()
  sidenavToggle = new EventEmitter<void>();

  @Input()
  isSmallDevice = false;


  constructor(private breakpointObserver: BreakpointObserver,
    @Inject(LOCALE_ID) protected localeId: string) {

    // this.isSmallScreen$ = breakpointObserver.observe([Breakpoints.HandsetLandscape, Breakpoints.HandsetPortrait,])
    //   .pipe(map(x => x.matches),);

    let isHandset: Observable<BreakpointState> = this.breakpointObserver.observe([Breakpoints.HandsetLandscape,
    Breakpoints.HandsetPortrait]);
    let isTablet: Observable<BreakpointState> = this.breakpointObserver.observe(Breakpoints.Tablet);
    let isWeb: Observable<BreakpointState> = this.breakpointObserver.observe([Breakpoints.WebLandscape, Breakpoints.WebPortrait]);
    let isPortrait: Observable<BreakpointState> = this.breakpointObserver.observe('(orientation: portrait)');
    let isLandscape: Observable<BreakpointState> = this.breakpointObserver.observe('(orientation: landscape)');

    const isSmallScreen = this.breakpointObserver.isMatched('(max-width: 599px)');
    const isMobile = this.breakpointObserver.isMatched('(max-width: 767px)');
  }

  ngOnInit(): void {

  }

  onToggleSidenav() {
    this.sidenavToggle.emit();
  }

}
