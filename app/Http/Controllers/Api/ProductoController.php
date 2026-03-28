<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Producto;
use Illuminate\Http\Request;

class ProductoController extends Controller
{
    public function index()
    {
        return response()->json(Producto::all());
    }

    public function store(Request $request)
    {
        $request->validate([
            'nombre'       => 'required|string|max:255',
            'precio'       => 'required|numeric',
            'categoria_id' => 'required',
            'marca_id'     => 'required',
            'proveedor_id' => 'required',
        ]);

        $producto = Producto::create($request->all());
        return response()->json($producto, 201);
    }

    public function show(string $id)
    {
        $producto = Producto::find($id);
        if (!$producto) return response()->json(['message' => 'No encontrado'], 404);
        return response()->json($producto);
    }

    public function update(Request $request, string $id)
    {
        $producto = Producto::find($id);
        if (!$producto) return response()->json(['message' => 'No encontrado'], 404);
        $producto->update($request->all());
        return response()->json($producto);
    }

    public function destroy(string $id)
    {
        $producto = Producto::find($id);
        if (!$producto) return response()->json(['message' => 'No encontrado'], 404);
        $producto->delete();
        return response()->json(['message' => 'Producto eliminado']);
    }
}
