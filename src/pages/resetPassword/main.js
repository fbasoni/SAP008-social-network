import {
  resetPassword,
} from '../../lib/index.js';

export default () => {
  const resetContainer = document.createElement('div');
  const template = `
          <header class="header-reset display-flex">
              <a href="/#homepage" class="return-btn" id="return-btn"><img class="return-btn" src="img/returnBtn.png" alt="back arrow"></a>
              <h1><img class="img-logo-login" src="img/Rebu.png" alt="Rebu Logo"></h1>
          </header>
          <div class="gif-side-desktop" id="desktop-page">
          <video autoplay loop class="bg-gif-desktop">
            <source src="img/gifDesktop.mp4" type="video/mp4">
          </video>
          <img src="img/Rebu.png" alt="Rebu Logo" class="rebu-logo-desktop">
          </div>
  
          <main id="reset-page" class="reset-page">
          
            <form class="reset-form display-flex">
              <h2 class="reset-text">REDEFINA SUA SENHA</h2>
              <p class="message-about-reset">ENVIAREMOS UM E-MAIL PARA REDEFINIÇÃO DE SENHA</p>
              <input type="email" placeholder="E-MAIL" id="email-input-reset" class="input-style-reset"><p>
              <a href="/#homepage"><button type="button" id="btn-cancel-reset" class="btn-cancel-reset">CANCELAR</button></a>
              <a href="/#homepage"><button type="button" id="btn-reset-page" class="btn-reset">ENVIAR</button></a>
            </form>
                  
  
          </main>
        `;
  resetContainer.innerHTML = template;

  const returnBtn = resetContainer.querySelector('#return-btn');
  const emailValue = resetContainer.querySelector('#email-input-reset');
  const sendBtn = resetContainer.querySelector('#btn-reset-page');

  returnBtn.addEventListener('click', () => window.location.replace('#homepage'));
  sendBtn.addEventListener('click', (e) => {
    e.preventDefault();
    resetPassword(emailValue.value)
      .then(() => {
        // alert('Email enviado');
      })
      .catch((/* error */) => {
        // const errorCode = error.code;
        // const errorMessage = error.message;
      });
  });

  return resetContainer;
};
