
import {
  Component,
  ElementRef,
  signal,
  ViewChild
} from '@angular/core';

import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [ReactiveFormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  @ViewChild('confirmationCard')
  private confirmationCard?: ElementRef<HTMLElement>;

  protected readonly menuOpen = signal(false);
  protected readonly currentYear = new Date().getFullYear();

  protected readonly faqItems = signal([
    false,
    false,
    false,
    false
  ]);

  protected readonly submitted = signal(false);

  protected readonly submittedName = signal('');
  protected readonly submittedEmail = signal('');
  protected readonly submittedPhone = signal('');
  protected readonly submittedSubject = signal('');
  protected readonly submittedMessage = signal('');

  private readonly whatsappNumber = '5581997496473';

  protected readonly attendanceForm = new FormGroup({
    name: new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.minLength(3)
      ]
    }),

    email: new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.email
      ]
    }),

    phone: new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.pattern(/^(?=(?:\D*\d){10,11}\D*$)[\d\s()+.-]+$/)
      ]
    }),

    subject: new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.required
      ]
    }),

    message: new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.minLength(10)
      ]
    }),

    consent: new FormControl(false, {
      nonNullable: true,
      validators: [
        Validators.requiredTrue
      ]
    })
  });

  toggleMenu(): void {
    this.menuOpen.update((open) => !open);
  }

  closeMenu(): void {
    this.menuOpen.set(false);
  }

  toggleFaq(index: number): void {
    this.faqItems.update((items) =>
      items.map((item, i) => (i === index ? !item : item))
    );
  }

  protected isInvalid(
    field: keyof typeof this.attendanceForm.controls
  ): boolean {
    const control = this.attendanceForm.controls[field];

    return control.invalid && control.touched;
  }

  onSubmit(): void {
    if (this.attendanceForm.invalid) {
      this.attendanceForm.markAllAsTouched();

      const firstInvalidField = document.querySelector<HTMLElement>(
        '.attendance-form .ng-invalid'
      );

      firstInvalidField?.focus();

      return;
    }

    const formData = this.attendanceForm.getRawValue();

    this.submittedName.set(formData.name.trim());
    this.submittedEmail.set(formData.email.trim());
    this.submittedPhone.set(formData.phone.trim());
    this.submittedSubject.set(formData.subject);
    this.submittedMessage.set(formData.message.trim());

    this.submitted.set(true);

    setTimeout(() => {
      this.confirmationCard?.nativeElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });

      this.confirmationCard?.nativeElement.focus();
    });
  }

  editRequest(): void {
    this.submitted.set(false);

    setTimeout(() => {
      document.getElementById('name')?.focus();
    });
  }

  protected whatsappUrl(): string {
    const message = [
      'Olá, gostaria de dar continuidade ao meu pré-atendimento.',
      '',
      `Nome: ${this.submittedName()}`,
      `E-mail: ${this.submittedEmail()}`,
      `Telefone: ${this.submittedPhone()}`,
      `Assunto: ${this.submittedSubject()}`,
      '',
      'Como podemos ajudar:',
      this.submittedMessage()
    ].join('\n');

    return `https://wa.me/${this.whatsappNumber}?text=${encodeURIComponent(message)}`;
  }
}
