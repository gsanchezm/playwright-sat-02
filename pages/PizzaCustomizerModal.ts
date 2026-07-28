import { expect, type Locator } from "@playwright/test";
import { BasePage } from "./BasePage";

export type PizzaSize = "small" | "medium" | "large" | "family";

export class PizzaCustomizerModal extends BasePage{}