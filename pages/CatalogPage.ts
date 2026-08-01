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

  async selectCategory(category: Category): Promise<void> {
    await this.categoryButton(category).click();
  }

  async addFirstPizza(): Promise<void> {
    await this.addToCartButtons.first().click();
    // agregar al carrito abre un paso de confirmación
    await this.page.getByTestId(this.btnConfirmAddToCart).click();
  }

  async openCustomizerForFirst(): Promise<void> {
    await this.addToCartButtons.first().click();
  }

  async getPizzaCount(): Promise<number> {
    return this.pizzaCards.count();
  }

  async getPizzaNames(): Promise<string[]> {
    const names: string[] = [];
    const cards = await this.pizzaCards.all();
    for (const card of cards) {
      const name = await card.getByRole("heading").first().textContent();
      if (name) names.push(name.trim());
    }
    return names;
  }
}