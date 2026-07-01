<?php

namespace App\Exports;

use App\Models\VideoDailyView;
use Maatwebsite\Excel\Concerns\FromQuery;
use Maatwebsite\Excel\Concerns\WithMapping;
use Maatwebsite\Excel\Concerns\WithHeadings;

class VideoDailyViewExport implements FromQuery, WithMapping, WithHeadings
{
    protected $filters;

    public function __construct($filters)
    {
        $this->filters = $filters;
    }

    public function query()
    {
        $query = VideoDailyView::query()
            ->with('video')
            ->whereBetween('view_date', [$this->filters['from_date'], $this->filters['to_date']])
            ->orderBy($this->filters['sortBy'], $this->filters['sortDirection']);

        if (!empty($this->filters['status'])) {
            // Note: If you want to filter by video status, you might need whereHas('video')
            // I'm keeping this matching ItemDailyViewExport.
            $query->where('status', $this->filters['status']);
        }

        if (!empty($this->filters['search'])) {
            $query->whereHas('video', function ($subQuery) {
                $subQuery->where('title', 'LIKE', "%{$this->filters['search']}%")
                         ->orWhere('title_kh', 'LIKE', "%{$this->filters['search']}%");
            });
        }

        return $query;
    }

    public function map($view): array
    {
        return [
            $view->video?->id ?? 'N/A',
            $view->video?->title ?? 'N/A',
            $view->view_date,
            $view->view_counts,
        ];
    }

    public function headings(): array
    {
        return [
            'Video ID',
            'Video Title',
            'View Date',
            'View Counts',
        ];
    }
}
