import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BASE_URL } from './constants/urls';
import { IPost } from './interfaces';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  constructor(private http: HttpClient) {}

  createPost(post: IPost): Observable<IPost> {
    return this.http.post<IPost>(BASE_URL, post);
  }
}
