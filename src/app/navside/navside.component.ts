import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MatListModule } from "@angular/material/list";
import { MatMenuModule } from "@angular/material/menu";
import { MatIconModule } from "@angular/material/icon";
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-navside',
  imports:[CommonModule,MatListModule,MatMenuModule,MatIconModule,RouterModule],
  templateUrl: './navside.component.html',
  styleUrls: ['./navside.component.css']
})
export class NavsideComponent implements OnInit {


  constructor(
  ) {
  }

  ngOnInit(): void {

  }

}
