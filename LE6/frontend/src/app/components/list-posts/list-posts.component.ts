import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Post } from '../../models/post.model';

@Component({
  selector: 'app-list-posts',
  standalone: false,
  templateUrl: './list-posts.component.html',
  styleUrls: ['./list-posts.component.css']
})
export class ListPostsComponent implements OnInit {

  posts?: Post[] = [];
  loading = true;
  error = '';

  constructor(private http: HttpClient, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.initData();
  }

  initData(): void {
    this.loading = true;
    this.error = '';

    this.http.get<Post[]>('https://localhost:7161/api/post')
      .subscribe({
        next: (data: Post[]) => {
          this.posts = data;
          this.loading = false;
          this.cdr.markForCheck();
          console.log(this.posts);
        },
        error: () => {
          this.error = 'Could not load posts. Make sure the API is running.';
          this.loading = false;
          this.cdr.markForCheck();
        }
      })
  }

  preview(body: string): string {
    if (!body) {
      return '';
    }
    return body.length > 140 ? body.substring(0, 140) + '...' : body;
  }
}
