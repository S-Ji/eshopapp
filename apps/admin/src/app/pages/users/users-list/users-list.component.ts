import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService, User} from '@eshopapp/users';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'eshopapp-users-list',
  templateUrl: './users-list.component.html',
  styles: [
  ]
})
export class UsersListComponent implements OnInit, OnDestroy {
  users: User[] = [];
  endsubs$: Subject<any> = new Subject();

  constructor(
    private messageService: MessageService,
    private usersService: UsersService,
    private confirmationService: ConfirmationService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this._getUser();
  }
  ngOnDestroy(): void {
    this.endsubs$.next();
    this.endsubs$.complete();
  }

  deleteUser(userId: string) {
    this.confirmationService.confirm({
      message: 'Do you want to DELETE this User?',
      header: 'DELETE',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.usersService.deleteUser(userId).subscribe((response) => {
          this._getUser();
          this.messageService.add({
            severity:'success', 
            summary:'Success', 
            detail:'User is deleted'});
            
        },
        (error) => {
          this.messageService.add({
            severity:'error', 
            summary:'Error', 
            detail:'User is not deleted'});
        });
      },
      reject: () => {}
    });
  }

  getCountryName(countryKey: string) {
    return this.usersService.getCountry(countryKey);
  }

  updateUser(userid: string) {
    this.router.navigateByUrl(`users/form/${userid}`);
  }

  private _getUser() {
    this.usersService.getUsers().pipe(takeUntil(this.endsubs$)).subscribe((users) => {
      this.users = users;
    });
  }
}
