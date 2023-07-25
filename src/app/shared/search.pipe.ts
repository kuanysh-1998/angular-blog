import { Pipe, PipeTransform } from '@angular/core';
import { IPost } from './interfaces';

@Pipe({
  name: 'search',
})
export class SearchPipe implements PipeTransform {
  transform(posts: IPost[], searchPost: string): IPost[] {
    if (!posts || !searchPost) return posts;

    return posts.filter((post) =>
      post.title.toLowerCase().includes(searchPost.toLowerCase())
    );
  }
}
