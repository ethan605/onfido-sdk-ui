import Base from './BasePage.js'
import {locale, verifyElementCopy} from '../utils/mochaw'

class CrossDeviceSubmit extends Base {

  get title() { return this.$('.onfido-sdk-ui-PageTitle-titleSpan')}
  get subtitle() { return this.$('.onfido-sdk-ui-PageTitle-subTitle')}
  get documentUploadedMessage() { return this.$('.onfido-sdk-ui-crossDevice-CrossDeviceSubmit-documentUploadedLabel')}
  get selfieUploadedMessage() { return this.$('.onfido-sdk-ui-crossDevice-CrossDeviceSubmit-selfieUploadedLabel')}
  get submitVerificationButton() { return this.$('.onfido-sdk-ui-Button-button-text')}

  copy(lang) { return locale(lang) }

  async verifyUIElements(copy) {
    const crossDeviceSubmitStrings = copy.cross_device.submit
    verifyElementCopy(this.title, crossDeviceSubmitStrings.title)
    verifyElementCopy(this.subtitle, crossDeviceSubmitStrings.sub_title)
    this.driver.sleep(500)
    verifyElementCopy(this.documentUploadedMessage, crossDeviceSubmitStrings.one_doc_uploaded)
    verifyElementCopy(this.selfieUploadedMessage, crossDeviceSubmitStrings.selfie_uploaded)
    verifyElementCopy(this.submitVerificationButton, crossDeviceSubmitStrings.action)
  }

  async clickOnSubmitVerificationButton() {
    this.submitVerificationButton.click()
  }
}

export default CrossDeviceSubmit;
