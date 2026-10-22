import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { LayoutDashboard } from "lucide-react";
import { useContext } from "react";
import { ShopSessionContext } from "@/lib/shop-session";

export function AdminLink() {
  const signedIn = useContext(ShopSessionContext);
  return <Button asChild variant="ghost" size="sm"><Link to={signedIn ? "/dashboard" : "/auth"}><LayoutDashboard />{signedIn ? "Tableau de bord" : "Administration"}</Link></Button>;
}