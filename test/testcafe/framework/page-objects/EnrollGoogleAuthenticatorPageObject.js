import BasePageObject from './BasePageObject';
import ResendEmailObject from './components/ResendEmailObject';

const CODE_FIELD_NAME = 'credentials.otp';

export default class EnrollGoogleAuthenticatorPageObject extends BasePageObject {

  constructor (t) {
    super(t);
    this.resendEmail = new ResendEmailObject(t, this.form.el);
  }

  getBarcodeSubtitle () {
    return this.getTextContent('.barcode-setup-title');
  }

  getmanualSetupSubtitle () {
    return this.getTextContent('.manual-setup-title');
  }

  getSetUpDescription () {
    return this.getTextContent('.google-authenticator-setup-info');
  }

  hasQRcode () {
    return this.form.elementExist('.qrcode');
  }

  getSharedSecret () {
    return this.form.getElement('.shared-secret input').getAttribute('placeholder');
  }

  async goTomanualSetup() {
    await this.form.clickElement('.cannot-scan-link');
  }

  async goToNextPage() {
    await this.form.clickElement('.google-authenticator-next');
  }

  async submit() {
    await this.form.clickElement('.google-authenticator-verify');
  }

  enterCode(value) {
    return this.form.setTextBoxValue(CODE_FIELD_NAME, value);
  }

  getCodeFieldError() {
    return this.form.getTextBoxErrorMessage(CODE_FIELD_NAME);
  }
}
