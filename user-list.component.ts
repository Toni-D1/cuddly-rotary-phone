import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-user-list',
    template: `
    <div *ngIf="isLoading" class="loading">Loading...</div>
    <div *ngIf="error" class="error">{{ error }}</div>
    <ul class="user-list">
      <li *ngFor="let user of users; trackBy: trackByFn" class="user-item">
        <strong>{{ user.name }}</strong> - <em>{{ user.email }}</em>
      </li>
    </ul>
  `,
    styles: [`
    .loading {
      font-style: italic;
      color: #888;
    }
    .error {
      color: red;
      font-weight: bold;
    }
    .user-list {
      list-style: none;
      padding: 0;
    }
    .user-item {
      padding: 8px;
      border-bottom: 1px solid #ccc;
    }
  `]
})
export class UserListComponent implements OnInit {
    users: any[] = [];
    isLoading = true;
    error = '';

    constructor(private http: HttpClient) {}

    ngOnInit(): void {
        this.http.get('https://jsonplaceholder.typicode.com/users').subscribe(
            (data: any) => {
                this.users = data;
                this.isLoading = false;
            },
            (err) => {
                this.error = 'Failed to load users';
                this.isLoading = false;
            }
        );
    }

    trackByFn(index: number, item: any) {
        return item.id;
    }
}
