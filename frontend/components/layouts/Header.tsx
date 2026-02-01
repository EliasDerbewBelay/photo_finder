import { Button } from "../ui/button";
import { ImageIcon, Sparkles } from "lucide-react";
import Link from "next/link";
import { ModeToggle } from "../ui/themeToggle";

export default function Header() {
  return (
    <header className="border-b bg-background/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <div className="relative">
            <ImageIcon className="h-8 w-8 text-primary" />
            <Sparkles className="absolute -top-1 -right-1 h-4 w-4 text-primary animate-pulse" />
          </div>
          <span className="text-2xl font-bold text-foreground">
            PhotoSphere AI
          </span>
        </div>
        <div className="flex items-center space-x-4">
          <ModeToggle />
          <Link href="/gallery">
            <Button variant="ghost">Gallery</Button>
          </Link>
          <Link href="/gallery">
            <Button className="bg-primary hover:bg-primary/90">
              Launch App
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
