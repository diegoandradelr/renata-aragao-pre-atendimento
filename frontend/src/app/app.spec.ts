
import { TestBed } from '@angular/core/testing';
import { App } from './app';
import { SupabaseService } from './services/supabase.service';

describe('App', () => {
  let insertMock: ReturnType<typeof vi.fn>;
  let fromMock: ReturnType<typeof vi.fn>;

  beforeEach(async () => {
    insertMock = vi.fn().mockResolvedValue({ error: null });
    fromMock = vi.fn().mockReturnValue({ insert: insertMock });

    await TestBed.configureTestingModule({
      imports: [App],
      providers: [
        {
          provide: SupabaseService,
          useValue: {
            client: {
              from: fromMock
            }
          }
        }
      ]
    }).compileComponents();
  });

  function createValidForm(app: App) {
    app['attendanceForm'].setValue({
      name: 'Maria da Silva',
      email: 'maria@email.com',
      phone: '81999999999',
      subject: 'Direito da saúde',
      message: 'Gostaria de obter orientação jurídica.',
      consent: true
    });
  }

  it('deve criar o componente principal', () => {
    const fixture = TestBed.createComponent(App);

    expect(fixture.componentInstance).toBeTruthy();
  });

  it('deve apresentar o título institucional', async () => {
    const fixture = TestBed.createComponent(App);

    fixture.detectChanges();
    await fixture.whenStable();

    const element = fixture.nativeElement as HTMLElement;

    expect(element.querySelector('h1')?.textContent)
      .toContain('Defender a saúde');
  });

  it('deve iniciar com o formulário inválido', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;

    expect(app['attendanceForm'].invalid).toBe(true);
  });

  it('deve validar os dados obrigatórios', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;

    createValidForm(app);

    expect(app['attendanceForm'].valid).toBe(true);
  });

  it('deve rejeitar um e-mail inválido', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;

    app['attendanceForm'].controls.email.setValue('email-invalido');

    expect(app['attendanceForm'].controls.email.invalid).toBe(true);
  });

  it('deve rejeitar uma mensagem curta', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;

    app['attendanceForm'].controls.message.setValue('Olá');

    expect(app['attendanceForm'].controls.message.invalid).toBe(true);
  });

  it('deve exigir o consentimento do usuário', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;

    app['attendanceForm'].controls.consent.setValue(false);

    expect(app['attendanceForm'].controls.consent.invalid).toBe(true);
  });

  it('deve alternar o menu de navegação', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;

    app['toggleMenu']();

    expect(app['menuOpen']()).toBe(true);

    app['toggleMenu']();

    expect(app['menuOpen']()).toBe(false);
  });

  it('deve alternar uma pergunta do FAQ', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;

    app['toggleFaq'](0);

    expect(app['faqItems']()[0]).toBe(true);
  });

  it('deve gerar uma URL do WhatsApp com os dados enviados', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;

    app['submittedName'].set('Maria da Silva');
    app['submittedEmail'].set('maria@email.com');
    app['submittedPhone'].set('81999999999');
    app['submittedSubject'].set('Direito da saúde');
    app['submittedMessage'].set('Gostaria de obter orientação jurídica.');

    const url = app['whatsappUrl']();

    expect(url).toContain('https://wa.me/5581997496473');
    expect(url).toContain(encodeURIComponent('Maria da Silva'));
    expect(url).toContain(encodeURIComponent('maria@email.com'));
  });

  it('deve enviar os dados ao Supabase e apresentar confirmação', async () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;

    createValidForm(app);

    await app['onSubmit']();

    expect(fromMock).toHaveBeenCalledWith('pre_atendimentos');

    expect(insertMock).toHaveBeenCalledWith({
      nome: 'Maria da Silva',
      email: 'maria@email.com',
      telefone: '81999999999',
      assunto: 'Direito da saúde',
      mensagem: 'Gostaria de obter orientação jurídica.'
    });

    expect(app['submitted']()).toBe(true);
    expect(app['saving']()).toBe(false);
  });

  it('deve apresentar erro quando o Supabase falhar', async () => {
    insertMock.mockResolvedValue({
      error: { message: 'Erro de conexão' }
    });

    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;

    createValidForm(app);

    await app['onSubmit']();

    expect(app['submitted']()).toBe(false);
    expect(app['submitError']()).toContain('Não foi possível registrar');
    expect(app['saving']()).toBe(false);
  });

  it('deve preservar os dados quando o envio falhar', async () => {
    insertMock.mockResolvedValue({
      error: { message: 'Erro de conexão' }
    });

    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;

    createValidForm(app);

    await app['onSubmit']();

    expect(app['attendanceForm'].controls.name.value)
      .toBe('Maria da Silva');

    expect(app['attendanceForm'].controls.email.value)
      .toBe('maria@email.com');
  });

  it('não deve enviar dados quando o formulário for inválido', async () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;

    await app['onSubmit']();

    expect(fromMock).not.toHaveBeenCalled();
    expect(app['submitted']()).toBe(false);
  });
});
