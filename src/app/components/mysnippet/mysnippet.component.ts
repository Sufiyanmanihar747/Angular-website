import { Component, OnInit, ViewChild } from '@angular/core';
import { DbService } from '../../services/db.service';
import { ToastComponent } from '../toast/toast.component';
import { CommonModule } from '@angular/common';
import { ShimmerComponent } from "../shimmer/shimmer.component";

@Component({
    selector: 'app-mysnippet',
    standalone: true,
    templateUrl: './mysnippet.component.html',
    styleUrls: ['./mysnippet.component.css'],
    imports: [CommonModule, ToastComponent, ShimmerComponent]
})

export class MysnippetComponent implements OnInit {
  @ViewChild(ToastComponent) toast!: ToastComponent;
  loading = true;

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
      this.loading = false;
      if (data && data.length > 0) {
        this.items = data;
      } else {
        this.items = [];
      }
    } catch (error) {
      console.error('Error fetching data', error);
    }

  }
  async deleteSnippet(id: string) {
    console.log("this is delete snippet")
    await this.dbService.deleteSnippet(id);
    this.toast.showToast('Snippet deleted successfully!');
    await this.fetchUserSnippets();
  }

  async editSnippet(id:string){
    const data = await this.dbService.editSnippet(id);
    console.log(data);
  }


}
