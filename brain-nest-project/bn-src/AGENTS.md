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

- Keep the main student experience organized as separate TanStack routes inside one shared responsive shell, because each workflow must remain directly reachable and independently extensible.

- Auth and profiles use Lovable Cloud (email/password + Google); AI study generation and paper analysis run in authenticated server functions (src/lib/study.functions.ts) via the Lovable AI Gateway, because keys and prompts must stay server-side.
