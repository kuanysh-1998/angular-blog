import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { BASE_URL } from './constants/urls';
import { ICreateResponse, IPost } from './interfaces';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  constructor(private http: HttpClient) {}

  createPost(post: IPost): Observable<IPost> {
    return this.http.post(BASE_URL + '/posts.json', post).pipe(
      map((response: ICreateResponse) => {
        return {
          ...post,
          id: response.name,
          date: new Date(post.date),
        };
      })
    );
  }

  getAllPosts(): Observable<IPost[]> {
    return this.http.get<IPost[]>(BASE_URL + '/posts.json').pipe(
      map((response: { [key: string]: any }) => {
        return Object.keys(response).map((key) => ({
          ...response[key],
          id: key,
          date: new Date(response[key].date),
        }));
      })
    );
  }

  updatePost(post: IPost): Observable<IPost> {
    return this.http.patch<IPost>(BASE_URL + `/posts/${post.id}.json`, post);
  }

  getPostById(id: string): Observable<IPost> {
    return this.http.get<IPost>(BASE_URL + `/posts/${id}.json`).pipe(
      map((post: IPost) => {
        return {
          ...post,
          id,
          date: new Date(post.date),
        };
      })
    );
  }

  deletePost(id: string): Observable<void> {
    return this.http.delete<void>(BASE_URL + `/posts/${id}.json`);
  }
}
