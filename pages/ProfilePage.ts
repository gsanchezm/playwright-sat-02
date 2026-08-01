import { expect, type Locator } from "@playwright/test";
import { BasePage } from "./BasePage";

export class ProfilePage extends BasePage{
  private txtAddress: string = "profile-address";
  private dateBirthday: string = "profile-birthday";
  private txtNotes: string = "profile-notes";
  private btnSave: string = "profile-save-btn";
}
