import { Component, Input, OnInit } from '@angular/core';
import { PostsService } from '../../posts.service';
import { IPost } from '../../interfaces';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent {
  @Input() posts: IPost[] = [];

  constructor() {}
}
