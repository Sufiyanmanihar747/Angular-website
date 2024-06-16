import { Component, OnInit } from '@angular/core';
import { DbService } from '../../services/db.service';

@Component({
  selector: 'app-mysnippet',
  templateUrl: './mysnippet.component.html',
  styleUrls: ['./mysnippet.component.css']
})

export class MysnippetComponent implements OnInit {
  constructor(private dbService: DbService) { }

  items: any[] = [];

  ngOnInit() {
    this.fetchUserSnippets();
  }

  async fetchUserSnippets() {
    console.log("Fetching user snippets");
    try {
      const data: any[] = await this.dbService.getMySnippet();
      console.log('Fetched snippets:', data);
      if (data && data.length > 0) {
        this.items = data;
      } else {
        this.items = [{ title: "No data found!", code: "" }]; // Default item
      }
    } catch (error) {
      console.error('Error fetching data', error);
    }
  }
}
