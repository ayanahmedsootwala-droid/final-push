import { AdminLayout } from '@/components/layouts/AdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FileCode2, Github, Rocket, ShieldCheck } from 'lucide-react';

const repoUrl = 'https://github.com/ayanahmedsootwala-droid/vertices';

export default function AdminSourceCode() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-xl font-semibold flex items-center gap-2">
            <FileCode2 className="w-5 h-5" />
            Source Code
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Project and deployment notes for the live frontend.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Repository</CardTitle>
              <CardDescription>
                The app is configured to run as a Vite frontend and deploy cleanly to Cloudflare Pages.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">Vite</Badge>
                <Badge variant="secondary">React</Badge>
                <Badge variant="secondary">Supabase</Badge>
                <Badge variant="secondary">Cloudflare Pages</Badge>
              </div>
              <a href={repoUrl} target="_blank" rel="noreferrer">
                <Button variant="outline" className="gap-2">
                  <Github className="w-4 h-4" />
                  Open Repository
                </Button>
              </a>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Deployment Checklist</CardTitle>
              <CardDescription>
                Keep these settings the same when you deploy.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              <div className="flex items-start gap-2">
                <Rocket className="w-4 h-4 mt-0.5 text-primary" />
                <p>Build command: <span className="font-medium text-foreground">pnpm build</span></p>
              </div>
              <div className="flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 mt-0.5 text-primary" />
                <p>Output directory: <span className="font-medium text-foreground">dist</span></p>
              </div>
              <div className="flex items-start gap-2">
                <Github className="w-4 h-4 mt-0.5 text-primary" />
                <p>Set <span className="font-medium text-foreground">VITE_SUPABASE_URL</span> and <span className="font-medium text-foreground">VITE_SUPABASE_ANON_KEY</span> in Cloudflare Pages.</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
}
