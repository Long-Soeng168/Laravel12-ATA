import { Area, AreaChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';

import { MyTooltipButton } from '@/components/my-tooltip-button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import useTranslation from '@/hooks/use-translation';
import { Link, usePage } from '@inertiajs/react';
import { SquareArrowOutUpRight, TrendingUp } from 'lucide-react';

const chartConfig = {
    total: {
        label: 'Views',
        color: 'hsl(var(--primary))',
    },
} satisfies ChartConfig;

export function ChartAreaInteractive() {
    const { t } = useTranslation();
    const { post_daily_views_data, featureDatas } = usePage().props;
    const formattedData = (post_daily_views_data || []).map((item) => ({
        date: item.date,
        total: Number(item.total),
    }));

    return (
        <Card className="h-full border-border/50 shadow-sm backdrop-blur-xl bg-card/95 transition-all duration-300 hover:shadow-md flex flex-col">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0 shrink-0">
                <div className="space-y-1">
                    <CardTitle className="text-xl font-bold flex items-center gap-2">
                        {t('Item views count')}
                    </CardTitle>
                    <CardDescription>{t('Visitors from the past 30 days')}</CardDescription>
                </div>
                <Link prefetch href={`/admin/item_view_counts`}>
                    <MyTooltipButton variant="outline" size="icon" className="h-8 w-8 rounded-full bg-secondary/50 hover:bg-primary hover:text-primary-foreground transition-colors" title={t('Show detailed views')}>
                        <SquareArrowOutUpRight className="h-4 w-4" />
                    </MyTooltipButton>
                </Link>
            </CardHeader>
            <CardContent className="pb-4 flex-1 flex flex-col">
                <div className="mt-4 flex items-baseline gap-2 mb-6 shrink-0">
                    <span className="text-4xl font-extrabold tracking-tight">
                        {featureDatas?.totalPostViews?.toLocaleString() || 0}
                    </span>
                    <span className="text-sm font-medium text-muted-foreground flex items-center text-green-500">
                        <TrendingUp className="h-4 w-4 mr-1" />
                        {t('Total Views')}
                    </span>
                </div>
                
                <ChartContainer className="min-h-[220px] h-full w-full flex-1" config={chartConfig}>
                    <AreaChart
                        accessibilityLayer
                        data={formattedData}
                        margin={{
                            left: 0,
                            right: 0,
                            top: 10,
                            bottom: 0
                        }}
                    >
                        <defs>
                            <linearGradient id="fillTotal" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="var(--color-total)" stopOpacity={0.5} />
                                <stop offset="95%" stopColor="var(--color-total)" stopOpacity={0.0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.5} />
                        <XAxis 
                            dataKey="date" 
                            tickLine={false} 
                            axisLine={false} 
                            tickMargin={10} 
                            tickFormatter={(value) => {
                                const date = new Date(value);
                                return `${date.getDate()} ${date.toLocaleString('default', { month: 'short' })}`;
                            }}
                            className="text-xs text-muted-foreground"
                        />
                        <ChartTooltip cursor={{ stroke: 'hsl(var(--primary))', strokeWidth: 1, strokeDasharray: '4 4' }} content={<ChartTooltipContent indicator="dot" className="backdrop-blur-md bg-card/90" />} />
                        <Area 
                            dataKey="total" 
                            type="monotone" 
                            fill="url(#fillTotal)" 
                            fillOpacity={1} 
                            stroke="var(--color-total)" 
                            strokeWidth={3} 
                            activeDot={{ r: 6, strokeWidth: 0, fill: 'var(--color-total)' }}
                        />
                    </AreaChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
}
