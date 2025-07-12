How to setup project
- composer install
- rm package-lock.json
- npm install
- cp .env.example .env
- php artisan key:generate
- php artisan migrate
- composer run dev

- command pull branch in githug is: 
    - git branch -a
    - git checkout your branch name

- Seed roles and permissions
    - php artisan db:seed --class=RolesAndPermissionsSeeder
    - php artisan db:seed --class=TypeSeeder
    - php artisan db:seed --class=UserSeeder
    
-----------------------------------------
- npm i --legacy-peer-deps# Laravel12-ATA
