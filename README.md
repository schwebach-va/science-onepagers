# Science One-Pagers — setup guide

This is a small, plain-HTML website: no build tools, no login required for
students, and it will keep working regardless of what devices or platforms
PWCS uses in any given year (iPads this year, whatever comes next). It's
just a website — it opens the same way in Safari on an iPad, a Chromebook,
or a laptop.

## One-time setup (about 10-15 minutes)

1. **Check whether you already have a GitHub account.** Go to
   [github.com](https://github.com) and try to sign in. If nothing comes
   back to you, click "Sign up" and create a free account — you only need
   an email address.

2. **Create a new repository.**
   - Click the "+" in the top right → "New repository."
   - Name it something like `science-onepagers`.
   - Set it to **Public** (it has to be public for the site to be viewable
     by students without logging in).
   - Do not add a README, .gitignore, or license — leave those unchecked;
     we'll upload the files directly.

3. **Upload the site files.**
   - On the new repository's page, click "uploading an existing file."
   - Drag in everything from the `onepagers-site` folder I gave you,
     **keeping the folder structure** (the `biology` folder should stay a
     folder, not get flattened).
   - Commit the upload.

4. **Turn on GitHub Pages.**
   - In the repository, go to **Settings → Pages**.
   - Under "Build and deployment," set Source to **Deploy from a branch**,
     branch **main**, folder **/(root)**.
   - Save. GitHub will give you a URL that looks like
     `https://yourusername.github.io/science-onepagers/` — that's your
     live site, usually within a minute or two.

5. **Test it from inside PWCS.** Pull the URL up on a school iPad or the
   school wifi once before you build the whole thing out, just to confirm
   nothing's blocked. GitHub's domain is well-established and essentially
   never gets caught by school content filters, but it's a five-second
   check worth doing.

6. **Link it from Canvas.** In any Canvas page or module, use "Insert Link"
   (or just paste the URL) pointing at either the homepage
   (`.../index.html`) or a specific one-pager
   (`.../biology/cyclospora-raspberries.html`). Canvas doesn't need any
   special permission to link to a public site.

## How we'll keep adding topics

Going forward, the workflow is:

1. You bring me a topic idea (in chat, here).
2. We draft the one-pager together — I'll write it into the same format as
   the example page, using `template.html` as the starting point.
3. You review it for accuracy (especially anything I've drafted from
   general knowledge — always worth a fact-check pass, particularly on
   numbers, dates, and anything medical).
4. I hand you the finished HTML file, plus the one line to add to
   `index.html`'s topic list.
5. You upload the new file(s) to the GitHub repo the same drag-and-drop way
   as step 3 above (or tell me and I can prep everything as a ready-to-drop
   batch if you're adding several at once).

Because every file is just plain text, GitHub also keeps a full history of
every version automatically — nothing is ever really lost, even if a page
gets edited or replaced later.

## What's already built

- `index.html` — homepage with a Biology list and a Chemistry list.
- `style.css` — shared styling, tuned to be readable on iPad and to print
  cleanly if you ever want a paper copy.
- `template.html` — copy this for every new topic.
- `biology/cyclospora-raspberries.html` — one fully-written example so you
  can see the finished format end to end. **It's marked DRAFT** — fact-check
  it against CDC/FDA sources before treating it as classroom-ready.
