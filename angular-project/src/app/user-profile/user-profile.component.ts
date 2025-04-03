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

  userProfile = inject(UserprofileService);

  userP = signal<User>(undefined);
  private destroy$ = new Subject<void>(); 

  ngOnInit() {
    this.userProfile.getUserInfo()
      .pipe(takeUntil(this.destroy$))
      .subscribe(result => this.userP.set(result));

      //console.log(this.userP);
  };
}
