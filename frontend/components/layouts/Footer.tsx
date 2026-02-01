import {ImageIcon, Sparkles} from "lucide-react"
import { Button } from "../ui/button";

export default function Footer() {
  return (
    <footer className="border-t py-8 bg-card/50 backdrop-blur-sm relative">
      <div className="container mx-auto px-4 text-center">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <ImageIcon className="h-7 w-7 text-primary" />
              <Sparkles className="absolute -top-1 -right-1 h-3 w-3 text-primary" />
            </div>
            <span className="text-xl font-semibold text-foreground">
              PhotoSphere AI
            </span>
          </div>
          <div className="text-muted-foreground text-sm md:text-base">
            © 2024 PhotoSphere AI. Your photos, organized intelligently.
          </div>
          <div className="flex space-x-3">
            <Button variant="ghost" size="sm" className="text-muted-foreground">
              Privacy
            </Button>
            <Button variant="ghost" size="sm" className="text-muted-foreground">
              Terms
            </Button>
            <Button variant="ghost" size="sm" className="text-muted-foreground">
              Contact
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
}
