import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VehicleListComponent } from "../vehicle-list/vehicle-list.component";

@Component({
    selector: 'app-vehicle-shell',
    standalone: true,
    template: `
    <app-vehicle-list></app-vehicle-list>
  `,
    styles: [],
    imports: [CommonModule, VehicleListComponent]
})
export class VehicleShellComponent {

}
