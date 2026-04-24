START TRANSACTION;

-- 1. INSERT ALL FIELDS (The Blueprints)
-- ---------------------------------------------------------
INSERT INTO item_category_fields (category_id, label, label_kh, field_key, field_type, order_index, created_at, updated_at) VALUES
(10, 'Condition', 'លក្ខខណ្ឌ', 'condition', 'radio', 1, NOW(), NOW()),
(10, 'Tax Type', 'ប្រភេទពន្ធ', 'tax_type', 'select', 2, NOW(), NOW()),
(10, 'Transmission', 'ប្រអប់លេខ', 'transmission', 'select', 3, NOW(), NOW()),
(10, 'Engine Type', 'ប្រភេទម៉ាស៊ីន', 'engine_type', 'select', 4, NOW(), NOW()),
(10, 'Year', 'ឆ្នាំផលិត', 'year', 'number', 5, NOW(), NOW()),
(10, 'Engine Size', 'ទំហំម៉ាស៊ីន', 'engine_size', 'text', 6, NOW(), NOW()),
(10, 'Color', 'ពណ៌', 'color', 'select', 7, NOW(), NOW());

-- 2. INSERT OPTIONS FOR EACH FIELD
-- ---------------------------------------------------------

-- Condition Options
SET @f_cond = (SELECT id FROM item_category_fields WHERE category_id = 10 AND field_key = 'condition' LIMIT 1);
INSERT INTO item_category_field_options (item_category_field_id, option_value, label_en, label_kh, order_index, created_at, updated_at) VALUES
(@f_cond, 'new', 'New', 'ថ្មី', 1, NOW(), NOW()),
(@f_cond, 'used', 'Used', 'ប្រើហើយ', 2, NOW(), NOW());

-- Tax Type Options
SET @f_tax = (SELECT id FROM item_category_fields WHERE category_id = 10 AND field_key = 'tax_type' LIMIT 1);
INSERT INTO item_category_field_options (item_category_field_id, option_value, label_en, label_kh, order_index, created_at, updated_at) VALUES
(@f_tax, 'tax_paper', 'Tax Paper', 'ក្រដាសពន្ធ', 1, NOW(), NOW()),
(@f_tax, 'plate_number', 'Plate Number', 'ស្លាកលេខ', 2, NOW(), NOW());

-- Transmission Options
SET @f_trans = (SELECT id FROM item_category_fields WHERE category_id = 10 AND field_key = 'transmission' LIMIT 1);
INSERT INTO item_category_field_options (item_category_field_id, option_value, label_en, label_kh, order_index, created_at, updated_at) VALUES
(@f_trans, 'auto', 'Automatic', 'លេខអូតូ', 1, NOW(), NOW()),
(@f_trans, 'manual', 'Manual', 'លេខដៃ', 2, NOW(), NOW());

-- Engine Type Options
SET @f_engine = (SELECT id FROM item_category_fields WHERE category_id = 10 AND field_key = 'engine_type' LIMIT 1);
INSERT INTO item_category_field_options (item_category_field_id, option_value, label_en, label_kh, order_index, created_at, updated_at) VALUES
(@f_engine, 'petrol', 'Petrol', 'សាំង', 1, NOW(), NOW()),
(@f_engine, 'diesel', 'Diesel', 'ម៉ាស៊ូត', 2, NOW(), NOW()),
(@f_engine, 'hybrid', 'Hybrid', 'ហាយប្រ៊ីដ', 3, NOW(), NOW()),
(@f_engine, 'phev', 'Plug-in Hybrid', 'Plug-in Hybrid', 4, NOW(), NOW()),
(@f_engine, 'ev', 'Electric (EV)', 'អគ្គិសនី (EV)', 5, NOW(), NOW());

-- Color Options
SET @f_color = (SELECT id FROM item_category_fields WHERE category_id = 10 AND field_key = 'color' LIMIT 1);
INSERT INTO item_category_field_options (item_category_field_id, option_value, label_en, label_kh, order_index, created_at, updated_at) VALUES
(@f_color, 'white', 'White', 'ស', 1, NOW(), NOW()),
(@f_color, 'black', 'Black', 'ខ្មៅ', 2, NOW(), NOW()),
(@f_color, 'silver', 'Silver', 'ប្រាក់', 3, NOW(), NOW()),
(@f_color, 'gold', 'Gold', 'មាស', 4, NOW(), NOW()),
(@f_color, 'gray', 'Gray', 'ប្រផេះ', 5, NOW(), NOW()),
(@f_color, 'blue', 'Blue', 'ខៀវ', 6, NOW(), NOW()),
(@f_color, 'red', 'Red', 'ក្រហម', 7, NOW(), NOW()),
(@f_color, 'green', 'Green', 'បៃតង', 8, NOW(), NOW()),
(@f_color, 'yellow', 'Yellow', 'លឿង', 9, NOW(), NOW()),
(@f_color, 'other_color', 'Other Color', 'ពណ៌ផ្សេងៗ', 99, NOW(), NOW());

