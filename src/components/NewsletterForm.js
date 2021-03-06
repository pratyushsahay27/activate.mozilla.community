import React, { Component } from 'react';
import { Localized } from 'fluent-react/compat';
import {
  Send
} from "react-feather";

import SelectCountry from './SelectCountry.js';
// import SelectLanguage from './SelectLanguage.js';
import './NewsletterForm.css';

class NewsletterForm extends Component {
  //  Format text and markup according to use case
  //  Default newsletter form is the one that appears on newsletter page and
  //  on front when there is no active campaign.
  isInIllustratedSlice = () => {
    // campaign must not be false and must not be null.
    const isInIllustratedSlice = !!this.props.isInIllustratedSlice && this.props.isInIllustratedSlice !== null ;
    return isInIllustratedSlice;
  };

  getNewsletterFormTextDefault = () => {
    return (
      <div className="newsletter__text-wrapper js-newsletter-header">
        <Localized id="newsletter-title-2">
          <h1 className="title title--extra-large title--lighter text--centered newsletter__title"></h1>
        </Localized>

        <Localized id="newsletter-description-subscribe">
          <p className="text text--centered content-contained content-contained--extra-small"></p>
        </Localized>
      </div>
    );
  };

  getNewsletterFormTextIllustrated = () => {
    return (
      <div className="newsletter__text-wrapper js-newsletter-header">
        <Localized id="newsletter-title-2">
          <h1 className="title text--centered newsletter__title"></h1>
        </Localized>

        <Localized id="newsletter-description-subscribe">
          <p className="text text--large text--centered content-contained content-contained--extra-small"></p>
        </Localized>
      </div>
    );
  };

  getNewsletterFormSubmitDefault = () => {
    return (
      <button type="submit" className="button button--inline newsletter__subscribe" >
        <Localized id="newsletter-submit">
          <span className = "newsletter__subscribe-text"></span>
        </Localized>
        < Send size = {
          24
        }
        className = "newsletter__subscribe-icon icon" />
      </button>
    );
  };

  getNewsletterFormSubmitIllustrated = () => {
    return (
      <button type="submit" className="button button--inline newsletter__subscribe newsletter__subscribe--with-icon" >
        <Localized id="newsletter-submit">
          <span className = "newsletter__subscribe-text"></span>
        </Localized>
        < Send size = {
          30
        }
        className = "newsletter__subscribe-icon icon" />
      </button>
    );
  };

