import { expect, type Locator } from "@playwright/test";
import { BasePage } from "./BasePage";

export class ProfilePage extends BasePage {
  readonly path = "/profile";
  private txtFullName: string = "profile-fullname";
  private txtPhone: string = "profile-phone";
}
