import { MyPagination } from '@/components/my-pagination';
import { MyRefreshButton } from '@/components/my-refresh-button';
import { MySearchTableData } from '@/components/my-search-table-data';
import { Button } from '@/components/ui/button';
import { CalendarDatePicker } from '@/components/ui/calendar-date-picker';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import useTranslation from '@/hooks/use-translation';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { useForm as inertiaUseForm, usePage, Link } from '@inertiajs/react';
import { EyeIcon, FileUpIcon, TrendingUp, Trophy } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip as RechartsTooltip, XAxis, YAxis } from 'recharts';
import ViewCountMyTableData from './components/view-count-my-table-data';

const ItemViewCount = () => {
    const { t, currentLocale } = useTranslation();
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: currentLocale === 'kh' ? 'ទំនិញ' : 'Items',
            href: '/admin/items',
        },
        {
            title: currentLocale === 'kh' ? 'ចំនួនអ្នកមើល' : 'View Counts',
            href: '/admin/item_view_counts',
        },
    ];
    const urlParams = new URLSearchParams(window.location.search);
    const { get, transform } = inertiaUseForm();

    const { totalViews, dailyTrends, topItem, from_date, to_date } = usePage().props as any;
    
    const [selectedDateRange, setSelectedDateRange] = useState({
        from: new Date(from_date),
        to: new Date(to_date),
    });

    function onSubmit({ from_date, to_date }: { from_date: Date; to_date: Date }) {
        try {
            transform(() => ({
                from_date: from_date,
                to_date: to_date,
                search: urlParams.get('search')?.toString(),
            }));

            get(`/admin/item_view_counts`, {
                preserveScroll: true,
                preserveState: true,
                onSuccess: (page) => {
                    if (page.props.flash?.success) {
                        toast.success('Success', {
                            description: page.props.flash.success,
                        });
                    }
                },
                onError: (e) => {
                    toast.error('Error', {
                        description: 'Failed to load data.' + JSON.stringify(e, null, 2),
                    });
                },
            });
        } catch (error) {
            console.error('Form submission error', error);
            toast.error('Failed to submit the form.');
        }
    }

    // Format chart data for Recharts
    const chartData = dailyTrends?.map((item: any) => ({
        date: new Date(item.view_date).toLocaleDateString(currentLocale === 'kh' ? 'km-KH' : 'en-US', { month: 'short', day: 'numeric' }),
        views: parseInt(item.total_views, 10)
    })) || [];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <div className="flex flex-col gap-6 p-4 md:p-6">
                
                {/* Header Actions */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex flex-col">
                        <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                            {currentLocale === 'kh' ? 'របាយការណ៍ចំនួនអ្នកមើល' : 'View Counts Report'}
                        </h1>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            {currentLocale === 'kh' ? 'វិភាគចំនួនអ្នកចូលមើលទំនិញរបស់អ្នក' : 'Analyze the performance and traffic of your items.'}
                        </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                        <CalendarDatePicker
                            variant="outline"
                            date={selectedDateRange}
                            onDateSelect={(range) => {
                                setSelectedDateRange(range);
                                onSubmit({ from_date: range.from, to_date: range.to });
                            }}
                        />
                        <form method="GET" action="/admin/item_view_counts/export" target="_blank">
                            <input type="hidden" name="from_date" value={selectedDateRange.from.toISOString()} />
                            <input type="hidden" name="to_date" value={selectedDateRange.to.toISOString()} />
                            <input type="hidden" name="search" value={urlParams.get('search')?.toString()} />
                            <Button type="submit" variant="outline" className="gap-2">
                                <FileUpIcon className="h-4 w-4" /> {currentLocale === 'kh' ? 'ទាញយក' : 'Export'}
                            </Button>
                        </form>
                    </div>
                </div>

                {/* Dashboard Metrics */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium">{currentLocale === 'kh' ? 'អ្នកមើលសរុប' : 'Total Views'}</CardTitle>
                            <EyeIcon className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{totalViews.toLocaleString()}</div>
                            <p className="text-xs text-muted-foreground mt-1">
                                {currentLocale === 'kh' ? 'ក្នុងចន្លោះកាលបរិច្ឆេទដែលបានជ្រើសរើស' : 'In the selected date range'}
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="md:col-span-1 lg:col-span-2">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium">{currentLocale === 'kh' ? 'ទំនិញដែលមានអ្នកមើលច្រើនជាងគេ' : 'Most Viewed Item'}</CardTitle>
                            <Trophy className="h-4 w-4 text-yellow-500" />
                        </CardHeader>
                        <CardContent>
                            {topItem ? (
                                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                                    <div>
                                        <div className="text-xl font-bold truncate max-w-sm">
                                            {currentLocale === 'kh' ? (topItem.item?.name_kh || topItem.item?.name) : topItem.item?.name}
                                        </div>
                                        <p className="text-xs text-muted-foreground mt-1">
                                            ID: {topItem.item_id}
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-2 bg-primary/10 px-3 py-1 rounded-full">
                                        <TrendingUp className="h-4 w-4 text-primary" />
                                        <span className="text-sm font-semibold text-primary">{topItem.total_views} {currentLocale === 'kh' ? 'អ្នកមើល' : 'Views'}</span>
                                    </div>
                                </div>
                            ) : (
                                <div className="text-sm text-muted-foreground">No data available</div>
                            )}
                        </CardContent>
                    </Card>
                </div>

                {/* Daily Trend Chart */}
                {chartData.length > 0 && (
                    <Card>
                        <CardHeader>
                            <CardTitle>{currentLocale === 'kh' ? 'និន្នាការអ្នកមើល' : 'View Trends'}</CardTitle>
                            <CardDescription>{currentLocale === 'kh' ? 'ចរាចរណ៍អ្នកមើលប្រចាំថ្ងៃសម្រាប់រយៈពេលដែលបានជ្រើសរើស' : 'Daily view traffic for the selected period'}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="h-[300px] w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                                        <defs>
                                            <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.8}/>
                                                <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" className="dark:stroke-gray-800" />
                                        <XAxis 
                                            dataKey="date" 
                                            axisLine={false}
                                            tickLine={false}
                                            tick={{ fontSize: 12, fill: '#6b7280' }}
                                            dy={10}
                                        />
                                        <YAxis 
                                            axisLine={false}
                                            tickLine={false}
                                            tick={{ fontSize: 12, fill: '#6b7280' }}
                                        />
                                        <RechartsTooltip 
                                            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                        />
                                        <Area type="monotone" dataKey="views" name={currentLocale === 'kh' ? 'អ្នកមើល' : 'Views'} stroke="#6366f1" strokeWidth={2} fillOpacity={1} fill="url(#colorViews)" />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </CardContent>
                    </Card>
                )}

                {/* Data Table */}
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2 border-b mb-4">
                        <CardTitle>{currentLocale === 'kh' ? 'ចំណាត់ថ្នាក់ទំនិញ' : 'Item Ranking'}</CardTitle>
                        <div className="flex items-center gap-2">
                            <MySearchTableData />
                            <MyRefreshButton />
                        </div>
                    </CardHeader>
                    <CardContent className="p-0">
                        <ViewCountMyTableData />
                        <div className="p-4 border-t">
                            <MyPagination />
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
};

export default ItemViewCount;
