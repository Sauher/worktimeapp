import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorktimesComponent } from './worktimes.component';

describe('WorktimesComponent', () => {
  let component: WorktimesComponent;
  let fixture: ComponentFixture<WorktimesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorktimesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorktimesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
