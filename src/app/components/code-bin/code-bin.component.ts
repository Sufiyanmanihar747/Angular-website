import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DbService } from '../../services/db.service';
import { Snippet } from '../../../models/Snippet';

@Component({
  selector: 'app-code-bin',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './code-bin.component.html',
  styleUrl: './code-bin.component.css'
})
export class CodeBinComponent {
  constructor(private dbService: DbService) { }
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
    this.dbService.createSnippet(this.binForm.value as Snippet);
    console.log(this.binForm.value)
    this.binForm.reset();
  }
}
