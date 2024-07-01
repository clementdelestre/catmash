import { Component, input, output } from '@angular/core';
import { Cat } from '../../../../../../core/models/cat.model';
import { ApiService } from '../../../../../../core/http/api.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-vote-card',
  standalone: true,
  imports: [],
  templateUrl: './vote-card.component.html',
  styleUrl: './vote-card.component.scss',
})
export class VoteCardComponent {

  cat = input.required<Cat>();
  onVote = output<void>();

  constructor(private readonly apiService: ApiService) {}

  vote() {
    firstValueFrom(this.apiService.post('vote', { catId: this.cat().id })).then(() => {
      this.onVote.emit();
    });
  }
}
