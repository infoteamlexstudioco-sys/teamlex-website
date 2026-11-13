<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- The site is multi-page: shared chrome lives in `src/components/site-layout.tsx`; pages are `src/routes/{index,services_,services.$slug,portfolio_,portfolio.$slug,about,reviews,contact}.tsx`. The overview pages use the underscore suffix (`services_.tsx`, `portfolio_.tsx`) so they are flat routes, not layouts — otherwise their `$slug` child pages never render and show the overview content instead. The contact route takes a `?service=` search param for preselection.
- Keep service and testimonial data in `src/lib/teamlex.ts`; screenshot-sourced feedback must remain separate from Google profile examples.
- Use the shared accessible studio dialog for project and review submissions. Both deliver to the studio inbox through the linked Gmail connection via `sendStudioMessage`, with the recipient fixed to the studio address and never taken from the browser; submissions are not stored or published automatically.
