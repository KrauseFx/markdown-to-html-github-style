# `markdown-to-github-style-web.com`

> Because GitHub's `README` styling is actually really nice

## Background

If you have a little side project, often you might want a simple landing page. The GitHub `README` rendering is really beautifully done: clean, simple and modern. The official [GitHub markdown to HTML API](https://developer.github.com/v3/markdown/) generates the HTML code, but not the stylesheets necessary to make it look nice.

Using your GitHub `README` as the main landing point works great for open source projects, where your visitors are developers and are familiar with GitHub, as well as you have all the text right where the code, the Issues and PRs are. But for some projects this isn't ideal:

- Maybe your project isn't actually an open source project, so you can't just host a `README` on GitHub
- If you want to link to just the `README`, you could append `#readme` to your browser URL (making the URL less pretty), or the visitor has to know they have to scroll down
- The mobile page of GitHub is still pretty bad, and it only renders the first few lines, as soon as you have a logo and badges on your page, it doesn't render at all, unless the visitor hits `View all of `README`.md`
  - Non-tech visitors don't know what's a `README.md`
  - The button is small, and people don't know what is
  - GitHub renders the GitHub Pulse below, something that doens't make sense for non-tech visitors
  - The URL changes from something nice like `github.com/krausefx/fastlane` to `github.com/krausefx/fastlane/blob/master/`README`.md`, meaning you can either link directly to this page to have a nice content, or you link to the root page and have the downside of the extra buttons

[Nat announced](https://twitter.com/natfriedman/status/1126544306712350721), that they working on improving the mobile experience, which is great news for everybody :)

## Solution

A simple script that converts a markdown (`.md`) file to a single HTML file, that includes all the HTML and CSS code inline, so you can host it anywhere.

There is no need to use this script if you already convert your markdown file to HTML, you can directly use the [stylesheet](https://github.com/KrauseFx/markdown-to-html-github-style/blob/master/style.css) of this repo.

## How it works

This project doesn't actually use the GitHub stylesheet, it's far too complex, and has legal implications.

Instead this project does 2 things:

- Convert the Markdown to HTML using [showdown](https://github.com/showdownjs/showdown), the most popular JS markdown parser. This could be replaced by the [official GitHub markdown to HTML API](https://github.com/KrauseFx/markdown-to-html-github-style/issues/2)
- Inject the GitHub-like CSS code at the bottom of the page

Resulting you get an HTML file that contains everything needed, so you can host the page on GitHub pages, AWS S3, Google Cloud Storage or anywhere else.

- Check out [the original markdown](https://github.com/KrauseFx/markdown-to-html-github-style/blob/master/README.md) file of this `README`
- Check out the [raw generated HTML code](https://github.com/KrauseFx/markdown-to-html-github-style/blob/master/index.html) generated based on this markdown file on
- Check out the [GitHub rendered README](https://github.com/KrauseFx/markdown-to-html-github-style)
- Check out the [README by this project](https://markdown-to-github-style-web.com)

## Open tasks

Check out the [open issues](https://github.com/KrauseFx/markdown-to-html-github-style/issues), in particular code blocks currently don't support syntax highlighting, however that's something that's rather easy to add. For a minimalistic stylesheet we could take the styles from [krausefx.com css](https://github.com/KrauseFx/krausefx.com/blob/021186e228e183904af68ad8fc500c35107f00ae/assets/main.scss#L345-L438).

## Playground to test

```
{
  testcode: 1
}
```

- Bullet list item 1
- Bullet list item 2

---

1. Numbered list item 1
1. Numbered list item 2

Inline `code` comments are `100`

> Quoted texts are more gray and look differently

**Bold text** is **bold** and [inline links](https://krausefx.com) work as well.

# Header 1
## Header 2
### Header 3
#### Header 4
##### Header 5

Normal text content again

