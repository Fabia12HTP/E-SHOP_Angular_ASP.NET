import { Component, inject, signal } from '@angular/core';
import { UserprofileService } from '../services/userprofile.service';
import { Subject, takeUntil } from 'rxjs';
import { User } from '../interfaces/user';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent  {

  private profileService = inject(UserprofileService);
  private destroy$ = new Subject<void>();

  user = signal<User | undefined>(undefined);

  ngOnInit(): void {
    this.profileService.getUserInfo()
      .pipe(takeUntil(this.destroy$))
      .subscribe(profile => this.user.set(profile));
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) return;

    const file = input.files[0];
    this.profileService.uploadProfilePicture(file).subscribe({
      next: (res) => {
        console.log('Uploaded successfully', res);
        // reload profile
        this.profileService.getUserInfo().subscribe(profile => this.user.set(profile));
      },
      error: (err) => console.error('Upload error', err),
    });
  }
}
