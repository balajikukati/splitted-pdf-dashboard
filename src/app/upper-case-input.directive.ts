import { Directive, ElementRef, HostListener, Renderer2, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Directive({
  selector: 'input[toUppercaseInput]',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => UpperCaseInputDirective),
    },
  ],
})
export class UpperCaseInputDirective implements ControlValueAccessor {
  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

  @HostListener('input', ['$event'])
  onInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    const start = target.selectionStart;
    const end = target.selectionEnd;

    // Convert value to uppercase
    target.value = target.value.toUpperCase();
    target.setSelectionRange(start, end);

    // Notify Angular of the change
    this.onChange(target.value);
  }

  writeValue(value: any): void {
    if (value !== null && value !== undefined) {
      const upperValue = value.toUpperCase();
      if (this.elementRef.nativeElement.value !== upperValue) {
        this.elementRef.nativeElement.value = upperValue;
      }
    }
  }

  registerOnChange(fn: any): void { this.onChange = fn; }
  registerOnTouched(fn: any): void { this.onTouched = fn; }
  setDisabledState?(isDisabled: boolean): void {
    // Handle disabled state if needed
    this.renderer.setProperty(this.elementRef.nativeElement, 'disabled', isDisabled);
  }

  private onChange = (value: any) => {};
  private onTouched = () => {};
}
