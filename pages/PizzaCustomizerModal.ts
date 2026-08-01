import { expect, type Locator } from "@playwright/test";
import { BasePage } from "./BasePage";

export type PizzaSize = "small" | "medium" | "large" | "family";

export class PizzaCustomizerModal extends BasePage {
  private btnClose: string = "customizer-close";
  private btnSize: string = "size-";
  private chipTopping: string = "topping-";
  private lblPrice: string = "customizer-price";
  private btnConfirm: string = "confirm-add-to-cart";
}
