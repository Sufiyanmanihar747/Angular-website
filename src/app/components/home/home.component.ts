import { Component, OnInit } from '@angular/core';
import { DbService } from '../../services/db.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ShimmerComponent } from "../shimmer/shimmer.component";

@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
    imports: [CommonModule, RouterLink, ShimmerComponent]
})
export class HomeComponent implements OnInit {

  constructor(private dbService: DbService) { }

  items: any[] = []
  loading = true
  ngOnInit() {
    this.dbService.getAllSnippet().then((data: any) => {
      this.loading = false;
      this.items = data
    });
  }
}
