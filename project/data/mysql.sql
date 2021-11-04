-- 

DROP DATABASE IF EXISTS ecommerce;

CREATE DATABASE IF NOT EXISTS ecommerce;

USE ecommerce;

--

CREATE TABLE actions (
    action_code      INT(10) UNSIGNED NOT NULL,
    action_name      VARCHAR(64) NOT NULL,
    action_codename  VARCHAR(32) NOT NULL
);

ALTER TABLE actions
    ADD PRIMARY KEY (action_code),
    ADD UNIQUE  KEY action_codename (action_codename);

ALTER TABLE actions
    MODIFY action_code INT(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--

CREATE TABLE roles (
    role_code         INT(10) UNSIGNED NOT NULL,
    role_name         VARCHAR(64) NOT NULL,
    role_codename     VARCHAR(32) NOT NULL,
    role_description  VARCHAR(128) DEFAULT NULL
);

ALTER TABLE roles
    ADD PRIMARY KEY (role_code),
    ADD UNIQUE  KEY role_codename (role_codename);

ALTER TABLE roles
    MODIFY role_code INT(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--

CREATE TABLE policies (
    policy_role        INT(10) UNSIGNED NOT NULL,
    policy_action      INT(10) UNSIGNED NOT NULL,
    policy_permission  TINYINT (1) DEFAULT 1
);

ALTER TABLE policies
    ADD PRIMARY KEY (policy_role, policy_action);

ALTER TABLE policies
    ADD CONSTRAINT policy_ibfk_1 FOREIGN KEY (policy_role) 
        REFERENCES roles (role_code)
        ON DELETE CASCADE,
    ADD CONSTRAINT policy_ibfk_2 FOREIGN KEY (policy_action) 
        REFERENCES actions (action_code)
        ON DELETE CASCADE;

--

CREATE TABLE user_type (
    usertype_code      INT(10) UNSIGNED NOT NULL,
    usertype_name      VARCHAR(64) NOT NULL,
    usertype_codename  VARCHAR(32) NOT NULL,
    usertype_amount    DECIMAL(15,2) NOT NULL
);

ALTER TABLE user_type
    ADD PRIMARY KEY (usertype_code),
    ADD UNIQUE  KEY usertype_codename (usertype_codename);

ALTER TABLE user_type
    MODIFY usertype_code INT(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--

CREATE TABLE account_status (
    status_code      INT(10) UNSIGNED NOT NULL,
    status_name      VARCHAR(64) NOT NULL,
    status_codename  VARCHAR(32) NOT NULL
);

ALTER TABLE account_status
    ADD PRIMARY KEY (status_code),
    ADD UNIQUE  KEY status_codename (status_codename);

ALTER TABLE account_status
    MODIFY status_code INT(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--

CREATE TABLE user (
    user_code             INT(10) UNSIGNED NOT NULL,
    user_created          DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    user_updated          DATETIME DEFAULT NULL,
    user_lastlogin        DATETIME DEFAULT NULL,
    user_fname            VARCHAR(100) NOT NULL,
    user_lname            VARCHAR(100) NOT NULL,
    user_gender           VARCHAR(1) DEFAULT NULL,
    user_birthdate        DATE DEFAULT NULL,
    user_phonenum         VARCHAR(16) DEFAULT NULL,
    user_email            VARCHAR(255) NOT NULL,
    user_password         VARCHAR(255) NOT NULL,
    user_image            VARCHAR(255) DEFAULT NULL,
    user_availablecredit  DECIMAL(15,2) DEFAULT 0.00,
    user_earnings         DECIMAL(15,2) DEFAULT 0.00,
    user_status           INT(10) UNSIGNED DEFAULT NULL,
    user_usertype         INT(10) UNSIGNED DEFAULT NULL,
    user_role             INT(10) UNSIGNED DEFAULT NULL
);

ALTER TABLE user
    ADD PRIMARY KEY (user_code),
    ADD UNIQUE  KEY user_email (user_email);

ALTER TABLE user
    MODIFY user_code INT(10) UNSIGNED NOT NULL AUTO_INCREMENT;

ALTER TABLE user
    ADD CONSTRAINT user_ibfk_1 FOREIGN KEY (user_status) 
        REFERENCES account_status (status_code)
        ON DELETE SET NULL,
    ADD CONSTRAINT user_ibfk_2 FOREIGN KEY (user_usertype) 
        REFERENCES user_type (usertype_code)
        ON DELETE SET NULL,
    ADD CONSTRAINT user_ibfk_3 FOREIGN KEY (user_role) 
        REFERENCES roles (role_code)
        ON DELETE SET NULL;
--

CREATE TABLE category (
    category_code         INT(10) UNSIGNED NOT NULL,
    category_name         VARCHAR(64) NOT NULL,
    category_description  VARCHAR(128) DEFAULT NULL,
    category_parent       INT(10) UNSIGNED DEFAULT NULL
);

ALTER TABLE category
    ADD PRIMARY KEY (category_code),
    ADD UNIQUE  KEY category_name (category_name);

ALTER TABLE category
    MODIFY category_code INT(10) UNSIGNED NOT NULL AUTO_INCREMENT;

ALTER TABLE category
    ADD CONSTRAINT category_ibfk_1 FOREIGN KEY (category_parent) 
        REFERENCES category (category_code)
        ON DELETE SET NULL;

--

CREATE TABLE product (
    product_code         INT(10) UNSIGNED NOT NULL,
    product_created      DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    product_updated      DATETIME DEFAULT NULL,
    product_published    DATETIME DEFAULT NULL,
    product_publish      TINYINT (1) DEFAULT 0,
    product_sku          VARCHAR(255) NOT NULL,
    product_title        VARCHAR(255) NOT NULL,
    product_slug         VARCHAR(255) NOT NULL,
    product_description  TEXT DEFAULT NULL,
    product_image        VARCHAR(255) DEFAULT NULL,
    product_price        DECIMAL(15,2) NOT NULL DEFAULT 0.00,
    product_stock        INT(5) UNSIGNED NOT NULL DEFAULT 0,
    product_rating       DECIMAL(4,2) NOT NULL DEFAULT 0.00,
    product_category     INT(10) UNSIGNED DEFAULT NULL,
    product_owner        INT(10) UNSIGNED NOT NULL
);

ALTER TABLE product
    ADD PRIMARY KEY (product_code),
    ADD UNIQUE  KEY product_title (product_title);

ALTER TABLE product
    MODIFY product_code INT(10) UNSIGNED NOT NULL AUTO_INCREMENT;

ALTER TABLE product
    ADD CONSTRAINT product_ibfk_1 FOREIGN KEY (product_category) 
        REFERENCES category (category_code)
        ON DELETE SET NULL,
    ADD CONSTRAINT product_ibfk_2 FOREIGN KEY (product_owner) 
        REFERENCES user (user_code)
        ON DELETE CASCADE;

--

CREATE TABLE color (
    color_code  INT(10) UNSIGNED NOT NULL,
    color_name  VARCHAR(64) NOT NULL,
    color_hex   VARCHAR(7) NOT NULL
);

ALTER TABLE color
    ADD PRIMARY KEY (color_code),
    ADD UNIQUE  KEY color_hex (color_hex);

ALTER TABLE color
    MODIFY color_code INT(10) UNSIGNED NOT NULL AUTO_INCREMENT;

-- 

CREATE TABLE variant (
    variant_product  INT(10) UNSIGNED NOT NULL,
    variant_color    INT(10) UNSIGNED NOT NULL
);

ALTER TABLE variant
    ADD PRIMARY KEY (variant_code, variant_color);

ALTER TABLE variant
    ADD CONSTRAINT variant_ibfk_1 FOREIGN KEY (variant_product) 
        REFERENCES product (product_code)
        ON DELETE CASCADE,
    ADD CONSTRAINT variant_ibfk_2 FOREIGN KEY (variant_color) 
        REFERENCES color (color_code)
        ON DELETE CASCADE;

--

ALTER TABLE color
    ADD PRIMARY KEY (color_code),
    ADD UNIQUE  KEY color_hex (color_hex);

ALTER TABLE color
    MODIFY color_code INT(10) UNSIGNED NOT NULL AUTO_INCREMENT;
--

INSERT INTO actions
    (action_code, action_name, action_codename)
VALUES
    (1, 'Create category', 'CREATE_CATEGORY'),
    (2, 'Edit category', 'EDIT_CATEGORY'),
    (3, 'List all available categories', 'LIST_CATEGORIES'),
    (4, 'View category details', 'VIEW_CATEGORY'),
    (5, 'Delete category', 'DELETE_CATEGORY'),
    (6, 'Create color', 'CREATE_COLOR'),
    (7, 'Edit color', 'EDIT_COLOR'),
    (8, 'View color details', 'VIEW_COLOR'),
    (9, 'List all available colors', 'LIST_COLORS'),
    (10, 'Delete color', 'DELETE_COLORS');

--

INSERT INTO roles
    (role_code, role_name, role_codename)
VALUES
    (1, 'Administrator', 'ADMIN_ROLE'),
    (2, 'Help Desk', 'HELPDESK_ROLE'),
    (3, 'Client', 'CLIENT_ROLE');

--

INSERT INTO policies
    (policy_role, policy_action)
VALUES
    (1, 1),
    (1, 2),
    (1, 3),
    (1, 4),
    (1, 5),
    (1, 6),
    (1, 7),
    (1, 8),
    (1, 9),
    (1, 10),
    (3, 6),
    (3, 7),
    (3, 8),
    (3, 9),
    (3, 10);

--

INSERT INTO user_type
    (usertype_code, usertype_name, usertype_codename, usertype_amount)
VALUES
    (1, 'Cuenta Diamante', 'DIAMOND_CLIENT', 50000.00),
    (2, 'Cuenta Platino', 'PLATINUM_CLIENT', 25000.00),
    (3, 'Cuenta Oro', 'GOLD_CLIENT', 10000.00),
    (4, 'Cuenta Plata', 'SILVER_CLIENT', 5000.00),
    (5, 'Cuenta Bronce', 'BRONZE_CLIENTE', 1000.00);

--

INSERT INTO account_status
    (status_code, status_name, status_codename)
VALUES
    (1, 'Activa',    'ACTIVE_STATUS'),
    (2, 'Inactiva',  'INACTIVE_STATUS'),
    (3, 'Congelada', 'BLOCKED_STATUS'),
    (4, 'Eliminada', 'DELETED_ACCOUNT');

--

INSERT INTO color
    (color_code, color_name, color_hex)
VALUES
    (1, 'Marron', '#800000'),
    (2, 'Red', '#ff0000'),
    (3, 'Orange', '#ffa500'),
    (4, 'Yellow', '#ffff00'),
    (5, 'Olive', '#808000'),
    (6, 'Purple', '#800080'),
    (7, 'Fuchsia', '#ff00ff'),
    (8, 'White', '#ffffff'),
    (9, 'Lime', '#00ff00'),
    (10, 'Green', '#008000'),
    (11, 'Navy', '#000080'),
    (12, 'Blue', '#0000ff'),
    (13, 'Agua', '#00ffff'),
    (14, 'Teal', '#008080'),
    (15, 'Black', '#000000'),
    (16, 'Silver', '#c0c0c0'),
    (17, 'Gray', '#8080');

--

INSERT INTO category 
    (category_code, category_name, category_description, category_parent)
VALUES 
    (1, 'Ropa', 'Seccion de ropa.', NULL),
    (2, 'Electrodomesticos', 'Seccion de aparatos de electrodomesticos.', NULL),
    (3, 'Ropa para Damas', 'Seccion de ropa para damas.', 1),
    (4, 'Ropa para Caballeros', 'Seccion de ropa para hombres.', 1),
    (5, 'Ropa para Niños', 'Seccion de ropa para hombres niños.', 4),
    (6, 'Ropa para Jovenes', 'Seccion de ropa para hombres jovenes.', 4),
    (7, 'Ropa para Adultos', 'Seccion de ropa para hombres adultos.', 4);



