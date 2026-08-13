/* ==========================================================================
   AUTH.JS
   Cadastro, login, logout e recuperação de senha via Supabase Auth.
   O login é sempre opcional — "Continuar sem login" fecha o modal e o
   visitante segue navegando normalmente pelo conteúdo público.
   ========================================================================== */

function initAuth() {
  if (typeof supabaseClient === 'undefined') return;

  initModalControls();
  initTabSwitching();
  initPhoneMask();
  initSignupForm();
  initLoginForm();
  initForgotForm();
  initResetPasswordForm();
  initLogout();
  watchAuthState();
}

/* --------------------------------------------------------------------------
   ABRIR / FECHAR MODAL
   -------------------------------------------------------------------------- */
function initModalControls() {
  const modal = document.getElementById('authModal');
  const openBtn = document.getElementById('authOpenBtn');
  const closeBtn = document.getElementById('authCloseBtn');
  const backdrop = document.getElementById('authBackdrop');
  const continueBtns = document.querySelectorAll('#continueWithoutLoginBtn, #continueWithoutLoginBtn2');
  if (!modal || !openBtn) return;

  const openModal = (view = 'login') => {
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    switchAuthView(view);
  };

  const closeModal = () => {
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
  };

  openBtn.addEventListener('click', () => openModal('login'));
  closeBtn?.addEventListener('click', closeModal);
  backdrop?.addEventListener('click', closeModal);
  continueBtns.forEach((btn) => btn.addEventListener('click', closeModal));

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('is-open')) closeModal();
  });
}

/* --------------------------------------------------------------------------
   ALTERNAR ENTRE LOGIN / CADASTRO / RECUPERAÇÃO
   -------------------------------------------------------------------------- */
function switchAuthView(view) {
  document.querySelectorAll('.auth-form').forEach((form) => {
    form.classList.toggle('is-active', form.getAttribute('data-view') === view);
  });

  document.querySelectorAll('.auth-tab').forEach((tab) => {
    const isMatch = tab.getAttribute('data-view') === view;
    tab.classList.toggle('is-active', isMatch);
    tab.setAttribute('aria-selected', String(isMatch));
  });
}

function initTabSwitching() {
  document.getElementById('tabLogin')?.addEventListener('click', () => switchAuthView('login'));
  document.getElementById('tabSignup')?.addEventListener('click', () => switchAuthView('signup'));
  document.getElementById('forgotPasswordLink')?.addEventListener('click', () => switchAuthView('forgot'));
  document.getElementById('backToLoginLink')?.addEventListener('click', () => switchAuthView('login'));
}

/* --------------------------------------------------------------------------
   MÁSCARA SIMPLES DE TELEFONE (BR)
   -------------------------------------------------------------------------- */
