import { useState } from 'react';
import { Save, RefreshCw, Palette } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AdminLayout } from '@/components/layouts/AdminLayout';
import { toast } from 'sonner';
import { useLanguage } from '@/contexts/LanguageContext';

interface ColorToken { key: string; label: string; value: string; }

const DEFAULTS: ColorToken[] = [
  { key: '--primary', label: 'Primary', value: '222.2 47.4% 11.2%' },
  { key: '--primary-foreground', label: 'Primary Foreground', value: '210 40% 98%' },
  { key: '--secondary', label: 'Secondary', value: '210 40% 96%' },
  { key: '--accent', label: 'Accent', value: '210 40% 94%' },
  { key: '--destructive', label: 'Destructive', value: '0 84.2% 60.2%' },
  { key: '--gold', label: 'Gold (Brand)', value: '43 59% 44%' },
  { key: '--background', label: 'Background', value: '0 0% 100%' },
  { key: '--foreground', label: 'Foreground', value: '222.2 84% 4.9%' },
  { key: '--muted', label: 'Muted', value: '210 40% 96%' },
  { key: '--border', label: 'Border', value: '214.3 31.8% 91.4%' },
];

const hslToHex = (hsl: string): string => {
  try {
    const [h, s, l] = hsl.split(' ').map(v => parseFloat(v));
    const sl = s / 100, ll = l / 100;
    const a = sl * Math.min(ll, 1 - ll);
    const f = (n: number) => {
      const k = (n + h / 30) % 12;
      const color = ll - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
      return Math.round(255 * color).toString(16).padStart(2, '0');
    };
    return `#${f(0)}${f(8)}${f(4)}`;
  } catch { return '#000000'; }
};

const hexToHsl = (hex: string): string => {
  try {
    const r = parseInt(hex.slice(1, 3), 16) / 255;
    const g = parseInt(hex.slice(3, 5), 16) / 255;
    const b = parseInt(hex.slice(5, 7), 16) / 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    const l = (max + min) / 2;
    if (max === min) return `0 0% ${Math.round(l * 100)}%`;
    const d = max - min;
    const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    let h = 0;
    if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
    else if (max === g) h = ((b - r) / d + 2) / 6;
    else h = ((r - g) / d + 4) / 6;
    return `${Math.round(h * 360)} ${Math.round(s * 100)}% ${Math.round(l * 100)}%`;
  } catch { return '0 0% 0%'; }
};

export default function AdminTheme() {
  const { t } = useLanguage();
  const [tokens, setTokens] = useState<ColorToken[]>(DEFAULTS);
  const [saved, setSaved] = useState(false);

  const updateToken = (key: string, hslValue: string) => {
    setTokens(prev => prev.map(t => t.key === key ? { ...t, value: hslValue } : t));
  };

  const applyPreview = () => {
    tokens.forEach(t => {
      document.documentElement.style.setProperty(t.key, t.value);
    });
    toast.success('Preview applied — refresh to reset');
  };

  const resetDefaults = () => {
    setTokens(DEFAULTS);
    DEFAULTS.forEach(t => document.documentElement.style.removeProperty(t.key));
    toast.info('Reset to defaults');
  };

  const saveToCss = () => {
    const css = `:root {\n${tokens.map(t => `  ${t.key}: ${t.value};`).join('\n')}\n}`;
    const blob = new Blob([css], { type: 'text/css' });
    const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'theme-tokens.css'; a.click();
    setSaved(true); toast.success('CSS file downloaded');
  };

  return (
    <AdminLayout>
      <div className="p-4 md:p-6 space-y-5 max-w-2xl">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold">Theme Editor</h1>
            <p className="text-sm text-muted-foreground">Customize brand colors and design tokens</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={resetDefaults} className="h-9 border border-border gap-2">
              <RefreshCw className="w-3.5 h-3.5" /> Reset
            </Button>
            <Button variant="ghost" size="sm" onClick={applyPreview} className="h-9 border border-border gap-2">
              <Palette className="w-3.5 h-3.5" /> Preview
            </Button>
            <Button size="sm" onClick={saveToCss} className="h-9 gap-2">
              <Save className="w-3.5 h-3.5" /> Export CSS
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader className="pb-3"><CardTitle className="text-sm font-semibold">Color Tokens (HSL)</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {tokens.map(t => (
              <div key={t.key} className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-lg border border-border shrink-0" style={{ backgroundColor: `hsl(${t.value})` }} />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-muted-foreground">{t.key}</p>
                  <p className="text-xs text-foreground">{t.label}</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <input
                    type="color"
                    value={hslToHex(t.value)}
                    onChange={e => updateToken(t.key, hexToHsl(e.target.value))}
                    className="w-9 h-9 rounded cursor-pointer border border-border bg-transparent p-0.5"
                  />
                  <Input
                    value={t.value}
                    onChange={e => updateToken(t.key, e.target.value)}
                    className="h-9 text-xs font-mono w-40"
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3"><CardTitle className="text-sm font-semibold">Typography Scale</CardTitle></CardHeader>
          <CardContent className="space-y-2">
            {[
              { label: 'Display (Hero)', size: 'text-5xl', weight: 'font-bold', sample: 'XYZ Automobiles' },
              { label: 'Heading 1', size: 'text-3xl', weight: 'font-bold', sample: 'Premium Cars in Pakistan' },
              { label: 'Heading 2', size: 'text-xl', weight: 'font-semibold', sample: 'Featured Listings' },
              { label: 'Body', size: 'text-sm', weight: 'font-normal', sample: 'Browse thousands of verified cars across Pakistan' },
              { label: 'Caption', size: 'text-xs', weight: 'font-normal', sample: 'Last updated 2 hours ago' },
            ].map(t => (
              <div key={t.label} className="flex items-baseline gap-4 py-2 border-b border-border last:border-0">
                <p className="text-xs text-muted-foreground w-28 shrink-0">{t.label}</p>
                <p className={`${t.size} ${t.weight} text-foreground`}>{t.sample}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
