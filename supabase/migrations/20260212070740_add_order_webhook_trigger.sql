-- 1. Enable the HTTP hook extension
CREATE EXTENSION IF NOT EXISTS "http" WITH SCHEMA "extensions";

-- 2. Create the Webhook Trigger function
CREATE OR REPLACE FUNCTION public.notify_make_on_order()
RETURNS TRIGGER AS $$
BEGIN
  PERFORM extensions.http_post(
    'https://hook.eu1.make.com/56x3qgyjokq879jf34vuddzgq29h',
    json_build_object(
      'type', 'INSERT',
      'table', 'orders',
      'record', row_to_json(NEW)
    )::text,
    'application/json'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 3. Drop trigger if exists and recreate
DROP TRIGGER IF EXISTS on_new_order ON public.orders;
CREATE TRIGGER on_new_order
AFTER INSERT ON public.orders
FOR EACH ROW
EXECUTE FUNCTION public.notify_make_on_order();
