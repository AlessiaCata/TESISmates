USE mates_db;

-- Hash de ejemplo: reemplazar por uno generado con `npm run hash -- <tu_clave>`
INSERT INTO usuarios (nombre,email,password_hash,rol)
VALUES ('Admin','admin@mates.com','$2a$10$7s4t3R5qY8lH4v2t7cQwzO8QW1nJ1s0iQkPjW8nS7zHkQ2y7m1o9a', 'admin');

INSERT INTO productos (nombre, categoria, sku, precio_costo, precio_venta, stock_actual, stock_minimo)
VALUES
('Mate Imperial', 'Mates', 'MAT-IMP-001', 8000, 14500, 10, 2),
('Yerbera Lata Negra', 'Yerberas', 'YER-LAT-NE', 1500, 3200, 25, 5);

INSERT INTO variantes (producto_id, color, material, codigo_qr, stock_actual)
VALUES
(1, 'Marrón', 'Cuero', 'VAR-000001', 5),
(1, 'Negro', 'Cuero', 'VAR-000002', 5);
