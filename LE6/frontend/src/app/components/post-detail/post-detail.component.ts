import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Post } from '../../models/post.model';

@Component({
  selector: 'app-post-detail',
  standalone: false,
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent implements OnInit {

  private routeSub: Subscription = new Subscription();
  private id: number = 0;

  post?: Post;
  loading = true;
  error = '';

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(params => {
      this.id = params['id'];
    })
    this.initData();
  }

  initData(): void {
    this.loading = true;
    this.error = '';

    this.http.get<Post>("https://localhost:7161/api/post/" + this.id).subscribe({
      next: (data: Post) => {
        this.post = data;
        this.loading = false;
        this.cdr.markForCheck();
        console.log(this.post);
      },
      error: () => {
        this.error = 'Could not load this post.';
        this.loading = false;
        this.cdr.markForCheck();
      }
    })
  }
}
