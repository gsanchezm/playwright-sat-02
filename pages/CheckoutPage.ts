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
}
