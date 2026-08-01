import { expect, type Locator } from "@playwright/test";
import { BasePage } from "./BasePage";

export type Category = "all" | "popular" | "veggie" | "meat" | "sides";

export class CatalogPage extends BasePage {
  readonly path = "/catalog";
  private cardPizza: string = "pizza-card-";
  private btnAddToCart: string = "add-to-cart-";
  private btnConfirmAddToCart: string = "confirm-add-to-cart";
  private btnCategory: string = "category-";
  private lblCartCount: string = "nav-cart-count";

  private get addToCartButtons(): Locator {
    return this.page.locator(`[data-testid^="${this.btnAddToCart}"]`);
  }

  private get cartCount(): Locator {
    return this.page.getByTestId(this.lblCartCount);
  }
}