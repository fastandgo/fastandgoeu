import * as emailjs from 'emailjs-com';
import {
  alertbox
} from "../atoms/alertbox.js";

/**
 * Init desc module.
 *
 * @module desc
 * @example
 * // import it in your Javascript file
 * import "path/to/desc.js"
 * */

export default (({
  $form
}) => {
  emailjs.init('user_vflttScXmk82WIBRJ6dEK')
  let values = {};
  let validator = {
    email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    phone: /^((\+[\d]{2}|0)[\s\d]{0,2})([\s-]?[\d]{2}){4,5}$/
  }
  let inputs = Array.from($form.elements).filter(e => e.tagName !== 'BUTTON');
  let button = Array.from($form.elements).filter(e => e.tagName === 'BUTTON')[0];
  let validate = () => {
    let isFormValid = Object.keys(values).filter(k => {
      if (k === 'message') return false;
      if (validator[k] && values[k].match(validator[k]) === null) return true;
      return !values[k]
    }).length === 0;
    if (isFormValid && button.classList.contains('disabled')) {
      button.classList.remove('disabled');
    }
    if (!isFormValid && !button.classList.contains('disabled')) {
      button.classList.add('disabled');
    }
  };
  let saveData = (input) => {
    values[input.name] = input.type === 'checkbox' ?
      input.checked :
      input.value;
    validate();
  };
  inputs.map(input => {
    let eventName = input.type === 'checkbox' ?
      'click' :
      input.tagName === 'SELECT' ?
      'change' :
      'keyup'
    saveData(input);
    input.addEventListener(
      eventName,
      e => {
        saveData(input);
      });
  });

  $form.addEventListener('submit', e => {
    e.preventDefault();
    emailjs.send('default_service', 'template_oO7LexQB', values)
      .then(response => {
        let $alert = alertbox.create(
          "Votre message a bien été envoyé. Nous reviendrons rapidement vers vous.",
          "success",
          "black"
        );
        $form.appendChild($alert);
      }, error => {
        console.log('fail', error);
        let $alert = alertbox.create(
          "Une erreur est survenue lors de l'envoi de votre message. Veuillez réessayer ulteérieurement.",
          "alert",
          "white"
        );
        $form.appendChild($alert);
      });
    console.log('submit');
  });
})({
  $form: document.querySelector('#contact-form')
});