COMMIT;


-- ---------------------------------------------------------
-- Category 'Brake' id: 1
-- ---------------------------------------------------------
START TRANSACTION;

-- 1. INSERT ALL FIELDS (The Blueprints)
-- ---------------------------------------------------------
-- We use ID 11 for the Brake category
INSERT INTO item_category_fields (category_id, label, label_kh, field_key, field_type, order_index, created_at, updated_at) VALUES
(1, 'Condition', 'លក្ខខណ្ឌ', 'condition', 'radio', 1, NOW(), NOW()),
(1, 'Component Type', 'ប្រភេទគ្រឿងបន្លាស់', 'brake_type', 'select', 2, NOW(), NOW()),
(1, 'Position', 'ទីតាំង', 'position', 'select', 3, NOW(), NOW()),
(1, 'Material', 'ប្រភេទសាច់ដែក/ស្បែក', 'material', 'select', 4, NOW(), NOW()),
(1, 'Brand Type', 'ប្រភេទម៉ាក', 'brand_type', 'select', 5, NOW(), NOW());

-- 2. INSERT OPTIONS FOR EACH FIELD
-- ---------------------------------------------------------

-- Condition Options
SET @f_cond = (SELECT id FROM item_category_fields WHERE category_id = 1 AND field_key = 'condition' LIMIT 1);
INSERT INTO item_category_field_options (item_category_field_id, option_value, label_en, label_kh, order_index, created_at, updated_at) VALUES
(@f_cond, 'new', 'New', 'ថ្មី', 1, NOW(), NOW()),
(@f_cond, 'used', 'Used', 'ប្រើហើយ', 2, NOW(), NOW()),
(@f_cond, 'remanufactured', 'Remanufactured', 'កែច្នៃឡើងវិញ', 3, NOW(), NOW());

-- Component Type Options
SET @f_type = (SELECT id FROM item_category_fields WHERE category_id = 1 AND field_key = 'brake_type' LIMIT 1);
INSERT INTO item_category_field_options (item_category_field_id, option_value, label_en, label_kh, order_index, created_at, updated_at) VALUES
(@f_type, 'brake_pads', 'Brake Pads', 'ស្បែកហ្វ្រាំង', 1, NOW(), NOW()),
(@f_type, 'brake_rotors', 'Brake Rotors/Discs', 'ថាសហ្វ្រាំង', 2, NOW(), NOW()),
(@f_type, 'calipers', 'Brake Calipers', 'ដង្កៀបហ្វ្រាំង', 3, NOW(), NOW()),
(@f_type, 'abs_module', 'ABS Module', 'ប្រព័ន្ធ ABS', 4, NOW(), NOW()),
(@f_type, 'master_cylinder', 'Master Cylinder', 'ស៊ីឡាំងហ្វ្រាំងមេ', 5, NOW(), NOW());

-- Position Options
SET @f_pos = (SELECT id FROM item_category_fields WHERE category_id = 1 AND field_key = 'position' LIMIT 1);
INSERT INTO item_category_field_options (item_category_field_id, option_value, label_en, label_kh, order_index, created_at, updated_at) VALUES
(@f_pos, 'front', 'Front', 'ខាងមុខ', 1, NOW(), NOW()),
(@f_pos, 'rear', 'Rear', 'ខាងក្រោយ', 2, NOW(), NOW()),
(@f_pos, 'full_set', 'Full Set (Front & Rear)', 'មួយឈុត (មុខ និង ក្រោយ)', 3, NOW(), NOW());

-- Material Options
SET @f_mat = (SELECT id FROM item_category_fields WHERE category_id = 1 AND field_key = 'material' LIMIT 1);
INSERT INTO item_category_field_options (item_category_field_id, option_value, label_en, label_kh, order_index, created_at, updated_at) VALUES
(@f_mat, 'ceramic', 'Ceramic', 'សេរ៉ាមិច', 1, NOW(), NOW()),
(@f_mat, 'semi_metallic', 'Semi-Metallic', 'ពាក់កណ្តាលលោហៈ', 2, NOW(), NOW()),
(@f_mat, 'organic', 'Organic', 'សរីរាង្គ', 3, NOW(), NOW());

-- Brand Type Options
SET @f_brand = (SELECT id FROM item_category_fields WHERE category_id = 1 AND field_key = 'brand_type' LIMIT 1);
INSERT INTO item_category_field_options (item_category_field_id, option_value, label_en, label_kh, order_index, created_at, updated_at) VALUES
(@f_brand, 'genuine', 'Genuine (OEM)', 'ហ្ស៊ីន (OEM)', 1, NOW(), NOW()),
(@f_brand, 'aftermarket', 'Aftermarket', 'ម៉ាកក្រៅ (Aftermarket)', 2, NOW(), NOW()),
(@f_brand, 'performance', 'Performance/Racing', 'គ្រឿងលេង (Performance)', 3, NOW(), NOW());

COMMIT;