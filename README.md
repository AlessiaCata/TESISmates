# Mates ERP (Backend + Frontend separados)

## Estructura
```
mates-erp-separado/
├─ backend/
├─ frontend/
└─ db/
```

## Paso a paso (Windows PowerShell / VS Code)

### 1) Base de datos (una sola vez)
Abrí tu cliente MySQL y ejecutá:
```sql
SOURCE db/schema.sql;
SOURCE db/seed.sql;
```
> Esto crea el usuario admin por defecto: `admin@mates.com` / `admin123` (cambiá el hash para producción).

### 2) Backend
```pwsh
cd backend
copy .env.example .env
# Editá .env con tus credenciales MySQL si hace falta
npm i
npm run dev
```
Probá la API: http://localhost:4000/health → `{ ok: true }`

> Tip: para crear un hash bcrypt propio
```pwsh
npm run hash -- TuPasswordNueva
```
Copiá el hash en `db/seed.sql` o actualizá en la tabla `usuarios`.

### 3) Frontend
En otra terminal:
```pwsh
cd ../frontend
copy .env.example .env
# Verificá que VITE_API_URL sea http://localhost:4000
npm i
npm run dev
```
Abrí la URL que te muestre Vite (normalmente http://localhost:5173).

### 4) Login de prueba
- Email: `admin@mates.com`
- Pass: `admin123`

### Problemas comunes
- **No existe carpeta** al hacer `cd`: asegurate de estar parado en la carpeta raíz del proyecto `mates-erp-separado`.
- **CORS**: Ajustá `CORS_ORIGIN` en `backend/.env` con la URL de Vite.
- **DB**: Verificá `DB_USER/DB_PASSWORD` y que el schema `mates_db` exista.
