import { expect, type Locator } from "@playwright/test";
import { BasePage } from "./BasePage";

export class MenuPage extends BasePage {
  private lnkCatalog: string = "nav-catalog";
  private lnkCheckout: string = "nav-checkout";
  private lnkProfile: string = "nav-profile";
  private btnLogout: string = "logout-btn";
  private lblCartCount: string = "nav-cart-count";
  
}
