import { Button } from "./ui/button";
import { Separator } from "./ui/separator";

export default function Footer() {
  return (
    <div>
      <Separator className="my-5" />
      <footer className="flex flex-col items-center justify-center text-center">
        <div className="block mb-2">
          <p>
            Made with ❤️ by{" "}
            <a href="https://github.com/AJAmit17" className="underline">
              Amit Acharya
            </a>
          </p>
        </div>
        <div>
          <p>
            Do give it a Star ⭐{" "}
            <Button>
              <a href="https://github.com/AJAmit17/ConnectCraft">Github</a>
            </Button>
          </p>
        </div>
      </footer>
    </div>
  );
}
