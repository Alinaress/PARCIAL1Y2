<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;


class CategoriasSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('categorias')->insert([
        [
            'nombre' => 'Ropa deportiva',
            'estado' => true
        ],
        [
            'nombre' => 'Zapatos',
            'estado' => true
        ],
        [
            'nombre' => 'Accesorios',
            'estado' => true
        ]
    ]);
    }
}
