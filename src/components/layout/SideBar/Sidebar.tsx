//
import { HomeIcon, ListTodoIcon, DoorOpen } from "lucide-react";
import Link from "next/link";

interface MenuOption {
  title: string;
  icon: React.ElementType;
  path: string;
}

export default function Sidebar() {
  const menuOptions: MenuOption[] = [
    { title: "Início", icon: HomeIcon, path: "/" },
    { title: "Transações", icon: ListTodoIcon, path: '/transactions' },
  ];

  return (
    <nav className="bg-primary-dark h-dvh px-4 py-6 flex flex-col justify-between items-center">
      <div className="w-12 h-12 bg-background rounded-full"></div>

      <ul className="space-y-4">
        {
            menuOptions.map((item, index) => {
                const Icon = item.icon
                return (
                    <li key={index}>
                        <Link href={item.path} title={item.title}>
                            <Icon size={24} color="#FFF" />
                        </Link>
                    </li>
                )
            })
        }
      </ul>

      <Link href={""}>
        <DoorOpen size={24} color="#FFF" />
      </Link>
    </nav>
  );
}
