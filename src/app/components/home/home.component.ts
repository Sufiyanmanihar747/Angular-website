import { Component, OnInit } from '@angular/core';
import { DbService } from '../../services/db.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  constructor(private dbService: DbService) { }

  items: any[] = []
  ngOnInit() {
    this.fetchSnippets();
  }

  async fetchSnippets() {
    try {
      this.items = await this.dbService.getAllSnippet();
      console.log(this.items);
    } catch (error) {
      console.error('Error fetching data', error);
    }
  }

}
