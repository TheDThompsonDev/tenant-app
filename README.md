This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Jira/Git Workflow

### Choose a Jira ticket

- In Jira, find a ticket to work on
- Assign it to yourself and mark it as 'In Progress'

### Local work

- Make sure your local repo is up to date (make sure you have main checked out locally first):

  ```bash
  git pull origin main
  ```

- Create a new branch locally. Make sure to include the Jira ticket and a description:

  ```bash
  git checkout -b AP-12345-modal
  ```

- Make your changes and then stage them. Commits should be either feat, chore, or fix. Make sure the Jira ticket is at the end in parentheses:

  ```bash
  git commit -m 'feat: add super awesome modal (AP-12345)'
  ```

  or...

  ```bash
  git commit -m "chore: add bg color for super awesome modal (AP-12345)"
  ```

  or...

  ```bash
  git commit -m "fix: center modal (AP-12345)"
  ```

### Push to GitHub and make a pull request

- Sync the remote repo with with your local repo and your new branch:

  ```bash
  git push origin AP-12345
  ```

- Under (https://github.com/TheDThompsonDev/tenant-app/branches) you should find the branch you just pushed. Click on it.
- Click "Compare & pull request".
- Make sure base is set to main at the top.
- Adjust the title as needed and add a description.
- Add reviewers (2) by clicking the gear.
- Click "Create pull request".
- Once the PR is approved, the assignee (you) should complete the pull request by merging to main and delete the branch.
- Go back to Jira and change ticket status to done.

## Color Branding

In order to use the in-line color schema within any front-end component, under `className`, use one of the following color configuration names:

- `primary-green`
- `secondary-blue`
- `alternate-green`
- `primary-black`
- `secondary-dark-gray`
- `alternate-gray`
- `alternate-light-gray`

These can be applied to background colors, text colors, and border colors using Tailwind's utility classes.

### Example Usage

#### Background Color

```jsx
<div className='bg-primary-green p-4'>
  This div has a primary green background.
</div>
```
