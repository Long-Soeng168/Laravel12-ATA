<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" @class(['dark'=> ($appearance ?? 'system') == 'dark'])>

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>{{ $meta['title'] ?? 'A-Tech Auto' }}</title>
    <meta name="description" content="{{ $meta['description'] ?? 'A-Tech Auto is the all-in-one automotive platform. Buy & sell cars or spare-parts, locate garages & EV stations, find DTC errors, access repair documents, and learn through our video tutorials and in-person courses.' }}">
    <meta name="keywords" content="{{ $meta['keywords'] ?? 'A-Tech Auto, ATech Auto, atech auto, ATA, ata, automotive platform Cambodia, buy and sell cars, auto spare parts, locate garages Cambodia, EV charging stations, DTC error codes, OBD2 diagnostics, auto repair manuals, automotive video tutorials, mechanic courses' }}">

    <meta property="og:type" content="website" />
    <meta property="og:title" content="{{ $meta['title'] ?? 'A-Tech Auto' }}" />
    <meta property="og:description" content="{{ $meta['description'] ?? 'A-Tech Auto is the all-in-one automotive platform. Buy & sell cars or spare-parts, locate garages & EV stations, find DTC errors, access repair documents, and learn through our video tutorials and in-person courses.' }}" />
    <meta property="og:image" content="{{ $meta['image'] ?? asset('icon512_maskable.png') }}" />
    <meta property="og:url" content="{{ $meta['url'] ?? url()->current() }}" />
    <meta property="og:site_name" content="A-Tech Auto" />

    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="{{ $meta['title'] ?? 'A-Tech Auto' }}" />
    <meta name="twitter:description" content="{{ $meta['description'] ?? 'A-Tech Auto is the all-in-one automotive platform. Buy & sell cars or spare-parts, locate garages & EV stations, find DTC errors, access repair documents, and learn through our video tutorials and in-person courses.' }}" />
    <meta name="twitter:image" content="{{ $meta['image'] ?? asset('icon512_maskable.png') }}" />

    @routes
    @viteReactRefresh
    @vite(['resources/js/app.tsx', "resources/js/pages/{$page['component']}.tsx"])
    @inertiaHead

    {{-- Inline script to detect system dark mode preference and apply it immediately --}}
    <script>
        (function() {
            const appearance = '{{ $appearance ?? "system" }}';

            if (appearance === 'system') {
                const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

                if (prefersDark) {
                    document.documentElement.classList.add('dark');
                }
            }
        })();
    </script>

    <!-- Google tag (gtag.js) -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-LDQLZW5YZV"></script>
    <script>
        window.dataLayer = window.dataLayer || [];

        function gtag() {
            dataLayer.push(arguments);
        }
        gtag('js', new Date());

        gtag('config', 'G-LDQLZW5YZV');
    </script>

</head>

<body class="antialiased scroll-smooth">
    @inertia
</body>

</html>