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

- Keep the supplied catalog in a browser-safe data module with source references and imported asset pointers; absent product fields remain null so presentation never fabricates catalog facts.
- Store manual price overrides separately in Cloud and resolve them through the shared catalog query for storefront, details, related products and cart; preserve the source catalog for provenance.
- Protect price writes with verified authentication and a server-checked role in user_roles, reinforced by RLS; assign the owner's role only after email verification and never from editable metadata.
