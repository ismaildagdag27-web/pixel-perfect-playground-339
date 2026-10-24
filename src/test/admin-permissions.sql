-- Read-only regression checks: a failed permission invariant raises division by zero.
SELECT
  1 / CASE WHEN NOT has_table_privilege('anon', 'public.product_prices', 'UPDATE') THEN 1 ELSE 0 END AS anonymous_price_writes_blocked,
  1 / CASE WHEN NOT has_table_privilege('authenticated', 'public.user_roles', 'INSERT') THEN 1 ELSE 0 END AS self_role_assignment_blocked,
  1 / CASE WHEN NOT has_function_privilege('anon', 'public.assign_shop_admin()', 'EXECUTE') THEN 1 ELSE 0 END AS anonymous_role_assignment_blocked,
  1 / CASE WHEN NOT has_function_privilege('authenticated', 'public.assign_shop_admin()', 'EXECUTE') THEN 1 ELSE 0 END AS authenticated_role_assignment_blocked,
  1 / CASE WHEN EXISTS (SELECT 1 FROM pg_policies WHERE schemaname = 'public' AND tablename = 'product_prices' AND cmd = 'UPDATE' AND qual LIKE '%has_role%' AND with_check LIKE '%has_role%') THEN 1 ELSE 0 END AS admin_write_policy_present;