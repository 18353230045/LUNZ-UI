import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'domSanitizer',
  pure: false
})
export class DomSanitizerPipe implements PipeTransform {

  constructor(private sanitizer: DomSanitizer) { }

  transform(html: string): any {
    return this.sanitizer.bypassSecurityTrustResourceUrl(html);
  }
}
