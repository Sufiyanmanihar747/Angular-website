import { Component } from '@angular/core';
import { DbService } from '../../services/db.service';

@Component({
  selector: 'app-show',
  standalone: true,
  imports: [],
  templateUrl: './show.component.html',
  styleUrl: './show.component.css'
})
export class ShowComponent {
  constructor(private dbServices: DbService) { }
  id = "WxgWoR41pneGg3nuSAB3hvaHVn33"
  data = this.dbServices.getSnippetById(this.id)
  
}
