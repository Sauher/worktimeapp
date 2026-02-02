import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  private readonly loadingSubject = new BehaviorSubject<boolean>(false);
  private loadingCount = 0;
  public readonly loading$ = this.loadingSubject.asObservable();

  constructor() { }

  public show(): void {
    this.loadingCount++;
    this.emitLoadingState(true);
  }

  public hide(): void {
    if (this.loadingCount === 0) {
      return;
    }

    this.loadingCount--;

    if (this.loadingCount === 0) {
      this.emitLoadingState(false);
    }
  }

  private emitLoadingState(isLoading: boolean): void {
    Promise.resolve().then(() => this.loadingSubject.next(isLoading));
  }
}
