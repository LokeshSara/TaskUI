import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
    name:'convertToSpace'
})
export class ConverttoSpacePipe implements PipeTransform{

    transform(value:string, character:string): string{
        return value.replace(character,' ');
    }
}