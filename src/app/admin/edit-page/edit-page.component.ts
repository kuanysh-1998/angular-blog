import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { IPost } from 'src/app/shared/interfaces';
import { PostsService } from 'src/app/shared/posts.service';

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.scss'],
})
export class EditPageComponent implements OnInit {
  postForm!: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private postService: PostsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        switchMap((params: Params) => {
          return this.postService.getPostById(params['id']);
        })
      )
      .subscribe((post: IPost) => {
        this.postForm = this.formBuilder.group({
          title: [post.title, Validators.required],
          author: post.author,
          content: [post.content, Validators.required],
          date: post.date,
        });
      });
  }

  submit() {
    if (this.postForm.invalid) return;

    this.postService.updatePost(this.postForm.value).subscribe({
      next: () => {
        this.router.navigateByUrl('/admin/dashboard');
      },
    });
  }
}
