# playwright-arch-course-sat

Suite de pruebas Playwright para OmniPizza (UI + API). Los proyectos de
`playwright.config.ts` están organizados así:

- **setup** — hace login una vez y guarda la sesión en `.auth/user.json`.
- **chromium** — reutiliza esa sesión (`storageState`). Por eso solo corre
  `tests/ui/setuptest.spec.ts`, el único spec preparado para arrancar ya
  autenticado; el resto de los specs de UI hacen login manual y no
  encontrarían el formulario de login en este proyecto.
- **ui-chromium / firefox / webkit** — arrancan sin sesión guardada y corren
  toda la suite de UI (`tests/ui/**`, `module-*/**`), incluyendo el login.
- **api** — corre `tests/api/**` contra el backend directamente, sin
  navegador.

## Limitaciones conocidas

### WebKit y `<input type="date">`

Los 2 tests de `tests/ui/pom.spec.ts` dentro de "POM — ProfilePage: the
native date picker and saving changes" se saltan (`test.skip`) en el
proyecto `webkit`.

**Por qué:** el build de WebKit que empaqueta Playwright para Windows/Linux
no incluye el widget nativo de date picker que sí tiene Safari en macOS.
`ProfilePage.setBirthday()` usa `.fill(isoDate)` sobre el
`<input type="date">`, lo cual funciona de forma confiable en Chromium y
Firefox pero no en ese WebKit.

**Qué se probó antes de optar por el skip** (ninguno resolvió el problema
de punta a punta):

1. `.fill(isoDate)` — el valor nunca queda seteado en el DOM.
2. Setear `.value` vía el setter nativo de `HTMLInputElement` + disparar
   `input`/`change` a mano — el valor sí queda en el DOM justo después,
   pero no sobrevive al `save()` (la app no lo registra como un cambio
   real).
3. Clic + `page.keyboard.type()` tecleando los dígitos en orden
   MM/DD/YYYY — WebKit los toma como texto plano (`"03201985"`) en vez de
   tokenizarlos en segmentos mes/día/año como hace el widget nativo real.

**Cobertura:** esos mismos 2 tests sí corren (y pasan) en `ui-chromium` y
`firefox`, así que el date picker sigue cubierto — solo no en WebKit.

**Dónde está el skip:** `tests/ui/pom.spec.ts`, condicionado a
`browserName === "webkit"`. El motivo también está anotado en
`pages/ProfilePage.ts`, en el docstring de `setBirthday()`.
