import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoriesService, Category} from '@eshopapp/products';
import {MessageService, ConfirmationService} from 'primeng/api';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
@Component({
  selector: 'admin-categories-list',
  templateUrl: './categories-list.component.html',
  styles: [
  ]
})
export class CategoriesListComponent implements OnInit, OnDestroy {
  categories: Category[] = [];
  endsubs$: Subject<any> = new Subject();
  constructor(
    private messageService: MessageService,
    private categoriesService: CategoriesService,
    private confirmationService: ConfirmationService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this._getCategories();
    
  }

  ngOnDestroy(): void {
    this.endsubs$.next();
    this.endsubs$.complete();
  }

  deleteCategory(categoryId: string) {
    this.confirmationService.confirm({
      message: 'Do you want to DELETE this Category?',
      header: 'DELETE',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.categoriesService.deleteCategory(categoryId).subscribe((response) => {
          this._getCategories();
          this.messageService.add({
            severity:'success', 
            summary:'Success', 
            detail:'Category is deleted'});
            
        },
        (error) => {
          this.messageService.add({
            severity:'error', 
            summary:'Error', 
            detail:'Category is not deleted'});
        });
      },
      reject: () => {}
    });
  }

  updateCategory(categoryId: string) {
    this.router.navigateByUrl(`categories/form/${categoryId}`);
  }

  private _getCategories() {
    this.categoriesService
    .getCategories()
    .pipe(takeUntil(this.endsubs$))
    .subscribe((cats) => {
      this.categories = cats;
    });
  }
}
