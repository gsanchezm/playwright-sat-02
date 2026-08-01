import { expect, type Locator } from "@playwright/test";
import { BasePage } from "./BasePage";

export class CheckoutPage extends BasePage{
  readonly path = "/checkout";
  private txtFullName: string = "full-name";
  private txtPhone: string = "phone";
  private txtAddress: string = "address";

  private txtZip: string = "zip-code";
  private btnPlaceOrder: string = "place-order-btn";
  private lblOrderTotal: string = "order-total";
  private modalConfirmOrder: string = "confirm-order-modal";

  async fillWithMarket(market: Market): Promise<void> {
    await this.fullNameInput.fill(market.fullName);
    await this.phoneInput.fill(market.phone);
    await this.addressInput.fill(market.address);
    await this.zipInput.fill(market.zipCode);
  }
}

