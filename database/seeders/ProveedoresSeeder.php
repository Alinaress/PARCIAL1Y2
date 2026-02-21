<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;


class ProveedoresSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('proveedores')->insert([
        [
            'nombre' => 'UH S.A DE C.V',
            'telefono' => '1234-5678',
            'estado' => true
        ],
        [
            'nombre' => 'Sportline de el salvador',
            'telefono' => '9876-1111',
            'estado' => true
        ],
        [
            'nombre' => 'adidas us.com',
            'telefono' => '2515-0000',
            'estado' => true
        ]
    ]);
    }
}
