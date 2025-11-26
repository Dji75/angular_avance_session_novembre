import { Directive } from '@angular/core';

@Directive({
  selector: 'p[appHighlight],p[highlight],span[highlight]',
  host: {
    '[class.highlighted]': 'isHovered',
    '(mouseenter)': 'onHover()',
    '(mouseleave)': 'onLeave()',
  }
})
export class Highlight {
  protected isHovered = false;

  onHover() {
    this.isHovered = true;
  }

  onLeave() {
    this.isHovered = false;
  }
}
