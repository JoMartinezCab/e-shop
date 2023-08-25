<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UserStoreRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array{
        return [
            'name' => 'required|string|min:2|max:100',
            'email' => 'required|string|email|max:100|unique:users',
            'password' => 'required|string|min:6',
        ];
    }

    public function messages():array{

        return [
            'name.required' => 'Nombre es requerdo',
            'name.min' => 'El nombre debe tener minimo 6 caracteres',
            'name.max' => 'Nombre debe tener maximo 100 caracteres',

            'email.required' => 'Email es requerdo',
            'email.unique' => 'El email ya esta registrado',
            'email.email' => 'Ingrese un email valido',
            'email.max' => 'El email debe tener maximo 100 caracteres',

            'password.required' => 'Contraseña es requerdo',
            'password.min' => 'La contraseña debe tener como minimo 6 caracteres',
        ];
    }
}
