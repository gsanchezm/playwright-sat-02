import { expect, type Locator } from "@playwright/test";
import { BasePage } from "./BasePage";

export class CheckoutPage extends BasePage{}
readonly path = "/checkout";

  private txtFullName: string = "full-name";
  private txtPhone: string = "phone";
  private txtAddress: string = "address";

  // Error a proposito que pasa cuando te equivocas o te dan observaciones 
  // a corregir?