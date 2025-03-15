![image](https://github.com/user-attachments/assets/9a57c707-8fa9-42c1-a642-45a1acf42814)

# Tenants face delays, security concerns, and communication gaps in modern apartment living.

## Our portal streamlines leasing with digital signatures, automates smart lock access, and enables one-tap reporting for disturbances. By integrating AI escalation, smart package lockers, and guest parking permits, we boost tenant satisfaction and retention.

# Technologies Used

<img style="height:125px" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg" /> <img style="height:125px" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg" /> <img style="height:125px" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/appwrite/appwrite-original.svg" /> <img style="height:125px" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original-wordmark.svg" /> <img style="height:125px" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg" /> <img style="height:125px" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/supabase/supabase-original.svg" />

## Docs for this project

| Next.js                               | Appwrite                                  | Supabase                                    | React.js                         |
| ------------------------------------- | ----------------------------------------- | ------------------------------------------- | -------------------------------- |
| [Next Docs ](https://nextjs.org/docs) | [Appwrite Docs](https://appwrite.io/docs) | [Supabase Docs ](https://supabase.com/docs) | [React Docs](https://react.dev/) |

## Team Contributors To The Project

<table>
  <tr>
    <td align="center" width="175">
      <a href="https://www.linkedin.com/in/casacava/">
        <img src="https://github.com/user-attachments/assets/72674182-94f6-45bf-bbe6-7f8cef92338d" height="150" width="200" style="border-radius:50%;" /><br />
        <sub><b>Cass Cavazos</b></sub>
      </a>
    </td>
    <td align="center" width="175">
      <a href="https://www.linkedin.com/in/joeaguado/">
        <img src="https://github.com/user-attachments/assets/ed822669-8b90-4d8e-bd15-82513aaffe3e" height="150" width="200" style="border-radius:50%;" /><br />
        <sub><b>Joe Aguado</b></sub>
      </a>
    </td>
    <td align="center" width="175">
      <a href="https://www.linkedin.com/in/damianpad/">
        <img src="https://github.com/user-attachments/assets/44d0ee64-babe-4c43-a252-79daac03058e" height="150" width="200" style="border-radius:50%;" /><br />
        <sub><b>Damian Padilla</b></sub>
      </a>
    </td>
    <td align="center" width="175">
      <a href="https://www.linkedin.com/in/tatibertazoli/">
        <img src="https://github.com/user-attachments/assets/288e8740-1f5a-4e4d-a172-da2558ea7ac1" height="150" width="200" style="border-radius:50%;" /><br />
        <sub><b>Tatiana Bertazoli</b></sub>
      </a>
    </td>
  </tr>
  <tr>
    <td align="center" width="175">
      <a href="https://www.linkedin.com/in/andrew-sm1th/">
        <img src="https://github.com/user-attachments/assets/bc9f85bd-06a2-49b9-a14f-6e37715f069d" height="150" width="150" style="border-radius:50%;" /><br />
        <sub><b>Andrew Smith</b></sub>
      </a>
    </td>
    <td align="center" width="175">
      <a href="https://www.linkedin.com/in/staci-southerland-649549a8/">
        <img src="https://github.com/user-attachments/assets/9660d25b-1111-41e5-8a90-9f91ec928533" height="150" width="150" style="border-radius:50%;" /><br />
        <sub><b>Staci Southerland</b></sub>
      </a>
    </td>
    <td align="center" width="175">
      <a href="https://www.linkedin.com/in/dthompsondev/">
        <img src="https://github.com/user-attachments/assets/8dc36ff7-8e09-4ea0-9ee1-e9bc3062745b" height="150" width="150" style="border-radius:50%;" /><br />
        <sub><b>Danny Thompson</b></sub>
        <br /><sub>(Tech Lead)</sub>
      </a>
    </td>
  </tr>
</table>

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
