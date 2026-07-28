import { expect, type Locator } from "@playwright/test";
import { BasePage } from "./BasePage";

export type Category = "all" | "popular" | "veggie" | "meat" | "sides";

export class CatalogPage extends BasePage{}