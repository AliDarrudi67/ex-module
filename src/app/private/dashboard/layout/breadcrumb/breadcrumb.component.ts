import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterModule,
} from '@angular/router';
import { BreadcrumbMap } from '@shared/enums/breadcrumb';
import { IBreadCrumb } from '@shared/models/general/breadcrumb.model';
import { filter } from 'rxjs';

@Component({
  selector: 'app-breadcrumb',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './breadcrumb.component.html',
  styleUrl: './breadcrumb.component.scss',
})
export class BreadcrumbComponent {
  breadcrumbs: IBreadCrumb[] = [];

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.generateBreadcrumbsFromUrl();

    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.generateBreadcrumbsFromUrl();
      });
  }

  generateBreadcrumbsFromUrl() {
    const urlSegments = this.router.url.split('/').filter((s) => s);
    const breadcrumbs: IBreadCrumb[] = [];
    let accumulatedUrl = '';

    urlSegments.forEach((segment) => {
      accumulatedUrl += '/' + segment;

      // 👇 بررسی کنیم آیا segment شبیه id است یا نه
      const isUuidOrId =
        /^[0-9a-fA-F-]{10,}$/.test(segment) || /^[0-9]+$/.test(segment);

      // 👇 اگر id است، در label نیاور ولی در URL نگه دار
      let label = isUuidOrId ? '' : this.getLabelForSegment(segment);

      // فقط اگر label داریم، به breadcrumb اضافه کن
      if (label) {
        breadcrumbs.push({ label, url: accumulatedUrl });
      }
    });

    this.breadcrumbs = breadcrumbs;
  }

  getLabelForSegment(segment: string): string {
    if (!isNaN(Number(segment))) return ''; // اگه id هست نادیده بگیر
    return BreadcrumbMap[segment] || segment;
  }
}
