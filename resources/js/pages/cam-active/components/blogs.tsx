import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ChevronRight, Search } from 'lucide-react';

const BlogPosts = () => {
    return (
        <div className="mx-auto max-w-screen-xl px-6 py-16 xl:px-0">
            <div className="flex items-end flex-wrap justify-between gap-4">
                <h2 className="text-3xl font-bold tracking-tight">Posts</h2>
                <div className="flex flex-wrap items-center gap-4 w-full md:w-auto justify-end">
                    <div className="relative block flex-1">
                        <Search className="absolute inset-y-0 left-2.5 my-auto h-5 w-5" />
                        <Input
                            className="md:w-[280px] w-full flex-1 rounded border-none bg-slate-100/70 pl-10 shadow-none dark:bg-slate-800"
                            placeholder="Search"
                        />
                    </div>
                    <Select defaultValue="recommended">
                        <SelectTrigger className="w-[180px]">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="recommended">Recommended</SelectItem>
                            <SelectItem value="latest">Latest</SelectItem>
                            <SelectItem value="popular">Popular</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <div className="mt-4 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
                {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
                    <Card key={i} className="overflow-hidden rounded-md p-0 shadow-none">
                        <CardHeader className="p-0">
                            <div className="bg-muted aspect-video w-full border-b" />
                        </CardHeader>
                        <CardContent className="pb-6">
                            <div className="flex items-center gap-3">
                                <Badge className="bg-primary/5 text-primary hover:bg-primary/5 shadow-none">Technology</Badge>
                                <span className="text-muted-foreground text-xs font-medium">05-Jan-2025</span>
                            </div>

                            <h3 className="mt-4 text-[1.35rem] font-semibold tracking-tight">A beginner&apos;s guide to blackchain for engineers</h3>
                            <p className="text-muted-foreground mt-2">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros.
                            </p>

                            <Button className="mt-6 shadow-none">
                                Read more <ChevronRight />
                            </Button>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default BlogPosts;
