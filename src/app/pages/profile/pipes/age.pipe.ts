import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'age'
})
export class AgePipe implements PipeTransform {

  transform(dob: Date): number {
    const today = Date.now();
    const dateDiff = today - dob.getTime();
    const age = Math.abs((new Date(dateDiff)).getFullYear() - 1970);
    return age;
  }

}
