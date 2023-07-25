import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { PostsService } from 'src/app/shared/posts.service';
import { IPost } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-create-page',
  templateUrl: './create-page.component.html',
  styleUrls: ['./create-page.component.scss'],
})
export class CreatePageComponent {
  postForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private postService: PostsService
  ) {
    this.postForm = this.formBuilder.group({
      title: [null, Validators.required],
      author: [null, Validators.required],
      content: [null, Validators.required],
    });
  }

  submit() {
    if (this.postForm.invalid) {
      return;
    }
    const post: IPost = {
      title: this.postForm.value.title,
      content: this.postForm.value.content,
      author: this.postForm.value.author,
      date: new Date(),
    };
    this.postService.createPost(post).subscribe(() => {
      this.postForm.reset()
    })
  }
}
