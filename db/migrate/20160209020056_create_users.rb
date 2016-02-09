class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :first
      t.string :last
      t.string :email
      t.string :uuid
      t.string :password_digest

      t.timestamps null: false
    end
    add_index :users, :email
    add_index :users, :uuid
  end
end
