import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });
import "dotenv/config";

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: '.',
 // testMatch: [/tests\/.*\.spec\.ts/, /module-.*\/.*\.spec\.ts/], 
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [["html", { open: "always"}], ["list"]],

  timeout: 30_000,
  expect: { timeout: 10_000},
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('')`. */
    baseURL: process.env.BASE_URL ?? "https://omnipizza-frontend.onrender.com",

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
    screenshot: "only-on-failure",
    video: "retain-on-failure",
    navigationTimeout: 45_000,
    headless: process.env.HEADLESS === "true" ? true : false,
  },

  /* Configure projects for major browsers */
  projects: [
    {name: "setup", testMatch: /.*\.setup\.ts/},

    {
      name: "chromium",
      use: {...devices['Desktop Chrome'], storageState: ".auth/user.json"},
      dependencies: ["setup"],
      // Sesión YA autenticada (storageState de "setup"): la app redirige
      // un visitante logueado directo a /catalog, sin mostrar el form de
      // login. Por eso este proyecto SOLO corre specs pensados para esa
      // sesión reusada (setuptest.spec.ts) — datadriven/pom/fixtures hacen
      // login manual fresco y se rompen aquí (no encuentran el selector de
      // mercado porque nunca ven el login). Esos corren en ui-chromium /
      // firefox / webkit, que arrancan sin storageState.
      testMatch: [/tests\/ui\/setuptest\.spec\.ts/],
    },
     {
      name: 'ui-chromium',
      use: { ...devices['Desktop Chrome'] },
      // Sin storageState: cada test hace login fresco, por eso sí corren
      // aquí datadriven/pom/fixtures. Se excluye tests/api — ya tiene su
      // propio proyecto "api" (más rápido, sin browser, y evita crear
      // órdenes reales duplicadas contra el backend compartido).
      testMatch: [/tests\/ui\/.*\.spec\.ts/, /module-.*\/.*\.spec\.ts/],
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
      testMatch: [/tests\/ui\/.*\.spec\.ts/, /module-.*\/.*\.spec\.ts/],
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
      testMatch: [/tests\/ui\/.*\.spec\.ts/, /module-.*\/.*\.spec\.ts/],
    },

    {
      name: "api",
      use: { baseURL: process.env.API_URL ?? "https://omnipizza-backend.onrender.com"},
      testMatch: [/tests\/api\/.*\.spec\.ts/],
      // El backend en Render (plan free) se "duerme" tras un rato sin
      // tráfico y el primer request de la corrida puede tardar bastante
      // más en despertar que el timeout global de 30s (mismo motivo por
      // el que tests/setup/auth.setup.ts usa 90s para el login de UI).
      timeout: 60_000,
    }

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    /* {
      name: 'Google Chrome',
      use: { ...devices['Desktop Chrome'], 
        channel: 'chrome-canary' },

    }, */
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
