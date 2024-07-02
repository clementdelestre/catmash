import { Component, HostListener, signal } from '@angular/core';
import { PodiumCardComponent } from './components/podium-card/podium-card.component';
import { PodiumRank } from '../../models/podium-rank.enum';
import { ApiService } from '../../../../core/http/api.service';
import { firstValueFrom } from 'rxjs';
import { RankedCat } from '../../models/ranked-cat.model';
import { getCatPictureUrl } from '../../../../shared/tools/url.tool';
import { PageMetaDto } from '../../../../shared/dto/page-meta.dto';
import { PageOptionsDto } from '../../../../shared/dto/page-options.dto';
import { Order } from '../../../../shared/constants/order.constant';
import { PageDto } from '../../../../shared/dto/page.dto';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-score',
  standalone: true,
  imports: [PodiumCardComponent, RouterLink],
  templateUrl: './score.component.html',
  styleUrl: './score.component.scss',
})
export class ScoreComponent {
  public PodiumRank = PodiumRank;
  public getCatPictureUrl = getCatPictureUrl;

  rankedCats = signal<RankedCat[]>([]);

  isLoading = signal(false);

  pageMeta?: PageMetaDto;

  pagination: PageOptionsDto = {
    page: 1,
    take: 10,
    order: Order.DESC,
  };

  constructor(private readonly apiService: ApiService) {}

  ngOnInit() {
    this.getScore();
  }

  getScore() {
    this.isLoading.set(true);
    firstValueFrom(
      this.apiService.get<PageDto<RankedCat>>('score', { ...this.pagination }),
    ).then((page) => {
      this.rankedCats.update((v) => [...v, ...page.data]);
      this.pageMeta = page.meta;
      this.isLoading.set(false);
      this.checkLoadRequired();
    });
  }

  @HostListener('window:scroll', ['$event'])
  onWindowsScroll(event: any) {
    this.checkLoadRequired();
  }

  checkLoadRequired() {
    let pos =
      (document.documentElement.scrollTop || document.body.scrollTop) +
      document.documentElement.offsetHeight;
    let max = document.documentElement.scrollHeight;

    if (pos >= (4 / 5) * max && this.isLoading() == false && this.pageMeta?.hasNextPage) {
      this.pagination.page += 1;
      this.getScore();
    }
  }
}
