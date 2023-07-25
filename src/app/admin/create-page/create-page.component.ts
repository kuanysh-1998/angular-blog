import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-create-page',
  templateUrl: './create-page.component.html',
  styleUrls: ['./create-page.component.scss'],
})
export class CreatePageComponent {
  postForm: FormGroup;
  constructor(private formBuilder: FormBuilder) {
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

    return console.log(this.postForm.value);
  }
}
