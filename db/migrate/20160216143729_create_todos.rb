class CreateTodos < ActiveRecord::Migration
  def change
    create_table :todos do |t|
      t.string :description
      t.string :uuid

      t.timestamps null: false
    end
    add_index :todos, :uuid
  end
end
