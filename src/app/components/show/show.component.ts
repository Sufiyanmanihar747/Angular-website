import { Component, OnInit } from '@angular/core';
import { DbService } from '../../services/db.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-show',
  standalone: true,
  imports: [],
  templateUrl: './show.component.html',
  styleUrl: './show.component.css'
})
export class ShowComponent implements OnInit{

  snippetId!: string;
  snippet: any;

  constructor(private dbServices: DbService, private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.dbServices.getSnippetById(id).then((data:any)=>{
      console.log(data)
    })
  }
}
