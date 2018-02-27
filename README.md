# email-sync

## setup

**in gsuites admin console:**

- enable API access (security > api reference > enable api access)

**in google developers console, logged in with gsuites account:**

- create project, named `parole-prep-bot`
- enable admin sdk for `parole-prep-bot` in `menu > apis & services > library`
- create service account for `parole-prep-bot`, with name `bot`. generate json private key, and enable domain-wide authority with project name `parole-prep`.
- copy email in `menu > apis & services > credentials > oauth consent screen > email address` to `USER_EMAIL` in `.env`
- copy downloaded private key json file to `GOOGLE_CREDENTIALS` in `.env`

**in gsuites admin console:**

- goto: `security > advanced settings > manage api client access`
- set `client name` to `client_id` from `GOOGLE_CREDENTIALS`
- set `api scopes` to `https://www.googleapis.com/auth/admin.directory.user, https://www.googleapis.com/auth/admin.directory.group, https://www.googleapis.com/auth/admin.directory.group.member`
- click authorize
- ???

---

run `node print-google-groups.js`, and copy down the ids of the `volunteers` and `all` groups

add `client_email` access to spreadsheets

in both `all` and `volunteer` groups:
`manage > permissions > basic permissions > allow members external to this organization: checked -- save`