function initPhoneMask() {
  const input = document.getElementById('signupTelefone');
  if (!input) return;

  input.addEventListener('input', () => {
    let digits = input.value.replace(/\D/g, '').slice(0, 11);

    if (digits.length > 6) {
      digits = digits.replace(/(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3');
    } else if (digits.length > 2) {
      digits = digits.replace(/(\d{2})(\d{0,5})/, '($1) $2');
    } else if (digits.length > 0) {
      digits = digits.replace(/(\d{0,2})/, '($1');
    }

    input.value = digits.trim();
  });
}

/* --------------------------------------------------------------------------
   VALIDAÇÕES
   -------------------------------------------------------------------------- */
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidPassword(password) {
  // Mínimo 8 caracteres, pelo menos uma letra e um número
  return /^(?=.*[A-Za-z])(?=.*\d).{8,}$/.test(password);
}

function isValidPhone(phone) {
  const digits = phone.replace(/\D/g, '');
  return digits.length === 10 || digits.length === 11;
}

/* --------------------------------------------------------------------------
   CADASTRO
   -------------------------------------------------------------------------- */
function initSignupForm() {
  const form = document.getElementById('signupForm');
  const feedback = document.getElementById('signupFeedback');
  if (!form || !feedback) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const nome = form.nome.value.trim();
    const sobrenome = form.sobrenome.value.trim();
    const telefone = form.telefone.value.trim();
    const email = form.email.value.trim();
    const password = form.password.value;
    const passwordConfirm = form.passwordConfirm.value;

    if (!nome || !sobrenome || !telefone || !email || !password || !passwordConfirm) {
      setFormFeedback(feedback, 'Preencha todos os campos.', false);
      return;
    }

    if (!isValidEmail(email)) {
      setFormFeedback(feedback, 'Informe um email válido.', false);
      return;
    }

    if (!isValidPhone(telefone)) {
      setFormFeedback(feedback, 'Informe um telefone válido, com DDD.', false);
      return;
    }

    if (!isValidPassword(password)) {
      setFormFeedback(feedback, 'A senha precisa ter no mínimo 8 caracteres, com letras e números.', false);
      return;
    }

    if (password !== passwordConfirm) {
      setFormFeedback(feedback, 'As senhas não coincidem.', false);
      return;
    }

    setFormFeedback(feedback, 'Criando sua conta...', true);

    const submitBtn = form.querySelector('button[type="submit"]');
    setSubmitLoading(submitBtn, true);

    const { error } = await supabaseClient.auth.signUp({
      email,
      password,
      options: {
        data: { nome, sobrenome, telefone }
      }
    });

    setSubmitLoading(submitBtn, false);

    if (error) {
      setFormFeedback(feedback, translateAuthError(error), false);
      return;
    }

    setFormFeedback(feedback, 'Conta criada! Verifique seu email para confirmar o cadastro.', true);
    form.reset();
  });
}

/* --------------------------------------------------------------------------
   LOGIN
   -------------------------------------------------------------------------- */
function initLoginForm() {
  const form = document.getElementById('loginForm');
  const feedback = document.getElementById('loginFeedback');
  if (!form || !feedback) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = form.email.value.trim();
    const password = form.password.value;

    if (!email || !password) {
      setFormFeedback(feedback, 'Preencha email e senha.', false);
      return;
    }

    setFormFeedback(feedback, 'Entrando...', true);

    const submitBtn = form.querySelector('button[type="submit"]');
    setSubmitLoading(submitBtn, true);

    const { error } = await supabaseClient.auth.signInWithPassword({ email, password });

    setSubmitLoading(submitBtn, false);

    if (error) {
      setFormFeedback(feedback, translateAuthError(error), false);
      return;
    }

    setFormFeedback(feedback, 'Login realizado com sucesso!', true);
    form.reset();

    setTimeout(() => {
      document.getElementById('authModal')?.classList.remove('is-open');
      document.getElementById('authModal')?.setAttribute('aria-hidden', 'true');
    }, 700);
  });
}

/* --------------------------------------------------------------------------
   RECUPERAÇÃO DE SENHA
   -------------------------------------------------------------------------- */
function initForgotForm() {
  const form = document.getElementById('forgotForm');
  const feedback = document.getElementById('forgotFeedback');
  if (!form || !feedback) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = form.email.value.trim();

    if (!isValidEmail(email)) {
      setFormFeedback(feedback, 'Informe um email válido.', false);
      return;
    }

    setFormFeedback(feedback, 'Enviando link de recuperação...', true);

    const submitBtn = form.querySelector('button[type="submit"]');
    setSubmitLoading(submitBtn, true);

    const { error } = await supabaseClient.auth.resetPasswordForEmail(email);

    setSubmitLoading(submitBtn, false);

    if (error) {
      setFormFeedback(feedback, translateAuthError(error), false);
      return;
    }

    setFormFeedback(feedback, 'Se esse email estiver cadastrado, você receberá um link de recuperação.', true);
    form.reset();
  });
}

/* --------------------------------------------------------------------------
   NOVA SENHA (chegada via link de recuperação)
   -------------------------------------------------------------------------- */
