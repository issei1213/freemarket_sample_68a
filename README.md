## usersテーブル
|Column|Type|Options|
|------|----|-------|
|nickname|string|null: false, index: true|
|email|string|null: false, unique: true, index: true|
|password|string|null: false, unique: true, index: true|
|first_name|string|null :false|
|last_name|string|null :false|
|first_name_kana|string|null :false|
|last_name_kana|string|null :false|
|birthday_year|integer|null :false|
|birthday_month|integer|null :false|
|birthday_date|integer|null :false|
### Association
- has_many :products 
- has_many :purchase_credits
- has_many :purchase_destinations




## productsテーブル
|Column|Type|Options|
|------|----|-------|
|users_id|reference|foreign_key: true|
|category_id|reference|foreign_key: true|
|name|string|null :false|
|description|sgring|null :false|
|price|integer|null :false|
|condition|integer|null :false|
|shipping_id|reference|foreign_key: true|
|shipping_where|interger|null: false|
|shipping_day|interger|null: false|
|brands_id|reference|foreign_key: true|
|size|interger||
|status|boolean||
### Association
  - belongs_to  :user
  - has_many    :images, dependent: :destroy
  - belongs_to  :category
  - belongs_to  :shipping
  - belongs_to  :brand, optional: true


## imagesテーブル
|Column|Type|Options|
|------|----|-------|
|product_id|reference|foreign_key: true|
|image|string|null :false|
### Association
 - belongs_to :product


## categoriesテーブル
|Column|Type|Options|
|------|----|-------|
|name|stirng|null :false|
|ancestry|stirng|null :false, index: true|
### Association
  - has_many :products
  - has_ancestry

## shippingsテーブル
|Column|Type|Options|
|------|----|-------|
|name|stirng|null :false|
|ancestry|stirng|null :false, index: true|
### Association
  - has_many :products
  - has_ancestry

 ## brandsテーブル
|Column|Type|Options|
|------|----|-------|
|name|stirng|null :false|
|ancestry|stirng|null :false, index: true|
### Association
 - belongs_to :product

 ## purchase_creditsテーブル
|Column|Type|Options|
|------|----|-------|
|users_id|reference|foreign_key: true|
|customer_id|string|null: false|
|card_id|string|null: false|

### Association
  - belongs_to :user


 ## purchase_destinationsテーブル
|Column|Type|Options|
|------|----|-------|
|users_id|reference|foreign_key: true|
|p_last_name|string|null :false|
|p_first_name|string|null :false|
|p_first_name_kana|string|null :false|
|p_last_name_kana|string|null :false|
|p_postcode|string|null :false|
|p_prefecture|string|null :false|
|p_city|string|null :false|
|p_block|string|null :false|
|p_building|string||
|p_phone_number|string||
### Association
  - belongs_to :user
 
 