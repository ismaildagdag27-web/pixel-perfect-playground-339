REVOKE ALL ON public.user_roles FROM anon, authenticated;
GRANT SELECT ON public.user_roles TO authenticated;
REVOKE ALL ON public.product_prices FROM anon, authenticated;
GRANT SELECT ON public.product_prices TO anon;
GRANT SELECT, INSERT, UPDATE ON public.product_prices TO authenticated;