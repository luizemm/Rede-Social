import { Pipe, PipeTransform } from '@angular/core';
import { post } from '../models/post.module';

@Pipe({
  name: 'exibePost'
})
export class ExibePostPipe implements PipeTransform {

  transform(listPost: post[]): post[] {
    return listPost.filter(post => !post.isComment);
  }

}
