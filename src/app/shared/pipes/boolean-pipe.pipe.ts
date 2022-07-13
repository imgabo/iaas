import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'booleanPipe'
})
export class BooleanPipePipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    return value ? 'Si' : 'No';
  }

}
