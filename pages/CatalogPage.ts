import { expect, type Locator } from "@playwright/test";
import { BasePage } from "./BasePage";

export type Category = "all" | "popular" | "veggie" | "meat" | "sides";

export class CatalogPage extends BasePage{
  readonly path = "/catalog";
  private cardPizza: string = "pizza-card-";
  private btnAddToCart: string = "add-to-cart-";
}