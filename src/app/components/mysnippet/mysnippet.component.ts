import { Component, OnInit, ViewChild } from '@angular/core';
import { DbService } from '../../services/db.service';
import { ToastComponent } from '../toast/toast.component';
import { CommonModule } from '@angular/common';
import { ShimmerComponent } from "../shimmer/shimmer.component";
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-mysnippet',
  standalone: true,
  templateUrl: './mysnippet.component.html',
  styleUrls: ['./mysnippet.component.css'],
  imports: [CommonModule, ToastComponent, ShimmerComponent, FormsModule]
})

export class MysnippetComponent implements OnInit {
  @ViewChild(ToastComponent) toast!: ToastComponent;
  loading = true;
  editingSnippet: boolean = false;
  currentSnippet: any = null;
  formError: string = '';

  constructor(private dbService: DbService) { }

  items: any[] = [];

  ngOnInit() {
    this.fetchUserSnippets();
  }

  async fetchUserSnippets() {
    console.log("Fetching user snippets");
    try {
      const data: any[] = await this.dbService.getMySnippet();
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
    this.toast.showToast('Snippet deleted successfully!','bg-red-500');
    await this.fetchUserSnippets();
  }

  editSnippet(snippet: any) {
    this.currentSnippet = { ...snippet };
    this.editingSnippet = true;
    this.formError = '';

  }

  async updateSnippet() {
    if (!this.currentSnippet.title || !this.currentSnippet.code) {
      this.formError = 'Title and Code are required.';
      return;
    }
    try {
      await this.dbService.updateSnippet(this.currentSnippet);
      this.items = this.items.map(item => item.id === this.currentSnippet.id ? this.currentSnippet : item);
      this.editingSnippet = false;
      this.toast.showToast('Snippet updated successfully');
    } catch (error) {
      console.error('Error updating snippet', error);
      this.toast.showToast('Failed to update snippet');
    }
  }

  cancelEdit() {
    this.editingSnippet = false;
    this.currentSnippet = null;
    this.formError = '';
  }

}
