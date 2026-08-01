import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Biohazard,
  ChevronDown,
  Clock,
  Drama,
  Flame,
  Ghost,
  Globe,
  Hammer,
  MapPin,
  Menu,
  MessageCircle,
  Phone,
  ShieldCheck,
  Skull,
  Sparkles,
  Timer,
  Users,
  X,
  type LucideIcon,
} from "lucide-react";

/**
 * Icons are referenced by name so that data modules stay serializable and can
 * cross the server/client component boundary safely.
 */
export const iconRegistry = {
  arrowLeft: ArrowLeft,
  arrowRight: ArrowRight,
  arrowUpRight: ArrowUpRight,
  biohazard: Biohazard,
  chevronDown: ChevronDown,
  clock: Clock,
  drama: Drama,
  flame: Flame,
  ghost: Ghost,
  globe: Globe,
  hammer: Hammer,
  mapPin: MapPin,
  menu: Menu,
  message: MessageCircle,
  phone: Phone,
  shield: ShieldCheck,
  skull: Skull,
  sparkles: Sparkles,
  timer: Timer,
  users: Users,
  x: X,
} satisfies Record<string, LucideIcon>;

export type IconName = keyof typeof iconRegistry;

export function getIcon(name: IconName): LucideIcon {
  return iconRegistry[name];
}
