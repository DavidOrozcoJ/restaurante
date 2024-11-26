<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CategorySeeder extends Seeder
{
    public function run()
    {
        // Usar DB::table para insertar las categorías de manera masiva
        DB::table('categories')->insert([
            ['name' => 'Entradas', 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Platos Principales', 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Bebidas', 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Postres', 'created_at' => now(), 'updated_at' => now()],
        ]);
    }
}