import { Component, signal } from '@angular/core';
import { VoteCardComponent } from './components/vote-card/vote-card.component';
import { ApiService } from '../../../../core/http/api.service';
import { firstValueFrom } from 'rxjs';
import { Cat } from '../../../../core/models/cat.model';

@Component({
  selector: 'app-vote',
  standalone: true,
  imports: [VoteCardComponent],
  templateUrl: './vote.component.html',
  styleUrl: './vote.component.scss'
})
export class VoteComponent {

  cats = signal<Cat[]>([]);

  constructor(private readonly apiService: ApiService) {
    this.getCandidates();
  }

  getCandidates() {
    
    firstValueFrom(this.apiService.get<Cat[]>('vote/candidates')).then((res) => {
      this.cats.set(res);
    });
  }

  handleVote() {
    this.getCandidates();
  }

}
