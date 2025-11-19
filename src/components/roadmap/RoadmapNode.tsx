import { LucideIcon, Lock, CheckCircle2, PlayCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface RoadmapNodeProps {
  title: string;
  icon: LucideIcon;
  status: "locked" | "current" | "completed";
  position: { x: number; y: number };
  onClick?: () => void;
}

const RoadmapNode = ({
  title,
  icon: Icon,
  status,
  position,
  onClick,
}: RoadmapNodeProps) => {
  const isClickable = status !== "locked";

  const statusStyles = {
    locked:
      "bg-muted/50 border-muted-foreground/20 cursor-not-allowed backdrop-blur-sm",
    current:
      "bg-gradient-warm border-accent shadow-lg shadow-accent/20 cursor-pointer animate-pulse [animation-duration:3s] ring-2 ring-accent/10",
    completed:
      "bg-gradient-to-br from-secondary to-secondary/80 border-secondary cursor-pointer shadow-md hover:shadow-lg transition-shadow",
  };

  const iconColor = {
    locked: "text-muted-foreground",
    current: "text-accent-foreground",
    completed: "text-secondary-foreground",
  };

  const StatusIcon =
    status === "locked"
      ? Lock
      : status === "completed"
      ? CheckCircle2
      : PlayCircle;

  return (
    <div
      className="absolute"
      style={{
        left: `${position.x}%`,
        top: `${position.y}%`,
        transform: "translate(-50%, -50%)",
      }}
    >
      <div
        onClick={isClickable ? onClick : undefined}
        className={cn(
          "relative flex flex-col items-center gap-2 transition-all hover:scale-110",
          isClickable && "group"
        )}
      >
        <div
          className={cn(
            "relative w-16 h-16 rounded-full border-4 flex items-center justify-center transition-all duration-300",
            statusStyles[status],
            isClickable && "hover:scale-110 hover:border-accent/100"
          )}
        >
          <Icon
            className={cn("h-7 w-7 transition-colors", iconColor[status])}
          />
          <div
            className={cn(
              "absolute -bottom-1 -right-1 rounded-full p-0.5 transition-all",
              status === "completed" && "bg-secondary-foreground/10",
              status === "current" && "bg-accent/20",
              status === "locked" && "bg-muted"
            )}
          >
            <StatusIcon className={cn("h-5 w-5", iconColor[status])} />
          </div>

          {/* Efeito de brilho para módulos concluídos */}
          {status === "completed" && (
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" />
          )}
        </div>

        <span
          className={cn(
            "text-xs font-medium text-center max-w-[100px] px-2 py-1 rounded-md",
            status === "current" &&
              "bg-accent/10 text-accent-foreground font-semibold",
            status === "completed" && "text-secondary",
            status === "locked" && "text-muted-foreground"
          )}
        >
          {title}
        </span>

        {status === "current" && (
          <div className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap">
            <div className="bg-accent/80 text-accent-foreground text-xs px-2 py-1 rounded-full font-semibold animate-pulse [animation-duration:3s]">
              Você está aqui!
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RoadmapNode;
