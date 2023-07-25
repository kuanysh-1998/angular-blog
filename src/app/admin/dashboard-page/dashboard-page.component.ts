import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IPost } from 'src/app/shared/interfaces';
import { PostsService } from 'src/app/shared/posts.service';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss'],
})
export class DashboardPageComponent implements OnInit, OnDestroy {
  posts: IPost[] = [];
  searchPost: string = '';
  postsSubscription!: Subscription;
  dSubscription!: Subscription;
  constructor(private postsService: PostsService) {}

  ngOnInit(): void {
    this.getAllPosts();
  }

  ngOnDestroy(): void {
    if (this.postsSubscription) {
      this.postsSubscription.unsubscribe();
    }

    if (this.dSubscription) {
      this.dSubscription.unsubscribe();
    }
  }

  getAllPosts() {
    this.postsSubscription = this.postsService.getAllPosts().subscribe({
      next: (res) => {
        this.posts = res;
      },
    });
  }

  removePost(id: any) {
     this.dSubscription = this.postsService.deletePost(id).subscribe(() => {
      this.posts = this.posts.filter((post) => post.id !== id);
    });
  }
}