function initResetPasswordForm() {
  const form = document.getElementById('resetPasswordForm');
  const feedback = document.getElementById('resetFeedback');
  if (!form || !feedback) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const password = form.password.value;
    const passwordConfirm = form.passwordConfirm.value;

    if (!isValidPassword(password)) {
      setFormFeedback(feedback, 'A senha precisa ter no mínimo 8 caracteres, com letras e números.', false);
      return;
    }

    if (password !== passwordConfirm) {
      setFormFeedback(feedback, 'As senhas não coincidem.', false);
      return;
    }

    const submitBtn = form.querySelector('button[type="submit"]');
    setSubmitLoading(submitBtn, true);
    setFormFeedback(feedback, 'Salvando nova senha...', true);

    const { error } = await supabaseClient.auth.updateUser({ password });

    setSubmitLoading(submitBtn, false);

    if (error) {
      setFormFeedback(feedback, translateAuthError(error), false);
      return;
    }

    setFormFeedback(feedback, 'Senha atualizada com sucesso! Você já está conectado.', true);
    form.reset();

    setTimeout(() => {
      document.getElementById('authModal')?.classList.remove('is-open');
      document.getElementById('authModal')?.setAttribute('aria-hidden', 'true');
    }, 1200);
  });
}

/* --------------------------------------------------------------------------
   LOGOUT
   -------------------------------------------------------------------------- */
function initLogout() {
  const btn = document.getElementById('logoutBtn');
  if (!btn) return;

  btn.addEventListener('click', async () => {
    await supabaseClient.auth.signOut();
  });
}

/* --------------------------------------------------------------------------
   ESTADO DE AUTENTICAÇÃO NA NAVBAR
   -------------------------------------------------------------------------- */
function watchAuthState() {
  supabaseClient.auth.getSession().then(({ data }) => {
    updateNavbarAuthUI(data.session?.user || null);
  });

  supabaseClient.auth.onAuthStateChange((event, session) => {
    updateNavbarAuthUI(session?.user || null);

    if (event === 'PASSWORD_RECOVERY') {
      const modal = document.getElementById('authModal');
      modal?.classList.add('is-open');
      modal?.setAttribute('aria-hidden', 'false');
      switchAuthView('reset');
    }
  });
}

function updateNavbarAuthUI(user) {
  const authBox = document.getElementById('navbarAuth');
  const openBtn = document.getElementById('authOpenBtn');
  const userBox = document.getElementById('navbarUser');
  const userName = document.getElementById('navbarUserName');
  if (!openBtn || !userBox || !userName) return;

  authBox?.classList.remove('is-checking');

  if (user) {
    const nome = user.user_metadata?.nome || user.email;
    userName.textContent = `Olá, ${nome}`;
    openBtn.classList.add('is-hidden');
    userBox.classList.remove('is-hidden');
  } else {
    openBtn.classList.remove('is-hidden');
    userBox.classList.add('is-hidden');
  }
}

/* --------------------------------------------------------------------------
   TRAVAR BOTÃO DURANTE ENVIO (evita duplo clique / duplo submit)
   -------------------------------------------------------------------------- */
function setSubmitLoading(button, isLoading) {
  if (!button) return;

  if (isLoading) {
    button.dataset.originalText = button.textContent;
    button.textContent = 'Aguarde...';
    button.disabled = true;
  } else {
    button.textContent = button.dataset.originalText || button.textContent;
    button.disabled = false;
  }
}

/* --------------------------------------------------------------------------
   HELPERS
   -------------------------------------------------------------------------- */
function setFormFeedback(el, message, success) {
  el.textContent = message;
  el.classList.toggle('is-success', success);
  el.classList.toggle('is-error', !success);
}

function translateAuthError(error) {
  const msg = (error?.message || '').toLowerCase();

  if (msg.includes('already registered') || msg.includes('already exists') || msg.includes('duplicate')) {
    return 'Esse email já está cadastrado. Tente fazer login.';
  }
  if (msg.includes('invalid login credentials')) {
    return 'Email ou senha incorretos.';
  }
  if (msg.includes('email not confirmed')) {
    return 'Confirme seu email antes de entrar. Verifique sua caixa de entrada.';
  }
  if (msg.includes('password should be at least')) {
    return 'A senha precisa ter no mínimo 8 caracteres.';
  }
  if (msg.includes('rate limit')) {
    return 'Muitas tentativas em pouco tempo. Aguarde um momento e tente novamente.';
  }

  return 'Não foi possível concluir. Tente novamente em instantes.';
}
