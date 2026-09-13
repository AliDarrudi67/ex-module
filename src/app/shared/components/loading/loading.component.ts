import { Component } from '@angular/core';
import { IconLoadingComponent } from "../icons/icon-loading/icon-loading.component";

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [IconLoadingComponent],
  templateUrl: './loading.component.html',
  styleUrl: './loading.component.scss'
})
export class LoadingComponent {

}
