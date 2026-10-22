CREATE TYPE public.app_role AS ENUM ('admin', 'user');
CREATE TABLE public.user_roles (id uuid PRIMARY KEY DEFAULT gen_random_uuid(), user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE, role public.app_role NOT NULL, UNIQUE(user_id, role));
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
CREATE POLICY own_role_read ON public.user_roles FOR SELECT TO authenticated USING (user_id = auth.uid());
CREATE FUNCTION public.has_role(_user_id uuid, _role public.app_role) RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$ SELECT EXISTS(SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role); $$;
REVOKE ALL ON FUNCTION public.has_role(uuid, public.app_role) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) TO authenticated, service_role;
CREATE TABLE public.product_prices (product_id text PRIMARY KEY, price numeric(12,2) NOT NULL CHECK (price >= 0), updated_at timestamptz NOT NULL DEFAULT now());
GRANT SELECT ON public.product_prices TO anon;
GRANT SELECT, INSERT, UPDATE ON public.product_prices TO authenticated;
GRANT ALL ON public.product_prices TO service_role;
ALTER TABLE public.product_prices ENABLE ROW LEVEL SECURITY;
CREATE POLICY public_price_read ON public.product_prices FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY admin_price_insert ON public.product_prices FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY admin_price_update ON public.product_prices FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE FUNCTION public.assign_shop_admin() RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$ BEGIN
IF lower(NEW.email) = 'ismaildagdag27@gmail.com' AND NEW.email_confirmed_at IS NOT NULL THEN
INSERT INTO public.user_roles(user_id, role) VALUES (NEW.id, 'admin') ON CONFLICT DO NOTHING;
ELSE
DELETE FROM public.user_roles WHERE user_id = NEW.id AND role = 'admin';
END IF;
RETURN NEW; END; $$;
REVOKE ALL ON FUNCTION public.assign_shop_admin() FROM PUBLIC;
CREATE TRIGGER shop_admin_on_verified_account AFTER INSERT OR UPDATE OF email, email_confirmed_at ON auth.users FOR EACH ROW EXECUTE FUNCTION public.assign_shop_admin();
INSERT INTO public.user_roles(user_id, role) SELECT id, 'admin'::public.app_role FROM auth.users WHERE lower(email) = 'ismaildagdag27@gmail.com' AND email_confirmed_at IS NOT NULL ON CONFLICT DO NOTHING;