<?php

namespace App\Http\Controllers;

use App\Models\Producto;
use Illuminate\Http\Request;

class ProductoController extends Controller
{
    // Obtener todos los productos
    public function index()
    {
        return Producto::all();
    }

    // Crear un nuevo producto
    public function store(Request $request)
    {
        $producto = Producto::create($request->all());
        return response()->json($producto, 201);
    }

    // Mostrar un producto específico
    public function show($id)
    {
        return Producto::findOrFail($id);
    }

    // Actualizar un producto
    public function update(Request $request, $id)
    {
        $producto = Producto::findOrFail($id);
        $producto->update($request->all());
        return response()->json($producto, 200);
    }

    // Eliminar un producto
    public function destroy($id)
    {
        Producto::destroy($id);
        return response()->json(null, 204);
    }
}
