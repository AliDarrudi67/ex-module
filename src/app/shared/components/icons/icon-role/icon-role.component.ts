import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-icon-role',
  standalone: true,
  imports: [],
  templateUrl: './icon-role.component.html',
  styleUrl: './icon-role.component.scss'
})
export class IconRoleComponent {
@Input() active=false;
}
