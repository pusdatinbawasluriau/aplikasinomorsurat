import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NumberingFormComponent } from '../numbering-form/numbering-form.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NumberingFormComponent, RouterLink]
})
export class UserViewComponent {}
