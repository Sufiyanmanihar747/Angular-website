import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DbService } from '../../services/db.service';
import { Snippet } from '../../../models/Snippet';
import { ToastComponent } from '../toast/toast.component';

@Component({
    selector: 'app-code-bin',
    standalone: true,
    templateUrl: './code-bin.component.html',
    styleUrl: './code-bin.component.css',
    imports: [ReactiveFormsModule, ToastComponent]
})
export class CodeBinComponent {
  constructor(private dbService: DbService) { }
  @ViewChild(ToastComponent) toast!: ToastComponent;

  // Reactive driven form 
  title = new FormControl("", [
    Validators.required,
  ])

  code = new FormControl("", [
    Validators.required,
  ])

  binForm = new FormGroup({
    title: this.title,
    code: this.code
  })

  save() {
    if (this.code && this.title) {
      this.dbService.createSnippet(this.binForm.value as Snippet);
      this.toast.showToast('Your Snippet added successfully!');
      this.binForm.reset();
    } 
  }
}
