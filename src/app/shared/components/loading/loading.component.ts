import { Component } from '@angular/core';
import { LoadingService } from '../../loading.service';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss'],
})
export class LoadingComponent {
  isLoading!: boolean;
  constructor(private loadingService: LoadingService) {
    loadingService.isLoading.subscribe((isLoding) => {
      this.isLoading = isLoding;
    });
  }
}
