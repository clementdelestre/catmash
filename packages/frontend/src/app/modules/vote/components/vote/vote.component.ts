import { Component } from '@angular/core';
import { VoteCardComponent } from './components/vote-card/vote-card.component';

@Component({
  selector: 'app-vote',
  standalone: true,
  imports: [VoteCardComponent],
  templateUrl: './vote.component.html',
  styleUrl: './vote.component.scss'
})
export class VoteComponent {

}
