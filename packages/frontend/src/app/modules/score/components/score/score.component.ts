import { Component, HostListener, Inject, model, signal } from '@angular/core';
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
import { CommonModule, DOCUMENT } from '@angular/common';
import { heightAnimation } from '../../../../shared/constants/animations.constants';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-score',
  standalone: true,
  imports: [PodiumCardComponent, RouterLink, CommonModule, ReactiveFormsModule],
  templateUrl: './score.component.html',
  styleUrl: './score.component.scss',
  animations: [
    heightAnimation
  ]
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

  showFilters = signal(false);

  startAt = new FormControl(null);
  endAt = new FormControl(null);

  constructor(private readonly apiService: ApiService, @Inject(DOCUMENT) private document: Document) {
    
  }

  ngOnInit() {
    this.getScore();
  }

  getScore(checkForNewPage = false) {

    const filters = {
      ...this.startAt.value ? {startAt: this.startAt.value} : null,
      ...this.endAt.value ? {endAt: this.endAt.value} : null,
    }

    this.isLoading.set(true);
    firstValueFrom(
      this.apiService.get<PageDto<RankedCat>>('score', { ...this.pagination, ...filters }),
    ).then((page) => {
      this.rankedCats.update((v) => [...v, ...page.data]);
      this.pageMeta = page.meta;
      this.isLoading.set(false);
      if(checkForNewPage)
        this.checkLoadRequired();
    });
  }

  @HostListener('window:scroll', ['$event'])
  onWindowsScroll(event: any) {
    this.checkLoadRequired();
  }

  checkLoadRequired() {
    let pos =
      (this.document.documentElement.scrollTop || this.document.body.scrollTop) +
      this.document.documentElement.offsetHeight;
    let max = this.document.documentElement.scrollHeight;

    if (pos >= (4 / 5) * max && this.isLoading() == false && this.pageMeta?.hasNextPage) {
      this.pagination.page += 1;
      this.getScore(true);
    }
  }

  toggleShowFilters() {
    this.showFilters.update((v) => !v);
  }

  applyFilters() {
    this.rankedCats.set([]);
    this.pagination.page = 1;
    this.getScore();
  }
}
