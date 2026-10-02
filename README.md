# RRGBS Full-Stack v14

## Run

```powershell
npm install
Copy-Item .env.example .env
npm run dev:all
```

Open http://localhost:3000

## v12 fixes
- Post a Job opens immediately as a modal; no scrolling required.
- Recruiter verification opens immediately in the current Jobs page.
- After recruiter verification, the job-posting form opens immediately in the same page.
- Recruiter Portal opens immediately as a modal; no scrolling required.
- Job-related fixed-position modals are rendered outside the animated portal transition wrapper so CSS transforms cannot push them to the bottom of the page.
- Recruiters only see their own jobs in Recruiter Portal, with application counts and protected resume downloads.


## v14 fixes
- Recruiter verification note now only says that the account password is required to confirm the recruiter.
- After successful recruiter verification, the actual job-posting form opens immediately in the same Jobs page without changing portal or scroll position.
- Login and registration always return to/stay on the Jobs portal and preserve the current Jobs scroll position.