  componentDidMount() {

    /* This Source Code Form is subject to the terms of the Mozilla Public
     * License, v. 2.0. If a copy of the MPL was not distributed with this
     * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

    // From: https://raw.githubusercontent.com/mozilla/basket-example/master/basket-client.js
    // @see: https://github.com/mozilla/basket-example

    // !! this file assumes only one signup form per page !!
    const newsletterForm = document.getElementById('newsletter_form');

    // handle errors
    let errorArray = [];
    let newsletterErrors = document.getElementById('newsletter_errors');

    function newsletterError() {
      let errorList = document.createElement('ul');

      if(errorArray.length) {
        for (let i = 0; i < errorArray.length; i++) {
          let item = document.createElement('li');
          item.appendChild(document.createTextNode(errorArray[i]));
          errorList.appendChild(item);
        }
      } else {
        // no error messages, forward to server for better troubleshooting
        newsletterForm.setAttribute('data-skip-xhr', true);
        newsletterForm.submit();
      }

      newsletterErrors.appendChild(errorList);
      newsletterErrors.style.display = 'block';
    }

    // Hide newsletter header
    function newsletterHeader() {
      let header = document.getElementsByClassName('js-newsletter-header');
      // Hide newsletter header.
      header[0].style.display = 'none';
    }

    // TODO: Correct offset top according to final markup.
    // show success message
    function newsletterThanks() {
      let thanks = document.getElementById('newsletter_thanks');
      let newsletterFormWrapper = document.getElementsByClassName('js-newsletter-form-wrapper');
      window.scrollTo({
        top: newsletterFormWrapper[0].offsetTop,
        behavior: "smooth"
      });
      // show thanks message
      thanks.style.display = 'block';
    }

    // XHR subscribe; handle errors; display thanks message on success.
    function newsletterSubscribe(evt) {
      let skipXHR = newsletterForm.getAttribute('data-skip-xhr');
      if (skipXHR) {
        return true;
      }

      evt.preventDefault();
      evt.stopPropagation();

      // new submission, clear old errors
      errorArray = [];
      newsletterErrors.style.display = 'none';
      while (newsletterErrors.firstChild) newsletterErrors.removeChild(newsletterErrors.firstChild);

      let fmt = document.getElementById('fmt').value;
      let email = document.getElementById('email').value;
      let newsletter = document.getElementById('newsletters').value;
      // let newsletterLanguage = document.getElementById('newsletter-language').value;
      let newsletterCountry = document.getElementById('newsletter-country').value;
      let privacy = document.querySelector('input[name="privacy"]:checked') ? '&privacy=true' : '';

      let params = 'email=' + encodeURIComponent(email) +
        '&newsletters=' + newsletter +
        privacy +
        '&fmt=' + fmt +
        '&country=' + newsletterCountry +
        // '&lang=' + newsletterLanguage +
        '&source_url=' + encodeURIComponent(document.location.href);

      // eslint-disable-next-line no-undef
      let xhr = new XMLHttpRequest();

      xhr.onload = function(r) {
        if (r.target.status >= 200 && r.target.status < 300) {
          // response is null if handled by service worker
          let response = r.target.response;
          if (response === null ) {
            newsletterError();
            return;
          }
          if (response.success === true) {
            newsletterForm.style.display = 'none';
            newsletterHeader();
            newsletterThanks();
          }
          else {
            if(response.errors) {
              for (let i = 0; i < response.errors.length; i++) {
                errorArray.push(response.errors[i]);
              }
            }

            newsletterError();
          }
        }
        else {
          newsletterError();
        }
      };

      xhr.onerror = function() {
        newsletterError();
      };

      let url = newsletterForm.getAttribute('action');

      xhr.open('POST', url, true);
      xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
      xhr.setRequestHeader('X-Requested-With','XMLHttpRequest');
      xhr.timeout = 5000;
      xhr.ontimeout = newsletterError;
      xhr.responseType = 'json';
      xhr.send(params);

      return false;
    }

    newsletterForm.addEventListener('submit', newsletterSubscribe, false);
  }
  constructor(props)
  {
    super(props);
    this.state = {
      value: 'placeholder'
    };
  }

  render() {
    let classes = ['newsletter', 'js-newsletter'];
    if(this.isInIllustratedSlice()) {
      classes.push('newsletter--illustrated');
    } else {
      classes.push('content-contained', 'section--pull-up', 'js-newsletter-form-wrapper');
    }
    if(this.props.className) classes.push(this.props.className);
    const classString = classes.join(' ');

    return (
      <section className={classString}>
        <div className="newsletter__content">
          {
            this.isInIllustratedSlice()
              ? this.getNewsletterFormTextIllustrated()
              : this.getNewsletterFormTextDefault()
          }

          <form id="newsletter_form" name="newsletter__form" className="newsletter__form" action="https://www.mozilla.org/en-US/newsletter/" method="post">
            <input type="hidden" id="fmt" name="fmt" value="H" />
            <input type="hidden" id="newsletters" name="newsletters" value="about-mozilla" />

            <div id="newsletter_errors" className="newsletter__errors" />

            <div id="newsletter_email" className="form_group newsletter__email content-contained content-contained--small">
              <Localized id="newsletter-email">
                <label htmlFor="email" className="form_label element-invisible">..</label>
              </Localized>
              <Localized id="newsletter-form-email-placeholder" attrs={{placeholder: true, "aria-label": true}}>
                <input aria-label="Enter your e-mail" aria-required="true" type="email" id="email" name="email" className="form_input" required placeholder="Enter your e-mail" />
              </Localized>
              {
                this.isInIllustratedSlice()
                  ? this.getNewsletterFormSubmitIllustrated()
                  : this.getNewsletterFormSubmitDefault()
              }
            </div>
            <div id="newsletter_details" className="newsletter__details">
              <SelectCountry id="newsletter-country" className="newsletter__select"/>
              {/*<SelectLanguage id="newsletter-language" className="newsletter__select"/>*/}
            </div>

            <div id="newsletter_privacy" className="form_group newsletter__privacy-policy text text--small">
              <input type="checkbox" id="privacy" name="privacy" required />
              <Localized id="newsletter-privacy"
                         privacyLink={<a target="_blank" rel="noopener noreferrer" href="https://www.mozilla.org/privacy/websites/"></a>}>
                <label htmlFor="privacy">..</label>
              </Localized>
            </div>
          </form>

          <div id="newsletter_thanks" className="newsletter__text-wrapper newsletter__text-wrapper--thanks">
            <Localized id="newsletter-subscribed-title">
              <h2 className="title text--centered"></h2>
            </Localized>
            <Localized id="newsletter-subscribed-text">
              <p className="text text--large text--centered"></p>
            </Localized>
          </div>
        </div>
      </section>
    );
  }
}

export default NewsletterForm;
