CREATE DATABASE IF NOT EXISTS mates_db CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;
USE mates_db;

CREATE TABLE usuarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(80) NOT NULL,
  email VARCHAR(120) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  rol ENUM('admin','vendedor') DEFAULT 'admin',
  creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE productos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(120) NOT NULL,
  categoria VARCHAR(80),
  sku VARCHAR(50) UNIQUE,
  precio_costo DECIMAL(10,2),
  precio_venta DECIMAL(10,2),
  stock_actual INT DEFAULT 0,
  stock_minimo INT DEFAULT 0,
  activo TINYINT(1) DEFAULT 1,
  creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE variantes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  producto_id INT NOT NULL,
  color VARCHAR(40),
  material VARCHAR(40),
  codigo_qr VARCHAR(128) UNIQUE,
  stock_actual INT DEFAULT 0,
  FOREIGN KEY (producto_id) REFERENCES productos(id)
);

CREATE TABLE clientes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(120) NOT NULL,
  telefono VARCHAR(40),
  email VARCHAR(120),
  notas TEXT
);

CREATE TABLE ventas (
  id INT AUTO_INCREMENT PRIMARY KEY,
  fecha DATETIME DEFAULT CURRENT_TIMESTAMP,
  total DECIMAL(10,2) NOT NULL,
  metodo_pago ENUM('efectivo','transferencia','tarjeta','mp') DEFAULT 'efectivo',
  cliente_id INT NULL,
  usuario_id INT NOT NULL,
  FOREIGN KEY (cliente_id) REFERENCES clientes(id),
  FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);

CREATE TABLE venta_items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  venta_id INT NOT NULL,
  producto_id INT NULL,
  variante_id INT NULL,
  cantidad INT NOT NULL,
  precio_unitario DECIMAL(10,2) NOT NULL,
  subtotal DECIMAL(10,2) NOT NULL,
  FOREIGN KEY (venta_id) REFERENCES ventas(id),
  FOREIGN KEY (producto_id) REFERENCES productos(id),
  FOREIGN KEY (variante_id) REFERENCES variantes(id)
);

CREATE TABLE movimientos_stock (
  id INT AUTO_INCREMENT PRIMARY KEY,
  producto_id INT NULL,
  variante_id INT NULL,
  tipo ENUM('entrada','salida','ajuste') NOT NULL,
  cantidad INT NOT NULL,
  motivo VARCHAR(120),
  referencia_id INT NULL,
  fecha DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (producto_id) REFERENCES productos(id),
  FOREIGN KEY (variante_id) REFERENCES variantes(id)
);
