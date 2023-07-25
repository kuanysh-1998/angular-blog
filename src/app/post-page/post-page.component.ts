import { Component, OnInit } from '@angular/core';
import { PostsService } from '../shared/posts.service';
import { IPost } from '../shared/interfaces';
import { ActivatedRoute, Params } from '@angular/router';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.scss'],
})
export class PostPageComponent implements OnInit {
  post!: IPost;

  constructor(
    private postsService: PostsService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        switchMap((params: Params) => {
          return this.postsService.getPostById(params['id']);
        })
      )
      .subscribe((post) => {
        this.post = post;
        console.log(post.title);
        
      });
  }
}
