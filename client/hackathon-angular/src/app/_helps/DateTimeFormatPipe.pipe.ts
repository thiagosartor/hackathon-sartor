import { Constants } from './../util/Constants';
import { DatePipe } from '@angular/common';
import { ValueTransformer } from '@angular/compiler/src/util';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'DateTimeFormatPipe'
})
export class DateTimeFormatPipePipe extends DatePipe implements PipeTransform {

  transform(value: any, args?: any): any {
   return super.transform(value, Constants.DATE_TME_FMT);
  }

}
