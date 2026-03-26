import type { ReactNode } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./card";

type EmptyStateProps = {
  title: string;
  description?: string;
  actions?: ReactNode;
};

export function EmptyState({ title, description, actions }: EmptyStateProps) {
  return (
    <Card className="glass">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {description ? <p className="text-sm text-text/70">{description}</p> : null}
        {actions}
      </CardContent>
    </Card>
  );
}
