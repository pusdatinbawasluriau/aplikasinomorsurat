import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormsModule]
})
export class LoginComponent {
  authService = inject(AuthService);
  router = inject(Router);

  username = signal('');
  password = signal('');
  error = signal<string | null>(null);

  onLogin() {
    this.error.set(null);
    const success = this.authService.login(this.username(), this.password());
    if (success) {
      this.router.navigate(['/admin']);
    } else {
      this.error.set('Username atau password salah.');
    }
  }
}
