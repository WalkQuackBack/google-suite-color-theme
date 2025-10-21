# Google Workspace Colour Theme

Dark theme userstyles for various Google Workspace products.

You need [Stylus](https://github.com/openstyles/stylus?tab=readme-ov-file) to
use these userstyles.

## Install links

- [Google Docs](https://github.com/WalkQuackBack/google-suite-color-theme/raw/refs/heads/main/build.user.css)
- [Google Slides](https://github.com/WalkQuackBack/google-suite-color-theme/raw/refs/heads/main/slides.user.css)
- [Google Sheets](https://github.com/WalkQuackBack/google-suite-color-theme/raw/refs/heads/main/sheets.user.css)

## Development

Install build dependencies:

```bash
pnpm install
pnpm dlx playwright install chromium --with-deps
```

### Setup enviornment variables

> [!INFO]
> These steps do not need to be performed, but some builds will fail, such as
> Gmail and Classroom.

Create a file named `.env`, and put in an account's credentials in this format.

```
GOOGLE_USER="<email>"
GOOGLE_PWD="<password>"
```

The account must not have 2FA enabled, and the authentication process can get
stuck on certain new account prompts (such as "Set a home address").

If the Google authentication times out, login to the account manually to check
for any issues.

### Building

It will run Playwright in the background, and build the output to the root of
the repository.

```bash
pnpm run build
```

### Hot reload testing

For hot reload testing in the browser, run the following:

```bash
pnpm dlx http-server .
```

Navigate to `localhost:8080` in the browser, and click on the `.user.css` file
corresponding to the website you would like to test.

Stylus should perform a page takeover. Click the Install button, then check Live
reload.
