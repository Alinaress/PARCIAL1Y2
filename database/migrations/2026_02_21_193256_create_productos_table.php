<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::create('productos', function (Blueprint $table) {

        $table->increments('id'); // SERIAL PK

        $table->string('nombre')->nullable(false); // NOT NULL
        $table->text('descripcion')->nullable(); // TEXT (no indica NOT NULL)
        $table->decimal('precio', 10, 2)->nullable(false); // DECIMAL NOT NULL

        $table->integer('categoria_id')->unsigned()->nullable(false);
        $table->integer('marca_id')->unsigned()->nullable(false);
        $table->integer('proveedor_id')->unsigned()->nullable(false);

        $table->timestamp('created_at')->useCurrent();
        // FOREIGN KEYS exactas
        $table->foreign('categoria_id')
            ->references('id')->on('categorias');

        $table->foreign('marca_id')
            ->references('id')->on('marcas');

        $table->foreign('proveedor_id')
            ->references('id')->on('proveedores');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('productos');
    }
};
