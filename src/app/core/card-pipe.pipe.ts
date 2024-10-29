import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cardPipe',
  standalone: true
})
export class CardPipePipe implements PipeTransform {

  transform(value: string): string {
    return value.replace(/(.{4})/g, '$1 ').trim();
  }

}
