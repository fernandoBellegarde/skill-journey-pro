import { Code, BookOpen, Video, FileText, Trophy, Award } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import RoadmapNode from "@/components/roadmap/RoadmapNode";
import BadgeItem from "@/components/roadmap/BadgeItem";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";

const Roadmap = () => {
  const overallProgress = 45;

  const modules = [
    {
      title: "Introdução",
      icon: BookOpen,
      status: "completed" as const,
      position: { x: 10, y: 20 },
    },
    {
      title: "Lógica de Programação",
      icon: Code,
      status: "completed" as const,
      position: { x: 25, y: 40 },
    },
    {
      title: "Banco de Dados",
      icon: FileText,
      status: "current" as const,
      position: { x: 45, y: 35 },
    },
    {
      title: "Python Básico",
      icon: Code,
      status: "locked" as const,
      position: { x: 65, y: 50 },
    },
    {
      title: "Análise de Dados",
      icon: Video,
      status: "locked" as const,
      position: { x: 80, y: 30 },
    },
    {
      title: "Visualização",
      icon: Trophy,
      status: "locked" as const,
      position: { x: 90, y: 45 },
    },
  ];

  const badges = [
    {
      title: "Primeiro Passo",
      description: "Completou o primeiro módulo",
      earned: true,
      position: { x: 15, y: 65 },
    },
    {
      title: "Persistente",
      description: "5 dias consecutivos",
      earned: true,
      position: { x: 35, y: 70 },
    },
    {
      title: "Explorador",
      description: "Explorou 3 carreiras",
      earned: false,
      position: { x: 60, y: 70 },
    },
    {
      title: "Mestre",
      description: "Completou uma jornada",
      earned: false,
      position: { x: 85, y: 65 },
    },
  ];

  const handleModuleClick = (module: (typeof modules)[0]) => {
    if (module.status === "current") {
      toast.info("Abrindo módulo", {
        description: `Carregando conteúdo de ${module.title}...`,
      });
    } else if (module.status === "completed") {
      toast.success("Módulo concluído!", {
        description: "Você já completou este módulo. Quer revisar?",
      });
    }
  };

  return (
    <div className="container max-w-7xl px-4 py-8 space-y-8">
      {/* Header with Progress */}
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16 border-4 border-secondary">
            <AvatarImage src="https://images.pexels.com/photos/1820559/pexels-photo-1820559.jpeg" />
            <AvatarFallback>JN</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-foreground">
              Minha Jornada Gamificada
            </h1>
            <p className="text-muted-foreground">Carreira: Analista de Dados</p>
          </div>
        </div>

        <Card className="p-6 bg-gradient-primary">
          <div className="flex items-center justify-between mb-2">
            <span className="font-semibold text-primary-foreground">
              Progresso Geral
            </span>
            <span className="text-2xl font-bold text-primary-foreground">
              {overallProgress}%
            </span>
          </div>
          <div className="relative h-3 w-full overflow-hidden rounded-full bg-primary-foreground/20">
            <div
              className="h-full bg-primary-foreground transition-all duration-500 ease-out rounded-full"
              style={{ width: `${overallProgress}%` }}
            />
          </div>
          <p className="text-sm text-primary-foreground/80 mt-2">
            3 de 6 módulos concluídos
          </p>
        </Card>
      </div>

      {/* Roadmap Trail */}
      <Card className="p-8 min-h-[600px] bg-gradient-to-br from-muted/20 to-muted/40 relative overflow-hidden border-muted/50">
        {/* Trail Path SVG */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{ zIndex: 0 }}
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="pathGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="hsl(var(--secondary))" />
              <stop offset="50%" stopColor="hsl(var(--accent))" />
              <stop offset="100%" stopColor="hsl(var(--muted-foreground))" />
            </linearGradient>
            <linearGradient
              id="completedGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="hsl(var(--secondary))" />
              <stop offset="100%" stopColor="hsl(var(--accent))" />
            </linearGradient>
          </defs>

          {/* Caminho principal conectando todos os módulos */}
          <path
            d="M 10 20 Q 18 30, 25 40 Q 35 37, 45 35 Q 55 42, 65 50 Q 72 40, 80 30 Q 85 37, 90 45"
            fill="none"
            stroke="url(#pathGradient)"
            strokeWidth="3"
            strokeDasharray="6,3"
            opacity="0.6"
            vectorEffect="non-scaling-stroke"
          />

          {/* Caminho concluído (até o módulo atual) */}
          <path
            d="M 10 20 Q 18 30, 25 40 Q 35 37, 45 35"
            fill="none"
            stroke="url(#completedGradient)"
            strokeWidth="4"
            opacity="0.8"
            vectorEffect="non-scaling-stroke"
          />

          {/* Pontos de conexão nos módulos concluídos */}
          <circle
            cx="10"
            cy="20"
            r="2"
            fill="hsl(var(--secondary))"
            opacity="0.8"
          />
          <circle
            cx="25"
            cy="40"
            r="2"
            fill="hsl(var(--secondary))"
            opacity="0.8"
          />
          <circle
            cx="45"
            cy="35"
            r="2"
            fill="hsl(var(--accent))"
            opacity="0.9"
          />
        </svg>

        {/* Modules */}
        {modules.map((module) => (
          <RoadmapNode
            key={module.title}
            title={module.title}
            icon={module.icon}
            status={module.status}
            position={module.position}
            onClick={() => handleModuleClick(module)}
          />
        ))}

        {/* Badges */}
        {badges.map((badge) => (
          <BadgeItem
            key={badge.title}
            title={badge.title}
            description={badge.description}
            earned={badge.earned}
            position={badge.position}
          />
        ))}

        {/* Legend */}
        <div className="absolute bottom-4 right-4 bg-card border border-border rounded-lg p-4 shadow-card">
          <h3 className="font-semibold text-sm mb-2 text-foreground">
            Legenda
          </h3>
          <div className="space-y-2 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-secondary" />
              <span className="text-muted-foreground">Concluído</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-gradient-warm" />
              <span className="text-muted-foreground">Em andamento</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-muted" />
              <span className="text-muted-foreground">Bloqueado</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="w-3 h-3 text-accent" />
              <span className="text-muted-foreground">Badge conquistado</span>
            </div>
          </div>
        </div>
      </Card>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-6 text-center">
          <Trophy className="h-8 w-8 mx-auto mb-2 text-accent" />
          <p className="text-2xl font-bold text-foreground">12</p>
          <p className="text-sm text-muted-foreground">Conquistas</p>
        </Card>
        <Card className="p-6 text-center">
          <Video className="h-8 w-8 mx-auto mb-2 text-secondary" />
          <p className="text-2xl font-bold text-foreground">28h</p>
          <p className="text-sm text-muted-foreground">Tempo de estudo</p>
        </Card>
        <Card className="p-6 text-center">
          <Award className="h-8 w-8 mx-auto mb-2 text-highlight" />
          <p className="text-2xl font-bold text-foreground">2</p>
          <p className="text-sm text-muted-foreground">Badges ganhos</p>
        </Card>
      </div>
    </div>
  );
};

export default Roadmap;
